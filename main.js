document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 3. Scroll-Driven Reveal Fallback (for Firefox & older browsers)
  // ==========================================================================
  const initScrollFallback = () => {
    const supportsCSSScroll = CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!supportsCSSScroll && !prefersReducedMotion) {
      // Elements that have native CSS scroll timelines in style.css
      const revealTargets = document.querySelectorAll('.product-card, .visual-card, .about-text-content, .contact-box');
      
      // Initialize fallback state (hidden)
      revealTargets.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      });

      // Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Stop observing once animated in
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      });

      revealTargets.forEach(el => observer.observe(el));
    }
  };

  // Initialize all features
  initScrollFallback();
});
