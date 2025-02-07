import { feedbackQuestion, File2DataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

/**
 * Función para procesar preguntas de respuesta corta (input text).
 * Maneja tres escenarios:
 * 1) El input está en medio del texto en .qtext
 * 2) El input está al final del texto en .qtext
 * 3) El input (con su label) está fuera de .qtext (por ej, .ablock .form-inline)
 *    En este caso, se quiere también mostrar el texto de la etiqueta ("Respuesta:") en el enunciado,
 *    seguido de un <br> y un [ ].
 *
 * @param {HTMLElement} originalFormulationClearfix - Elemento DOM original de la pregunta.
 * @returns {Object} Objeto con la información extraída de la pregunta.
 */
export async function inputtext_respuestacorta(originalFormulationClearfix) {
    const tipo = 'inputtext_respuestacorta';

    // 1) Clonamos el elemento original para no modificar el DOM principal.
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // 2) Convertimos las imágenes del clon a Data URI.
    await File2DataUri(clonFormulation);

    // 3) Obtenemos la referencia a .qtext dentro del clon.
    const clonedQtext = clonFormulation.querySelector('.qtext');
    let enunciado = '';

    if (clonedQtext) {
        // 4) Localizamos todos los inputs de tipo "text" en el clon.
        //    Esto incluye los que están dentro y fuera de .qtext.
        const inputs = clonFormulation.querySelectorAll('input[type="text"]');

        inputs.forEach((input) => {
            // Eliminamos el label asociado al input (si existe) *después* de tomar su texto
            let labelText = '';
            const label = clonFormulation.querySelector(`label[for="${input.id}"]`);
            if (label) {
                labelText = label.textContent.trim(); 
                // Removemos el label para que no aparezca duplicado en el HTML.
                label.remove();
            }

            // ¿El input está dentro de .qtext?
            if (clonedQtext.contains(input)) {
                // Caso 1 y 2: el input se encuentra dentro de .qtext (en medio o al final)
                // Se reemplaza en el DOM por "[ ]"
                const placeholder = document.createTextNode('[ ]');
                input.parentNode.replaceChild(placeholder, input);

            } else {
                // Caso 3: el input está fuera de .qtext (por ejemplo, .ablock .form-inline)
                // - Lo eliminamos del DOM (para que no aparezca duplicado).
                input.remove();

                // - Agregamos un <br> en el enunciado (para que baje de línea).
                clonedQtext.appendChild(document.createElement('br'));

                // - Agregamos el texto del label y "[ ]" al final del .qtext.
                //   Por ejemplo: "Respuesta: [ ]"
                const textToAppend = document.createTextNode(`${labelText} [ ]`);
                clonedQtext.appendChild(textToAppend);
            }
        });

        // Extraemos el HTML resultante (con [ ] en lugar de input)
        enunciado = clonedQtext.innerHTML;
    } else {
        console.log("No se encontró el elemento .qtext para extraer el enunciado.");
    }

    // 5) Obtenemos los valores reales ingresados por el usuario en el DOM original.
    const respuestaCorrecta = [];
    const allInputText = originalFormulationClearfix.querySelectorAll('input[type="text"]');
    allInputText.forEach((inputText) => {
        const valor = inputText.value.trim();
        respuestaCorrecta.push(valor);
    });

    // 6) Obtenemos el feedback de la pregunta
    const feedback = await feedbackQuestion(originalFormulationClearfix);

    // 7) Construimos el objeto final a retornar
    const questionData = {
        enunciado: enunciado,                 // Texto con [ ] en vez de input
        respuestaCorrecta: respuestaCorrecta, // Valores ingresados en los inputs
        html: clonFormulation.outerHTML,      // El HTML con imágenes en base64
        tipo: tipo,
        ciclo: localStorage.getItem("ciclo"),
        feedback: feedback
    };

    return questionData;
}
