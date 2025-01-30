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
        }
        // 'inputtext_multiple_respuestacorta': inputtext_multiple_respuestacorta,
        // 'inputtext_multiple_respuestacorta_select': inputtext_multiple_respuestacorta_select
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
        detectarCambiosEnForm();
    } catch (error) {
        console.error('Error al guardar en sessionStorage', error);
    }
}


// -----------------------------------------------------------------------
// Versión reducida que SOLO actualiza UNA pregunta (sin volver a mapear todo):
// -----------------------------------------------------------------------
async function AutoSave_LocalStorage_Simple(formulation, preguntaObj) {
    // Funciones de mapeo (mismas que en la función "grande", pero reusadas)
    const tipoFunciones = {
        'inputradio_opcionmultiple_verdaderofalso': inputradio_opcionmultiple_verdaderofalso,
        'inputchecked_opcionmultiple': inputchecked_opcionmultiple,
        'select_emparejamiento': select_emparejamiento,
        'inputtext_respuestacorta': inputtext_respuestacorta,
        'draganddrop_text': async (form, obj) => {
            await new Promise(resolve => setTimeout(() => {
                draganddrop_text(form, obj);
                resolve();
            }, 1000));
        },
        'draganddrop_image': async (form, obj) => {
            await new Promise(resolve => setTimeout(() => {
                draganddrop_image(form, obj);
                resolve();
            }, 1000));
        }
    };

    // Ya tenemos el tipo en preguntaObj.tipo (no usamos determinarTipoPregunta)
    const tipo = preguntaObj.tipo;
    const func = tipoFunciones[tipo];

    if (func) {
        // Ejecutamos la lógica específica solo para ESTE formulation
        await func(formulation, preguntaObj);

        // Ajustamos si hay un solo elemento en respuestas
        if (Array.isArray(preguntaObj.respuestas) && preguntaObj.respuestas.length === 1) {
            preguntaObj.respuestas = preguntaObj.respuestas[0];
        }
    }
}

// -----------------------------------------------------------------------
// Función que deteca los cambios y actúa según exista o no 'questions-AutoSave'
// -----------------------------------------------------------------------
function detectarCambiosEnForm() {
    // Selecciona todos los inputs y selects que quieres escuchar
    const elementos = document.querySelectorAll(
        'input[type="radio"], select, input[type="checkbox"], input[type="text"]'
    );

    elementos.forEach(el => {
        el.addEventListener('change', async (event) => {
            // Verificamos si 'questions-AutoSave' existe en localStorage
            let questionsAutoSaveStr = localStorage.getItem('questions-AutoSave');

            if (!questionsAutoSaveStr) {
                // Si NO existe, llamamos la función general y guardamos todo por primera vez
                await AutoSave_LocalStorage();
            } else {
                // Si SÍ existe, lo parseamos
                const questionsAutoSave = JSON.parse(questionsAutoSaveStr);

                // Ubicamos la .formulation.clearfix donde ocurrió el cambio
                const formulation = event.target.closest('.formulation.clearfix');
                if (!formulation) return; // Si por algún motivo no lo encuentra, salimos

                // Obtenemos el número de la pregunta (por ejemplo con getQuestionNumber)
                const numeroPregunta = getQuestionNumber(formulation);
                if (!numeroPregunta) return; // Si no lo obtienes, salimos

                // Construimos la llave, por ejemplo "Pregunta1", "Pregunta2", etc.
                const preguntaKey = `Pregunta${numeroPregunta}`;

                // Revisamos si esa pregunta ya existe en el objeto guardado
                if (questionsAutoSave[preguntaKey]) {
                    // Recuperamos ese objeto (ya contiene "tipo", "html", etc.)
                    const preguntaObj = questionsAutoSave[preguntaKey];

                    // Llamamos la versión reducida que actualiza SOLO ESTA PREGUNTA
                    await AutoSave_LocalStorage_Simple(formulation, preguntaObj);

                    // Volvemos a guardar la pregunta actualizada
                    questionsAutoSave[preguntaKey] = preguntaObj;
                    localStorage.setItem('questions-AutoSave', JSON.stringify(questionsAutoSave));
                } else {
                    // Si no encuentra la pregunta, podemos forzar a guardar todo de nuevo
                    // o agregarla manualmente. Aquí se deja la forma genérica:
                    await AutoSave_LocalStorage();
                }
            }
        });
    });
}


detectarCambiosEnForm();

