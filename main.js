// ===== TaxiGo - Main Script =====

document.addEventListener('DOMContentLoaded', function () {

  // 1. HAMBURGER MENU
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });
  }

  // 2. DROPDOWN MENU (mobile click toggle)
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (navMenu && hamburger && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });

  // 3. SCROLL REVEAL
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // 4. ANIMATED COUNTERS
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // 5. STICKY NAVBAR SCROLL CLASS
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // 6. SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 7. ACTIVE NAV LINK
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 8. FLEET FILTER TABS
  const filterBtns = document.querySelectorAll('.filter-btn');
  const fleetCards = document.querySelectorAll('.fleet-card');

  if (filterBtns.length && fleetCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');

        fleetCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-type') === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.4s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 9. PRICING TOGGLE
  const pricingToggle = document.getElementById('pricingToggle');
  const monthlyPrices = document.querySelectorAll('.price-monthly');
  const annualPrices = document.querySelectorAll('.price-annual');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', function () {
      if (this.checked) {
        monthlyPrices.forEach(el => el.style.display = 'none');
        annualPrices.forEach(el => el.style.display = 'block');
      } else {
        monthlyPrices.forEach(el => el.style.display = 'block');
        annualPrices.forEach(el => el.style.display = 'none');
      }
    });
  }

  // 10. FORM VALIDATION (contact + booking)
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        const errEl = document.getElementById(field.name + '-error');
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('input-error');
          if (errEl) errEl.textContent = 'This field is required.';
        } else {
          field.classList.remove('input-error');
          if (errEl) errEl.textContent = '';
        }
      });

      const emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errEl = document.getElementById(emailField.name + '-error');
        if (!emailRegex.test(emailField.value.trim())) {
          valid = false;
          emailField.classList.add('input-error');
          if (errEl) errEl.textContent = 'Please enter a valid email.';
        }
      }

      if (valid) {
        const successMsg = form.querySelector('.form-success');
        if (successMsg) {
          successMsg.style.display = 'block';
          form.reset();
          setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
        }
      }
    });

    // Live validation
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', function () {
        if (this.value.trim()) {
          this.classList.remove('input-error');
          const errEl = document.getElementById(this.name + '-error');
          if (errEl) errEl.textContent = '';
        }
      });
    });
  });

  // BOOKING STEPS
  const stepBtns = document.querySelectorAll('.step-btn');
  const steps = document.querySelectorAll('.booking-step');
  const stepIndicators = document.querySelectorAll('.step-indicator');

  if (stepBtns.length && steps.length) {
    stepBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const target = parseInt(this.getAttribute('data-step'));
        steps.forEach((step, idx) => {
          step.style.display = idx + 1 === target ? 'block' : 'none';
        });
        stepIndicators.forEach((ind, idx) => {
          ind.classList.toggle('active', idx + 1 === target);
          ind.classList.toggle('done', idx + 1 < target);
        });
      });
    });
  }

  // DISTANCE CALCULATOR
  const calcBtn = document.getElementById('calcBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', function () {
      const km = parseFloat(document.getElementById('calcKm').value);
      if (isNaN(km) || km <= 0) return;

      const rates = { Sedan: 2.5, SUV: 3.5, Luxury: 5.0, Van: 4.0 };
      const resultDiv = document.getElementById('calcResult');
      if (resultDiv) {
        let html = '<div class="calc-results">';
        for (const [type, rate] of Object.entries(rates)) {
          const base = 5;
          const total = (base + km * rate).toFixed(2);
          html += `<div class="calc-item"><span>${type}</span><span>$${total}</span></div>`;
        }
        html += '</div>';
        resultDiv.innerHTML = html;
        resultDiv.style.display = 'block';
      }
    });
  }

  // HOME2 TESTIMONIAL SLIDER
  let currentSlide = 0;
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dot');

  function showSlide(n) {
    slides.forEach((slide, i) => {
      slide.style.display = i === n ? 'block' : 'none';
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === n);
    });
  }

  if (slides.length) {
    showSlide(0);
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 4000);

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentSlide = i;
        showSlide(i);
      });
    });
  }

});

// CSS animation
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.input-error {
  border-color: #e53e3e !important;
  box-shadow: 0 0 0 3px rgba(229,62,62,0.15) !important;
}
`;
document.head.appendChild(style);
