// The original prototype calls api.anthropic.com directly from the browser,
// which can't work (no key, CORS). Reroute those calls to our same-origin
// /api/chat proxy so the original code can actually run end-to-end.
// This is the ONLY runtime difference vs. the unmodified backup file.
const _fetch = window.fetch.bind(window);
window.fetch = (url, opts) => {
  if (typeof url === "string" && url.startsWith("https://api.anthropic.com")) {
    return _fetch("/api/chat", opts);
  }
  return _fetch(url, opts);
};
