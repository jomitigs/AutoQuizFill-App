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
                mostrarRespuestas_AutoSave();

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
    // 1) Asegurarnos de tener un array de 'formulations'
    if (
        !NodeList.prototype.isPrototypeOf(formulations) &&
        !HTMLCollection.prototype.isPrototypeOf(formulations)
    ) {
        // Si es un solo elemento, lo convertimos en array
        formulations = [formulations];
    }

    // 2) Si no hay elements, no hacemos nada
    if (formulations.length === 0) {
        console.warn('No se pasaron elementos para procesar.');
        return;
    }

    // ——————————————————————————————————————————————————————
    // Definición de funciones por tipo de pregunta
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
            }, 1000)); // Retraso de 1 segundo (ejemplo)
        },
        'draganddrop_image': async (formulation, questionsAutoSave) => {
            await new Promise(resolve => setTimeout(() => {
                draganddrop_image(formulation, questionsAutoSave);
                resolve();
            }, 1000));
        }
        // Otros tipos si los tienes
    };

    // ——————————————————————————————————————————————————————
    // Caso A: Si hay MÁS de una pregunta => se elimina el anterior y se pone el nuevo
    // ——————————————————————————————————————————————————————
    if (formulations.length > 1) {
        console.log('[AutoSave_SessionStorage] Reemplazando completamente sessionStorage (varias preguntas).');

        // Creamos un nuevo objeto vacío (borramos lo anterior)
        const nuevoObj = {};
        let contadorPreguntas = 0;

        for (const formulation of formulations) {
            // Determinar el número de pregunta
            const numeroPregunta =
                forcedQuestionNumber ||
                getQuestionNumber(formulation) ||
                ++contadorPreguntas;

            // Objeto temporal para almacenar info de la pregunta
            const questionsAutoSave = {
                html: '',
                respuestas: [],
                enunciados: [],
                tipo: ''
            };

            // Determinar el tipo de pregunta
            const tipoPregunta = determinarTipoPregunta(formulation);
            console.log(`[AutoSave_SessionStorage] Pregunta ${numeroPregunta}, tipo: ${tipoPregunta}`);

            const func = tipoFunciones[tipoPregunta];
            if (func) {
                await func(formulation, questionsAutoSave);
            }

            // Convertir array con 1 elemento a un string (si aplica)
            if (questionsAutoSave.respuestas.length === 1) {
                questionsAutoSave.respuestas = questionsAutoSave.respuestas[0];
            }

            // ¿Tiene contenido?
            const tieneContenido =
                questionsAutoSave.html ||
                (Array.isArray(questionsAutoSave.respuestas) && questionsAutoSave.respuestas.length > 0) ||
                (!Array.isArray(questionsAutoSave.respuestas) && questionsAutoSave.respuestas) ||
                questionsAutoSave.enunciados.length > 0;

            // Guardar en nuestro objeto final si hay contenido
            if (tieneContenido) {
                nuevoObj[`Pregunta${numeroPregunta}`] = questionsAutoSave;
            }
        }

        // Guardar el objeto completo en sessionStorage
        try {
            sessionStorage.setItem('questions-AutoSave', JSON.stringify(nuevoObj));
            console.log('[AutoSave_SessionStorage] Se ha guardado la información de múltiples preguntas.');
        } catch (error) {
            console.error('Error al guardar en sessionStorage:', error);
        }

    // ——————————————————————————————————————————————————————
    // Caso B: Si es sólo 1 pregunta => actualizamos la que ya exista
    // ——————————————————————————————————————————————————————
    } else {
        console.log('[AutoSave_SessionStorage] Actualizando SOLO UNA pregunta, sin borrar el resto.');

        // 1) Leer lo que ya esté en sessionStorage
        let existingData = {};
        try {
            const storageStr = sessionStorage.getItem('questions-AutoSave');
            if (storageStr) {
                existingData = JSON.parse(storageStr);
            }
        } catch (err) {
            console.error('[AutoSave_SessionStorage] Error al parsear sessionStorage:', err);
            existingData = {};
        }

        // 2) Procesar esa pregunta única (for-of con un solo elemento)
        let contadorPreguntas = 0;
        for (const formulation of formulations) {
            // Determinar número de pregunta
            const numeroPregunta =
                forcedQuestionNumber ||
                getQuestionNumber(formulation) ||
                ++contadorPreguntas;

            // Objeto temporal
            const questionsAutoSave = {
                html: '',
                respuestas: [],
                enunciados: [],
                tipo: ''
            };

            // Determinar el tipo
            const tipoPregunta = determinarTipoPregunta(formulation);
            console.log(`[AutoSave_SessionStorage] Pregunta ${numeroPregunta}, tipo: ${tipoPregunta}`);

            const func = tipoFunciones[tipoPregunta];
            if (func) {
                await func(formulation, questionsAutoSave);
            }

            // Si sólo hay una respuesta en el array, convertirla a string
            if (questionsAutoSave.respuestas.length === 1) {
                questionsAutoSave.respuestas = questionsAutoSave.respuestas[0];
            }

            // Checar si hay contenido
            const tieneContenido =
                questionsAutoSave.html ||
                (Array.isArray(questionsAutoSave.respuestas) && questionsAutoSave.respuestas.length > 0) ||
                (!Array.isArray(questionsAutoSave.respuestas) && questionsAutoSave.respuestas) ||
                questionsAutoSave.enunciados.length > 0;

            // Si hay contenido, actualizamos esa pregunta en existingData
            if (tieneContenido) {
                existingData[`Pregunta${numeroPregunta}`] = questionsAutoSave;
            }
        }

        // 3) Guardar de nuevo en sessionStorage (actualización parcial)
        try {
            sessionStorage.setItem('questions-AutoSave', JSON.stringify(existingData));
            console.log('[AutoSave_SessionStorage] Se ha actualizado la información de 1 pregunta.');
        } catch (error) {
            console.error('Error al guardar en sessionStorage:', error);
        }
    }
}

