// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  // Close mobile nav after clicking a link
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll-triggered reveal animations
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));
} else {
  // No JS/observer support or reduced motion: just show everything
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
}

// Ambient cursor-follow glow in the hero (signature touch, desktop only)
const hero = document.querySelector('.hero');
const heroGlow = document.querySelector('.hero-glow');
if (hero && heroGlow && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroGlow.style.setProperty('--gx', `${x}%`);
    heroGlow.style.setProperty('--gy', `${y}%`);
  });
}


// Scroll progress indicator
const progress = document.createElement('div');
progress.className = 'scroll-progress';
document.body.appendChild(progress);

const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${value}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Active navigation link while scrolling
const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a, .mobile-nav a')];
const setActiveNav = () => {
  const y = window.scrollY + 180;
  let current = '';
  sections.forEach(section => {
    if (y >= section.offsetTop) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};
window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

// Subtle 3D tilt on cards for pointer devices
if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

// Close mobile navigation with Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav) mobileNav.classList.remove('open');
});
