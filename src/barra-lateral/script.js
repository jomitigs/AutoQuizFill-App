// Importar el archivo HTML como cadena
import html from './index.html'; // Importa el contenido de index.html como una cadena

// Importar el CSS (PostCSS lo inyectará en el bundle)
import './style.css'; // Importa el archivo de estilos CSS

// Función para inicializar la barra lateral
export function initBarraLateral() { // Exporta la función initBarraLateral
  console.log('initBarraLateral: Iniciando barra lateral...'); // Log de inicio

  // 1. Insertar el contenido HTML en el DOM
  console.log('initBarraLateral: Insertando HTML en el DOM...'); // Log de inserción HTML
  document.body.insertAdjacentHTML('beforeend', html); // Inserta el HTML al final del body

  // 2. Buscar los elementos en el DOM que acabamos de inyectar
  console.log('initBarraLateral: Buscando elementos con getElementById...'); // Log de búsqueda de elementos
  const barraLateral = document.getElementById('barra-lateral-autoquizfillapp'); // Obtiene el elemento de la barra lateral
  const botonMostrarOcultar = document.getElementById('boton-mostrar-ocultar-autoquizfillapp'); // Obtiene el botón de mostrar/ocultar

  // 3. Verificar que existan
  if (!barraLateral || !botonMostrarOcultar) { // Verifica si los elementos existen
    console.error('initBarraLateral: Error: No se encontraron los elementos necesarios en el DOM.'); // Error si no se encuentran
    return; // Sale de la función
  } else {
    console.log('initBarraLateral: Elementos encontrados correctamente'); // Log de éxito en la búsqueda
  }

  // Define los íconos para el botón
  const iconFlecha = '<i class="fa-solid fa-angles-right"></i>'; // Define el icono de flecha
  const iconFlechaRotada = '<i class="fa-solid fa-angles-right fa-rotate-180"></i>'; // Define el icono de flecha rotada

  // Leer el estado de la barra lateral desde localStorage
  const estadoBarra = localStorage.getItem('barraLateralVisible'); // Obtiene el estado guardado
  let isBarraVisible = estadoBarra === null ? true : estadoBarra === 'true'; // Define la visibilidad inicial

  // Aplicar el estado inicial de la barra lateral
  if (isBarraVisible) { // Si la barra está visible
    barraLateral.style.display = 'flex'; // Muestra la barra lateral
    botonMostrarOcultar.innerHTML = iconFlechaRotada; // Asigna el icono rotado al botón
  } else { // Si la barra está oculta
    barraLateral.style.display = 'none'; // Oculta la barra lateral
    botonMostrarOcultar.innerHTML = iconFlecha; // Asigna el icono normal al botón
    botonMostrarOcultar.style.left = '10px'; // Posiciona el botón
    document.body.style.marginLeft = '0'; // Resetea el margen izquierdo del body
    document.body.style.width = '100%'; // Resetea el ancho del body
  }

  // Función para reposicionar el botón en función del ancho de la barra lateral
  function reposicionarBoton() { // Define la función reposicionarBoton
    const barraWidth = barraLateral.getBoundingClientRect().width; // Obtiene el ancho de la barra lateral
    botonMostrarOcultar.style.left = `calc(${barraWidth}px + 10px)`; // Calcula y asigna la posición izquierda del botón
    console.log(`reposicionarBoton: Botón posicionado a ${botonMostrarOcultar.style.left}`); // Log de la nueva posición
  }

  // Función para ajustar el contenido de la página según el ancho de la barra lateral
  function ajustarContenidoPagina() { // Define la función ajustarContenidoPagina
    const barraWidth = barraLateral.getBoundingClientRect().width; // Obtiene el ancho de la barra lateral
    const contenido = document.querySelector('body'); // Selecciona el elemento body
    contenido.style.marginLeft = `${barraWidth}px`; // Ajusta el margen izquierdo del contenido
    contenido.style.width = `calc(100% - ${barraWidth}px)`; // Ajusta el ancho del contenido
    console.log(`ajustarContenidoPagina: Ajustando margenLeft a ${barraWidth}px y ancho a calc(100% - ${barraWidth}px)`); // Log de los ajustes
  }

  // Función para alternar la visibilidad de la barra lateral
  function alternarBarraLateral() { // Define la función alternarBarraLateral
    console.log('alternarBarraLateral: Alternando visibilidad de la barra lateral'); // Log de alternancia
    if (isBarraVisible) { // Si la barra está visible
      console.log('alternarBarraLateral: Ocultando barra lateral'); // Log de ocultar
      barraLateral.style.display = 'none'; // Oculta la barra lateral
      botonMostrarOcultar.innerHTML = iconFlecha; // Cambia el icono del botón
      botonMostrarOcultar.style.left = '10px'; // Reposiciona el botón
      document.body.style.marginLeft = '0'; // Resetea el margen izquierdo del body
      document.body.style.width = '100%'; // Resetea el ancho del body
      isBarraVisible = false; // Actualiza el estado de visibilidad
      localStorage.setItem('barraLateralVisible', 'false'); // Guarda el estado en localStorage
    } else { // Si la barra no está visible
      console.log('alternarBarraLateral: Mostrando barra lateral'); // Log de mostrar
      barraLateral.style.display = 'flex'; // Muestra la barra lateral
      botonMostrarOcultar.innerHTML = iconFlechaRotada; // Cambia el icono del botón
      reposicionarBoton(); // Reposiciona el botón
      ajustarContenidoPagina(); // Ajusta el contenido de la página
      isBarraVisible = true; // Actualiza el estado de visibilidad
      localStorage.setItem('barraLateralVisible', 'true'); // Guarda el estado en localStorage
    }
  }

  // Observador de cambios en el tamaño de la barra lateral
  const resizeObserver = new ResizeObserver(() => { // Crea un nuevo ResizeObserver
    console.log('resizeObserver: Cambio de tamaño detectado'); // Log de cambio de tamaño
    reposicionarBoton(); // Reposiciona el botón
    ajustarContenidoPagina(); // Ajusta el contenido de la página
  });
  resizeObserver.observe(barraLateral); // Observa cambios en la barra lateral

  // Evento al hacer clic en el botón de mostrar/ocultar
  botonMostrarOcultar.addEventListener('click', () => { // Añade un listener de click al botón
    console.log('botonMostrarOcultar: click detectado'); // Log del click
    alternarBarraLateral(); // Llama a la función para alternar la barra lateral
  });

  // Evento para detectar la combinación de teclas Ctrl + Q
  document.addEventListener('keydown', (event) => { // Añade un listener de keydown al documento
    if (event.ctrlKey && (event.key === 'q' || event.key === 'Q')) { // Verifica si se presionan Ctrl + Q
      event.preventDefault(); // Previene la acción por defecto (si aplica)
      console.log('keydown: Ctrl + Q detectado'); // Log de detección de atajo
      alternarBarraLateral(); // Llama a la función para alternar la barra lateral
    }
  });

  // Ajusta el contenido de la página inicialmente si la barra está visible
  if (isBarraVisible) { // Si la barra está visible
    console.log('initBarraLateral: Ajuste inicial del contenido'); // Log de ajuste inicial
    ajustarContenidoPagina(); // Realiza el ajuste inicial
  }

  // Retorna la barra lateral por si necesitas manipularla externamente
  return barraLateral; // Retorna el elemento de la barra lateral
}

// Exponer la función al objeto global (ej. Tampermonkey)
window.AutoQuizFillApp = { // Asigna el objeto AutoQuizFillApp al window global
  initBarraLateral, // Exponiendo la función initBarraLateral
};
