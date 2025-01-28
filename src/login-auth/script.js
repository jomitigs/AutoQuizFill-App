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
import { ref, set, onValue, remove } from 'firebase/database';

console.log('[AutoFillQuiz-App] Iniciando Autenticación.');

const ID_BARRA_LATERAL = 'barra-lateral-autoquizfillapp';
const ID_LOGIN_CONTENEDOR = 'login-autoquizfillapp';
const ID_PANEL_CONTENEDOR = 'panel-autofillquizapp';
const ID_FORM_FAKE = 'fake-form';

let currentOriginLocal = null; // Variable para almacenar el origen local

/**
 * Función para alternar la visibilidad de un elemento por su ID.
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
 */
function mostrarError(mensaje) {
  alert(`Error en inicio de sesión: ${mensaje}`);
}

/**
 * Crea y configura el formulario de login en la barra lateral.
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
 */
function configurarSesion(uid) {
  const currentOrigin = window.location.origin; // Obtiene el origen actual del dominio
  localStorage.setItem('currentOrigin', currentOrigin); // Almacena el currentOrigin en localStorage
  currentOriginLocal = currentOrigin;

  // Guarda el currentOrigin en la base de datos
  const originRef = ref(database, `users/${uid}/currentOrigin`);
  set(originRef, currentOrigin)
    .then(() => {
      // Escucha cambios en el currentOrigin
      onValue(originRef, (snapshot) => {
        const dbOrigin = snapshot.val();
        if (dbOrigin !== currentOriginLocal) {
          cerrarSesionAutoQuiz();
        }
      });
    })
    .catch((error) => {
      console.error(`[AutoQuizFill] ConfigurarSesion: Error al actualizar currentOrigin - ${error.code}: ${error.message}`);
    });
}

/**
 * Cierra la sesión del usuario y limpia la sesión en la base de datos.
 */
function cerrarSesionAutoQuiz() {
  signOut(autenticacion)
    .then(() => {
      // Eliminar el currentOrigin de la base de datos al cerrar sesión
      const usuario = autenticacion.currentUser;
      if (usuario) {
        const originRef = ref(database, `users/${usuario.uid}/currentOrigin`);
        remove(originRef)
          .then(() => {
            // Limpiar el currentOrigin de localStorage
            localStorage.removeItem('currentOrigin');
          })
          .catch((error) => {
            console.error(`[AutoQuizFill] CerrarSesionAutoQuiz: Error al eliminar currentOrigin - ${error.code}: ${error.message}`);
          });
      } else {
        // Si no hay usuario, simplemente limpiar el currentOrigin
        localStorage.removeItem('currentOrigin');
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
 *      e. Configurar los eventos necesarios.
 *    - Si el usuario no está autenticado:
 *      a. Mostrar el formulario de login.
 */
function startAFQ() {
  // Intentar obtener el elemento de la barra lateral por su ID
  const barraLateral = document.getElementById(ID_BARRA_LATERAL);

  // Si no se encuentra la barra lateral, registrar un error y abortar la inicialización
  if (!barraLateral) {
    console.error(`startAFQ: No se encontró el elemento con ID "${ID_BARRA_LATERAL}". Abortando inicialización.`);
    return;
  }

  // Crear y agregar el formulario de login a la barra lateral
  crearFormularioLogin(barraLateral);

  /**
   * Verifica el estado de autenticación del usuario.
   * Usa `onAuthStateChanged` para escuchar cambios en el estado de autenticación.
   */
  onAuthStateChanged(autenticacion, (usuario) => {
    if (usuario) {
      console.log(`[login-auth] Usuario correctamente autenticado.`);
      // a. Configurar la sesión con el UID del usuario
      configurarSesion(usuario.uid);

      /**
      * b. Crear el menú de AutoFillQuizApp
      */
      const menu = menu_AutoFillQuizApp();

      // Si el menú se creó correctamente, agregarlo a la barra lateral
      if (menu) {
        barraLateral.appendChild(menu);
      }

      // c. Mostrar el panel principal y ocultar el contenedor de login
      toggleElementById(ID_LOGIN_CONTENEDOR, false);
      /**
       * c. Inicializar el panel de AutoFillQuizApp dentro de la barra lateral
       */
      panel_AutoFillQuizApp(barraLateral);

      toggleElementById(ID_PANEL_CONTENEDOR, true);

    } else {
      // Si el usuario no está autenticado
      console.log(`[startAFQ] Usuario no autenticado.`);
      /**
       * a. Mostrar el formulario de login y ocultar el panel principal
       */
      toggleElementById(ID_LOGIN_CONTENEDOR, true);
    }
  });
}

/**
 * Escuchar cambios en currentOrigin para sincronizar sesiones entre dominios
 */
function escucharCambiosCurrentOrigin(uid) {
  const originRef = ref(database, `users/${uid}/currentOrigin`);
  onValue(originRef, (snapshot) => {
    const dbOrigin = snapshot.val();
    const currentOrigin = window.location.origin;
    if (dbOrigin && dbOrigin !== currentOrigin) {
      cerrarSesionAutoQuiz();
    }
  });
}

/**
 * Alterna la visibilidad de un elemento del DOM basado en su ID.
*/
function toggleElementById2(id, mostrar) {
  const elemento = document.getElementById(id);
  if (elemento) {
    elemento.style.display = mostrar ? 'block' : 'none';
  } else {
    console.warn(`[AutoQuizFill] toggleElementById: No se encontró el elemento con ID "${id}".`);
  }
}

/**
 * Muestra el formulario de login.
 * 
 * Este método asume que `mostrarLogin` ya maneja la visibilidad del formulario de login.
 */


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