function mostrarRespuestas_AutoSave() {
    const elementoRespuestasAutoSave = document.getElementById('respuestasautosave');

    if (!elementoRespuestasAutoSave) {
        console.error('El elemento con id "respuestasautosave" no existe en el DOM.');
        return;
    }

    const respuestasGuardadas = sessionStorage.getItem('questions-AutoSave');
    if (!respuestasGuardadas) {
        elementoRespuestasAutoSave.textContent = 'Sin responder';
        console.log('No hay respuestas guardadas, mostrando "Sin responder".');
        return;
    }

    let respuestasObj;
    try {
        respuestasObj = JSON.parse(respuestasGuardadas);
    } catch (error) {
        console.error('Error al parsear las respuestas guardadas:', error);
        elementoRespuestasAutoSave.textContent = 'Sin responder';
        return;
    }

    const respuestasFormateadas = formatearRespuestas(respuestasObj);
    elementoRespuestasAutoSave.innerHTML = respuestasFormateadas || 'Sin responder';
}

/**
 * Formatea las respuestas guardadas en HTML.
 * @param {Object} respuestasObj - Objeto con las respuestas guardadas.
 * @returns {string} HTML formateado de las respuestas.
 */
function formatearRespuestas(respuestasObj) {
    let html = '';

    for (const [clave, valor] of Object.entries(respuestasObj)) {
        if (clave.startsWith('Pregunta')) {
            const { respuestas = [], enunciados = [], tipo = '' } = valor;
            const numeroPregunta = clave;
            const respuestasFinales = Array.isArray(respuestas) ? respuestas : [respuestas];

            let respuestasHTML = '';

            if (enunciados.length > 0 && enunciados.length === respuestasFinales.length) {
                respuestasHTML = enunciados.map((enunciado, index) => {
                    const respuesta = respuestasFinales[index];
                    return `${procesarContenido(enunciado, 'enunciado')} <strong>➔</strong> ${procesarContenido(respuesta, 'respuesta')}`;
                }).join('<br>');
            } else if (respuestasFinales.length > 1) {
                respuestasHTML = formatearRespuestasMultiples(respuestasFinales, tipo);
            } else {
                const respuesta = respuestasFinales[0] || '';
                respuestasHTML = procesarContenido(respuesta, 'respuesta');
            }

            html += `
                <div class="preguntaautosave">
                    ${numeroPregunta}:
                </div>
                <div class="respuestasautosave">
                    ${respuestasHTML || 'Sin responder'}
                </div>`;
        }
    }

    return html;
}

/**
 * Procesa el contenido para reemplazar imágenes, MathML y saltos de línea..
 */
function procesarContenido(contenido, tipo) {
    const imageRegex = /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi;
    const dataUriRegex = /(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg);base64,[a-zA-Z0-9+/=]+)/gi;
    const mathRegex = /<math[^>]*>[\s\S]*?<\/math>/g;

    let procesado = contenido
        .replace(imageRegex, (match) => crearEtiquetaImg(match, tipo))
        .replace(dataUriRegex, (match) => crearEtiquetaImg(match, tipo))
        .replace(mathRegex, (match) => `<span style="font-size: 1.5em;">${match}</span>`)
        .replace(/(\r\n|\n|\r)/g, '<br>');

    return procesado || 'Sin responder';
}

/**
 * Crea una etiqueta <img> con los atributos adecuados.
 */
function crearEtiquetaImg(src, tipo) {
    const altText = tipo === 'enunciado' ? 'Imagen de enunciado' : 'Imagen de respuesta';
    return `<img src="${src}" alt="${altText}" style="max-width: 200px; max-height: 150px;">`;
}

/**
 * Formatea múltiples respuestas según el tipo de pregunta.
 * @param {Array} respuestas - Array de respuestas.
 * @param {string} tipoPregunta - Tipo de la pregunta.
 * @returns {string} HTML formateado de las respuestas múltiples.
 */
function formatearRespuestasMultiples(respuestas, tipoPregunta) {
    if (tipoPregunta === 'draganddrop_text' || tipoPregunta === 'draganddrop_image') {
        return respuestas.map((respuesta, index) => `${index + 1}. ${procesarContenido(respuesta, 'respuesta')}`).join('<br>');
    } else {
        return respuestas.map(respuesta => `• ${procesarContenido(respuesta, 'respuesta')}`).join('<br>');
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
                    await AutoSave_SessionStorage(formulation, numeroPregunta);

                } else {
                    console.log(`La pregunta ${preguntaKey} no existe en questionsAutoSave. Llamando a AutoSave_SessionStorage.`);
                    // Si no encuentra la pregunta, podemos forzar a guardar todo de nuevo
                }
            }
        });
    });

}


