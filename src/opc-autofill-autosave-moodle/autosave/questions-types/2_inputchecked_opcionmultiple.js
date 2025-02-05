import { feedbackQuestion, File2DataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

/**
 * Función para procesar preguntas de opción múltiple con checkboxes.
 * Se clona el formulario original, se convierten las imágenes, se extrae el enunciado,
 * se recogen todas las opciones y se determina cuáles están seleccionadas.
 *
 * @param {HTMLElement} originalFormulationClearfix - Elemento DOM original de la pregunta.
 * @returns {Object} Objeto con la información extraída de la pregunta.
 */
export async function inputchecked_opcionmultiple(originalFormulationClearfix) {
    const tipo = 'inputchecked_opcionmultiple';

    // Clonamos el elemento original para trabajar sobre una copia sin modificar el DOM.
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    if (clonFormulation.querySelectorAll('img').length > 0 || clonFormulation.querySelectorAll('audio').length > 0) {
        await File2DataUri(clonFormulation);
    }

    // Extraemos el enunciado usando la función dedicada.
    const enunciado = await extractEnunciado(clonFormulation);

    // Extraemos las opciones de respuesta y las respuestas seleccionadas.
    const { opcionesRespuesta, respuestaCorrecta } = await extractOpcionesYRespuestaCheckbox(originalFormulationClearfix);

    // Obtenemos el feedback, si existe.
    const feedback = await feedbackQuestion(originalFormulationClearfix);

    // Construimos el objeto questionData con la información obtenida.
    const questionData = {
        enunciado: enunciado,
        opcionesRespuesta: opcionesRespuesta,
        // En el caso de checkboxes, pueden haber múltiples respuestas seleccionadas.
        respuestaCorrecta: respuestaCorrecta,
        html: clonFormulation.outerHTML,
        tipo: tipo,
        ciclo: localStorage.getItem("ciclo"),
        feedback: feedback,
    };

    // console.log("Objeto questionData generado:", questionData);
    return questionData;
}

/**
 * Extrae el enunciado de la pregunta a partir del clon del formulario.
 *
 * @param {HTMLElement} clonFormulation - Clon del elemento de la pregunta.
 * @returns {string} Enunciado extraído.
 */
export async function extractEnunciado(clonFormulation) {
    const enunciadoElement = clonFormulation.querySelector('.qtext');
    let enunciado = '';
    if (enunciadoElement) {
        enunciado = await extractContentInOrder(enunciadoElement);
    } else {
        console.log("No se encontró el elemento .qtext para extraer el enunciado.");
    }
    return enunciado;
}

/**
 * Extrae las opciones de respuesta y determina cuáles están seleccionadas (respuesta correcta)
 * para preguntas con checkboxes.
 *
 * Se asume que cada input checkbox tiene un atributo "aria-labelledby" que referencia al label asociado.
 *
 * @param {HTMLElement} originalFormulationClearfix - Elemento DOM original de la pregunta.
 * @returns {Object} Objeto con las propiedades:
 *                   - opcionesRespuesta: Array con el texto de cada opción.
 *                   - respuestaCorrecta: Array con el texto de las opciones seleccionadas.
 */
export async function extractOpcionesYRespuestaCheckbox(originalFormulationClearfix) {
    const allInputCheckbox = originalFormulationClearfix.querySelectorAll('input[type="checkbox"]');
    let opcionesRespuesta = [];
    let respuestaCorrecta = [];

    for (const inputCheckbox of allInputCheckbox) {
        // Se obtiene el id del label a partir del atributo "aria-labelledby".
        const labelId = inputCheckbox.getAttribute('aria-labelledby');
        if (!labelId) {
            console.log("No se encontró el atributo aria-labelledby para el input checkbox:", inputCheckbox);
            continue;
        }

        // Escapamos el id para usarlo en el selector.
        const escapedLabelId = CSS.escape(labelId);
        const labelElement = originalFormulationClearfix.querySelector(`#${escapedLabelId}`);

        let textoOpcion = '';
        if (labelElement) {
            // Se extrae el contenido del label.
            textoOpcion = await extractContentInOrder(labelElement);
            // Se eliminan posibles literales iniciales (por ejemplo: "a.", "b.", etc.).
            textoOpcion = textoOpcion.replace(/^[a-zA-Z]\.|^[ivxlcdmIVXLCDM]+\./, '').trim();
        } else {
            console.log("No se encontró label asociado para el input checkbox con id:", labelId);
        }

        opcionesRespuesta.push(textoOpcion);

        // Si el checkbox está marcado, se añade su texto a las respuestas correctas.
        if (inputCheckbox.checked) {
            respuestaCorrecta.push(textoOpcion);
        }
    }

    return { opcionesRespuesta, respuestaCorrecta };
}
