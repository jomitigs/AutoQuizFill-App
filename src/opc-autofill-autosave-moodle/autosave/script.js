import { draganddrop_image } from './questions-types/draganddrop_image.js';
import { draganddrop_text } from './questions-types/draganddrop_text.js';
import { inputchecked_opcionmultiple } from './questions-types/inputchecked_opcionmultiple.js';
import { inputradio_opcionmultiple_verdaderofalso } from './questions-types/inputradio_opcionmultiple_verdaderofalso.js';
import { inputtext_respuestacorta } from './questions-types/inputtext_respuestacorta.js';
import { select_emparejamiento } from './questions-types/select_emparejamiento.js';

import { getQuestionNumber, determinarTipoPregunta } from './helpers.js';

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

    for (const formulation of originalAllFormulations) {
        // Obtener el número de pregunta o incrementar el contador
        const numeroPregunta = getQuestionNumber(formulation) || ++contadorPreguntas;

        const questionsAutoSave = {
            html: '',
            respuestas: [],
            enunciados: [],
            tipo: ''
        };

        let tipoPregunta = determinarTipoPregunta(formulation)

        console.log('[opc-autofill-autosave-moodle: ruta] Tipo de pregunta:', tipoPregunta);
         
        let seEjecutaFuncion = false;

        // Definir una lista de condiciones y sus correspondientes funciones
        const condiciones = [
            {
                cond: tipoPregunta === 'inputradio_opcionmultiple_verdaderofalso',
                func: async () => await inputradio_opcionmultiple_verdaderofalso(formulation, questionsAutoSave)
            },
            {
                cond: tipoPregunta === 'inputchecked_opcionmultiple',
                func: async () => await inputchecked_opcionmultiple(formulation, questionsAutoSave)
            },
            {
                cond: tipoPregunta === 'select_emparejamiento',
                func: async () => await select_emparejamiento(formulation, questionsAutoSave)
            },
            {
                cond: tipoPregunta === 'inputtext_respuestacorta',
                func: async () => await inputtext_respuestacorta(formulation, questionsAutoSave)
            },
            {
                cond: tipoPregunta === 'draganddrop_text',
                func: async () => {
                    await new Promise(resolve => {
                        setTimeout(() => {
                            draganddrop_text(formulation, questionsAutoSave);
                            resolve();
                        }, 1000); // Retraso de 1 segundo
                    });
                }
            },
            {
                cond: tipoPregunta === 'draganddrop_image',
                func: async () => {
                    await new Promise(resolve => {
                        setTimeout(() => {
                            draganddrop_image(formulation, questionsAutoSave);
                            resolve();
                        }, 1000); // Retraso de 1 segundo
                    });
                }
            },
            {
                cond: tipoPregunta === 'inputtext_multiple_respuestacorta',
                func: async () => await inputtext_multiple_respuestacorta(formulation, questionsAutoSave)
            },
            {
                cond: tipoPregunta === 'inputtext_multiple_respuestacorta_select',
                func: async () => await inputtext_multiple_respuestacorta_select(formulation, questionsAutoSave)
            }
        ];


        // Ejecutar la primera condición que se cumpla
        for (const { cond, func } of condiciones) {
            if (cond) {
                await func();
                seEjecutaFuncion = true;
                break; // Salir del bucle de condiciones una vez que se ejecuta una función
            }
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
    } // Cierre correcto del bucle for

    // Guardar todas las preguntas en localStorage
    try {
        sessionStorage.setItem('questions-AutoSave', JSON.stringify(todasLasPreguntas));
    } catch (error) {
        console.error('Error saving to sessionStorage', error);
    }

}