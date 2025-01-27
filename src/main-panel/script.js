import './style.css';

import { opcionAutoQuiz_html } from '../opc-autofill-moodle/autoquiz.js';

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
    contenedorContenido.innerHTML = opcionAutoQuiz_html();
  
    panelHeader.appendChild(botonMenu);
    panelHeader.appendChild(tituloOpcion);
    contenedor.appendChild(panelHeader);
    contenedor.appendChild(contenedorContenido);
    barraLateral.appendChild(contenedor);
  
    setTimeout(() => {
      if (typeof opcionAutoQuiz_js === 'function') {
        opcionAutoQuiz_js();
      } else {
        console.warn('La función opcionAutoQuiz_js no está definida.');
      }
    }, 100);
    
  
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
  