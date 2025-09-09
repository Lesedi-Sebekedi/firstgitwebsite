// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
  // Toggle Menu
  window.toggleMenu = () => {
    const menu = document.getElementById('navMenu');
    const btn = document.querySelector('.nav-toggle');
    const shown = menu.classList.toggle('show');
    if (btn) btn.setAttribute('aria-expanded', shown ? 'true' : 'false');
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

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add input event listeners for real-time validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (nameInput) nameInput.addEventListener('input', () => validateField(nameInput, 'nameError', validateName));
    if (emailInput) emailInput.addEventListener('input', () => validateField(emailInput, 'emailError', validateEmail));
    if (messageInput) messageInput.addEventListener('input', () => validateField(messageInput, 'messageError', validateMessage));
  }

  // Initial scroll fade check
  handleScrollFade();
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

// Form submission handler
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  
  // Validate all fields
  const nameValid = validateField(document.getElementById('name'), 'nameError', validateName);
  const emailValid = validateField(document.getElementById('email'), 'emailError', validateEmail);
  const messageValid = validateField(document.getElementById('message'), 'messageError', validateMessage);
  
  if (!nameValid || !emailValid || !messageValid) {
    return;
  }
  
  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  try {
    // Simulate form submission (replace with actual API call)
    await simulateFormSubmission(formData);
    
    // Show success message
    form.reset();
    document.getElementById('successMessage').style.display = 'block';
    
    // Scroll to success message
    document.getElementById('successMessage').scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  } catch (error) {
    alert('Sorry, there was an error sending your message. Please try again later.');
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
}

// Field validation functions
function validateField(field, errorElementId, validationFn) {
  const errorElement = document.getElementById(errorElementId);
  const isValid = validationFn(field.value);
  
  if (!isValid && field.value.length > 0) {
    field.classList.add('error');
    errorElement.textContent = getErrorMessage(field.id);
    return false;
  } else if (!isValid) {
    field.classList.add('error');
    errorElement.textContent = 'This field is required';
    return false;
  } else {
    field.classList.remove('error');
    errorElement.textContent = '';
    return true;
  }
}

function validateName(name) {
  return name.length >= 2;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateMessage(message) {
  return message.length >= 10;
}

function getErrorMessage(fieldId) {
  const messages = {
    name: 'Name must be at least 2 characters',
    email: 'Please enter a valid email address',
    message: 'Message must be at least 10 characters'
  };
  return messages[fieldId] || 'Invalid input';
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(formData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random success/failure for demo purposes
      Math.random() > 0.2 ? resolve() : reject();
    }, 1500);
  });
}

window.addEventListener('scroll', handleScrollFade);
window.addEventListener('load', handleScrollFade);