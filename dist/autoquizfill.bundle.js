var AutoQuizFillApp = (function (exports) {
  'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "#barra-lateral-autoquizfillapp {\r\n  width: 27.5%;\r\n  min-width: 350px;\r\n  max-width: 500px;\r\n  height: 100%;\r\n  position: fixed;\r\n  top: 0;\r\n  left: 0;\r\n  background-color: #ecf0f1;\r\n  padding: 20px;\r\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\r\n  z-index: 9999;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: flex-start;\r\n  overflow-y: auto;\r\n  scrollbar-width: none; /* Firefox */\r\n}\r\n\r\n#barra-lateral-autoquizfillapp::-webkit-scrollbar {\r\n  display: none; /* Chrome, Safari, Edge */\r\n}\r\n\r\n#boton-mostrar-ocultar-autoquizfillapp {\r\n  position: fixed;\r\n  top: 20px;\r\n  left: 375px; /* Ajusta según el ancho mínimo */\r\n  z-index: 10000;\r\n  width: 40px;\r\n  height: 40px;\r\n  cursor: pointer;\r\n  border: none;\r\n  background-color: #3498db;\r\n  color: #ffffff;\r\n  border-radius: 5px;\r\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  font-size: 18px;\r\n}\r\n\r\n.fa-solid {\r\n  font-family: FontAwesome;\r\n}\r\n\r\n";
  styleInject(css_248z);

  function initBarraLateral() {
    // Obtén la referencia a los elementos existentes en el DOM
    const barraLateral = document.getElementById('barra-lateral-autoquizfillapp');
    const botonMostrarOcultar = document.getElementById('boton-mostrar-ocultar-autoquizfillapp');

    // Verifica que los elementos existan antes de continuar
    if (!barraLateral || !botonMostrarOcultar) {
        console.error('Error: No se encontraron los elementos necesarios en el DOM.');
        return;
    }

    // Define los íconos para el botón
    const iconFlecha = '<i class="fa-solid fa-angles-right"></i>'; // Flecha hacia la derecha
    const iconFlechaRotada = '<i class="fa-solid fa-angles-right fa-rotate-180"></i>'; // Flecha rotada hacia la izquierda
    botonMostrarOcultar.innerHTML = iconFlechaRotada; // Inicializa el botón con la flecha rotada

    // Función para reposicionar el botón en función del ancho de la barra lateral
    function reposicionarBoton() {
        const barraWidth = barraLateral.getBoundingClientRect().width; // Obtiene el ancho de la barra lateral
        botonMostrarOcultar.style.left = `calc(${barraWidth}px + 10px)`; // Posiciona el botón a la derecha de la barra lateral
    }

    // Función para ajustar el contenido de la página según el ancho de la barra lateral
    function ajustarContenidoPagina() {
        const barraWidth = barraLateral.getBoundingClientRect().width; // Obtiene el ancho de la barra lateral
        const contenido = document.querySelector('body'); // Selecciona el cuerpo de la página
        contenido.style.marginLeft = `${barraWidth}px`; // Ajusta el margen izquierdo para no superponer la barra lateral
        contenido.style.width = `calc(100% - ${barraWidth}px)`; // Ajusta el ancho del contenido para ocupar el espacio restante
    }

    // Observador de cambios en el tamaño de la barra lateral
    const resizeObserver = new ResizeObserver(() => {
        reposicionarBoton(); // Reposiciona el botón si cambia el tamaño de la barra lateral
        ajustarContenidoPagina(); // Ajusta el contenido de la página si cambia el tamaño de la barra lateral
    });

    resizeObserver.observe(barraLateral); // Activa el observador sobre la barra lateral

    // Variable para rastrear si la barra lateral está visible o no
    let isBarraVisible = false;

    // Evento al hacer clic en el botón de mostrar/ocultar
    botonMostrarOcultar.addEventListener('click', () => {
        if (isBarraVisible) { // Si la barra lateral está visible
            barraLateral.style.display = 'none'; // Oculta la barra lateral
            botonMostrarOcultar.innerHTML = iconFlecha; // Cambia el icono del botón
            botonMostrarOcultar.style.left = '10px'; // Reposiciona el botón
            document.querySelector('body').style.marginLeft = '0'; // Restaura el margen del cuerpo
            document.querySelector('body').style.width = '100%'; // Restaura el ancho del cuerpo
            isBarraVisible = false; // Actualiza el estado
        } else { // Si la barra lateral no está visible
            barraLateral.style.display = 'flex'; // Muestra la barra lateral
            botonMostrarOcultar.innerHTML = iconFlechaRotada; // Cambia el icono del botón
            reposicionarBoton(); // Reposiciona el botón
            ajustarContenidoPagina(); // Ajusta el contenido de la página
            isBarraVisible = true; // Actualiza el estado
        }
    });

    // Ajusta el contenido de la página inicialmente
    ajustarContenidoPagina();

    return barraLateral; // Devuelve la barra lateral para que pueda ser manipulada desde fuera de esta función
  }

  // Exponer la función al objeto global para Tampermonkey
  window.AutoQuizFillApp = {
    initBarraLateral,
  };

  exports.initBarraLateral = initBarraLateral;

  return exports;

})({});
