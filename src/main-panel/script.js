import './style.css';

import { opcionAutoFillMoodle_html } from '../opc-autofill-moodle/script.js';
import { opcionConfig_html, opcionConfig_js } from '../opc-config/script.js'; // Asegúrate de importar las funciones de configuración
import { opcionConfigRuta_html, opcionConfigRuta_js } from '../opc-config-ruta/script.js';

// Exportación nombrada de la función para que pueda ser importada en otro script
export function panel_AutoFillQuizApp(barraLateral) {
  console.log('[AutoQuizFill] Creando main-panel');

  const contenedor = document.createElement('div');
  contenedor.id = 'panel-autofillquizapp';
  contenedor.classList.add('panel-autofillquizapp');
  contenedor.style.display = 'none';

  const panelHeader = document.createElement('div');
  panelHeader.classList.add('panel-header');

  const botonMenu = document.createElement('button');
  botonMenu.id = 'boton-hamburguesa-autofillquizapp';
  botonMenu.classList.add('boton-hamburguesa-autofillquizapp');
  botonMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';

  const tituloOpcion = document.createElement('span');
  tituloOpcion.id = 'titulo-autofillquizapp';
  tituloOpcion.classList.add('titulo-autofillquizapp');
  tituloOpcion.innerHTML = 'AutoFillQuiz App';

  const contenedorContenido = document.createElement('div');
  contenedorContenido.id = 'contenido-principal';
  contenedorContenido.classList.add('contenido-principal-autofillquizapp');

  // Obtener los valores de localStorage
  const configPlataforma = localStorage.getItem('ConfigPlataforma');
  const ultimoHtml = localStorage.getItem('ultimoHtml');
  const ultimoJs = localStorage.getItem('ultimoJs');

  // Función para cargar contenido por defecto (opcionConfig)
  function cargarOpcionConfig() {
    console.log('[AutoQuizFill] Cargando opcionConfig_html y opcionConfig_js.');
    contenedorContenido.innerHTML = opcionConfig_html();

    setTimeout(() => {
      if (typeof opcionConfig_js === 'function') {
        opcionConfig_js();
      } else {
        console.warn('La función opcionConfig_js no está definida.');
      }
    }, 100);
  }

  // Función para cargar AutoQuiz por defecto
  function cargarAutoFillMoodle() {
    console.log('[AutoQuizFill] Cargando autoquiz_html y autoquiz_js por defecto.');
    contenedorContenido.innerHTML = opcionAutoFillMoodle_html();

    setTimeout(() => {
      if (typeof opcionAutoQuiz_js === 'function') {
        opcionAutoFillMoodle_js();
      } else {
        console.warn('La función opcionAutoQuiz_js no está definida.');
      }
    }, 100);
  }

  // Función para cargar las últimas funciones almacenadas
  function cargarUltimasFunciones() {
    console.log('[AutoQuizFill] Cargando últimas funciones usadas desde localStorage.');

    // Mapeo de las posibles funciones HTML y JS
    const funcionesHtml = {
      'opcionConfigRuta_html': opcionConfigRuta_html,
      // Agrega aquí otras funciones HTML si es necesario
    };

    const funcionesJs = {
      'opcionConfigRuta_js': opcionConfigRuta_js,
      // Agrega aquí otras funciones JS si es necesario
    };

    // Obtener y establecer el HTML correspondiente
    const funcionHtml = funcionesHtml[ultimoHtml];
    if (funcionHtml) {
      contenedorContenido.innerHTML = funcionHtml();
    } else {
      console.warn(`La función HTML "${ultimoHtml}" no está definida.`);
      cargarAutoQuiz(); // Carga por defecto si no se encuentra
      return;
    }

    // Ejecutar la función JS correspondiente
    setTimeout(() => {
      const funcionJs = funcionesJs[ultimoJs];
      if (typeof funcionJs === 'function') {
        funcionJs();
      } else {
        console.warn(`La función JS "${ultimoJs}" no está definida.`);
      }
    }, 100);
  }

  // Lógica principal para determinar qué contenido cargar
  if (configPlataforma && ultimoHtml && ultimoJs) {
    // Caso 1: Existe ConfigPlataforma y existen ultimoHtml y ultimoJs
    cargarUltimasFunciones();
  } else if (!configPlataforma) {
    if (ultimoHtml && ultimoJs) {
      // Caso 2: No existe ConfigPlataforma pero existen ultimoHtml y ultimoJs
      // Según la descripción, también se carga opcionConfig
      cargarOpcionConfig();
    } else {
      // Caso 4: No existe ConfigPlataforma y no existen ultimoHtml y ultimoJs
      cargarOpcionConfig();
    }
  } else {
    // Caso 3: Existe ConfigPlataforma pero no existen ultimoHtml y ultimoJs
    cargarAutoFillMoodle();
  }


  panelHeader.appendChild(botonMenu);
  panelHeader.appendChild(tituloOpcion);
  contenedor.appendChild(panelHeader);
  contenedor.appendChild(contenedorContenido);
  barraLateral.appendChild(contenedor);

  botonMenu.addEventListener('click', () => {
    const menu = document.getElementById('menu-autofillquizapp');
    if (menu) {
      menu.style.display = 'flex';
    } else {
      console.error("El menú no se encontró en el DOM.");
    }
  });

  return contenedor;
}
