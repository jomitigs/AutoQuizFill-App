import './style.css';

import { contenedorRuta_js} from '../opc-autofill-autosave-moodle/ruta/script.js';

import { contenedorAutoSave_js, AutoSaveQuestions_SessionStorage, AutoSave_ShowResponses } from './autosavek/autosave-script.js';
import { contenedorAutoFill_js } from './autofill/autofill-script.js';

import { getDataFromFirebaseAsync } from '../config-firebase/firebase-helpers.js';

// global.js
window.eventosPreguntasHabilitados = true;
window.autoSaveEnEjecucion = false;

export function opcion_AutoFillAutoSave_Altissia_html() {
    return `
    <div id="autofillautosave_altissia" class="containerOption">

    <div id="users-autofill-altissia" class="users" style="display: none;">

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

                <!-- Contenedor dinámico para las preguntas generadas -->
                <div id="contenedor-preguntas" class="contenedor-preguntas">
                    <!-- Aquí se insertarán dinámicamente los detalles de cada pregunta -->
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

export async function opcion_AutoFillAutoSave_Altissia_js() {

    let esAltissia = esPaginaAltissia();
    const switchRutaDinamica = localStorage.getItem('switch-ruta-dinamica');

    if (esAltissia) {
        console.log("[opc-autofill-autosave-altissia: main]  Esta página está construida con Altissia");
    } else {
        console.log("[opc-autofill-autosave-altissia: main]  Esta página no está construida con Altissia");
    }

    //if (localStorage.getItem('configUsersAutofill') === 'true' && esAltissia) {
        //const autofillUsers = document.getElementById('users-autofill-moodle');
        //autofillUsers.style.display = 'flex';
        //contenedorUsers_js();
    //} else {
        //console.log("[opc-autofill-autosave-moodle: main]  AutoFill Users no ejecutado porque, no es Moodle");
    //}


    console.log('[opc-autofill-autosave-moodle: main]  Cargando Ruta...');
    contenedorRuta_js();
    

    if (esAltissia) {
        contenedorAutoFillAutoSave_js();
    }

    detectarCambiosInterruptor();
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
            console.log("Valor de eventosPreguntasHabilitados (deshabilitado): " + window.eventosPreguntasHabilitados);
            await contenedorAutoFill_js();
            // Rehabilitar después de finalizar la función
            window.eventosPreguntasHabilitados = true;
            const originalAllFormulations = document.querySelectorAll('.formulation.clearfix');

            await AutoSaveQuestions_SessionStorage(originalFormulations);
            
            console.log("Valor de eventosPreguntasHabilitados (reactivado): " + window.eventosPreguntasHabilitados);
            if (stateAutoSave === "activado") {
                contenedorAutoSave_js();
            }
            
        } 
        
        if (stateAutoSave === "activado") {
            bodyAutoSave.style.display = 'flex';
            contenedorAutoSave_js();
        }

        renderizarPreguntas();

    } else {
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
            // Deshabilitar los eventos de preguntas
        //  contenedorAutoSave_js();
            // Rehabilitar después de finalizar la funció
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
            console.log("Valor de eventosPreguntasHabilitados (deshabilitado): " + window.eventosPreguntasHabilitados);
        //  await contenedorAutoFill_js();
            // Rehabilitar después de finalizar la función
            window.eventosPreguntasHabilitados = true;
            console.log("Valor de eventosPreguntasHabilitados (reactivado): " + window.eventosPreguntasHabilitados);
            const stateAutoSave = localStorage.getItem("autosave-autoquizfillapp") || "desactivado";
        //  const originalAllFormulations = document.querySelectorAll('.formulation.clearfix');
        //  await AutoSaveQuestions_SessionStorage(originalFormulations);

            if (stateAutoSave === "activado") {
                // contenedorAutoSave_js();
            }
            
        } else {
            bodyAutoFill.style.display = 'none';
        }
    });
}

// Función para verificar si la página está construida con Moodle
function esPaginaAltissia() {
    return window.location.href.includes("altissia.org");
}


