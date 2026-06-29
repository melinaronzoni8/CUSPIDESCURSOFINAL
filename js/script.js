/**
 * ==========================================================================
 * MOTOR FRONTEND EXCLUSIVO - CURSO INTEGRADOR
 * Controla de manera síncrona los canvas estelares y las revelaciones de scroll.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Inicializa la barra de progreso de lectura superior para esta landing
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const windowScrollTop = window.scrollY;
      const totalDocScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalDocScrollableHeight > 0) {
        const scrollPercentage = (windowScrollTop / totalDocScrollableHeight) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
      }
    });
  }

  // 2. Ejecuta el motor de revelación por Scroll (Intersection Observer)
  // Reutiliza la función global si ya se cargó script.js, de lo contrario monta un fallback nativo
  if (typeof initIntersectionObserverReveal === 'function') {
    initIntersectionObserverReveal();
  } else {
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const courseObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Una vez revelado, dejamos de observarlo para optimizar rendimiento
          courseObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    revealElements.forEach(el => courseObserver.observe(el));
  }

  // 3. Vincula los canvas independientes de la página con el motor dinámico de estrellas parpadeantes original
  if (typeof initStarCanvasBackground === 'function') {
    // Le damos un micro-delay para asegurar el correcto renderizado de las dimensiones del viewport
    setTimeout(() => {
      initStarCanvasBackground();
    }, 50);
  }
});
/**
 * ==========================================================================
 * EXTENSIÓN DE CONTROL PARA LA PÁGINA DEL CURSO INTEGRADOR
 * Ejecuta automáticamente las estrellas y observadores en la nueva vista.
 * ==========================================================================
 */

// Volvemos a escuchar el evento de carga para inicializar de forma segura los elementos específicos del curso
document.addEventListener('DOMContentLoaded', () => {
  
  // Si estamos dentro de la landing del curso, nos aseguramos de activar el fondo estelar en sus nuevos canvas
  if (document.body.classList.contains('landing-course')) {
    
    // Si la función nativa de estrellas existe en script.js, la llamamos con un leve retardo para evitar fallos de cálculo
    if (typeof initStarCanvasBackground === 'function') {
      setTimeout(() => {
        initStarCanvasBackground();
      }, 60);
    }

    // Ejecuta de inmediato el Intersection Observer para animar las 6 secciones nuevas con el efecto fade-in
    if (typeof initIntersectionObserverReveal === 'function') {
      initIntersectionObserverReveal();
    }
  }
});