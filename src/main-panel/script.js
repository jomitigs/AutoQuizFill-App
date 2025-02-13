import './style.css';

import { opcion_AutoFillAutoSave_Moodle_html, opcion_AutoFillAutoSave_Moodle_js } from '../opc-autofill-autosave-moodle/main-script.js';
import { opcion_AutoFillAutoSave_Altissia_html, opcion_AutoFillAutoSave_Altissia_js } from '../opc-autofill-autosave-altissia/main-script.js';

import { opcionConfig_html, opcionConfig_js } from '../opc-config/script.js'; // Asegúrate de importar las funciones de configuración
import { opcionConfigRuta_html, opcionConfigRuta_js } from '../opc-config-ruta/script.js';

// Exportación nombrada de la función para que pueda ser importada en otro script
export function panel_AutoFillQuizApp(barraLateral) {
  console.log('[AutoFillQuiz-App] Creando Panel Principal.');

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
    console.log('[AutoFillQuiz-App] Iniciando Configuración.');
    localStorage.setItem('ultimoHtml', 'opcionConfig_html');
    localStorage.setItem('ultimoJs', 'opcionConfig_js');

    contenedorContenido.innerHTML = opcionConfig_html();

    setTimeout(() => {
      if (typeof opcionConfig_js === 'function') {
        opcionConfig_js();
      } else {
        console.warn('La función opcionConfig_js no está definida.');
      }
    }, 100);
  }

  // Función para cargar AutoFillMoodle por defecto
  function cargarAutoFillMoodle() {
    console.log('[main-panel] Cargando AutoFill Moodle.');
    
    if (opcion_AutoFillAutoSave_Moodle_html) {
      try {
        contenedorContenido.innerHTML = opcion_AutoFillAutoSave_Moodle_html();
        console.log('[main-panel] HTML cargado exitosamente.');
      } catch (error) {
        console.error('[main-panel] Error al ejecutar la función HTML:', error);
        return;
      }
    } else {
      console.error('[main-panel] La función HTML "opcion_AutoFillAutoSave_Moodle_html" no está definida.');
      return;
    }
    
    // Ejecutar la función JS correspondiente
    setTimeout(() => {
      if (typeof opcion_AutoFillAutoSave_Moodle_js === 'function') {
        try {
          opcion_AutoFillAutoSave_Moodle_js();
          // console.log('[main-panel] JS ejecutada exitosamente.');
        } catch (error) {
          console.error('[main-panel] Error al ejecutar la función JS:', error);
        }
      } else {
        console.warn('[main-panel] La función JS "opcion_AutoFillAutoSave_Moodle_js" no está definida.');
      }
    }, 100);
  }

  // Función para cargar las últimas funciones almacenadas
  function cargarUltimasFunciones() {

    // Obtener las últimas funciones almacenadas en localStorage
    const ultimoHtml = localStorage.getItem('ultimoHtml');
    const ultimoJs = localStorage.getItem('ultimoJs');

    // Verificar que las variables se hayan obtenido correctamente
    if (!ultimoHtml || !ultimoJs) {
      console.warn('[AutoQuizFill] No se encontraron las últimas funciones en localStorage.');
      return;
    }

    // Mapeo de las posibles funciones HTML y JS
    const funcionesHtml = {
      'opcionConfigRuta_html': opcionConfigRuta_html,
      'opcion_AutoFillAutoSave_Moodle_html': opcion_AutoFillAutoSave_Moodle_html, 
      'opcion_AutoFillAutoSave_Altissia_html': opcion_AutoFillAutoSave_Altissia_html, 
      'opcionConfig_html': opcionConfig_html  
    };

    const funcionesJs = {
      'opcionConfigRuta_js': opcionConfigRuta_js,
      'opcion_AutoFillAutoSave_Moodle_js': opcion_AutoFillAutoSave_Moodle_js, 
      'opcion_AutoFillAutoSave_Altissia_js': opcion_AutoFillAutoSave_Altissia_js,  
      'opcionConfig_js': opcionConfig_js 
    };

    // Obtener y establecer el HTML correspondiente
    const funcionHtml = funcionesHtml[ultimoHtml];
    // console.log(`[AutoQuizFill] Función HTML seleccionada: "${ultimoHtml}"`);

    let opcionfuncionHtml = `${ultimoJs}_aplit`.split('_')[0];

    if (funcionHtml) {
      try {
        contenedorContenido.innerHTML = funcionHtml();
        console.log('[main-panel] HTML cargado exitosamente.');
      } catch (error) {
        console.error('[main-panel] Error al ejecutar la función HTML:', error);
        return;
      }
    } else {
      console.error(`[main-panel] La función HTML "${opcionfuncionHtml}" no está definida.`);
      return;
    }

    // Ejecutar la función JS correspondiente
    setTimeout(() => {
      const funcionJs = funcionesJs[ultimoJs];
      if (typeof funcionJs === 'function') {
        try {
          funcionJs();
          // console.log('[main-panel] JS ejecutada exitosamente.');
        } catch (error) {
          console.error('[main-panel] Error al ejecutar la función JS:', error);
        }
      } else {
        console.warn(`[main-panel] La función JS "${ultimoJs}" no está definida.`);
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

    if (configPlataforma === "Moodle") {
      cargarAutoFillMoodle(); // Ejecuta la función específica para Moodle
    } else if (configPlataforma === "Altissia") {
      // cargarAutoFillAltissia(); // Ejecuta la función específica para Altissia
    } else {
      console.log("Plataforma no soportada");
    }
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
