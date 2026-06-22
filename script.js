// ============================================
// BOOT SCREEN
// ============================================
window.addEventListener('load', () => {
  const boot = document.getElementById('bootScreen');
  setTimeout(() => boot.classList.add('is-done'), 1300);
});

// ============================================
// HEADER ON SCROLL
// ============================================
const header = document.getElementById('header');
const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};
window.addEventListener('scroll', onScroll);
onScroll();

// ============================================
// MOBILE NAV
// ============================================
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// SCROLL REVEAL
// ============================================
const revealTargets = document.querySelectorAll(
  '.service-card, .spec-card, .process__item, .gallery__item, .why__copy, .why__panel, .about__copy, .about__visual, .contact__copy, .contact__form, .section-head'
);
revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ============================================
// ANIMATED COUNTERS
// ============================================
const statEls = document.querySelectorAll('.stat__num');
const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statEls.forEach(el => statObserver.observe(el));

// ============================================
// CONTACT FORM -> WHATSAPP
// ============================================
const WHATSAPP_NUMBER = '5500000000000';
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const servico = document.getElementById('servico').value;
  const mensagem = document.getElementById('mensagem').value.trim();

  let texto = `Olá! Meu nome é ${nome}.\n`;
  texto += `Telefone: ${telefone}\n`;
  texto += `Serviço de interesse: ${servico}\n`;
  if (mensagem) texto += `Mensagem: ${mensagem}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank', 'noopener');
});

// ============================================
// FOOTER YEAR
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();
