document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progress");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrollTop / (docHeight || 1)) * 100;
    if (progressBar) {
      progressBar.style.width = `${pct}%`;
    }
  }

  window.addEventListener("scroll", updateProgressBar, { passive: true });

  if (mobileMenuBtn && header) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = header.classList.toggle("mobile-open");
      mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("mobile-open");
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (header && mobileMenuBtn && !header.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
      header.classList.remove("mobile-open");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
