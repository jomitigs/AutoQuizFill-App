import { feedbackQuestion, File2DataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

/**
 * Función para procesar preguntas de respuesta corta (input text).
 * 1) Clona el formulario original.
 * 2) Convierte las imágenes a Data URI.
 * 3) Reemplaza cada input text por [ ] dentro del .qtext.
 * 4) Elimina su <label> asociado (si existe).
 * 5) Extrae los valores reales escritos en cada input y los guarda en respuestaCorrecta.
 *
 * @param {HTMLElement} originalFormulationClearfix - Elemento DOM original de la pregunta.
 * @returns {Object} Objeto con la información extraída de la pregunta.
 */
export async function inputtext_respuestacorta(originalFormulationClearfix) {
    const tipo = 'inputtext_respuestacorta';

    // Clonamos el elemento original para trabajar con una copia.
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // Convertimos a Data URI todas las imágenes del clon.
    await File2DataUri(clonFormulation);

    // Localizamos el .qtext dentro del clon.
    const clonedQtext = clonFormulation.querySelector('.qtext');
    let enunciado = '';

    if (clonedQtext) {
        // Buscamos todos los inputs de tipo texto dentro del .qtext
        const inputs = clonedQtext.querySelectorAll('input[type="text"]');

        inputs.forEach((input) => {
            // Eliminamos el label asociado al input (si existe)
            const label = clonedQtext.querySelector(`label[for="${input.id}"]`);
            if (label) {
                label.remove();
            }

            // Reemplazamos el input por un texto con corchetes
            const placeholder = document.createTextNode('[ ]');
            input.parentNode.replaceChild(placeholder, input);
        });

        // Extraemos el HTML resultante como enunciado, con los [ ] en lugar de los inputs.
        enunciado = clonedQtext.innerHTML;
    } else {
        console.log("No se encontró el elemento .qtext para extraer el enunciado.");
    }

    // Recorremos los inputs de tipo texto del elemento original (NO del clon),
    // para recoger el valor que tiene el usuario ingresado (si alguno).
    const respuestaCorrecta = [];
    const allInputText = originalFormulationClearfix.querySelectorAll('input[type="text"]');
    allInputText.forEach((inputText) => {
        const valor = inputText.value.trim();
        respuestaCorrecta.push(valor);
    });

    // Obtenemos el feedback de la pregunta
    const feedback = await feedbackQuestion(originalFormulationClearfix);

    // Construimos el objeto final
    const questionData = {
        enunciado: enunciado,            // El texto con [ ] en lugar de <input>
        respuestaCorrecta: respuestaCorrecta,  // Los valores escritos en cada input
        html: clonFormulation.outerHTML, // El HTML completo del clon (imágenes en Data URI)
        tipo: tipo,
        ciclo: localStorage.getItem("ciclo"),
        feedback: feedback,
    };

    // Retornamos la información de la pregunta
    return questionData;
}
