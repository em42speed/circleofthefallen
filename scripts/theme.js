(function () {
     const THEME_KEY = "fall-theme";

     function applyTheme(theme) {
          const body = document.body;
          const toggleButton = document.getElementById("theme-toggle");
          if (!toggleButton) return; // nothing to do if page doesn't have the button yet

          if (theme === "dark") {
               body.classList.add("dark-mode");
               body.classList.remove("light-mode");
               toggleButton.textContent = "Light";
               toggleButton.setAttribute("aria-checked", "true");
               toggleButton.setAttribute("aria-label", "Disable dark mode");
          } else {
               body.classList.add("light-mode");
               body.classList.remove("dark-mode");
               toggleButton.textContent = "Dark";
               toggleButton.setAttribute("aria-checked", "false");
               toggleButton.setAttribute("aria-label", "Enable dark mode");
          }
     }

     // Apply saved theme as early as possible if DOM is ready
     function init() {
          const saved = localStorage.getItem(THEME_KEY) || "light";
          applyTheme(saved);

          // Attach listener if toggle exists
          const toggleButton = document.getElementById("theme-toggle");
          if (!toggleButton) return;

          toggleButton.addEventListener("click", function () {
               const now = document.body.classList.contains("light-mode")
                    ? "dark"
                    : "light";
               applyTheme(now);
               localStorage.setItem(THEME_KEY, now);
               // keep aria-checked in sync (redundant with applyTheme but explicit)
               toggleButton.setAttribute(
                    "aria-checked",
                    now === "dark" ? "true" : "false"
               );
               toggleButton.setAttribute(
                    "aria-label",
                    now === "dark" ? "Disable dark mode" : "Enable dark mode"
               );
          });
     }

     if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", init);
     } else {
          init();
     }
})();
