module.exports = {
  ci: {
    collect: {
      staticDistDir: "./_site",
      numberOfRuns: 2,
      url: [
        "http://localhost/",
        "http://localhost/posts/2026-07-06-attackers-dont-buy-tokens-they-steal-yours/",
        "http://localhost/weblog/2026-03-29-claude-code-auto-mode-a-safer-way-to-skip-permissions/",
        "http://localhost/archive/2026-03-29-claude-code-auto-mode-a-safer-way-to-skip-permissions/",
        "http://localhost/talks/2026-08-06-bhusa2026-promptware-eod-skillful-agent-detonation/",
      ],
      settings: {
        maxWaitForLoad: 45000,
      },
    },
    assert: {
      assertMatrix: [
        {
          matchingUrlPattern: ".*",
          assertions: {
            "categories:accessibility": ["error", { minScore: 0.95 }],
            "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
            "total-blocking-time": ["error", { maxNumericValue: 200 }],
          },
        },
        {
          // The external-source archive is intentionally canonicalized/noindexed
          // and preserves third-party markup, so gate owned HTML separately.
          matchingUrlPattern: "^https?://[^/]+/(?:$|posts/|weblog/|talks/)",
          assertions: {
            "categories:performance": ["error", { minScore: 0.9 }],
            "categories:best-practices": ["error", { minScore: 0.95 }],
            "categories:seo": ["error", { minScore: 0.9 }],
            // Keep the synthetic mobile gate stable around the 2.5 s field-CWV boundary.
            "largest-contentful-paint": ["error", { maxNumericValue: 2800 }],
          },
        },
      ],
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci/reports",
    },
  },
};
