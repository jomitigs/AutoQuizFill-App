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
                detectarCambiosPreguntas();
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
        console.log(`[opc-autofill-autosave-moodle: ruta] Pregunta ${numeroPregunta}, tipo: ${tipoPregunta}`);

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


async function AutoSave_LocalStorage_Simple(formulation, preguntaObj) {
    console.log('--- Iniciando AutoSave_LocalStorage_Simple ---');
    console.log('formulation:', formulation);
    console.log('preguntaObj:', preguntaObj);

    // Funciones de mapeo (mismas que en la función "grande", pero reusadas)
    const tipoFunciones = {
        'inputradio_opcionmultiple_verdaderofalso': inputradio_opcionmultiple_verdaderofalso,
        'inputchecked_opcionmultiple': inputchecked_opcionmultiple,
        'select_emparejamiento': select_emparejamiento,
        'inputtext_respuestacorta': inputtext_respuestacorta,
        'draganddrop_text': async (form, obj) => {
            console.log('Ejecutando draganddrop_text');
            await new Promise(resolve => setTimeout(() => {
                draganddrop_text(form, obj);
                console.log('draganddrop_text completado');
                resolve();
            }, 1000));
        },
        'draganddrop_image': async (form, obj) => {
            console.log('Ejecutando draganddrop_image');
            await new Promise(resolve => setTimeout(() => {
                draganddrop_image(form, obj);
                console.log('draganddrop_image completado');
                resolve();
            }, 1000));
        }
    };
    console.log('tipoFunciones definido:', tipoFunciones);

    // Ya tenemos el tipo en preguntaObj.tipo (no usamos determinarTipoPregunta)
    const tipo = preguntaObj.tipo;
    console.log('Tipo de pregunta:', tipo);

    const func = tipoFunciones[tipo];
    console.log('Función mapeada para el tipo:', func);

    if (func) {
        console.log('Ejecutando función específica para el tipo de pregunta.');
        // Ejecutamos la lógica específica solo para ESTE formulation
        await func(formulation, preguntaObj);
        console.log('Función específica ejecutada.');

        // Ajustamos si hay un solo elemento en respuestas
        if (Array.isArray(preguntaObj.respuestas)) {
            console.log('preguntaObj.respuestas es un array:', preguntaObj.respuestas);
            if (preguntaObj.respuestas.length === 1) {
                console.log('Solo hay una respuesta, ajustando preguntaObj.respuestas.');
                preguntaObj.respuestas = preguntaObj.respuestas[0];
                console.log('preguntaObj.respuestas ajustado a:', preguntaObj.respuestas);
            } else {
                console.log('Múltiples respuestas, no se realiza ajuste.');
            }
        } else {
            console.log('preguntaObj.respuestas no es un array, no se realiza ajuste.');
        }
    } else {
        console.warn('No se encontró una función para el tipo de pregunta:', tipo);
    }

    console.log('--- Finalizando AutoSave_LocalStorage_Simple ---');
}

// -----------------------------------------------------------------------
// Función que detecta los cambios y actúa según exista o no 'questions-AutoSave'
// -----------------------------------------------------------------------
function detectarCambiosPreguntas() {
    console.log('--- Iniciando detectarCambiosPreguntas ---');

    // Selecciona todos los inputs y selects que quieres escuchar
    const elementos = document.querySelectorAll(
        'input[type="radio"], select, input[type="checkbox"], input[type="text"]'
    );

    elementos.forEach(el => {
        el.addEventListener('change', async (event) => {
            console.log('Cambio detectado en elemento:', event.target);
            
            // Verificamos si 'questions-AutoSave' existe en localStorage
            let questionsAutoSaveStr = sessionStorage.getItem('questions-AutoSave');
            console.log('questions-AutoSave en sessionStorage:', questionsAutoSaveStr);

            if (!questionsAutoSaveStr) {
                console.log("'questions-AutoSave' no existe. Llamando a AutoSave_LocalStorage por primera vez.");
                // Si NO existe, llamamos la función general y guardamos todo por primera vez
                await AutoSave_LocalStorage();
                console.log('AutoSave_LocalStorage ejecutado para la primera vez.');
            } else {
                console.log("'questions-AutoSave' existe. Parseando el contenido.");
                // Si SÍ existe, lo parseamos
                const questionsAutoSave = JSON.parse(questionsAutoSaveStr);
                console.log('questionsAutoSave parseado:', questionsAutoSave);

                // Ubicamos la .formulation.clearfix donde ocurrió el cambio
                const formulation = event.target.closest('.formulation.clearfix');
                console.log('Formulation encontrada:', formulation);
                if (!formulation) {
                    console.warn('No se encontró el elemento .formulation.clearfix cercano. Saliendo.');
                    return; // Si por algún motivo no lo encuentra, salimos
                }

                // Obtenemos el número de la pregunta (por ejemplo con getQuestionNumber)
                const numeroPregunta = getQuestionNumber(formulation);
                console.log('Número de pregunta obtenido:', numeroPregunta);
                if (!numeroPregunta) {
                    console.warn('No se pudo obtener el número de pregunta. Saliendo.');
                    return; // Si no lo obtienes, salimos
                }

                // Construimos la llave, por ejemplo "Pregunta1", "Pregunta2", etc.
                const preguntaKey = `Pregunta${numeroPregunta}`;
                console.log('Llave de pregunta construida:', preguntaKey);

                // Revisamos si esa pregunta ya existe en el objeto guardado
                if (questionsAutoSave[preguntaKey]) {
                    console.log(`La pregunta ${preguntaKey} existe en questionsAutoSave.`);
                    // Recuperamos ese objeto (ya contiene "tipo", "html", etc.)
                    const preguntaObj = questionsAutoSave[preguntaKey];
                    console.log('preguntaObj recuperado:', preguntaObj);

                    // Llamamos la versión reducida que actualiza SOLO ESTA PREGUNTA
                    await AutoSave_LocalStorage_Simple(formulation, preguntaObj);
                    console.log('AutoSave_LocalStorage_Simple ejecutado.');

                    // Volvemos a guardar la pregunta actualizada
                    questionsAutoSave[preguntaKey] = preguntaObj;
                    console.log(`Actualizando questionsAutoSave[${preguntaKey}] con preguntaObj:`, preguntaObj);
                    localStorage.setItem('questions-AutoSave', JSON.stringify(questionsAutoSave));
                    console.log("'questions-AutoSave' actualizado en localStorage.");
                } else {
                    console.log(`La pregunta ${preguntaKey} no existe en questionsAutoSave. Llamando a AutoSave_LocalStorage.`);
                    // Si no encuentra la pregunta, podemos forzar a guardar todo de nuevo
                    // o agregarla manualmente. Aquí se deja la forma genérica:
                    await AutoSave_LocalStorage();
                    console.log('AutoSave_LocalStorage ejecutado para agregar la nueva pregunta.');
                }
            }
        });
    });

    console.log('--- Finalizando detectarCambiosPreguntas ---');
}


