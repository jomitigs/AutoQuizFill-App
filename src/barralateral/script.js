import html from './sidebar.html';
import './styles.css';

export function initBarraLateral() {
  // Inserta el HTML cargado en el documento
  const container = document.createElement('div');
  container.innerHTML = html;
  document.body.appendChild(container);

  const barraLateral = document.getElementById('barra-lateral-autoquizfillapp');
  const botonMostrarOcultar = document.getElementById('boton-mostrar-ocultar-autoquizfillapp');

  let isBarraVisible = true;

  botonMostrarOcultar.addEventListener('click', () => {
    if (isBarraVisible) {
      barraLateral.style.display = 'none';
      botonMostrarOcultar.textContent = '→';
      isBarraVisible = false;
    } else {
      barraLateral.style.display = 'flex';
      botonMostrarOcultar.textContent = '←';
      isBarraVisible = true;
    }
  });
}

// Exponer la función al objeto global para Tampermonkey
window.AutoQuizFillApp = {
  initBarraLateral,
};
