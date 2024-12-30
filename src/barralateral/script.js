import html from './sidebar.html';
import './styles.css';

export function initBarraLateral() {
  const barraLateral = document.createElement('div');
  barraLateral.id = 'barra-lateral-autoquizfillapp';

  const botonMostrarOcultar = document.createElement('button');
  botonMostrarOcultar.id = 'boton-mostrar-ocultar-autoquizfillapp';

  const iconFlecha = '<i class="fa-solid fa-angles-right"></i>';
  const iconFlechaRotada = '<i class="fa-solid fa-angles-right fa-rotate-180"></i>';
  botonMostrarOcultar.innerHTML = iconFlechaRotada;

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

// Exponer la función al objeto global para Tampermonkey
window.AutoQuizFillApp = {
  initBarraLateral,
};
