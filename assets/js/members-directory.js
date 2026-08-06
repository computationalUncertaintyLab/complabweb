(function () {
  const root = document.getElementById("members-directory");
  if (!root) return;

  const searchInput = root.querySelector("#members-search");
  const emptyEl = root.querySelector("#members-empty");
  const chips = Array.from(root.querySelectorAll("[data-role-filter]"));
  const sections = Array.from(root.querySelectorAll("[data-role-section]"));
  const cards = Array.from(root.querySelectorAll(".member-card"));
  const expandEnabled = root.getAttribute("data-expand") !== "false";

  let activeRole = "all";
  let query = "";

  function normalize(value) {
    return (value || "").toLowerCase().trim();
  }

  function cardMatches(card) {
    const role = card.getAttribute("data-role") || "";
    if (activeRole !== "all" && role !== activeRole) return false;

    if (!query) return true;

    const haystack = [
      card.getAttribute("data-name"),
      card.getAttribute("data-summary"),
      card.getAttribute("data-tags"),
      card.getAttribute("data-role"),
    ]
      .map(normalize)
      .join(" ");

    return haystack.includes(query);
  }

  function applyFilters() {
    let visibleCount = 0;

    cards.forEach(function (card) {
      const match = cardMatches(card);
      card.classList.toggle("is-hidden", !match);
      if (match) visibleCount += 1;
    });

    sections.forEach(function (section) {
      const sectionRole = section.getAttribute("data-role-section");
      const roleAllowed = activeRole === "all" || activeRole === sectionRole;
      const hasVisibleCard = section.querySelector(".member-card:not(.is-hidden)");
      section.classList.toggle("is-hidden", !(roleAllowed && hasVisibleCard));
    });

    if (emptyEl) {
      emptyEl.hidden = visibleCount > 0;
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      activeRole = chip.getAttribute("data-role-filter") || "all";
      chips.forEach(function (c) {
        c.classList.toggle("is-active", c === chip);
      });
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      query = normalize(searchInput.value);
      applyFilters();
    });
  }

  if (expandEnabled) {
    root.querySelectorAll(".member-card-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const card = btn.closest(".member-card");
        if (!card || card.getAttribute("data-expand") === "false") return;

        const panel = card.querySelector(".member-card-expand");
        if (!panel) return;

        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        panel.classList.toggle("is-open", !open);
        panel.setAttribute("aria-hidden", open ? "true" : "false");
      });
    });
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

  applyFilters();
})();
