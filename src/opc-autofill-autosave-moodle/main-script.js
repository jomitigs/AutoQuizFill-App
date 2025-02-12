import './style.css';

import { contenedorUsers_js } from './users/script.js';
import { contenedorRuta_js, contenedorRutaDinamica_js} from './ruta/script.js';

import { getQuestionNumber, determinarTipoPregunta, renderizarPreguntas,  normalizarHTML, compararPreguntas } from './autofill-autosave-helpers.js';

import { contenedorAutoSave_js, AutoSaveQuestions_SessionStorage } from './autosave/autosave-script.js';

import { getDataFromFirebase, getDataFromFirebaseAsync,  saveNewQuestionsToFirebase, saveExistingQuestionsToFirebase} from '../config-firebase/firebase-helpers.js';
import { idbGet, idbDelete} from '../config-firebase/idbSession.js';


export function opcion_AutoFillAutoSave_Moodle_html() {
    return `
        <div id="autofillautosave_moodle" class="containerOption">

            <div id="users-autofill-moodle" class="users" style="display: none;">

                <!-- Columna para mostrar el nombre de usuario actual con icono de usuario -->
                <div class="usuario-actual">
                    <i class="fa-solid fa-user"></i>
                    <span id="nombre-usuario-actual" class="nombre-usuario"></span>
                </div>

                <select id="siguiente-usuario" class="select-siguiente-usuario">
                </select>

                <button id="boton-siguiente-usuario" class="boton-siguiente-usuario">
                    <i class="fa-solid fa-angles-right"></i>
                </button>

            </div>

            <!-- Contenedor para Ruta y Ciclo -->
            <div id="containerRutaFirebase" style="display: none;">
            </div>

            <!-- Contenedor para Subject Dinamic -->
            <div id="containerRutaDinamicaFirebase" style="display: none;">
            </div>

            <div id="container-autofillautosave">

            



            <!-- Nuevo contenedor para AutoFill-->
            <div id="container-autofill" class="subcontainer-autoquiz-autofill" style="display: none;">

                <div id="header-autofill" class="header-autoquiz">
                    <h2 id="titulo-autoquiz">AutoFill</h2>

                    <label class="switch-autoquiz">
                        <input type="checkbox" id="switch-autofill">
                        <span class="slider round"></span>
                    </label>
                </div>

                <!-- Contenido de AutoFill-->
                <div id="body-autoquiz-autofill" class="body-autoquiz" style="display: none;">

                    <!-- Contenedor dinámico para las preguntas generadas -->
                    <div id="contenedor-preguntas" class="contenedor-preguntas">
                        <!-- Aquí se insertarán dinámicamente los detalles de cada pregunta -->
                    </div>

                </div>
            </div>




<!-- Contenedor para AutoSave -->
<div id="container-autosave" class="subcontainer-autoquiz-autosave" style="display: none;">

    <div id="header-autosave" class="header-autoquiz">

        <!-- Título y Botón -->
        <h2 id="titulo-autoquiz">
            AutoSave

            <button id="upload-autosave" class="icon-button">
                <i class="fa-solid fa-cloud-arrow-up"></i>
            </button>

        </h2>

        <label class="switch-autoquiz">
            <input type="checkbox" id="switch-autosave">
            <span class="slider round"></span>
        </label>

    </div>

    <!-- Contenido de AutoSave -->
    <div id="body-autoquiz-autosave">
        <div>
            <span id="respuestasautosave"></span>
        </div>
    </div>
</div>

</div>
        </div>
    `;
}

export async function opcion_AutoFillAutoSave_Moodle_js() {
    const url = window.location.href;
    let esMoodle = esPaginaMoodle();

    if (esMoodle) {
        console.log("[opc-autofill-autosave-moodle: main]  Esta página está construida con Moodle");
    } else {
        console.log("[opc-autofill-autosave-moodle: main]  Esta página no está construida con Moodle");
    }

    if (localStorage.getItem('configUsersAutofill') === 'true' && esMoodle) {
        const autofillUsers = document.getElementById('users-autofill-moodle');
        autofillUsers.style.display = 'flex';
        contenedorUsers_js();
    } else {
        console.log("[opc-autofill-autosave-moodle: main]  AutoFill Users no ejecutado porque, no es Moodle");
    }

    const switchRutaDinamica = localStorage.getItem('switch-ruta-dinamica');

    if (esMoodle && switchRutaDinamica === 'true'  ) {
        console.log('[opc-autofill-autosave-moodle: main]  Cargando Ruta Dinamica...');
        await contenedorRutaDinamica_js();
    } else {
        console.log('[opc-autofill-autosave-moodle: main]  Cargando Ruta...');
        contenedorRuta_js();
    }

    // Mostrar contenedores de autofill y autosave si estamos en 'mod/quiz/attempt.php'
    if (esMoodle) {
        const autofillContainer = document.getElementById('container-autofill');
        const autosaveContainer = document.getElementById('container-autosave');
        autofillContainer.style.display = 'block';
        autosaveContainer.style.display = 'block';

        // Iniciar la obtención de datos desde Firebase de manera asíncrona
        getDataFromFirebaseAsync();

        // Seleccionar todos los elementos que contienen las formulaciones originales de las preguntas
        const originalAllFormulations = document.querySelectorAll('.formulation.clearfix');
        // Guardar en SessionStorage el estado actual de las preguntas y esperar a que termine el proceso
        await AutoSaveQuestions_SessionStorage(originalAllFormulations);

        // contenedorAutoFill_js();
        // contenedorAutoSave_js();

        // renderizarPreguntas('#barra-lateral-autoquizfillapp');
        // renderizarPreguntas();
    }

    // Ejecutar extractRevision() solo si el URL contiene 'grade/report/overview/index.php'
    // if (esMoodle && url.includes('grade/report/overview/index.php')) {
    //     extractRevision();
    //     viewRevisiones();
    // }

    // Mostrar contenedor de autosavereview si estamos en 'mod/quiz/review.php'
    //if (esMoodle && url.includes('mod/quiz/review.php')) {
        // const autoSaveReviewContainer = document.getElementById('container-autosavereview');
        // autoSaveReviewContainer.style.display = 'block';
        // contenedorAutoSaveReview_js();
    //}

    // Mostrar contenedor de verified si estamos en cualquiera de las páginas especificadas
    //if (esMoodle && url.includes('mod/quiz/review.php') || url.includes('grade/report/overview/index.php') || url.includes('course/user.php')) {
        //const verifiedContainer = document.getElementById('container-verified');
       // verifiedContainer.style.display = 'block';
        //     await opcionVerified_js();
    //}
}

// Función para verificar si la página está construida con Moodle
function esPaginaMoodle() {
    // Método 1: Verificar la etiqueta meta "generator"
    const metaGenerator = document.querySelector('meta[name="generator"]');
    if (metaGenerator && metaGenerator.getAttribute('content').toLowerCase().includes('moodle')) {
        return true;
    }

    // Método 2: Verificar clases específicas en el <body>
    if (document.body.classList.contains('moodle')) {
        return true;
    }

    // Método 3: Verificar contenedores específicos de Moodle
    const moodleContainer = document.querySelector('.moodle-page');
    if (moodleContainer) {
        return true;
    }

    // Método 4: Verificar URLs o scripts específicos
    const scripts = document.querySelectorAll('script[src]');
    for (let script of scripts) {
        if (script.src.toLowerCase().includes('moodle')) {
            return true;
        }
    }

    // Si ninguno de los métodos anteriores detecta Moodle
    return false;
}

