import { feedbackQuestion, File2DataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';


export async function inputradio_opcionmultiple_verdaderofalso(originalFormulationClearfix) {
    const tipo = 'inputradio_opcionmultiple_verdaderofalso';

    // Se clona el elemento original para trabajar sobre una copia y no modificar el DOM original
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // Se convierten las imágenes del clon a Data URI
    await File2DataUri(clonFormulation);

    // Se extrae el enunciado utilizando la función extractEnunciado
    const enunciado = await extractEnunciado(originalFormulationClearfix);

    // Se extraen las opciones de respuesta y la respuesta seleccionada utilizando la función extractOpcionesYRespuesta
    const { opcionesRespuesta, respuestaCorrecta } = await extractOpcionesYRespuesta(originalFormulationClearfix);

    // Se obtiene el feedback de la pregunta, si existe
    const feedback = await feedbackQuestion(originalFormulationClearfix);

    // Se arma la estructura final de la pregunta
    const estructuraPreguntaHTML = {
        enunciado,                          // Enunciado extraído del elemento .qtext
        opcionesRespuesta,                  // Todas las opciones de respuesta
        respuestaCorrecta,                  // La opción seleccionada (si hay) o cadena vacía
        html: clonFormulation.outerHTML,    // HTML del clon procesado
        tipo,                               // Tipo de la pregunta
        ciclo: localStorage.getItem("ciclo"), // Ciclo obtenido del localStorage
        feedback                          // Feedback de la pregunta (si existe)
    };

    return estructuraPreguntaHTML;
}

/**
 * Función para extraer el enunciado de la pregunta.
 * Se busca el contenido del elemento que tiene la clase "qtext", 
 * ya que en el HTML de ejemplo es donde se encuentra el enunciado.
 *
 * @param {HTMLElement} originalFormulationClearfix - Elemento que contiene la formulación original de la pregunta.
 * @returns {Promise<string>} El enunciado extraído.
 */
export async function extractEnunciado(originalFormulationClearfix) {
    // Se selecciona el elemento con clase "qtext"
    const enunciadoElement = originalFormulationClearfix.querySelector('.qtext');
    let enunciado = '';

    if (enunciadoElement) {
        // Se extrae el contenido respetando el orden del DOM
        enunciado = await extractContentInOrder(enunciadoElement);
    }

    return enunciado;
}

/**
 * Función para extraer las opciones de respuesta y la respuesta seleccionada.
 * Recorre todos los inputs de tipo radio del HTML, ignorando aquellos que
 * correspondan a "Quitar mi elección" (o similares) según ciertas condiciones.
 *
 * @param {HTMLElement} originalFormulationClearfix - Elemento que contiene la formulación original de la pregunta.
 * @returns {Promise<Object>} Un objeto con:
 *    - opcionesRespuesta: arreglo con el texto de cada opción.
 *    - respuestaCorrecta: texto de la opción seleccionada o cadena vacía si ninguna lo está.
 */
export async function extractOpcionesYRespuesta(originalFormulationClearfix) {
    // Seleccionar todos los inputs radio
    const allInputRadio = originalFormulationClearfix.querySelectorAll('input[type="radio"]');
    let opcionesRespuesta = [];
    let respuestaCorrecta = '';

    for (const inputRadio of allInputRadio) {
        // Condición para ignorar inputs que sean de "Quitar mi elección" o similares:
        // - Si el input se encuentra dentro de un contenedor con clase "qtype_multichoice_clearchoice"
        // - Si su valor es "-1"
        // - Si tiene la clase "sr-only"
        const parentDiv = inputRadio.closest('.qtype_multichoice_clearchoice');
        const isClearChoice = parentDiv !== null || inputRadio.value === "-1" || inputRadio.classList.contains('sr-only');
        if (isClearChoice) {
            continue;
        }

        // Se obtiene el label asociado (se asume que es el siguiente elemento en el DOM)
        let labelInput = inputRadio.nextElementSibling;
        let textoOpcion = '';

        if (labelInput) {
            // Si existe un elemento con clase "flex-fill" dentro del label, se extrae desde allí
            const flexFillElement = labelInput.querySelector('.flex-fill');
            if (flexFillElement) {
                textoOpcion = await extractContentInOrder(flexFillElement);
            } else {
                // Si no, se extrae directamente del label
                textoOpcion = await extractContentInOrder(labelInput);
            }
            // Si no hay un elemento MathJax, se eliminan literales iniciales como "a.", "b.", etc.
            const mathJaxElement = labelInput.querySelector('.MathJax');
            if (!mathJaxElement) {
                textoOpcion = textoOpcion.replace(/^[a-zA-Z]\.|^[ivxlcdmIVXLCDM]+\./, '');
            }
        }

        // Agregar la opción extraída al arreglo de opciones
        opcionesRespuesta.push(textoOpcion);

        // Si este input radio está marcado, se considera que es la respuesta correcta
        if (inputRadio.checked) {
            respuestaCorrecta = textoOpcion;
        }
    }

    return { opcionesRespuesta, respuestaCorrecta };
}

/**
 * Función principal para procesar la pregunta de opción múltiple (tipo verdadero/falso).
 * Esta función arma la estructura final de la pregunta que contiene:
 *   - enunciado: Texto del enunciado (extraído del elemento .qtext)
 *   - opcionesRespuesta: Arreglo con todas las opciones disponibles.
 *   - respuestaCorrecta: La opción seleccionada o cadena vacía si no hay selección.
 *   - html: HTML del clon procesado (con imágenes convertidas a Data URI).
 *   - tipo: Tipo de la pregunta.
 *   - ciclo: Valor obtenido del localStorage.
 *   - feedback: Feedback de la pregunta (si existe).
 *
 * @param {HTMLElement} originalFormulationClearfix - Elemento que contiene la formulación original de la pregunta.
 * @returns {Promise<Object>} La estructura completa de la pregunta.
 */

