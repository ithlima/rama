const menuToggle = document.querySelector('.menu-toggle');
const faqItems = document.querySelectorAll('.faq-item');
const revealItems = document.querySelectorAll('.reveal');
const backToTopButton = document.querySelector('.back-to-top');
const currentYear = document.querySelector('#currentYear');
const mobileMenu = document.querySelector('#mobileMenu');
const closeMenu = document.querySelector('#closeMenu');
const mobileMenuLinks = document.querySelectorAll('#mobileMenu a');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const openMobileMenu = () => {
  if (!menuToggle || !mobileMenu) return;

  mobileMenu.classList.add('active');
  menuToggle.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeMobileMenu = () => {
  if (!menuToggle || !mobileMenu) return;

  mobileMenu.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', openMobileMenu);
}

if (closeMenu && mobileMenu) {
  closeMenu.addEventListener('click', closeMobileMenu);
}

if (mobileMenu) {
  mobileMenu.addEventListener('click', (event) => {
    if (event.target === mobileMenu) {
      closeMobileMenu();
    }
  });
}

mobileMenuLinks.forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileMenu?.classList.contains('active')) {
    closeMobileMenu();
  }
});

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');

  if (!button) return;

  button.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');

  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    faqItems.forEach((faq) => {
      faq.classList.remove('active');
      faq.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
    });

    if (!isActive) {
      item.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.14
  });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const updateBackToTopVisibility = () => {
  if (!backToTopButton) return;

  backToTopButton.classList.toggle('visible', window.scrollY > 400);
};

window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
updateBackToTopVisibility();

if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
