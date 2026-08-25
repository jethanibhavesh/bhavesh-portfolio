// ========================================
// Mobile menu toggle
// ========================================

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


// ========================================
// Reduced motion preference
// ========================================

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;


// ========================================
// Scroll-triggered reveal animations
// ========================================

if (!prefersReducedMotion && 'IntersectionObserver' in window) {

  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('in-view');

        observer.unobserve(entry.target);
      }

    });

  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach(el => observer.observe(el));

} else {

  document
    .querySelectorAll('.reveal')
    .forEach(el => el.classList.add('in-view'));

}


// ========================================
// Ambient cursor-follow glow in hero
// ========================================

const hero = document.querySelector('.hero');
const heroGlow = document.querySelector('.hero-glow');

if (
  hero &&
  heroGlow &&
  !prefersReducedMotion &&
  window.matchMedia('(pointer: fine)').matches
) {

  hero.addEventListener('mousemove', (e) => {

    const rect = hero.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width) * 100;

    const y =
      ((e.clientY - rect.top) / rect.height) * 100;

    heroGlow.style.setProperty('--gx', `${x}%`);
    heroGlow.style.setProperty('--gy', `${y}%`);

  });

}


// ========================================
// Scroll progress indicator
// ========================================

const progress = document.createElement('div');

progress.className = 'scroll-progress';

document.body.appendChild(progress);


const updateProgress = () => {

  const max =
    document.documentElement.scrollHeight - window.innerHeight;

  const value =
    max > 0
      ? (window.scrollY / max) * 100
      : 0;

  progress.style.width = `${value}%`;

};


window.addEventListener(
  'scroll',
  updateProgress,
  { passive: true }
);

updateProgress();


// ========================================
// Active navigation link while scrolling
// ========================================

const sections =
  [...document.querySelectorAll('section[id]')];

const navLinks =
  [...document.querySelectorAll('.nav-links a, .mobile-nav a')];


const setActiveNav = () => {

  const y = window.scrollY + 180;

  let current = '';

  sections.forEach(section => {

    if (y >= section.offsetTop) {
      current = section.id;
    }

  });

  navLinks.forEach(link => {

    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`
    );

  });

};


window.addEventListener(
  'scroll',
  setActiveNav,
  { passive: true }
);

setActiveNav();


// ========================================
// Subtle 3D tilt on cards
// ========================================

if (
  !prefersReducedMotion &&
  window.matchMedia('(pointer: fine)').matches
) {

  document
    .querySelectorAll('.skill-card, .project-card')
    .forEach(card => {

      card.addEventListener('pointermove', (e) => {

        const r = card.getBoundingClientRect();

        const x =
          (e.clientX - r.left) / r.width - 0.5;

        const y =
          (e.clientY - r.top) / r.height - 0.5;

        card.style.transform =
          `perspective(700px)
           rotateX(${-y * 4}deg)
           rotateY(${x * 4}deg)
           translateY(-6px)`;

      });


      card.addEventListener('pointerleave', () => {

        card.style.transform = '';

      });

    });

}


// ========================================
// PROJECT IMAGE FULLSCREEN LIGHTBOX
// ========================================

const projectImages =
  document.querySelectorAll('.project-image img');


// Create lightbox
const lightbox = document.createElement('div');

lightbox.className = 'image-lightbox';

lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="Close image">
    &times;
  </button>

  <button class="lightbox-prev" aria-label="Previous image">
    &#10094;
  </button>

  <div class="lightbox-content">
    <img class="lightbox-image" src="" alt="Full size project image">
  </div>

  <button class="lightbox-next" aria-label="Next image">
    &#10095;
  </button>
`;

document.body.appendChild(lightbox);


// Get lightbox elements
const lightboxImage =
  lightbox.querySelector('.lightbox-image');

const closeButton =
  lightbox.querySelector('.lightbox-close');

const previousButton =
  lightbox.querySelector('.lightbox-prev');

const nextButton =
  lightbox.querySelector('.lightbox-next');


// Store all project image URLs
const imageList =
  [...projectImages].map(image => ({
    src: image.src,
    alt: image.alt
  }));


let currentImageIndex = 0;


// Open image
const openLightbox = (index) => {

  currentImageIndex = index;

  const image = imageList[currentImageIndex];

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;

  lightbox.classList.add('active');

  document.body.style.overflow = 'hidden';

};


// Close image
const closeLightbox = () => {

  lightbox.classList.remove('active');

  document.body.style.overflow = '';

};


// Show next image
const showNextImage = () => {

  currentImageIndex =
    (currentImageIndex + 1) % imageList.length;

  const image = imageList[currentImageIndex];

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;

};


// Show previous image
const showPreviousImage = () => {

  currentImageIndex =
    (currentImageIndex - 1 + imageList.length)
    % imageList.length;

  const image = imageList[currentImageIndex];

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;

};


// Add click event to every project image
projectImages.forEach((image, index) => {

  image.style.cursor = 'zoom-in';

  image.addEventListener('click', () => {

    openLightbox(index);

  });

});


// Close button
closeButton.addEventListener('click', closeLightbox);


// Next button
nextButton.addEventListener('click', showNextImage);


// Previous button
previousButton.addEventListener(
  'click',
  showPreviousImage
);


// Click dark background to close
lightbox.addEventListener('click', (e) => {

  if (e.target === lightbox) {
    closeLightbox();
  }

});


// Keyboard controls
document.addEventListener('keydown', (e) => {

  // Close lightbox with Escape
  if (
    e.key === 'Escape' &&
    lightbox.classList.contains('active')
  ) {

    closeLightbox();

  }


  // Next image with Arrow Right
  if (
    e.key === 'ArrowRight' &&
    lightbox.classList.contains('active')
  ) {

    showNextImage();

  }


  // Previous image with Arrow Left
  if (
    e.key === 'ArrowLeft' &&
    lightbox.classList.contains('active')
  ) {

    showPreviousImage();

  }


  // Close mobile navigation with Escape
  if (
    e.key === 'Escape' &&
    mobileNav
  ) {

    mobileNav.classList.remove('open');

  }

});
