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

console.log('[AutoQuizFill] Iniciando login-auth');

const ID_BARRA_LATERAL = 'barra-lateral-autoquizfillapp';
const ID_LOGIN_CONTENEDOR = 'login-autoquizfillapp';
const ID_PANEL_CONTENEDOR = 'panel-autofillquizapp';
const ID_FORM_FAKE = 'fake-form';


let sessionIdLocal = null; // Variable para almacenar el ID de sesión local

/**
 * Función para alternar la visibilidad de un elemento por su ID.
 * @param {string} elementId - ID del elemento en el DOM.
 * @param {boolean} show - Determina si se muestra o se oculta el elemento.
 */
function toggleElementById(elementId, show) {
  const el = document.getElementById(elementId);
  if (el) {
    el.style.display = show ? 'block' : 'none';
  } else {
  }
}

/**
 * Función para mostrar errores tanto en la consola como en alertas.
 * @param {string} mensaje - Mensaje de error a mostrar.
 */
function mostrarError(mensaje) {
  alert(`Error en inicio de sesión: ${mensaje}`);
}

/**
 * Crea y configura el formulario de login en la barra lateral.
 * @param {HTMLElement} barraLateral - Elemento DOM de la barra lateral donde se insertará el formulario.
 */
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

  if (inputCorreo && inputContrasena && botonLogin) {

    const iniciarSesionHandler = () => {
      iniciarSesionAutoQuiz(inputCorreo.value, inputContrasena.value);
    };
    
    inputContrasena.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        iniciarSesionHandler();
      }
    });
    
    botonLogin.addEventListener('click', () => {
      iniciarSesionHandler();
    });
  } else {
    console.error('[AutoQuizFill] CrearFormularioLogin: No se encontraron todos los elementos del formulario de login.');
  }
}

/**
 * Maneja el inicio de sesión del usuario.
 * @param {string} correo - Correo electrónico del usuario.
 * @param {string} contrasena - Contraseña del usuario.
 */
function iniciarSesionAutoQuiz(correo, contrasena) {
  signInWithEmailAndPassword(autenticacion, correo, contrasena)
    .then((usuarioCredential) => {
      const usuario = usuarioCredential.user;
      configurarSesion(usuario.uid);
      mostrarPanel();
    })
    .catch((error) => {
      mostrarError(error.message);
    });
}

/**
 * Configura la sesión del usuario en la base de datos y establece un listener para cambios.
 * @param {string} uid - UID del usuario autenticado.
 */
function configurarSesion(uid) {
  // Genera un nuevo ID de sesión
  const newSessionId = uuidv4();
  sessionIdLocal = newSessionId;

  // Guarda el nuevo ID de sesión en la base de datos
  const sessionRef = ref(database, `users/${uid}/currentSession`);
  set(sessionRef, newSessionId)
    .then(() => {
      // Escucha cambios en el ID de sesión
      onValue(sessionRef, (snapshot) => {
        const currentSessionId = snapshot.val();
        if (currentSessionId !== sessionIdLocal) {
          cerrarSesionAutoQuiz();
        }
      });
    })
    .catch((error) => {
      console.error(`[AutoQuizFill] ConfigurarSesion: Error al actualizar ID de sesión - ${error.code}: ${error.message}`);
    });
}

/**
 * Cierra la sesión del usuario y limpia la sesión en la base de datos.
 */
function cerrarSesionAutoQuiz() {
  signOut(autenticacion)
    .then(() => {
      // Opcional: Eliminar el currentSession de la base de datos al cerrar sesión
      const usuario = autenticacion.currentUser;
      if (usuario) {
        const sessionRef = ref(database, `users/${usuario.uid}/currentSession`);
        remove(sessionRef)
          .then(() => {
          })
          .catch((error) => {
          });
      }
      mostrarLogin();
    })
    .catch((error) => {
      console.error(`[AutoQuizFill] CerrarSesionAutoQuiz: Error al cerrar sesión - ${error.code}: ${error.message}`);
    });
}

/**
 * Muestra el formulario de login y oculta el panel principal.
 */
function mostrarLogin() {
  toggleElementById(ID_LOGIN_CONTENEDOR, true);
  toggleElementById(ID_PANEL_CONTENEDOR, false);
}

/**
 * Muestra el panel principal y oculta el formulario de login.
 */
function mostrarPanel() {
  toggleElementById(ID_LOGIN_CONTENEDOR, false);
  toggleElementById(ID_PANEL_CONTENEDOR, true);
}

/**
 * Verifica el estado de autenticación del usuario.
 */
function verificarSesionUsuario() {
  onAuthStateChanged(autenticacion, (usuario) => {
    if (usuario) {
      configurarSesion(usuario.uid);
      mostrarPanel();
    } else {
      mostrarLogin();
    }
  });
}

/**
 * Configura los eventos de la aplicación, como el cierre de sesión.
 */
function configurarEventos() {
  const botonCerrarSesion = document.getElementById('botonCerrarSesion');
  if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener('click', () => {
      cerrarSesionAutoQuiz();
    });
    console.log('[AutoQuizFill] ConfigurarEventos: Evento de cierre de sesión configurado.');
  } else {
    console.warn('[AutoQuizFill] ConfigurarEventos: No se encontró el botón de cerrar sesión para configurar el evento.');
  }
}

/**
 * Inicializa la aplicación AutoQuizFill.
 */
function startAFQ() {
  const barraLateral = document.getElementById(ID_BARRA_LATERAL);
  if (!barraLateral) {
    console.error(`[AutoQuizFill] startAFQ: No se encontró el elemento con ID "${ID_BARRA_LATERAL}". Abortando inicialización.`);
    return;
  }

  crearFormularioLogin(barraLateral);
  verificarSesionUsuario();
  panel_AutoFillQuizApp(barraLateral);
  
  const menu = menu_AutoFillQuizApp();
  if (menu) {
    barraLateral.appendChild(menu);
  } else {
  }

  configurarEventos();
}

// Al final de tu bundle, reemplaza el listener de DOMContentLoaded existente con lo siguiente:

if (document.readyState === 'loading') { // La página aún se está cargando
    document.addEventListener('DOMContentLoaded', () => {
        startAFQ();
    });
  } else { // El DOM ya está cargado
    startAFQ();
  }
  
// Exposición de la función de cierre de sesión para uso externo (opcional).
window.cerrarSesionAutoQuiz = cerrarSesionAutoQuiz;
