import { draganddrop_image } from './questions-types/6_draganddrop_image.js';
import { draganddrop_text } from './questions-types/5_draganddrop_text.js';
import { inputchecked_opcionmultiple } from './questions-types/2_inputchecked_opcionmultiple.js';
import { inputradio_opcionmultiple_verdaderofalso } from './questions-types/1_inputradio_opcionmultiple_verdaderofalso.js';
import { inputtext_respuestacorta } from './questions-types/4_inputtext_respuestacorta.js';
import { inputtext_respuestacorta2 } from './questions-types/4_inputtext_respuestacorta2.js';
import { select_emparejamiento } from './questions-types/3_select_emparejamiento.js';
import interact from 'interactjs';
import { getQuestionNumber, determinarTipoPregunta, renderizarPreguntas,  normalizarHTML, compararPreguntas } from '../autofill-autosave-helpers.js';

import { getDataFromFirebase, getDataFromFirebaseAsync,  saveNewQuestionsToFirebase, saveExistingQuestionsToFirebase} from '../../config-firebase/firebase-helpers.js';
import { idbGet, idbDelete} from '../../config-firebase/idbSession.js';

export function contenedorAutoFill_js() {

    const SWITCH_AUTOFILL_ID = 'switch-autofill';             // ID del interruptor que activa/desactiva el AutoFill
    const SWITCH_AUTOFILL = 'autofill-autoquizfillapp';       // Clave para almacenar el estado del AutoFill en localStorage
    const BODY_ID_AUTOFILL = 'body-autoquiz-autofill';        // ID del contenedor visual relacionado con el AutoSave
   
    const ACTIVADO = 'activado';                               // Valor que indica que el AutoSave está activado
    const DESACTIVADO = 'desactivado';                         // Valor que indica que el AutoSave está desactivado

    const interruptorAutoFill = document.getElementById(SWITCH_AUTOFILL_ID);
    const bodyAutoFill = document.getElementById(BODY_ID_AUTOFILL);

    // Verificar que el interruptor exista; de lo contrario, registrar un error y salir
    if (!interruptorAutoFill) {
        console.error(`Error: No se encontró el elemento con ID '${SWITCH_AUTOFILL_ID}'`);
        return;
    }

    // Recuperar el estado guardado del AutoFill (si no existe, se considera desactivado)
    const estadoGuardado_switchAutoFill = localStorage.getItem(SWITCH_AUTOFILL) || DESACTIVADO;
    console.log(`[opc-autofill-autosave-moodle: autosave] AutoFill: ${estadoGuardado_switchAutoSave}`);

    // Actualizar el estado visual del interruptor según el estado guardado
    interruptorAutoFill.checked = estadoGuardado_switchAutoFill === ACTIVADO;

    const actualizarVisibilidadBody = async () => {
        // Determinar si la URL actual corresponde a la página de intento de quiz
        const esPaginaQuiz = window.location.href.includes('/mod/quiz/attempt.php');

        if (esPaginaQuiz && interruptorAutoSave.checked) {
            // Si estamos en la página de quiz y el AutoSave está activado:
            if (bodyAutoFill) {
                // Mostrar el contenedor relacionado con el AutoSave
                bodyAutoFill.style.display = 'flex';

                // Iniciar la obtención de datos desde Firebase de manera asíncrona
                getDataFromFirebaseAsync();

                console.log(`[opc-autofill-autosave-moodle: autofill] Iniciando AutoFill...`);

                // Seleccionar todos los elementos que contienen las formulaciones originales de las preguntas
                const originalAllFormulations = document.querySelectorAll('.formulation.clearfix');
                // Guardar en SessionStorage el estado actual de las preguntas y esperar a que termine el proceso
                await AutoSave_SessionStorage(originalAllFormulations);

                // Mostrar las respuestas auto-guardadas y esperar a que se complete el proceso
                await AutoSave_ShowResponses();

                // Llamar a la función para renderizar expresiones LaTeX en el contenedor correspondiente
                renderizarPreguntas();

                console.log(`[opc-autofill-autosave-moodle: autosave] AutoSave completado.`);
            }

        } else if (esPaginaQuiz && !interruptorAutoFill.checked) {
            // Si estamos en la página de quiz pero el AutoFill está desactivado:
            if (bodyAutoFill) {
                // Ocultar el contenedor del AutoSave
                bodyAutoFill.style.display = 'none';
                // Eliminar del sessionStorage los datos relacionados con las preguntas auto-guardadas
                sessionStorage.removeItem('questions-AutoSave');
            }
        } else if (!esPaginaQuiz) {
            // Si la página actual no es compatible con el AutoSave, se informa por consola
            console.log(`[opc-autofill-autosave-moodle: autosave] Esta página no soporta AutoSave.`);
        }
    };

    // Llamar a la función para actualizar la visibilidad del contenedor sin bloquear la ejecución
    actualizarVisibilidadBody();

    // Configurar el listener para detectar cambios en el estado del interruptor de AutoSave
    interruptorAutoSave.addEventListener('change', () => {
        // Determinar el nuevo estado basado en si el interruptor está marcado o no
        const estadoNuevo = interruptorAutoSave.checked ? ACTIVADO : DESACTIVADO;
        // Guardar el nuevo estado en localStorage
        localStorage.setItem(SWITCH_AUTOSAVE, estadoNuevo);
        console.log(`[opc-autofill-autosave-moodle: autosave] AutoSave: ${estadoNuevo}`);
        // Actualizar la visibilidad y funcionalidad del contenedor según el nuevo estado (sin await para no bloquear)
        actualizarVisibilidadBody();
    });
}