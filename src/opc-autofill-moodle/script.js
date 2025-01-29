import './style.css';

import { contenedorUsers_js } from '../opc-autofill-moodle/users/script.js';
import { contenedorRuta_js, contenedorRutaDinamica_js } from '../opc-autofill-moodle/ruta/script.js';

export function opcionAutoFillMoodle_html() {
    return `
     <div class="body-autoquiz">

<div class="container-autoquiz">

    <div id="users-autofill-moodle" class="users" style="display: none;">

        <!-- Columna para mostrar el nombre de usuario actual con icono de usuario -->
        <div class="usuario-actual">
            <i class="fa-solid fa-user"></i>
            <span id="nombre-usuario-actual" class="nombre-usuario"></span>
        </div>

        <select id="siguiente-usuario" class="select-siguiente-usuario" >
        </select>

        <button id="boton-siguiente-usuario" class="boton-siguiente-usuario">
            <i class="fa-solid fa-angles-right"></i>
        </button>

    </div>


    <!-- Contenedor Principal -->
    <div id="ultima-ruta-configruta" class="estilo-configruta-title no-seleccionado">

        <!-- Contenedor para Ruta y Ciclo apilados verticalmente -->
        <div class="ruta-ciclo-container" style="display: none;">

            <!-- Ruta -->
            <div id="ruta-configruta" class="title-configruta-ruta">
                <span class="label-configruta">Ruta:</span>
            </div>

            <!-- Ciclo -->
            <div id="ciclo-configruta" class="title-configruta-ciclo">
                <span class="label-configruta">Ciclo:</span>
            </div>

        </div>
    </div>


             <!-- Contenedor para Subject Dinamic -->

        <div id="container-ruta-dinamica" class="subcontainer-autoquiz-autosavereview" style="display: block;" >

            <div id="subject-dinamic" class="body-autoquiz">

                <div id="selects-subject-dinamic" >
                </div>

            </div>
        </div>


    <!-- Nuevo contenedor para AutoFill-->
    <div id="container-autofill" class="subcontainer-autoquiz-autofill" style="display: none;">

        <div class="header-autoquiz">
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

        <div class="header-autoquiz">
            <!-- Título y Switch -->
            <h2 id="titulo-autoquiz">AutoSave</h2>
            <label class="switch-autoquiz">
                <input type="checkbox" id="switch-autosave">
                <span class="slider round"></span>
            </label>
        </div>

        <!-- Contenido de AutoSave -->
        <div id="body-autoquiz-autosave" class="body-autoquiz">

            <div class="dato-autoquiz">
                <div>
                    <span id="respuestasautosave"></span>
                </div>
            </div>

        </div>
    </div>


    <!-- Contenedor para AutoSaveReview -->
    <div id="container-autosavereview" class="subcontainer-autoquiz-autosavereview" style="display: none;">

        <div class="header-autoquiz">
            <!-- Título y Switch -->
            <h3 id="titulo-autoquiz">AutoSaveReview</h3>
            <label class="switch-autoquiz">
                <input type="checkbox" id="switch-autosavereview">
                <span class="slider round"></span>
            </label>
        </div>

        <!-- Contenido de AutoSaveReview -->
        <div id="body-autoquiz-autosavereview" class="body-autoquiz">

            <div class="dato-autoquiz">
                <div>
                    <span id="respuestasautosavereview"></span>
                </div>
            </div>

        </div>
    </div>

    <!-- Contenedor Verified -->
    <div id="container-verified" class="subcontainer-autoquiz-verified" style="display: none;">

        <!-- Head Verified -->
        <div class="header-autoquiz">
        <h4 id="titulo-autoquiz">Verificar Preguntas</h4>

        </div>

        <!-- Body Verified -->
        <div id="body-autoquiz-verified" class="body-autoquiz">

        </div>
    </div>

</div>

</div>
`;
}

export async function opcionAutoFillMoodle_js() {
    const url = window.location.href;
    let esMoodle = esPaginaMoodle();

    if (esMoodle) {
        console.log("[opc-autofill-moodle: main] Esta página está construida con Moodle");
    } else {
        console.log("[opc-autofill-moodle: main] Esta página no está construida con Moodle");
    }

    if (localStorage.getItem('configUsersAutofill') === 'true' && esMoodle) {
        const autofillUsers = document.getElementById('users-autofill-moodle');
        autofillUsers.style.display = 'flex';
        contenedorUsers_js();
    } else {
        console.log("[opc-autofill-moodle: main] AutoFill Users no ejecutado porque, no es Moodle");
    }

    const switchRutaDinamica = localStorage.getItem('switch-ruta-dinamica');

    if (!switchRutaDinamica || switchRutaDinamica === "false") {
        console.log('[opc-autifill-moodle: main] Ruta Dinamica desactivada');
    } else {
        console.log('[opc-autifill-moodle: main] Ruta Dinamica activada');
    }

    if (switchRutaDinamica === 'true' && (esMoodle || url.includes('http://127.0.0.1:5500/dist/index.html')) ) {
        console.log('[opc-autifill-moodle: main] Cargando Ruta Dinamica...');
        await contenedorRutaDinamica_js();
    } else {
        console.log('[opc-autifill-moodle: main] Cargando Ruta...');
        contenedorRuta_js();
    }


    // Ejecutar extractRevision() solo si el URL contiene 'grade/report/overview/index.php'
    // if (esMoodle && url.includes('grade/report/overview/index.php')) {
        //     extractRevision();
        //     viewRevisiones();
    // }

    // // // Mostrar contenedor de ruta dinámica si el URL coincide con ciertas páginas
   // if (esMoodle && ( url.includes('mod/quiz') || url.includes('grade/report/overview/index.php') || url.includes('login/index.php'))|| url.includes('http://127.0.0.1:5500/dist/index.html')) {
    //         await contenedorRutaDinamica_js();
    //}

    // Verificar si "switch-ruta-dinamica" no existe en localStorage
    //if (!localStorage.getItem('switch-ruta-dinamica')) {
        //contenedorRuta_js();
    //}

    
    


    // Mostrar contenedores de autofill y autosave si estamos en 'mod/quiz/attempt.php'
    if (esMoodle || url.includes('http://127.0.0.1:5500/dist/index.html')) {
        const autofillContainer = document.getElementById('container-autofill');
        const autosaveContainer = document.getElementById('container-autosave');
        autofillContainer.style.display = 'block';
        autosaveContainer.style.display = 'block';
        //contenedorAutoFill_js();
        //contenedorAutoSave_js();
    }

    // Mostrar contenedor de autosavereview si estamos en 'mod/quiz/review.php'
    if (esMoodle && url.includes('mod/quiz/review.php')) {
        const autoSaveReviewContainer = document.getElementById('container-autosavereview');
        autoSaveReviewContainer.style.display = 'block';
        // contenedorAutoSaveReview_js();
    }

    // Mostrar contenedor de verified si estamos en cualquiera de las páginas especificadas
    if (esMoodle && url.includes('mod/quiz/review.php') || url.includes('grade/report/overview/index.php') || url.includes('course/user.php')) {
        const verifiedContainer = document.getElementById('container-verified');
        verifiedContainer.style.display = 'block';
        //     await opcionVerified_js();
    }
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

