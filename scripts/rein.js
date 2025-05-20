document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.15
    });
  
    faders.forEach(el => observer.observe(el));
  
    const accordions = document.querySelectorAll('.accordion-btn');
    accordions.forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = btn.nextElementSibling;
        const isOpen = panel.style.display === "block";
        document.querySelectorAll('.accordion-panel').forEach(p => p.style.display = 'none');
        if (!isOpen) panel.style.display = "block";
      });
    });
  });