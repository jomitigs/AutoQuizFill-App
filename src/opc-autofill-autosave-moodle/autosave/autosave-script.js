import { draganddrop_image } from './questions-types/draganddrop_image.js';
import { draganddrop_text } from './questions-types/draganddrop_text.js';
import { inputchecked_opcionmultiple } from './questions-types/2_inputchecked_opcionmultiple.js';
import { inputradio_opcionmultiple_verdaderofalso } from './questions-types/1_inputradio_opcionmultiple_verdaderofalso.js';
import { inputtext_respuestacorta } from './questions-types/inputtext_respuestacorta.js';
import { select_emparejamiento } from './questions-types/3_select_emparejamiento.js';

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
                AutoSave_ShowResponses();

                detectarCambiosPreguntas();

                console.log(`[opc-autofill-autosave-moodle: autosave] AutoSave completado.`);
            }
        } else if (esPaginaQuiz && !interruptorAutoSave.checked) {
            if (bodyAutoSave) {
                bodyAutoSave.style.display = 'none';
            }

        } else if (!esPaginaQuiz) {
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

async function AutoSave_SessionStorage(questionsHtml, numeroQuestionUpdate = null) {

    // 1) Verificar si "questionsHtml" es una colección (NodeList o HTMLCollection).
    //    Si no lo es, se convierte a array para procesarlo de forma uniforme.
    if (!NodeList.prototype.isPrototypeOf(questionsHtml) && !HTMLCollection.prototype.isPrototypeOf(questionsHtml)) {
        questionsHtml = [questionsHtml];
    }

    // 2) Si el array está vacío, se muestra un error y se termina la ejecución.
    if (questionsHtml.length === 0) {
        console.error('[AutoSave_SessionStorage] No se pudo ejecutar porque no cumple con los argumentos correctos');
        return;
    }

    const funcQuestionType = {
        'inputradio_opcionmultiple_verdaderofalso': inputradio_opcionmultiple_verdaderofalso,
        'inputchecked_opcionmultiple': inputchecked_opcionmultiple,
        'select_emparejamiento': select_emparejamiento,
        'inputtext_respuestacorta': inputtext_respuestacorta,
        'draganddrop_text': async (questionHtml) => {
            return await new Promise(resolve => setTimeout(() => {
                resolve(draganddrop_text(questionHtml));
            }, 1000));
        },
        'draganddrop_image': async (questionHtml) => {
            return await new Promise(resolve => setTimeout(() => {
                resolve(draganddrop_image(questionHtml));
            }, 1000));
        }
        // Otros tipos se pueden agregar de forma similar...
    };

    // ——————————————————————————————————————————————————————
    // Determinar el caso a ejecutar:
    //   - Caso A: Si hay más de 1 elemento O si hay 1 elemento y numeroQuestionUpdate es null.
    //   - Caso B: Si hay 1 elemento y numeroQuestionUpdate tiene un valor.
    // ——————————————————————————————————————————————————————
    if (questionsHtml.length > 1 || (questionsHtml.length === 1 && numeroQuestionUpdate === null)) {
        // *************** Caso A ***************

        // Se crea un objeto nuevo para almacenar la información de todas las preguntas.
        const questionsHtmlObject = {};
        let contadorPreguntas = 0;

        // Iterar sobre cada elemento de "questionsHtml"
        for (const questionHtml of questionsHtml) {
            // Determinar el número de la pregunta:
            // - Se utiliza numeroQuestionUpdate si tiene un valor.
            // - Si no, se intenta obtener mediante obtenerNumeroPregunta.
            // - Finalmente, se incrementa un contador si aún no se determina.
            const numberQuestion =
                numeroQuestionUpdate ||
                getQuestionNumber(questionHtml) ||
                ++contadorPreguntas;

            // Determinar el tipo de pregunta mediante la función determinarTipoPregunta.
            const questionType = determinarTipoPregunta(questionHtml);
            console.log(`[AutoSave_SessionStorage] Pregunta ${numberQuestion}, tipo: ${questionType}`);

            // Buscar la función correspondiente al tipo de pregunta.
            const funcion = funcQuestionType[questionType];
            let questionData;
            if (funcion) {
                // Se invoca la función y se espera que retorne el objeto con la información de la pregunta.
                questionData = await funcion(questionHtml);
            } else {
                console.warn(`No se encontró función para el tipo de pregunta: ${questionType}`);
                continue;
            }

            // Se almacena directamente la información de la pregunta, usando la clave "PreguntaNueva" seguida del número.
            questionsHtmlObject[`Pregunta${numberQuestion}`] = questionData;
        }

        // Guardar el objeto completo en sessionStorage.
        try {
            sessionStorage.setItem('questions-AutoSave', JSON.stringify(questionsHtmlObject));
            console.log('[AutoSave_SessionStorage] Se ha guardado la información de múltiples preguntas.');
        } catch (error) {
            console.error('Error al guardar en sessionStorage:', error);
        }

    } else {
        // *************** Caso B ***************

        // Leer la información existente en sessionStorage.
        let datosExistentes = {};
        try {
            const cadenaAlmacenamiento = sessionStorage.getItem('questions-AutoSave');
            if (cadenaAlmacenamiento) {
                datosExistentes = JSON.parse(cadenaAlmacenamiento);
            }
        } catch (err) {
            console.error('[AutoSave_SessionStorage] Error al parsear sessionStorage:', err);
            datosExistentes = {};
        }

        // Procesar la única pregunta.
        const questionHtml = questionsHtml[0];
        // En este caso, numeroQuestionUpdate tiene un valor y se usa directamente.
        const numberQuestion = numeroQuestionUpdate;
        const questionType = determinarTipoPregunta(questionHtml);
        console.log(`[AutoSave_SessionStorage] Pregunta ${numberQuestion}, tipo: ${questionType}`);

        const funcion = funcQuestionType[questionType];
        let questionData;
        if (funcion) {
            questionData = await funcion(questionHtml);
        } else {
            console.warn(`No se encontró función para el tipo de pregunta: ${questionType}`);
            return;
        }

        // Se almacena directamente la información de la pregunta, usando la clave "PreguntaNueva" seguida del número.
        datosExistentes[`Pregunta${numberQuestion}`] = questionData;

        // Guardar el objeto actualizado en sessionStorage.
        try {
            sessionStorage.setItem('questions-AutoSave', JSON.stringify(datosExistentes));
            console.log('[AutoSave_SessionStorage] Se ha actualizado la información de 1 pregunta.');
        } catch (error) {
            console.error('Error al guardar en sessionStorage:', error);
        }
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
            // Si el cambio se produjo dentro del contenedor "barra-lateral-autoquizfillapp", se ignora
            if (event.target.closest('#barra-lateral-autoquizfillapp')) {
                return;
            }

            console.log('[opc-autofill-autosave-moodle: autosave] Cambio detectado');

            // Verificamos si 'questions-AutoSave' existe en sessionStorage
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

// Función principal para mostrar las respuestas guardadas (AutoSave)
function AutoSave_ShowResponses() {
    // Se obtiene el elemento del DOM con id "respuestasautosave"
    const elementoRespuestasAutoSave = document.getElementById('respuestasautosave');

    // Si el elemento no existe, se muestra un error y se detiene la ejecución
    if (!elementoRespuestasAutoSave) {
        console.error('El elemento con id "respuestasautosave" no existe en el DOM.');
        return;
    }

    // Se recuperan las respuestas guardadas en sessionStorage
    const respuestasGuardadas = sessionStorage.getItem('questions-AutoSave');
    if (!respuestasGuardadas) {
        elementoRespuestasAutoSave.innerHTML = '<span style="font-weight:500; color:red;">Sin responder</span>';
        console.log('No hay respuestas guardadas, mostrando "Sin responder".');
        return;
    }

    let respuestasObj;
    try {
        // Se parsea el JSON de respuestas
        respuestasObj = JSON.parse(respuestasGuardadas);
    } catch (error) {
        console.error('Error al parsear las respuestas guardadas:', error);
        elementoRespuestasAutoSave.innerHTML = '<span style="font-weight:500; color:red;">Sin responder</span>';
        return;
    }

    // Se formatean las respuestas según la estructura del objeto y se muestran en el DOM
    const respuestasFormateadas = formatResponses(respuestasObj);
    elementoRespuestasAutoSave.innerHTML = respuestasFormateadas || '<span style="font-weight:500; color:red;">Sin responder</span>';
}

/**
 * Función para formatear las respuestas guardadas en HTML.
 * Se itera sobre cada propiedad del objeto.
 *
 * Si el objeto (por ejemplo, "Pregunta1") contiene la propiedad "opcionesRespuesta",
 * se asume la nueva estructura y se muestra:
 *    - Nombre de la pregunta (usando la clave, ej. "Pregunta 1")
 *    - Enunciado
 *    - Opciones de respuesta (con literales a., b., c., etc.) donde la opción que coincide con la respuesta seleccionada se marca en color y negrita (literal y texto).
 *
 * De lo contrario, se asume la estructura antigua (usando "enunciados" y "respuestas").
 *
 * Al final de cada bloque de pregunta se inserta un separador.
 *
 * @param {Object} respuestasObj - Objeto con las respuestas guardadas.
 * @returns {string} - HTML formateado.
 */
function formatResponses(respuestasObj) {
    let html = '';

    // Se itera sobre cada par clave-valor del objeto de respuestas
    for (const [clave, valor] of Object.entries(respuestasObj)) {
        // Se extrae el número de la pregunta (por ejemplo, de "Pregunta1" se obtiene "1")
        let numeroPregunta = clave.replace(/[^\d]/g, '');
        
        if (valor.hasOwnProperty('opcionesRespuesta')) {
            // Nueva estructura
            html += `
                <div class="preguntaautosave" id="${clave}">
                    <strong>Pregunta ${numeroPregunta}:</strong> ${processContent(valor.enunciado, 'enunciado')}
                </div>
                <div class="respuestasautosave">
                    ${formatOptions(valor.opcionesRespuesta, valor.respuestaCorrecta)}
                </div>
                <hr style="margin-top: 0px; margin-bottom: 5px;">
            `;
        } else {
            // Se asume la estructura antigua: se esperan propiedades "enunciados" y "respuestas"
            const { respuestas = [], enunciados = [], tipo = '' } = valor;
            // Se asegura que respuestasFinales sea un arreglo
            const respuestasFinales = Array.isArray(respuestas) ? respuestas : [respuestas];
            // Se obtiene el contenido HTML de la respuesta usando la función consolidada getResponseContent
            const contenidoRespuesta = getResponseContent(enunciados, respuestasFinales, tipo, clave);

            html += `
                <div class="preguntaautosave" id="${clave}">
                    <strong>Pregunta ${numeroPregunta}:</strong>
                </div>
                <div class="respuestasautosave">
                    ${contenidoRespuesta}
                </div>
                <hr style="margin-top:0px; margin-bottom:5px;">
            `;
        }
    }

    return html;
}

/**
 * Función que determina el contenido HTML de una respuesta.
 * Aquí se agrupa la lógica:
 * - Si existen enunciados y su cantidad coincide con la de respuestas, se procesan en pares.
 * - Si hay múltiples respuestas sin enunciados o la cantidad de enunciados no coincide, se muestran las respuestas en negrita.
 * - Si es una sola respuesta, se muestra en negrita.
 * - Si el contenido resultante está vacío, se muestra "Sin responder".
 *
 * @param {Array} enunciados - Arreglo de enunciados (puede estar vacío).
 * @param {Array} respuestasFinales - Arreglo de respuestas.
 * @param {string} tipo - Tipo de pregunta.
 * @param {string} numeroPregunta - Identificador de la pregunta (ej. "Pregunta1").
 * @returns {string} - HTML con el contenido de la respuesta formateado.
 */
function getResponseContent(enunciados, respuestasFinales, tipo, numeroPregunta) {
    let respuestasHTML = '';

    if (enunciados.length > 0 && enunciados.length === respuestasFinales.length) {
        respuestasHTML = enunciados
            .map((enunciado, index) => {
                const respuesta = respuestasFinales[index];
                return `${processContent(enunciado, 'enunciado')} <strong>➔</strong> ${processContent(respuesta, 'respuesta')}`;
            })
            .join('<br>');
    } else if (respuestasFinales.length > 1) {
        // Si hay enunciados pero la cantidad no coincide, se muestran todas las respuestas en negrita.
        if (enunciados.length > 0 && enunciados.length !== respuestasFinales.length) {
            respuestasHTML = respuestasFinales
                .map((respuesta) => `<strong>${processContent(respuesta, 'respuesta')}</strong>`)
                .join('<br>');
        } else {
            respuestasHTML = formatMultipleResponses(respuestasFinales, tipo);
        }
    } else {
        const respuesta = respuestasFinales[0] || '';
        respuestasHTML = `<strong>${processContent(respuesta, 'respuesta')}</strong>`;
    }

    if (!respuestasHTML) {
        respuestasHTML = `<span id="${numeroPregunta}" style="font-weight:500; color:red;">Sin responder</span>`;
    }

    return respuestasHTML;
}

/**
 * Función para formatear el arreglo de opciones de respuesta.
 * Si hay más de una opción, se les asignan literales (a., b., c., …)
 * Se resalta (literal y texto) con color rojo y font-weight 700 la opción que coincida con la respuesta seleccionada.
 *
 * @param {Array} opciones - Arreglo de opciones de respuesta.
 * @param {string} respuestaSeleccionada - La respuesta seleccionada.
 * @returns {string} - HTML con las opciones formateadas.
 */
function formatOptions(opciones, respuestaSeleccionada) {
    if (!opciones || !Array.isArray(opciones)) return '';

    // Normalizamos respuestaSeleccionada a un arreglo de valores recortados
    let respuestasSeleccionadas = [];
    if (Array.isArray(respuestaSeleccionada)) {
        respuestasSeleccionadas = respuestaSeleccionada.map(resp => resp.trim());
    } else if (typeof respuestaSeleccionada === 'string') {
        respuestasSeleccionadas = [respuestaSeleccionada.trim()];
    }

    return opciones
        .map((opcion, index) => {
            // Se asigna una letra (a., b., c., …) o número si solo hay una opción
            const literal = opciones.length > 1 
                ? String.fromCharCode(97 + index) + '. ' 
                : (index + 1) + '. ';

            // Se obtiene el contenido procesado de la opción
            let opcionFormateada = processContent(opcion, 'respuesta');

            // Si la opción está en el arreglo de respuestas seleccionadas se resalta
            if (respuestasSeleccionadas.includes(opcion.trim())) {
                opcionFormateada = `<span style="font-weight:500; color:MediumBlue;">${literal}${opcionFormateada}</span>`;
            } else {
                opcionFormateada = `<span style="font-weight:500;">${literal}</span>${opcionFormateada}`;
            }
            return `<div>${opcionFormateada}</div>`;
        })
        .join('');
}



/**
 * Función que procesa el contenido para reemplazar URLs de imágenes, data URIs, MathML y saltos de línea.
 *
 * @param {string} contenido - Contenido a procesar.
 * @param {string} tipo - Tipo de contenido ('enunciado' o 'respuesta').
 * @returns {string} - Contenido procesado en HTML.
 */
function processContent(contenido, tipo) {
    const imageRegex = /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi;
    const dataUriRegex = /(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg);base64,[a-zA-Z0-9+/=]+)/gi;
    const mathRegex = /<math[^>]*>[\s\S]*?<\/math>/g;

    let procesado = contenido
        .replace(imageRegex, (match) => createImgTag(match, tipo))
        .replace(dataUriRegex, (match) => createImgTag(match, tipo))
        .replace(mathRegex, (match) => `<span style="font-size: 1.5em;">${match}</span>`)
        .replace(/(\r\n|\n|\r)/g, '<br>');

    return procesado || `<span style="font-weight:500; color:red;">Sin responder</span>`;
}

/**
 * Función que crea una etiqueta <img> con el atributo src, alt y estilos adecuados.
 *
 * @param {string} src - URL o data URI de la imagen.
 * @param {string} tipo - Tipo de contenido ('enunciado' o 'respuesta').
 * @returns {string} - Etiqueta <img> en HTML.
 */
function createImgTag(src, tipo) {
    const altText = tipo === 'enunciado' ? 'Imagen de enunciado' : 'Imagen de respuesta';
    return `<img src="${src}" alt="${altText}" style="max-width: 200px; max-height: 150px;">`;
}

/**
 * Función que formatea múltiples respuestas según el tipo de pregunta.
 *
 * @param {Array} respuestas - Arreglo de respuestas.
 * @param {string} tipoPregunta - Tipo de pregunta (por ejemplo, 'draganddrop_text' o 'draganddrop_image').
 * @returns {string} - Respuestas formateadas en HTML.
 */
function formatMultipleResponses(respuestas, tipoPregunta) {
    if (tipoPregunta === 'draganddrop_text' || tipoPregunta === 'draganddrop_image') {
        return respuestas
            .map((respuesta, index) => `${index + 1}. ${processContent(respuesta, 'respuesta')}`)
            .join('<br>');
    } else {
        return respuestas
            .map(respuesta => `• ${processContent(respuesta, 'respuesta')}`)
            .join('<br>');
    }
}
