import { draganddrop_image } from './questions-types/draganddrop_image.js';
import { draganddrop_text } from './questions-types/draganddrop_text.js';
import { inputchecked_opcionmultiple } from './questions-types/inputchecked_opcionmultiple.js';
import { inputradio_opcionmultiple_verdaderofalso } from './questions-types/inputradio_opcionmultiple_verdaderofalso.js';
import { inputtext_respuestacorta } from './questions-types/inputtext_respuestacorta.js';
import { select_emparejamiento } from './questions-types/select_emparejamiento.js';

import { getQuestionNumber, determinarTipoPregunta } from '../autofill-autosave-helpers.js';

// Exporta una función llamada contenedorAutoSave_js
export function contenedorAutoSave_js() {
    const SWITCH_ID = 'switch-autosave';
    const BODY_ID = 'body-autoquiz-autosave';
    const STORAGE_KEY = 'autosave-autoquizfillapp';
    const ACTIVADO = 'activado';
    const DESACTIVADO = 'desactivado';

    const interruptorAutoSave = document.getElementById(SWITCH_ID);
    const bodyAutoSave = document.getElementById(BODY_ID);

    if (!interruptorAutoSave) {
        console.error(`Error: No se encontró el elemento con ID '${SWITCH_ID}'`);
        return;
    }

    const estadoGuardado = localStorage.getItem(STORAGE_KEY) || DESACTIVADO;
    console.log(`[opc-autofill-autosave-moodle: autosave] AutoSave: ${estadoGuardado}`);

    interruptorAutoSave.checked = estadoGuardado === ACTIVADO;

    // **Hacer que actualizarVisibilidadBody sea async**
    const actualizarVisibilidadBody = async () => {
        const esPaginaQuiz = window.location.href.includes('/mod/quiz/attempt.php');

        if (esPaginaQuiz && interruptorAutoSave.checked) {
            if (bodyAutoSave) {
                bodyAutoSave.style.display = 'flex';
                console.log(`[opc-autofill-autosave-moodle: autosave] Iniciando AutoSave...`);
                await AutoSave_LocalStorage(); // Espera a que termine AutoSave
                console.log(`[opc-autofill-autosave-moodle: autosave] AutoSave completado.`);
            }
        } else if (interruptorAutoSave.checked) {
            console.log(`[opc-autofill-autosave-moodle: autosave] Esta página no soporta AutoSave.`);
        }
    };

    // **Llamar la función sin await para que no bloquee la ejecución**
    actualizarVisibilidadBody();

    // **Manejar cambios en el interruptor**
    interruptorAutoSave.addEventListener('change', () => {
        const estadoNuevo = interruptorAutoSave.checked ? ACTIVADO : DESACTIVADO;
        localStorage.setItem(STORAGE_KEY, estadoNuevo);
        console.log(`[opc-autofill-autosave-moodle: autosave] AutoSave: ${estadoNuevo}`);

        actualizarVisibilidadBody(); // Llamar sin await
    });
}


async function AutoSave_LocalStorage() {
    let contadorPreguntas = 0; // Contador de preguntas
    const todasLasPreguntas = {}; // Objeto para almacenar todas las preguntas

    // Obtener los elementos con clase '.formulation.clearfix'
    const originalAllFormulations = document.querySelectorAll('.formulation.clearfix');

    // Mapeo de tipos de pregunta a sus funciones correspondientes
    const tipoFunciones = {
        'inputradio_opcionmultiple_verdaderofalso': inputradio_opcionmultiple_verdaderofalso,
        'inputchecked_opcionmultiple': inputchecked_opcionmultiple,
        'select_emparejamiento': select_emparejamiento,
        'inputtext_respuestacorta': inputtext_respuestacorta,
        'draganddrop_text': async (formulation, questionsAutoSave) => {
            await new Promise(resolve => setTimeout(() => {
                draganddrop_text(formulation, questionsAutoSave);
                resolve();
            }, 1000)); // Retraso de 1 segundo
        },
        'draganddrop_image': async (formulation, questionsAutoSave) => {
            await new Promise(resolve => setTimeout(() => {
                draganddrop_image(formulation, questionsAutoSave);
                resolve();
            }, 1000)); // Retraso de 1 segundo
        },
        'inputtext_multiple_respuestacorta': inputtext_multiple_respuestacorta,
        'inputtext_multiple_respuestacorta_select': inputtext_multiple_respuestacorta_select
    };

    for (const formulation of originalAllFormulations) {
        // Obtener el número de pregunta o incrementar el contador
        const numeroPregunta = getQuestionNumber(formulation) || ++contadorPreguntas;

        const questionsAutoSave = {
            html: '',
            respuestas: [],
            enunciados: [],
            tipo: ''
        };

        const tipoPregunta = determinarTipoPregunta(formulation);
        console.log('[opc-autofill-autosave-moodle: ruta] Tipo de pregunta:', tipoPregunta);

        const func = tipoFunciones[tipoPregunta];
        let seEjecutaFuncion = false;

        if (func) {
            await func(formulation, questionsAutoSave);
            seEjecutaFuncion = true;
        }

        // Convertir a string si solo hay una respuesta y agregar si hay contenido relevante
        if (seEjecutaFuncion) {
            if (questionsAutoSave.respuestas.length === 1) {
                questionsAutoSave.respuestas = questionsAutoSave.respuestas[0];
            }

            if (questionsAutoSave.html || questionsAutoSave.respuestas.length > 0 || questionsAutoSave.enunciados.length > 0) {
                todasLasPreguntas[`Pregunta${numeroPregunta}`] = questionsAutoSave;
            }
        }
    }

    // Guardar todas las preguntas en sessionStorage
    try {
        sessionStorage.setItem('questions-AutoSave', JSON.stringify(todasLasPreguntas));
    } catch (error) {
        console.error('Error al guardar en sessionStorage', error);
    }
}
