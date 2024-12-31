// Importar el archivo HTML como cadena
import html from './index.html';

// Importar el CSS (PostCSS lo inyectará en el bundle)
import './style.css';

// Función para inicializar la barra lateral
export function initBarraLateral() {
  console.log('initBarraLateral: Iniciando barra lateral...');
  
  // 1. Insertar el contenido HTML en el DOM
  console.log('initBarraLateral: Insertando HTML en el DOM...');
  document.body.insertAdjacentHTML('beforeend', html);

  // 2. Buscar los elementos en el DOM que acabamos de inyectar
  console.log('initBarraLateral: Buscando elementos con getElementById...');
  const barraLateral = document.getElementById('barra-lateral-autoquizfillapp');
  const botonMostrarOcultar = document.getElementById('boton-mostrar-ocultar-autoquizfillapp');

  // 3. Verificar que existan
  if (!barraLateral || !botonMostrarOcultar) {
    console.error('initBarraLateral: Error: No se encontraron los elementos necesarios en el DOM.');
    return;
  } else {
    console.log('initBarraLateral: Elementos encontrados correctamente');
  }

  // Define los íconos para el botón
  const iconFlecha = '<i class="fa-solid fa-angles-right"></i>'; 
  const iconFlechaRotada = '<i class="fa-solid fa-angles-right fa-rotate-180"></i>'; 
  botonMostrarOcultar.innerHTML = iconFlechaRotada;

  // Función para reposicionar el botón en función del ancho de la barra lateral
  function reposicionarBoton() {
    const barraWidth = barraLateral.getBoundingClientRect().width;
    botonMostrarOcultar.style.left = `calc(${barraWidth}px + 10px)`;
    console.log(`reposicionarBoton: Botón posicionado a ${botonMostrarOcultar.style.left}`);
  }

  // Función para ajustar el contenido de la página según el ancho de la barra lateral
  function ajustarContenidoPagina() {
    const barraWidth = barraLateral.getBoundingClientRect().width;
    const contenido = document.querySelector('body');
    contenido.style.marginLeft = `${barraWidth}px`;
    contenido.style.width = `calc(100% - ${barraWidth}px)`;
    console.log(`ajustarContenidoPagina: Ajustando margenLeft a ${barraWidth}px y ancho a calc(100% - ${barraWidth}px)`);
  }

  // Observador de cambios en el tamaño de la barra lateral
  const resizeObserver = new ResizeObserver(() => {
    console.log('resizeObserver: Cambio de tamaño detectado');
    reposicionarBoton();
    ajustarContenidoPagina();
  });
  resizeObserver.observe(barraLateral);

  // Variable para rastrear si la barra lateral está visible o no
  let isBarraVisible = false;

  // Evento al hacer clic en el botón de mostrar/ocultar
  botonMostrarOcultar.addEventListener('click', () => {
    console.log('botonMostrarOcultar: click detectado');
    if (isBarraVisible) {
      console.log('botonMostrarOcultar: Ocultando barra lateral');
      barraLateral.style.display = 'none';
      botonMostrarOcultar.innerHTML = iconFlecha;
      botonMostrarOcultar.style.left = '10px';
      document.body.style.marginLeft = '0';
      document.body.style.width = '100%';
      isBarraVisible = false;
    } else {
      console.log('botonMostrarOcultar: Mostrando barra lateral');
      barraLateral.style.display = 'flex';
      botonMostrarOcultar.innerHTML = iconFlechaRotada;
      reposicionarBoton();
      ajustarContenidoPagina();
      isBarraVisible = true;
    }
  });

  // Ajusta el contenido de la página inicialmente
  console.log('initBarraLateral: Ajuste inicial del contenido');
  ajustarContenidoPagina();

  // Retorna la barra lateral por si necesitas manipularla externamente
  return barraLateral;
}

// Exponer la función al objeto global (ej. Tampermonkey)
window.AutoQuizFillApp = {
  initBarraLateral,
};
