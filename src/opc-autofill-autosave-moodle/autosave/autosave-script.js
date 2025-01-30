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
                const originalAllFormulations = document.querySelectorAll('.formulation.clearfix');
                await AutoSave_SessionStorage(originalAllFormulations); // Espera a que termine AutoSave
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


async function AutoSave_SessionStorage(formulations, forcedQuestionNumber = null) {
    let contadorPreguntas = 0; // Contador de preguntas
    const todasLasPreguntas = {}; // Objeto para almacenar todas las preguntas

    // ——————————————————————————————————————————————————————
    // 1) Determinar si 'formulations' es un solo elemento o una lista
    // ——————————————————————————————————————————————————————
    // Si NO es una NodeList / HTMLCollection, asumimos que es un solo elemento y lo metemos en un array
    if (
        !NodeList.prototype.isPrototypeOf(formulations) && 
        !HTMLCollection.prototype.isPrototypeOf(formulations)
    ) {
        formulations = [formulations]; 
    }

    // ——————————————————————————————————————————————————————
    // 2) Definición de funciones por tipo de pregunta
    // ——————————————————————————————————————————————————————
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
        // Puedes habilitar o agregar otras funciones:
        // 'inputtext_multiple_respuestacorta': inputtext_multiple_respuestacorta,
        // 'inputtext_multiple_respuestacorta_select': inputtext_multiple_respuestacorta_select
    };

    // ——————————————————————————————————————————————————————
    // 3) Iterar sobre los elementos (ya sea un array de uno o varios)
    // ——————————————————————————————————————————————————————
    for (const formulation of formulations) {

        // Determinar el número de pregunta
        //  - Si se proporciona forcedQuestionNumber, lo usamos.
        //  - De lo contrario, usamos getQuestionNumber(formulation) o lo incrementamos.
        const numeroPregunta = forcedQuestionNumber 
            || getQuestionNumber(formulation) 
            || ++contadorPreguntas;

        // Objeto con la estructura para guardar datos
        const questionsAutoSave = {
            html: '',
            respuestas: [],
            enunciados: [],
            tipo: ''
        };

        // Determinar el tipo de pregunta (asume que existe la función determinarTipoPregunta)
        const tipoPregunta = determinarTipoPregunta(formulation);
        console.log(`[opc-autofill-autosave-moodle: ruta] Pregunta ${numeroPregunta}, tipo: ${tipoPregunta}`);

        // Tomar la función correspondiente, si existe
        const func = tipoFunciones[tipoPregunta];
        let seEjecutaFuncion = false;

        // Ejecutar la función de guardado si la encontramos
        if (func) {
            await func(formulation, questionsAutoSave);
            seEjecutaFuncion = true;
        }

        // Convertir a string si solo hay una respuesta y agregar si hay contenido relevante
        if (seEjecutaFuncion) {
            if (questionsAutoSave.respuestas.length === 1) {
                questionsAutoSave.respuestas = questionsAutoSave.respuestas[0];
            }

            if (
                questionsAutoSave.html ||
                (Array.isArray(questionsAutoSave.respuestas) && questionsAutoSave.respuestas.length > 0) ||
                (!Array.isArray(questionsAutoSave.respuestas) && questionsAutoSave.respuestas) ||
                questionsAutoSave.enunciados.length > 0
            ) {
                todasLasPreguntas[`Pregunta${numeroPregunta}`] = questionsAutoSave;
            }
        }
    }

    // ——————————————————————————————————————————————————————
    // 4) Guardar todas las preguntas en sessionStorage
    // ——————————————————————————————————————————————————————
    try {
        sessionStorage.setItem('questions-AutoSave', JSON.stringify(todasLasPreguntas));
    } catch (error) {
        console.error('Error al guardar en sessionStorage', error);
    }
}


// -----------------------------------------------------------------------
// Función que detecta los cambios y actúa según exista o no 'questions-AutoSave'
// -----------------------------------------------------------------------
function detectarCambiosPreguntas() {
 
    // Selecciona todos los inputs y selects que quieres escuchar
    const elementos = document.querySelectorAll(
        'input[type="radio"], select, input[type="checkbox"], input[type="text"]'
    );

    elementos.forEach(el => {
        el.addEventListener('change', async (event) => {
            console.log('[opc-autofill-autosave-moodle: autosave] Cambio detectado');
            
            // Verificamos si 'questions-AutoSave' existe en localStorage
            let questionsAutoSaveStr = sessionStorage.getItem('questions-AutoSave');
           
            if (!questionsAutoSaveStr) {
                console.log("'questions-AutoSave' no existe. Llamando a AutoSave_SessionStorage por primera vez.");
                // Si NO existe, llamamos la función general y guardamos todo por primera vez
                const originalAllFormulations = document.querySelectorAll('.formulation.clearfix');
                await AutoSave_SessionStorage(originalAllFormulations);
            } else {
                // Si SÍ existe, lo parseamos
                const questionsAutoSave = JSON.parse(questionsAutoSaveStr);

                // Ubicamos la .formulation.clearfix donde ocurrió el cambio
                const formulation = event.target.closest('.formulation.clearfix');
                
                if (!formulation) {
                    console.warn('No se encontró el elemento .formulation.clearfix cercano. Saliendo.');
                    return; // Si por algún motivo no lo encuentra, salimos
                }

                // Obtenemos el número de la pregunta (por ejemplo con getQuestionNumber)
                const numeroPregunta = getQuestionNumber(formulation);

                console.log('[opc-autofill-autosave-moodle: autosave] Actualizando Pregunta', numeroPregunta);
                if (!numeroPregunta) {
                    console.warn('No se pudo obtener el número de pregunta. Saliendo.');
                    return; // Si no lo obtienes, salimos
                }

                // Construimos la llave, por ejemplo "Pregunta1", "Pregunta2", etc.
                const preguntaKey = `Pregunta${numeroPregunta}`;
                
                // Revisamos si esa pregunta ya existe en el objeto guardado
                if (questionsAutoSave[preguntaKey]) {
                    // Recuperamos ese objeto (ya contiene "tipo", "html", etc.)
                    const preguntaObj = questionsAutoSave[preguntaKey];
                    
                    // Llamamos la versión reducida que actualiza SOLO ESTA PREGUNTA
                    await AutoSave_SessionStorage(formulation,numeroPregunta);

                } else {
                    console.log(`La pregunta ${preguntaKey} no existe en questionsAutoSave. Llamando a AutoSave_SessionStorage.`);
                    // Si no encuentra la pregunta, podemos forzar a guardar todo de nuevo
                    // o agregarla manualmente. Aquí se deja la forma genérica:
                    await AutoSave_SessionStorage();
                    console.log('AutoSave_SessionStorage ejecutado para agregar la nueva pregunta.');
                }
            }
        });
    });

}


