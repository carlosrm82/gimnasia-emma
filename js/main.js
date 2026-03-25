/* ============================================
   EMMA ROMERO · GIMNASIA ARTÍSTICA
   Lógica e interactividad principal
   ============================================ */

// Inicializar Lucide Icons cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initRevealAnimations();
  initMobileMenu();
  initStickyHeader();
});

/* === LUCIDE ICONS === */
function initIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* === ANIMACIONES DE SCROLL (REVEAL) === */
function initRevealAnimations() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Solo anima una vez
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/* === MENÚ MÓVIL === */
function initMobileMenu() {
  const toggle = document.querySelector('.nav__toggle');
  const menu   = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);

    // Cambiar icono hamburguesa / X
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
      lucide.createIcons();
    }
  });

  // Cerrar menú al hacer click en un enlace
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      }
    });
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    }
  });
}

/* === HEADER STICKY CON SOMBRA === */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}
