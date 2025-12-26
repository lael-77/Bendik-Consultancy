// Header shrink on scroll and mobile nav helpers
(function() {
  const header = document.querySelector('header');
  if (header) {
    header.classList.add('sticky');
    const onScroll = () => {
      if (window.scrollY > 10) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Smooth anchor scroll with header offset safety for same-page links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 6;
      window.scrollTo({ top, behavior: 'smooth' });
      if (history.pushState) history.pushState(null, '', hash);
    });
  });

  // Reveal-on-scroll using IntersectionObserver
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
    reveals.forEach(el => io.observe(el));
  } else {
    // Fallback
    reveals.forEach(el => el.classList.add('is-visible'));
  }


  // Scroll progress bar
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);
  const updateProgress = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
    const ratio = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = ratio + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  // Preloader (hides when page is loaded)
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('is-hidden'), 200);
    });
  }

  // Parallax backgrounds for elements with data-parallax
  const parallaxItems = Array.from(document.querySelectorAll('[data-parallax]'));
  if (!prefersReduced && parallaxItems.length) {
    const onParallax = () => {
      const vh = window.innerHeight;
      parallaxItems.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
        const rect = el.getBoundingClientRect();
        const visible = rect.top < vh && rect.bottom > 0;
        if (!visible) return;
        const translate = (rect.top - vh / 2) * speed;
        el.style.backgroundPosition = `center calc(50% + ${translate}px)`;
      });
    };
    window.addEventListener('scroll', onParallax, { passive: true });
    window.addEventListener('resize', onParallax);
    onParallax();
  }
})();

// Image Modal Functionality
function openImageModal(img) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  
  if (!modal) {
    console.error('Modal not found!');
    return;
  }
  
  modal.style.display = 'block';
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
  
  // Setup close button after modal is opened
  setupModalCloseButton();
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  if (!modal) {
    console.error('Modal not found when trying to close!');
    return;
  }
  
  modal.style.display = 'none';
  
  // Restore body scroll
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.addEventListener('click', function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target === modal) {
    closeImageModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeImageModal();
  }
});

// Close modal when clicking the X button
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('close-modal')) {
    event.preventDefault();
    event.stopPropagation();
    closeImageModal();
  }
});

// Alternative approach - direct event listener on close button
function setupModalCloseButton() {
  const closeBtn = document.querySelector('.close-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      closeImageModal();
    });
  }
}

// Setup close button when DOM is ready
document.addEventListener('DOMContentLoaded', setupModalCloseButton);


