/* ============================================================
   AUREVIO — INTERACTIVE FUNCTIONALITY
   Scroll effects, mobile menu, progress bar, and micro-interactions
   ============================================================ */

// ============================================================
// PROGRESS BAR
// ============================================================

function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progress').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateProgressBar);

// ============================================================
// MOBILE MENU
// ============================================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const siteHeader = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    siteHeader.classList.toggle('mobile-open');
    mobileMenuBtn.setAttribute('aria-expanded', 
      siteHeader.classList.contains('mobile-open') ? 'true' : 'false'
    );
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      siteHeader.classList.remove('mobile-open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!siteHeader.contains(e.target)) {
      siteHeader.classList.remove('mobile-open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ============================================================
// SCROLL REVEAL ANIMATIONS
// ============================================================

const revealElements = document.querySelectorAll(
  '.project-card, .process-step, .capability-group, section'
);

const revealOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const revealOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealOnScroll.unobserve(entry.target);
    }
  });
}, revealOptions);

revealElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  revealOnScroll.observe(element);
});

// ============================================================
// HOVER INTERACTIONS
// ============================================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update URL
      window.history.pushState(null, null, href);
    }
  });
});

// ============================================================
// PARALLAX EFFECT ON HERO VISUAL (SUBTLE)
// ============================================================

const heroVisual = document.querySelector('.hero-visual');

if (heroVisual) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const scrollPercent = window.scrollY / window.innerHeight;
      heroVisual.style.transform = `translateY(${scrollPercent * 40}px)`;
    }
  });
}

// ============================================================
// LAZY LOAD PLACEHOLDER IMAGES
// ============================================================

const imagePlaceholders = document.querySelectorAll('.image-placeholder');

imagePlaceholders.forEach(placeholder => {
  placeholder.style.animation = 'fadeIn 0.6s ease-out';
});

// ============================================================
// RESPECT PREFERS-REDUCED-MOTION
// ============================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.documentElement.style.scrollBehavior = 'auto';
}

// ============================================================
// STAGGERED INTRO ANIMATIONS
// ============================================================

const introElements = document.querySelectorAll('.capability-group');

introElements.forEach((el, index) => {
  el.style.animation = `fadeInUp 0.8s ease-out ${0.2 * index}s both`;
});

// ============================================================
// FOOTER YEAR
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Ensure smooth transitions work properly
  document.body.style.opacity = '1';
});

// ============================================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================================

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    siteHeader.classList.remove('mobile-open');
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }
});

// Add animation keyframes dynamically if not in CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
  }
`;
document.head.appendChild(style);

console.log('Aurevio — Websites built to be remembered.');
