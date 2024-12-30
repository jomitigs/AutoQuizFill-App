export function barraLateral_AutoQuizFillApp() {
  // Crear la barra lateral
  const barraLateral = document.createElement('div');
  barraLateral.id = 'barra-lateral-autoquizfillapp'; // ID único
  barraLateral.className = 'barra-lateral-autoquizfillapp'; // Clase única
  barraLateral.style.width = '27.5%'; // Ajuste del ancho a 27.5%
  barraLateral.style.minWidth = '350px'; // Ancho mínimo de 350px
  barraLateral.style.maxWidth = '500px'; // Ancho máximo de 500px
  barraLateral.style.height = '100%'; // Ocupa toda la altura de la ventana
  barraLateral.style.position = 'fixed';
  barraLateral.style.top = '0';
  barraLateral.style.left = '0';
  barraLateral.style.backgroundColor = '#ecf0f1';
  barraLateral.style.padding = '20px';
  barraLateral.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  barraLateral.style.zIndex = '9999';
  barraLateral.style.display = 'flex';
  barraLateral.style.flexDirection = 'column';
  barraLateral.style.alignItems = 'flex-start'; // Alinea el contenido a la izquierda
  barraLateral.style.overflowY = 'auto'; // Hacer el contenido desplazable si excede el tamaño
  barraLateral.style.scrollbarWidth = 'none'; // Ocultar barra de desplazamiento en Firefox

  // Ocultar la barra de desplazamiento en Webkit (Chrome, Safari, Edge)
  barraLateral.style.msOverflowStyle = 'none'; // Ocultar barra de desplazamiento en IE 10+
  barraLateral.style.overflowX = 'hidden'; // Evitar el desplazamiento horizontal innecesario

  // Crear el botón de mostrar/ocultar (todo tu código sigue igual)
  const botonMostrarOcultar = document.createElement('button');
  botonMostrarOcultar.id = 'boton-mostrar-ocultar-autoquizfillapp';
  botonMostrarOcultar.style.position = 'fixed';
  botonMostrarOcultar.style.top = '20px';
  botonMostrarOcultar.style.left = `calc(${barraLateral.style.minWidth} + 6%)`;
  botonMostrarOcultar.style.zIndex = '10000';
  botonMostrarOcultar.style.width = '40px';
  botonMostrarOcultar.style.height = '40px';
  botonMostrarOcultar.style.cursor = 'pointer';
  botonMostrarOcultar.style.border = 'none';
  botonMostrarOcultar.style.backgroundColor = '#3498db';
  botonMostrarOcultar.style.color = '#ffffff';
  botonMostrarOcultar.style.borderRadius = '5px';
  botonMostrarOcultar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
  botonMostrarOcultar.style.display = 'flex';
  botonMostrarOcultar.style.justifyContent = 'center';
  botonMostrarOcultar.style.alignItems = 'center';
  botonMostrarOcultar.style.fontSize = '18px';

  const iconFlecha = '<i class="fa-solid fa-angles-right"></i>'; // Icono de flecha derecha
  const iconFlechaRotada = '<i class="fa-solid fa-angles-right fa-rotate-180"></i>'; // Icono de flecha rotada
  botonMostrarOcultar.innerHTML = iconFlechaRotada;

  // Funciones para reposicionar el botón y ajustar el contenido
  function reposicionarBoton() {
      const barraWidth = barraLateral.getBoundingClientRect().width;
      botonMostrarOcultar.style.left = `calc(${barraWidth}px + 10px)`;
  }

  function ajustarContenidoPagina() {
      const barraWidth = barraLateral.getBoundingClientRect().width;
      const contenido = document.querySelector('body');
      contenido.style.marginLeft = `${barraWidth}px`;
      contenido.style.width = `calc(100% - ${barraWidth}px)`;
  }

  const resizeObserver = new ResizeObserver(() => {
      reposicionarBoton();
      ajustarContenidoPagina();
  });

  resizeObserver.observe(barraLateral);

  let isBarraVisible = false;

  botonMostrarOcultar.addEventListener('click', () => {
      if (isBarraVisible) {
          barraLateral.style.display = 'none';
          botonMostrarOcultar.innerHTML = iconFlecha;
          botonMostrarOcultar.style.left = '10px';
          document.querySelector('body').style.marginLeft = '0';
          document.querySelector('body').style.width = '100%';
          isBarraVisible = false;
      } else {
          barraLateral.style.display = 'flex';
          botonMostrarOcultar.innerHTML = iconFlechaRotada;
          reposicionarBoton();
          ajustarContenidoPagina();
          isBarraVisible = true;
      }
  });

  document.body.appendChild(barraLateral);
  document.body.appendChild(botonMostrarOcultar);

  ajustarContenidoPagina();

  return barraLateral;
}