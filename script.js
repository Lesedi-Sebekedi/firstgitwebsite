// Toggle the mobile menu for responsive navigation
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  navMenu.classList.toggle("show");
}

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-fade').forEach(section => {
  observer.observe(section);
});

// Add floating cursor effect
document.addEventListener('mousemove', (e) => {
  const cursor = document.createElement('div');
  cursor.classList.add('cursor-trail');
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  document.body.appendChild(cursor);
  
  setTimeout(() => {
    cursor.remove();
  }, 1000);
});
