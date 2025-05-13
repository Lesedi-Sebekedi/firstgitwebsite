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