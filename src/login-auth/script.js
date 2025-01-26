/* 
  Este script maneja la autenticación (inicio/cierre de sesión), 
  verifica el estado del usuario y controla la UI para AutoQuizFill.
*/
import './style.css';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { autenticacion, database } from '../config-firebase/script.js';
import { panel_AutoFillQuizApp } from '../main-panel/script.js';
import { menu_AutoFillQuizApp } from '../main-menu/script.js';
import { v4 as uuidv4 } from 'uuid'; // Importa la función para generar UUID
import {
  ref,
  set,
  onValue,
  remove
} from 'firebase/database';

const ID_BARRA_LATERAL = 'barra-lateral-autoquizfillapp';
const ID_LOGIN_CONTENEDOR = 'login-autoquizfillapp';
const ID_PANEL_CONTENEDOR = 'panel-autofillquizapp';
const ID_FORM_FAKE = 'fake-form';

console.log('[AutoQuizFill] Script cargado.');

let sessionIdLocal = null; // Variable para almacenar el ID de sesión local

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
    .then((usuarioCredential) => {
      console.log('[AutoQuizFill] Sesión exitosa.');
      const usuario = usuarioCredential.user;
      configurarSesion(usuario.uid);
      mostrarPanel();
    })
    .catch((error) => mostrarError(error.message));
}

function configurarSesion(uid) {
  // Genera un nuevo ID de sesión
  const newSessionId = uuidv4();
  sessionIdLocal = newSessionId;

  // Guarda el nuevo ID de sesión en la base de datos
  const sessionRef = ref(database, `users/${uid}/currentSession`);
  set(sessionRef, newSessionId)
    .then(() => {
      console.log('[AutoQuizFill] ID de sesión actualizado en la base de datos.');
      // Escucha cambios en el ID de sesión
      onValue(sessionRef, (snapshot) => {
        const currentSessionId = snapshot.val();
        if (currentSessionId !== sessionIdLocal) {
          console.log('[AutoQuizFill] Sesión inválida detectada. Cerrando sesión.');
          cerrarSesionAutoQuiz();
        }
      });
    })
    .catch((error) => {
      console.error('[AutoQuizFill] Error al actualizar ID de sesión:', error);
    });
}

function cerrarSesionAutoQuiz() {
  console.log('[AutoQuizFill] Cerrando sesión...');
  signOut(autenticacion)
    .then(() => {
      console.log('[AutoQuizFill] Sesión cerrada.');
      // Opcional: Eliminar el currentSession de la base de datos al cerrar sesión
      const usuario = autenticacion.currentUser;
      if (usuario) {
        const sessionRef = ref(database, `users/${usuario.uid}/currentSession`);
        remove(sessionRef)
          .then(() => {
            console.log('[AutoQuizFill] currentSession eliminado de la base de datos.');
          })
          .catch((error) => {
            console.error('[AutoQuizFill] Error al eliminar currentSession:', error);
          });
      }
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
      configurarSesion(usuario.uid);
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
  panel_AutoFillQuizApp(barraLateral);

  const menu = menu_AutoFillQuizApp();
  barraLateral.appendChild(menu); // Asegúrate de agregarlo al contenedor correspondiente

  configurarEventos();
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('[AutoQuizFill] DOM cargado.');
  init();
});

// Para poder llamar desde la consola
window.cerrarSesionAutoQuiz = cerrarSesionAutoQuiz;
