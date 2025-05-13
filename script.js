document.addEventListener('DOMContentLoaded', () => {
    // Toggle Menu
    window.toggleMenu = () => {
      document.getElementById('navMenu').classList.toggle('show');
    };
  
    // Scroll Reveal for sections
    const fadeInSections = document.querySelectorAll('section.fade-in');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    fadeInSections.forEach(section => observer.observe(section));
  });

  function handleScrollFade() {
    const elements = document.querySelectorAll('.scroll-fade');
    const triggerBottom = window.innerHeight * 0.85;
  
    elements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      const boxBottom = el.getBoundingClientRect().bottom;
  
      if (boxTop < triggerBottom && boxBottom > 0) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    });
  }
  
  window.addEventListener('scroll', handleScrollFade);
  window.addEventListener('load', handleScrollFade);
  