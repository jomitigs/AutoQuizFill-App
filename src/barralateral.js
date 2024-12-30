export function barraLateral_AutoQuizFillApp() {
    // Cargar el archivo CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://raw.githubusercontent.com/jomitigs/repositorio/main/src/barralateral/styles.css'; // URL pública
    document.head.appendChild(link);
  
    // Cargar el archivo HTML
    fetch('https://raw.githubusercontent.com/tuusuario/repositorio/main/src/barralateral/sidebar.html') // URL pública
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar el archivo HTML: ' + response.status);
        }
        return response.text();
      })
      .then((html) => {
        // Insertar el HTML en el body
        const template = document.createElement('div');
        template.innerHTML = html;
        document.body.appendChild(template);
  
        // Lógica de interacción
        const barraLateral = document.getElementById('barra-lateral-autoquizfillapp');
        const botonMostrarOcultar = document.getElementById('boton-mostrar-ocultar-autoquizfillapp');
  
        let isBarraVisible = true;
  
        botonMostrarOcultar.addEventListener('click', () => {
          if (isBarraVisible) {
            barraLateral.style.display = 'none';
            botonMostrarOcultar.innerHTML = '<i class="fa-solid fa-angles-right"></i>';
            isBarraVisible = false;
          } else {
            barraLateral.style.display = 'flex';
            botonMostrarOcultar.innerHTML = '<i class="fa-solid fa-angles-right fa-rotate-180"></i>';
            isBarraVisible = true;
          }
        });
      })
      .catch((error) => {
        console.error('Error al cargar los recursos:', error);
      });
  }
  
  // Exponer la función al objeto global
  window.AutoQuizFillApp = {
    barraLateral_AutoQuizFillApp,
  };
  