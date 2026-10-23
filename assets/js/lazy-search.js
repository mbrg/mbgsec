(() => {
  "use strict";

  const settings = document.currentScript.dataset;
  const input = document.querySelector("input#search");
  if (!input) return;
  const results = document.getElementById("results");
  let loading;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = () => {
        script.remove();
        reject(new Error("Search could not load. Please try again."));
      };
      document.head.appendChild(script);
    });
  }

  function initialize() {
    if (loading) return loading;
    input.setAttribute("aria-busy", "true");
    loading = (async () => {
      if (!window.lunr) await loadScript(settings.core);
      if (!window.store) await loadScript(settings.store);
      await loadScript(settings.language);
      // The theme registers its input handler through jQuery's ready queue.
      // Replay any query typed while the scripts and index were loading.
      window.jQuery(() => {
        if (input.value) window.jQuery(input).trigger("keyup");
      });
    })().catch((error) => {
      loading = undefined;
      if (results) {
        results.setAttribute("role", "status");
        results.textContent = error.message;
      }
    }).finally(() => input.removeAttribute("aria-busy"));
    return loading;
  }

  document.querySelectorAll(".search__toggle").forEach((button) => {
    button.addEventListener("click", initialize);
  });
  input.addEventListener("focus", initialize);
  input.addEventListener("input", initialize);
  if (document.activeElement === input) initialize();
})();
