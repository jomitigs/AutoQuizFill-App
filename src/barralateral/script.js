import html from './index.html';
console.log('Contenido del HTML:', html);

import './style.css';

export function initBarraLateral() {
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
