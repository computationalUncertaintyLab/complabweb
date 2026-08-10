(function () {
  const root = document.getElementById("opportunities-directory");
  if (!root) return;

  root.querySelectorAll(".opportunity-card-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const card = btn.closest(".opportunity-card");
      const panelId = btn.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!card || !panel) return;

      const open = btn.getAttribute("aria-expanded") === "true";
      const nextOpen = !open;

      btn.setAttribute("aria-expanded", nextOpen ? "true" : "false");
      panel.hidden = !nextOpen;
      panel.setAttribute("aria-hidden", nextOpen ? "false" : "true");
      card.classList.toggle("is-open", nextOpen);
    });
  });
})();
