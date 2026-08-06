(function () {
  const root = document.getElementById("courses-directory");
  if (!root) return;

  const searchInput = root.querySelector("#courses-search");
  const emptyEl = root.querySelector("#courses-empty");
  const cards = Array.from(root.querySelectorAll(".course-card"));

  function normalize(value) {
    return (value || "").toLowerCase().trim();
  }

  function applyFilter() {
    const query = normalize(searchInput ? searchInput.value : "");
    let visibleCount = 0;

    cards.forEach(function (card) {
      const haystack = [
        card.getAttribute("data-name"),
        card.getAttribute("data-summary"),
        card.getAttribute("data-tags"),
      ]
        .map(normalize)
        .join(" ");

      const match = !query || haystack.includes(query);
      card.classList.toggle("is-hidden", !match);
      if (match) visibleCount += 1;
    });

    if (emptyEl) {
      emptyEl.hidden = visibleCount > 0;
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilter);
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    cards.forEach(function (card) {
      card.classList.add("is-visible");
    });
  } else {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    cards.forEach(function (card) {
      observer.observe(card);
    });
  }

  applyFilter();
})();
