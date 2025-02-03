import { feedbackQuestion, convertImgToDataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

/**
 * Función para procesar preguntas de respuesta corta (input text).
 * Se clona el formulario original, se convierten las imágenes a Data URI,
 * se extrae el enunciado y se recogen los valores ingresados en los inputs de tipo texto.
 *
 * @param {HTMLElement} originalFormulationClearfix - Elemento DOM original de la pregunta.
 * @returns {Object|null} Objeto con la información extraída de la pregunta o null si no hay respuesta.
 */
export async function inputtext_respuestacorta(originalFormulationClearfix) {
    const tipo = 'inputtext_respuestacorta';

    // Clonamos el elemento original para trabajar sobre una copia sin modificar el DOM.
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // Convertimos las imágenes del clon a formato Data URI.
    await convertImgToDataUri(clonFormulation);

    // Extraemos el enunciado (por ejemplo, contenido dentro de un elemento con clase .qtext).
    const enunciadoElement = clonFormulation.querySelector('.qtext');
    let enunciado = '';
    if (enunciadoElement) {
        enunciado = await extractContentInOrder(enunciadoElement);
    } else {
        console.log("No se encontró el elemento .qtext para extraer el enunciado.");
    }

    // Recorremos todos los inputs de tipo text para recoger sus valores.
    const respuestas = [];
    let hayRespuestaLleno = false;
    const allInputText = originalFormulationClearfix.querySelectorAll('input[type="text"]');

    allInputText.forEach((inputText) => {
        // Obtenemos el valor y eliminamos espacios en blanco.
        const valor = inputText.value.trim();
        respuestas.push(valor);
        if (valor !== '') {
            hayRespuestaLleno = true;
        }
    });

    // Solo se crea el objeto questionData si se ha proporcionado alguna respuesta válida.
    if (hayRespuestaLleno) {
        const feedback = await feedbackQuestion(originalFormulationClearfix);
        const questionData = {
            enunciado: enunciado,
            respuestas: respuestas,
            html: clonFormulation.outerHTML,
            tipo: tipo,
            ciclo: localStorage.getItem("ciclo"),
            feedback: feedback,
        };

        console.log("Objeto questionData generado:", questionData);
        return questionData;
    } else {
        console.log("No se proporcionó ninguna respuesta en input text.");
        return null;
    }
}
