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
    console.warn(`[AutoQuizFill] toggleElementById: No se encontró el elemento con ID "${elementId}".`);
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
    
    botonLogin.addEventListener('click', iniciarSesionHandler);
  } else {
    console.error('[AutoQuizFill] crearFormularioLogin: No se encontraron todos los elementos del formulario de login.');
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
      console.error(`[AutoQuizFill] configurarSesion: Error al actualizar ID de sesión - ${error.code}: ${error.message}`);
    });
}

/**
 * Cierra la sesión del usuario y limpia la sesión en la base de datos.
 */
function cerrarSesionAutoQuiz() {
  const usuario = autenticacion.currentUser;

  signOut(autenticacion)
    .then(() => {
      if (usuario) {
        const sessionRef = ref(database, `users/${usuario.uid}/currentSession`);
        remove(sessionRef)
          .catch((error) => {
            console.error(`[AutoQuizFill] cerrarSesionAutoQuiz: Error al eliminar currentSession - ${error.code}: ${error.message}`);
          });
      }
      mostrarLogin();
    })
    .catch((error) => {
      console.error(`[AutoQuizFill] cerrarSesionAutoQuiz: Error al cerrar sesión - ${error.code}: ${error.message}`);
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
 * Inicializa la aplicación AutoFillQuiz.
 * 
 * Este proceso incluye:
 * 1. Verificar la existencia de la barra lateral en el DOM.
 * 2. Crear el formulario de login.
 * 3. Verificar la sesión del usuario.
 *    - Si el usuario está autenticado:
 *      a. Configurar la sesión.
 *      b. Mostrar el panel principal.
 *      c. Inicializar la aplicación AutoFillQuiz.
 *      d. Crear y agregar el menú de AutoFillQuiz.
 *    - Si el usuario no está autenticado:
 *      a. Mostrar el formulario de login.
 */
function startAFQ() {
  const barraLateral = document.getElementById(ID_BARRA_LATERAL);

  if (!barraLateral) {
    console.error(`[AutoQuizFill] startAFQ: No se encontró el elemento con ID "${ID_BARRA_LATERAL}". Abortando inicialización.`);
    return;
  }

  crearFormularioLogin(barraLateral);

  /**
   * Verifica el estado de autenticación del usuario.
   * Usa `onAuthStateChanged` para escuchar cambios en el estado de autenticación.
   */
  onAuthStateChanged(autenticacion, (usuario) => {
    if (usuario) {
      // Si el usuario está autenticado
      configurarSesion(usuario.uid);
      mostrarPanel();

      // Inicializar el panel de AutoFillQuizApp dentro de la barra lateral
      panel_AutoFillQuizApp(barraLateral);

      // Crear el menú de AutoFillQuizApp y agregarlo a la barra lateral
      const menu = menu_AutoFillQuizApp();
      if (menu) {
        barraLateral.appendChild(menu);
      }
    } else {
      // Si el usuario no está autenticado
      mostrarLogin();
    }
  });
}

// Inicializa la aplicación una vez que el DOM esté completamente cargado
if (document.readyState === 'loading') { // La página aún se está cargando
  document.addEventListener('DOMContentLoaded', startAFQ);
} else { // El DOM ya está cargado
  startAFQ();
}

// Exposición de la función de cierre de sesión para uso externo (opcional).
window.cerrarSesionAutoQuiz = cerrarSesionAutoQuiz;
