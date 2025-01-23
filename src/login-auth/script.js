import './style.css';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { autenticacion } from '../config-firebase/script.js';

const ID_BARRA_LATERAL = 'barra-lateral-autoquizfillapp';
const ID_LOGIN_CONTENEDOR = 'login-autoquizfillapp';
const ID_PANEL_CONTENEDOR = 'panel-autofillquizapp';
const ID_FORM_FAKE = 'fake-form';

console.log('[AutoQuizFill] Script cargado.');

function toggleElementById(elementId, show) {
  const el = document.getElementById(elementId);
  if (el) el.style.display = show ? 'block' : 'none';
}

function mostrarError(mensaje) {
  console.error(`[AutoQuizFill] ${mensaje}`);
  alert(`Error en inicio de sesión: ${mensaje}`);
}

function crearFormularioLogin(barraLateral) {
  const loginAutoFillQuizApp = document.createElement('div');
  loginAutoFillQuizApp.id = ID_LOGIN_CONTENEDOR;
  loginAutoFillQuizApp.style.display = 'none';

  loginAutoFillQuizApp.innerHTML = `
    <div class="contenedor-login-autoquizfillapp">
      <div class="contenedor-titulo-autoquizfillapp">
        <h2 class="title-login-autoquizfillapp">AutoQuizFill App</h2>
      </div>
      <div class="contenedor-inputs-autoquizfillapp">
        <input 
          type="email" 
          id="login-correo-autoquizfillapp" 
          class="login-entrada-autoquizfillapp" 
          placeholder="Correo electrónico"
          autocomplete="email" 
          form="${ID_FORM_FAKE}" 
          required
        >
        <input 
          type="password" 
          id="login-contrasena-autoquizfillapp" 
          class="login-entrada-autoquizfillapp" 
          placeholder="Contraseña"
          autocomplete="current-password" 
          form="${ID_FORM_FAKE}" 
          required
        >
      </div>
      <div class="contenedor-boton-autoquizfillapp">
        <button 
          id="login-boton-autoquizfillapp" 
          class="login-boton-autoquizfillapp"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
    <form id="${ID_FORM_FAKE}" style="display: none;"></form>
  `;

  barraLateral.appendChild(loginAutoFillQuizApp);

  const inputCorreo = document.getElementById('login-correo-autoquizfillapp');
  const inputContrasena = document.getElementById('login-contrasena-autoquizfillapp');
  const botonLogin = document.getElementById('login-boton-autoquizfillapp');

  const iniciarSesionHandler = () => iniciarSesionAutoQuiz(inputCorreo.value, inputContrasena.value);
  
  inputContrasena.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') iniciarSesionHandler();
  });
  botonLogin.addEventListener('click', iniciarSesionHandler);
}

function iniciarSesionAutoQuiz(correo, contrasena) {
  console.log('[AutoQuizFill] Iniciando sesión con:', correo);
  signInWithEmailAndPassword(autenticacion, correo, contrasena)
    .then(() => {
      console.log('[AutoQuizFill] Sesión exitosa.');
      mostrarPanel();
    })
    .catch((error) => mostrarError(error.message));
}

function cerrarSesionAutoQuiz() {
  console.log('[AutoQuizFill] Cerrando sesión...');
  signOut(autenticacion)
    .then(() => {
      console.log('[AutoQuizFill] Sesión cerrada.');
      mostrarLogin();
    })
    .catch((error) => console.error('[AutoQuizFill] Error al cerrar sesión:', error));
}

function mostrarLogin() {
  toggleElementById(ID_LOGIN_CONTENEDOR, true);
  toggleElementById(ID_PANEL_CONTENEDOR, false);
}

function mostrarPanel() {
  toggleElementById(ID_LOGIN_CONTENEDOR, false);
  toggleElementById(ID_PANEL_CONTENEDOR, true);
  console.log('[AutoQuizFill] Mostrando panel principal.');
}

function verificarSesionUsuario() {
  console.log('[AutoQuizFill] Verificando sesión...');
  onAuthStateChanged(autenticacion, (usuario) => {
    if (usuario) {
      console.log('[AutoQuizFill] Usuario autenticado:', usuario);
      mostrarPanel();
    } else {
      console.log('[AutoQuizFill] No autenticado. Mostrando login.');
      mostrarLogin();
    }
  });
}

function configurarEventos() {
  const botonCerrarSesion = document.getElementById('botonCerrarSesion');
  if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener('click', cerrarSesionAutoQuiz);
  }
}

function init() {
  console.log('[AutoQuizFill] Inicializando...');
  const barraLateral = document.getElementById(ID_BARRA_LATERAL);
  if (!barraLateral) {
    console.error(`No se encontró el elemento con ID "${ID_BARRA_LATERAL}".`);
    return;
  }
  crearFormularioLogin(barraLateral);
  verificarSesionUsuario();
  configurarEventos();
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('[AutoQuizFill] DOM cargado.');
  init();
});

window.cerrarSesionAutoQuiz = cerrarSesionAutoQuiz;
