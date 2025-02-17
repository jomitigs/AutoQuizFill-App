// Importar el archivo HTML como cadena
import html from './index.html'; // Importa el contenido de index.html como una cadena

// Importar el CSS (PostCSS lo inyectará en el bundle)
import './style.css'; // Importa el archivo de estilos CSS

// Encapsular el código dentro de una IIFE
(function () {
  console.log('[AutoFillQuiz-App] Creando Interfaz.');

  // 1. Insertar el contenido HTML en el DOM
  document.body.insertAdjacentHTML('beforeend', html); // Inserta el HTML al final del body

  // 2. Buscar los elementos en el DOM que acabamos de inyectar
  const barraLateral = document.getElementById('barra-lateral-autoquizfillapp'); // Obtiene el elemento de la barra lateral
  const botonMostrarOcultar = document.getElementById('boton-mostrar-ocultar-autoquizfillapp'); // Obtiene el botón de mostrar/ocultar

  // 3. Verificar que existan
  if (!barraLateral || !botonMostrarOcultar) { // Verifica si los elementos existen
    console.error('initBarraLateral: Error: No se encontraron los elementos necesarios en el DOM.'); // Error si no se encuentran
    return; // Sale de la función
  }

  // Define los íconos para el botón
  const iconFlecha = '<i class="fa-solid fa-angles-right"></i>'; // Define el icono de flecha
  const iconFlechaRotada = '<i class="fa-solid fa-angles-right fa-rotate-180"></i>'; // Define el icono de flecha rotada

  // Leer el estado de la barra lateral desde localStorage
  const estadoBarra = localStorage.getItem('barraLateralVisible'); // Obtiene el estado guardado
  let isBarraVisible = estadoBarra === null ? true : estadoBarra === 'true'; // Define la visibilidad inicial

  const hideApp = localStorage.getItem('hideapp');

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

    if (hideApp === "true") {
      const btnAutoQuizFillApp = document.querySelector('#boton-mostrar-ocultar-autoquizfillapp');
      btnAutoQuizFillApp.style.display = 'none';
    }
  }

  // Función para reposicionar el botón en función del ancho de la barra lateral
  function reposicionarBoton() {
    const barraWidth = barraLateral.getBoundingClientRect().width;
    botonMostrarOcultar.style.left = `calc(${barraWidth}px + 10px)`;
  }

  // Función para ajustar el contenido de la página según el ancho de la barra lateral
  function ajustarContenidoPagina() {
    const barraWidth = barraLateral.getBoundingClientRect().width;
    const contenido = document.body; // Puedes usar document.body directamente
    contenido.style.marginLeft = `${barraWidth}px`;
    contenido.style.width = `calc(100% - ${barraWidth}px)`;
  }

  // Función para alternar la visibilidad de la barra lateral
  function alternarBarraLateral() {
    if (isBarraVisible) {
      barraLateral.style.display = 'none';
      botonMostrarOcultar.innerHTML = iconFlecha;
      botonMostrarOcultar.style.left = '10px';
      document.body.style.marginLeft = '0';
      document.body.style.width = '100%';
      isBarraVisible = false;
      localStorage.setItem('barraLateralVisible', 'false');
    } else {
      barraLateral.style.display = 'flex';
      botonMostrarOcultar.innerHTML = iconFlechaRotada;
      reposicionarBoton();
      ajustarContenidoPagina();
      isBarraVisible = true;
      localStorage.setItem('barraLateralVisible', 'true');
    }
  }

  // Observador de cambios en el tamaño de la barra lateral
  const resizeObserver = new ResizeObserver(() => {
    reposicionarBoton();
    ajustarContenidoPagina();
  });
  resizeObserver.observe(barraLateral);

  // Evento al hacer clic en el botón de mostrar/ocultar
  botonMostrarOcultar.addEventListener('click', () => {
    //console.log('botonMostrarOcultar: click detectado');
    alternarBarraLateral();
  });

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && (event.key === 'q' || event.key === 'Q')) {
      event.preventDefault();
      console.log('keydown: Ctrl + Q detectado');

      // Alterna la visibilidad de la barra lateral
      alternarBarraLateral();

      // Recupera el valor actualizado de 'barraLateralVisible' del localStorage
      const barraLateralVisible = localStorage.getItem('barraLateralVisible') === 'true';

      // Guarda en localStorage la variable 'hideapp' con el valor opuesto a barraLateralVisible
      localStorage.setItem('hideapp', (!barraLateralVisible).toString());

      // Selecciona el elemento que se desea mostrar u ocultar
      const btnAutoQuizFillApp = document.querySelector('#boton-mostrar-ocultar-autoquizfillapp');

      const botonAutoSave = localStorage.getItem("botonAutoSave") || "false";
      const hideApp = localStorage.getItem("hideapp") || "false";


      // Muestra u oculta el elemento según el valor de barraLateralVisible
      if (barraLateralVisible) {
        btnAutoQuizFillApp.style.display = 'block';

        if (botonAutoSave === "true" && window.location.href.includes('mod/quiz/summary.php') && hideApp === "false") {
          console.log("Condición cumplida, ejecutando crearBotonAutoSave()");
          crearBotonAutoSave();
        } else {
          console.log("Condición no cumplida, no se ejecuta crearBotonAutoSave()");
        }

      } else {
        btnAutoQuizFillApp.style.display = 'none';
        btnAutoSave.style.display = 'none';
      }


    }
  });



  // Ajusta el contenido de la página inicialmente si la barra está visible
  if (isBarraVisible) {
    ajustarContenidoPagina();
  }

  // Retorna la barra lateral si es necesario dentro del IIFE
  // Nota: Este valor no estará accesible fuera de la IIFE
  // Puedes eliminar esta línea si no la necesitas
  return barraLateral;
})();
