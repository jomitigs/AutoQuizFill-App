import './style.css';

import { contenedorUsers_js } from './users/script.js';
import { contenedorRuta_js, contenedorRutaDinamica_js } from './ruta/script.js';

import { renderizarPreguntas } from './autofill-autosave-helpers.js';

import { contenedorAutoSave_js, AutoSaveQuestions_SessionStorage, AutoSave_ShowResponses, crearBotonAutoSave, autoSaveHideApp } from './autosave/autosave-script.js';
import { contenedorAutoFill_js } from './autofill/autofill-script.js';

import { getDataFromFirebaseAsync } from '../config-firebase/firebase-helpers.js';

// global.js
window.eventosPreguntasHabilitados = true;
window.autoSaveEnEjecucion = false;

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
        <div id="container-autofill" class="subcontainer-autoquiz-autofill">

            <div id="header-autofill" class="header-autoquiz">
                <h2 id="titulo-autoquiz">AutoFill</h2>

                <label class="switch-autoquiz">
                    <input type="checkbox" id="switch-autofill">
                    <span class="slider round"></span>
                </label>
            </div>

            <!-- Contenido de AutoFill-->
            <div id="body-autoquiz-autofill" class="body-autoquiz" style="display: none;">

                <div>
                    <span id="respuestasautofill"></span>
                </div>

            </div>
        </div>




        <!-- Contenedor para AutoSave -->
        <div id="container-autosave" class="subcontainer-autoquiz-autosave">

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

    let esMoodle = esPaginaMoodle();
    const switchRutaDinamica = localStorage.getItem('switch-ruta-dinamica');

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

    if (esMoodle && switchRutaDinamica === 'true') {
        console.log('[opc-autofill-autosave-moodle: main]  Cargando Ruta Dinamica...');
        await contenedorRutaDinamica_js();
    } else {
        console.log('[opc-autofill-autosave-moodle: main]  Cargando Ruta...');
        contenedorRuta_js();
    }

    if (esMoodle) {
        contenedorAutoFillAutoSave_js();
    }

    detectarCambiosInterruptor();

    const botonAutoSave = localStorage.getItem("botonAutoSave") || "false";
    console.log("Valor de botonAutoSave recuperado:", botonAutoSave);
    const hideApp = localStorage.getItem("hideapp") || "false";
    
    if (botonAutoSave === "true" && window.location.href.includes('mod/quiz/summary.php') && hideApp === "false" ) {
        console.log("Condición cumplida, ejecutando crearBotonAutoSave()");
        crearBotonAutoSave();
    } else if (window.location.href.includes('mod/quiz/summary.php') && hideApp === "true" ) {
        autoSaveHideApp();
        console.log("Condición no cumplida, no se ejecuta crearBotonAutoSave()");
    }
    
}

async function contenedorAutoFillAutoSave_js() {
    const interruptorAutoSave = document.getElementById("switch-autosave");
    const interruptorAutoFill = document.getElementById("switch-autofill");

    if (!interruptorAutoSave || !interruptorAutoFill) return;

    const stateAutoSave = localStorage.getItem("autosave-autoquizfillapp") || "desactivado";
    const stateAutoFill = localStorage.getItem("autofill-autoquizfillapp") || "desactivado";

    interruptorAutoSave.checked = (stateAutoSave === "activado");
    interruptorAutoFill.checked = (stateAutoFill === "activado");

    const bodyAutoSave = document.getElementById("body-autoquiz-autosave");
    const bodyAutoFill = document.getElementById("body-autoquiz-autofill");

    if ((stateAutoSave === "activado" || stateAutoFill === "activado") && window.location.href.includes('/mod/quiz/attempt.php')) {

        getDataFromFirebaseAsync();
        const originalFormulations = document.querySelectorAll(".formulation.clearfix");
        await AutoSaveQuestions_SessionStorage(originalFormulations);

        if (stateAutoFill === "activado") {
            bodyAutoFill.style.display = 'flex';
            window.eventosPreguntasHabilitados = false;
            await contenedorAutoFill_js();
            // Rehabilitar después de finalizar la función
            window.eventosPreguntasHabilitados = true;

            await AutoSaveQuestions_SessionStorage(originalFormulations);

            if (stateAutoSave === "activado") {
                contenedorAutoSave_js();
            }

        }

        if (stateAutoSave === "activado") {
            bodyAutoSave.style.display = 'flex';
            contenedorAutoSave_js();
        }

        renderizarPreguntas();

    } else if (!window.location.href.includes('/mod/quiz/summary.php')) {
        sessionStorage.removeItem('questions-AutoSave');
        bodyAutoFill.style.display = 'none';
        bodyAutoSave.style.display = 'none';
    }

}

function detectarCambiosInterruptor() {
    const interruptorAutoSave = document.getElementById("switch-autosave");
    const interruptorAutoFill = document.getElementById("switch-autofill");

    // Para el interruptor de AutoSave
    interruptorAutoSave.addEventListener("change", async () => {
        const bodyAutoSave = document.getElementById("body-autoquiz-autosave");
        const nuevoEstado = interruptorAutoSave.checked ? "activado" : "desactivado";
        localStorage.setItem("autosave-autoquizfillapp", nuevoEstado);
        console.log(`AutoSave: ${nuevoEstado}`);

        if (nuevoEstado === "activado") {
            bodyAutoSave.style.display = 'flex';
            contenedorAutoSave_js();
            renderizarPreguntas();
        } else {
            bodyAutoSave.style.display = 'none';
        }

        
    });

    // Para el interruptor de AutoFill
    interruptorAutoFill.addEventListener("change", async () => {
        const bodyAutoFill = document.getElementById("body-autoquiz-autofill");
        const nuevoEstado = interruptorAutoFill.checked ? "activado" : "desactivado";
        localStorage.setItem("autofill-autoquizfillapp", nuevoEstado);
        console.log(`AutoFill: ${nuevoEstado}`);

        if (nuevoEstado === "activado") {
            bodyAutoFill.style.display = 'flex';
            window.eventosPreguntasHabilitados = false;
            await contenedorAutoFill_js();
            // Rehabilitar después de finalizar la función
            window.eventosPreguntasHabilitados = true;

            const stateAutoSave = localStorage.getItem("autosave-autoquizfillapp") || "desactivado";
            const originalFormulations = document.querySelectorAll(".formulation.clearfix");

            await AutoSaveQuestions_SessionStorage(originalFormulations);

            if (stateAutoSave === "activado") {
                contenedorAutoSave_js();
            }

        } else {
            bodyAutoFill.style.display = 'none';
        }
    });
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

