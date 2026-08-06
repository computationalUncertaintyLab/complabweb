(function () {
  const mark = document.getElementById("home-splash-mark");
  if (!mark) return;

  const storageKey = "culab-splash-bubbles-played";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) return;

  try {
    if (window.sessionStorage.getItem(storageKey) === "1") return;
  } catch (e) {
    // sessionStorage unavailable — still play once this load
  }

  // Wait a beat so the mark fade-in has started
  window.requestAnimationFrame(function () {
    mark.classList.add("is-bubbling");
    try {
      window.sessionStorage.setItem(storageKey, "1");
    } catch (e) {
      // ignore
    }
  });
})();
