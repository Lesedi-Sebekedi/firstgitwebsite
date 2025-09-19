// Modern JavaScript with ES6+ features and performance optimizations
class WebsiteController {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupScrollAnimations();
    this.setupFormHandling();
    this.setupPerformanceOptimizations();
  }

  setupNavigation() {
    // Modern navigation toggle with better accessibility
    window.toggleMenu = () => {
      const menu = document.getElementById('navMenu');
      const btn = document.querySelector('.nav-toggle');
      const isExpanded = menu.classList.toggle('show');
      
      if (btn) {
        btn.setAttribute('aria-expanded', isExpanded.toString());
        btn.setAttribute('aria-label', isExpanded ? 'Close navigation menu' : 'Open navigation menu');
      }
    };

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const nav = document.querySelector('nav');
      const toggle = document.querySelector('.nav-toggle');
      
      if (!nav.contains(e.target) && window.innerWidth <= 768) {
        const menu = document.getElementById('navMenu');
        menu.classList.remove('show');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const menu = document.getElementById('navMenu');
        const toggle = document.querySelector('.nav-toggle');
        menu.classList.remove('show');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.focus();
        }
      }
    });

    // Close menu on link click (mobile UX)
    document.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest('#navMenu a')) {
        const navMenu = document.getElementById('navMenu');
        if (navMenu) navMenu.classList.remove('show');
      }
    });
  }

  setupScrollAnimations() {
    // Enhanced intersection observer with better performance
    const fadeInSections = document.querySelectorAll('section.fade-in');
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeInSections.forEach(section => observer.observe(section));

    // Throttled scroll handler for better performance
    this.throttledScrollHandler = this.throttle(this.handleScrollFade.bind(this), 16);
    window.addEventListener('scroll', this.throttledScrollHandler, { passive: true });
    window.addEventListener('load', this.handleScrollFade.bind(this));

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
  }

  setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    
    // Real-time validation with debouncing
    const inputs = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      message: document.getElementById('message')
    };

    Object.entries(inputs).forEach(([field, input]) => {
      if (input) {
        const debouncedValidation = this.debounce(() => {
          this.validateField(input, `${field}Error`, this.getValidationFunction(field));
        }, 300);
        
        input.addEventListener('input', debouncedValidation);
        input.addEventListener('blur', () => {
          this.validateField(input, `${field}Error`, this.getValidationFunction(field));
        });
      }
    });
  }

  setupPerformanceOptimizations() {
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Setup service worker for PWA features
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => console.log('SW registered'))
          .catch(error => console.log('SW registration failed'));
      });
    }
  }

  preloadCriticalResources() {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
  }

  // Utility functions
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  getValidationFunction(fieldName) {
    const validators = {
      name: this.validateName,
      email: this.validateEmail,
      message: this.validateMessage
    };
    return validators[fieldName] || (() => true);
  }

  // Instance methods
  handleScrollFade() {
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

  async handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validate all fields
    const nameValid = this.validateField(document.getElementById('name'), 'nameError', this.validateName);
    const emailValid = this.validateField(document.getElementById('email'), 'emailError', this.validateEmail);
    const messageValid = this.validateField(document.getElementById('message'), 'messageError', this.validateMessage);
    
    if (!nameValid || !emailValid || !messageValid) {
      return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
      // Enhanced form submission with better error handling
      await this.submitForm(formData);
      
      // Show success message
      form.reset();
      const successMessage = document.getElementById('successMessage');
      if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
      
      // Analytics tracking (if available)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'contact_form'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showErrorMessage('Sorry, there was an error sending your message. Please try again later.');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send';
    }
  }

  async submitForm(formData) {
    // Modern form submission with fetch API
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  validateField(field, errorElementId, validationFn) {
    const errorElement = document.getElementById(errorElementId);
    const isValid = validationFn(field.value);
    
    if (!isValid && field.value.length > 0) {
      field.classList.add('error');
      errorElement.textContent = this.getErrorMessage(field.id);
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

  validateName(name) {
    return name.trim().length >= 2;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  validateMessage(message) {
    return message.trim().length >= 10;
  }

  getErrorMessage(fieldId) {
    const messages = {
      name: 'Name must be at least 2 characters',
      email: 'Please enter a valid email address',
      message: 'Message must be at least 10 characters'
    };
    return messages[fieldId] || 'Invalid input';
  }

  showErrorMessage(message) {
    // Create a modern toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-error';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #e74c3c;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }
}

// PDF Download functionality
function downloadPDF() {
  // Check if we're on the resume page
  if (!window.location.pathname.includes('resume.html')) {
    return;
  }

  // Show options to user
  const options = confirm(
    'Choose download method:\n\n' +
    'OK = Print/Save as PDF (opens print dialog)\n' +
    'Cancel = Copy resume content to clipboard'
  );

  if (options) {
    // Method 1: Print to PDF
    downloadAsPrintPDF();
  } else {
    // Method 2: Copy to clipboard
    copyResumeToClipboard();
  }
}

function downloadAsPrintPDF() {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  // Get the resume content
  const resumeContent = document.querySelector('section.fade-in.content');
  
  if (!resumeContent) {
    alert('Resume content not found');
    return;
  }

  // Create the HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Lesedi Sebekedi - Curriculum Vitae</title>
      <style>
        body {
          font-family: 'Inter', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          color: #000;
          border-bottom: 3px solid #000;
          padding-bottom: 10px;
          margin-bottom: 30px;
        }
        h2 {
          color: #000;
          border-bottom: 2px solid #000;
          padding-bottom: 5px;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        h3 {
          color: #000;
          margin-bottom: 5px;
        }
        .experience-item, .skill-category, .reference, .contact-info {
          margin-bottom: 20px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        .contact-item {
          margin-bottom: 10px;
          padding: 5px 0;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
        }
        .contact-item:last-child {
          border-bottom: none;
        }
        .contact-item strong {
          min-width: 80px;
          font-weight: 600;
        }
        .date {
          color: #666;
          font-style: italic;
          margin-bottom: 10px;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-top: 15px;
        }
        .references {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        ul {
          margin-left: 20px;
        }
        li {
          margin-bottom: 5px;
        }
        a {
          color: #000;
          text-decoration: none;
        }
        @media print {
          body { margin: 0; padding: 15px; }
          .experience-item, .skill-category, .reference { 
            break-inside: avoid; 
            margin-bottom: 15px;
          }
        }
      </style>
    </head>
    <body>
      <h1>Lesedi Sebekedi - Curriculum Vitae</h1>
      ${resumeContent.innerHTML}
    </body>
    </html>
  `;

  // Write content to new window
  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Wait for content to load, then trigger print
  printWindow.onload = function() {
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };
}

function copyResumeToClipboard() {
  // Get the resume content
  const resumeContent = document.querySelector('section.fade-in.content');
  
  if (!resumeContent) {
    alert('Resume content not found');
    return;
  }

  // Create a clean text version
  const textContent = `
LESEDI SEBEKEDI - CURRICULUM VITAE
=====================================

${resumeContent.innerText}

---
Contact Information:
Name: Lesedi Sebekedi
Location: Makhubung Village, Mahikeng, South Africa
Phone: +27 67 953 5205
Email: lesedi.eirenic@gmail.com
LinkedIn: https://www.linkedin.com/in/lesedisebekedi
GitHub: https://github.com/Lesedi-Sebekedi
  `.trim();

  // Copy to clipboard
  navigator.clipboard.writeText(textContent).then(() => {
    alert('Resume content copied to clipboard! You can now paste it into any document.');
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Resume content copied to clipboard! You can now paste it into any document.');
  });
}

// Make downloadPDF globally available
window.downloadPDF = downloadPDF;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new WebsiteController();
});
