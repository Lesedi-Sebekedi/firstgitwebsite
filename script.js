// Mobile nav toggle (safe-guarded)
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  if (navMenu) {
    navMenu.classList.toggle('show');
  }
}

// Close menu on link click (mobile UX)
document.addEventListener('click', (event) => {
  const target = event.target;
  if (target instanceof Element && target.closest('#navMenu a')) {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) navMenu.classList.remove('show');
  }
});

// Optional: light scroll-reveal (no heavy libs)
const revealElements = document.querySelectorAll('.section, .hero');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.06 });

revealElements.forEach((el) => io.observe(el));
