const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const linkItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navLinks.classList.toggle('open');
  });
}

linkItems.forEach((link) => {
  link.addEventListener('click', () => {
    if (navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute('id');
      linkItems.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
      });
    });
  },
  {
    rootMargin: '-45% 0px -45% 0px',
    threshold: 0
  }
);

sections.forEach((section) => observer.observe(section));

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}

const formNextUrl = document.getElementById('form-next-url');
if (formNextUrl) {
  formNextUrl.value = `${window.location.origin}/thank-you.html`;
}

const profileImage = document.getElementById('profile-image');

function canLoadImage(url) {
  return new Promise((resolve) => {
    const probe = new Image();
    probe.onload = () => resolve(true);
    probe.onerror = () => resolve(false);
    probe.src = url;
  });
}

async function resolveProfileImage() {
  if (!profileImage) return;

  const candidates = (profileImage.dataset.candidates || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  for (const candidate of candidates) {
    const exists = await canLoadImage(candidate);
    if (exists) {
      profileImage.src = candidate;
      return;
    }
  }
}

resolveProfileImage();
