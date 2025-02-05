import { feedbackQuestion, convertImgToDataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

/**
 * Función para procesar preguntas de respuesta corta (input text).
 * Se clona el formulario original, se convierten las imágenes a Data URI,
 * se extrae el enunciado y se recogen los valores ingresados en los inputs de tipo texto.
 * Siempre se crea el objeto questionData, aunque las respuestas puedan estar vacías.
 *
 * @param {HTMLElement} originalFormulationClearfix - Elemento DOM original de la pregunta.
 * @returns {Object} Objeto con la información extraída de la pregunta.
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
    const allInputText = originalFormulationClearfix.querySelectorAll('input[type="text"]');
    allInputText.forEach((inputText) => {
        const valor = inputText.value.trim();
        respuestas.push(valor);
    });

    // Se obtiene el feedback de la pregunta.
    const feedback = await feedbackQuestion(originalFormulationClearfix);

    // Construimos el objeto questionData, incluso si respuestas está vacío.
    const questionData = {
        enunciado: enunciado,
        respuestas: respuestas, // Puede ser un array vacío
        html: clonFormulation.outerHTML,
        tipo: tipo,
        ciclo: localStorage.getItem("ciclo"),
        feedback: feedback,
    };

    //console.log("Objeto questionData generado:", questionData);
    return questionData;
}
