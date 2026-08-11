(() => {
  "use strict";

  const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

  const asPercent = (value, fallback) => {
    const numeric = Number(value);
    return `${Number.isFinite(numeric) ? numeric : fallback}%`;
  };

  const resolveAsset = (value, manifestUrl) => {
    if (typeof value !== "string" || value.length === 0) return null;
    return new URL(value, manifestUrl).href;
  };

  const slideFromHash = () => {
    const match = window.location.hash.match(/^#slide=(\d+)$/);
    return match ? Math.max(0, Number(match[1]) - 1) : 0;
  };

  async function loadManifest(pointerUrl) {
    const pointerResponse = await fetch(pointerUrl, { cache: "no-store" });
    if (!pointerResponse.ok) throw new Error(`Could not load presentation (${pointerResponse.status}).`);

    const pointer = await pointerResponse.json();
    if (typeof pointer.manifest === "string" && !Array.isArray(pointer.slides)) {
      const manifestUrl = new URL(pointer.manifest, pointerUrl).href;
      const manifestResponse = await fetch(manifestUrl, { cache: "no-store" });
      if (!manifestResponse.ok) throw new Error(`Could not load presentation (${manifestResponse.status}).`);
      return { manifest: await manifestResponse.json(), manifestUrl };
    }

    return { manifest: pointer, manifestUrl: pointerUrl };
  }

  function setAspectRatio(root, manifest) {
    let ratio = 16 / 9;
    if (typeof manifest.aspectRatio === "string") {
      const match = manifest.aspectRatio.match(/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/);
      if (match && Number(match[2]) > 0) ratio = Number(match[1]) / Number(match[2]);
    } else if (Number(manifest.width) > 0 && Number(manifest.height) > 0) {
      ratio = Number(manifest.width) / Number(manifest.height);
    }
    root.style.setProperty("--deck-ratio", String(ratio));
  }

  async function initialize(root) {
    const pointer = root.dataset.deckManifest;
    const slideHost = root.querySelector(".deck-player__slide");
    const message = root.querySelector(".deck-player__message");
    const counter = root.querySelector(".deck-player__counter");
    const stage = root.querySelector(".deck-player__stage");
    const previous = root.querySelector('[data-deck-action="previous"]');
    const next = root.querySelector('[data-deck-action="next"]');
    const fullscreen = root.querySelector('[data-deck-action="fullscreen"]');
    const resourceToggle = root.querySelector(".deck-player__resource-toggle");

    const setResourcesOpen = (open) => {
      root.toggleAttribute("data-resources-open", open);
      resourceToggle?.setAttribute("aria-expanded", String(open));
    };

    resourceToggle?.addEventListener("click", () => {
      setResourcesOpen(!root.hasAttribute("data-resources-open"));
    });

    root.addEventListener("click", (event) => {
      if (!root.hasAttribute("data-resources-open")) return;
      if (event.target instanceof Element && event.target.closest(".deck-player__resources, .deck-player__resource-toggle")) return;
      setResourcesOpen(false);
    });

    if (!pointer) {
      message.textContent = "This presentation has no manifest URL.";
      return;
    }

    try {
      const { manifest, manifestUrl } = await loadManifest(new URL(pointer, window.location.href).href);
      const slides = Array.isArray(manifest.slides) ? manifest.slides : [];
      if (slides.length === 0) throw new Error("This presentation does not contain any slides.");

      setAspectRatio(root, manifest);
      let index = clamp(slideFromHash(), 0, slides.length - 1);

      const updateHash = () => {
        const hash = `#slide=${index + 1}`;
        if (window.location.hash !== hash) history.replaceState(null, "", hash);
      };

      const pauseMedia = () => {
        slideHost.querySelectorAll("video").forEach((video) => video.pause());
      };

      const render = () => {
        pauseMedia();
        slideHost.replaceChildren();

        const slide = slides[index] || {};
        const imageUrl = resolveAsset(slide.image, manifestUrl);
        if (!imageUrl) throw new Error(`Slide ${index + 1} is missing its image.`);

        const image = document.createElement("img");
        image.className = "deck-player__slide-image";
        image.src = imageUrl;
        image.alt = typeof slide.alt === "string" ? slide.alt : `Slide ${index + 1}`;
        image.decoding = "async";
        image.draggable = false;
        slideHost.append(image);

        const animations = Array.isArray(slide.animations) ? slide.animations : [];
        for (const animationDefinition of animations) {
          const source = resolveAsset(animationDefinition?.src, manifestUrl);
          if (!source) continue;

          const animation = document.createElement("img");
          animation.className = "deck-player__animation";
          animation.src = source;
          animation.alt = "";
          animation.setAttribute("aria-hidden", "true");
          animation.decoding = "async";
          animation.draggable = false;
          animation.style.left = asPercent(animationDefinition.x, 0);
          animation.style.top = asPercent(animationDefinition.y, 0);
          animation.style.width = asPercent(animationDefinition.width, 100);
          animation.style.height = asPercent(animationDefinition.height, 100);
          slideHost.append(animation);
        }

        const videos = Array.isArray(slide.videos) ? slide.videos : slide.video ? [slide.video] : [];
        for (const videoDefinition of videos) {
          const source = resolveAsset(videoDefinition?.src, manifestUrl);
          if (!source) continue;

          const video = document.createElement("video");
          video.className = "deck-player__video";
          video.src = source;
          video.preload = "metadata";
          video.controls = videoDefinition.controls !== false;
          video.muted = videoDefinition.muted === true;
          video.loop = videoDefinition.loop === true;
          video.playsInline = true;
          video.crossOrigin = "anonymous";
          video.style.left = asPercent(videoDefinition.x, 0);
          video.style.top = asPercent(videoDefinition.y, 0);
          video.style.width = asPercent(videoDefinition.width, 100);
          video.style.height = asPercent(videoDefinition.height, 100);

          const poster = resolveAsset(videoDefinition.poster, manifestUrl);
          if (poster) video.poster = poster;
          slideHost.append(video);

          if (videoDefinition.autoplay === true) {
            video.play().catch(() => {
              // Browsers may require a user gesture; controls remain available.
            });
          }
        }

        const following = slides[index + 1];
        const followingImage = resolveAsset(following?.image, manifestUrl);
        if (followingImage) {
          const preload = new Image();
          preload.src = followingImage;
        }

        counter.value = `${index + 1} / ${slides.length}`;
        counter.textContent = counter.value;
        previous.disabled = index === 0;
        next.disabled = index === slides.length - 1;
        message.hidden = true;
        updateHash();
      };

      const goTo = (requestedIndex) => {
        const target = clamp(requestedIndex, 0, slides.length - 1);
        if (target === index) return;
        index = target;
        render();
      };

      previous.addEventListener("click", () => goTo(index - 1));
      next.addEventListener("click", () => goTo(index + 1));
      const canFullscreen = typeof root.requestFullscreen === "function" && typeof document.exitFullscreen === "function";
      fullscreen.hidden = !canFullscreen;
      fullscreen.addEventListener("click", async () => {
        if (!canFullscreen) return;
        try {
          if (document.fullscreenElement) {
            await document.exitFullscreen();
          } else {
            await root.requestFullscreen();
          }
        } catch {
          // Some mobile browsers expose the API but reject it for page elements.
        }
      });

      document.addEventListener("fullscreenchange", () => {
        const active = document.fullscreenElement === root;
        fullscreen.setAttribute("aria-label", active ? "Exit fullscreen" : "Enter fullscreen");
      });

      window.addEventListener("hashchange", () => goTo(slideFromHash()));
      window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && root.hasAttribute("data-resources-open")) {
          setResourcesOpen(false);
          resourceToggle?.focus();
          return;
        }
        if (event.target instanceof Element && event.target.closest("a, button, video, input, select, textarea")) return;
        if (["ArrowRight", "PageDown", " "].includes(event.key)) {
          event.preventDefault();
          goTo(index + 1);
        } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
          event.preventDefault();
          goTo(index - 1);
        } else if (event.key === "Home") {
          event.preventDefault();
          goTo(0);
        } else if (event.key === "End") {
          event.preventDefault();
          goTo(slides.length - 1);
        } else if (event.key.toLowerCase() === "f") {
          event.preventDefault();
          fullscreen.click();
        }
      });

      let touchStartX = null;
      stage.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0]?.clientX ?? null;
      }, { passive: true });
      stage.addEventListener("touchend", (event) => {
        if (touchStartX === null) return;
        const distance = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
        touchStartX = null;
        if (Math.abs(distance) < 50) return;
        goTo(index + (distance < 0 ? 1 : -1));
      }, { passive: true });

      render();
    } catch (error) {
      message.hidden = false;
      message.textContent = error instanceof Error ? error.message : "Could not load this presentation.";
      previous.disabled = true;
      next.disabled = true;
    }
  }

  document.querySelectorAll("[data-deck-manifest]").forEach((root) => initialize(root));
})();
