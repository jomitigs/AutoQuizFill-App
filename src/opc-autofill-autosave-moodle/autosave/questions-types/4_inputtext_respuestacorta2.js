import { feedbackQuestion, File2DataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

/**
 * Función para procesar preguntas de respuesta corta (input text).
 * Maneja tres escenarios:
 * 1) El input está en medio del texto en .qtext
 * 2) El input está al final del texto en .qtext
 * 3) El input está fuera de .qtext (por ej, en .ablock .form-inline)
 *
 * @param {HTMLElement} originalFormulationClearfix - Elemento DOM original de la pregunta.
 * @returns {Object} Objeto con la información extraída de la pregunta.
 */
export async function inputtext_respuestacorta2(originalFormulationClearfix) {
    const tipo = 'inputtext_respuestacorta2';

    // 1) Clonamos el elemento original para trabajar sobre la copia.
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // 2) Convertimos a Data URI todas las imágenes del clon.
    await File2DataUri(clonFormulation);

    // 3) Obtenemos la referencia a .qtext dentro del clon.
    const clonedQtext = clonFormulation.querySelector('.qtext');
    let enunciado = '';

    if (clonedQtext) {
        // Buscamos todos los <input type="text"> en TODO el clon
        // (así cubrimos los escenarios dentro y fuera de .qtext)
        const inputs = clonFormulation.querySelectorAll('input[type="text"]');

        inputs.forEach((input) => {
            // Eliminamos el label asociado al input (si existe)
            const label = clonFormulation.querySelector(`label[for="${input.id}"]`);
            if (label) {
                label.remove();
            }

            // Verificamos si el input está dentro del .qtext
            if (clonedQtext.contains(input)) {
                // Caso 1 y 2: el input se encuentra en .qtext
                // Lo reemplazamos en el DOM por "[ ]"
                const placeholder = document.createTextNode('[ ]');
                input.parentNode.replaceChild(placeholder, input);
            } else {
                // Caso 3: el input está fuera de .qtext
                // Lo removemos directamente
                input.remove();
                // Y en el enunciado final, agregamos un "[ ]" al final
                // (puedes agregar un salto de línea <br> si lo prefieres).
                clonedQtext.appendChild(document.createTextNode(' '));
                clonedQtext.appendChild(document.createTextNode('[ ]'));
            }
        });

        // Obtenemos el enunciado resultante (HTML con "[ ]")
        enunciado = clonedQtext.innerHTML;
    } else {
        console.log("No se encontró el elemento .qtext para extraer el enunciado.");
    }

    // 4) Recorremos los <input> del original para extraer los valores ingresados (si existen).
    const respuestaCorrecta = [];
    const allInputText = originalFormulationClearfix.querySelectorAll('input[type="text"]');
    allInputText.forEach((inputText) => {
        const valor = inputText.value.trim();
        respuestaCorrecta.push(valor);
    });

    // 5) Obtenemos el feedback de la pregunta
    const feedback = await feedbackQuestion(originalFormulationClearfix);

    // 6) Construimos el objeto final questionData
    const questionData = {
        enunciado: enunciado,                 // Texto (HTML) con los [ ] en lugar de <input>
        respuestaCorrecta: respuestaCorrecta, // Valores ingresados en los inputs
        html: clonFormulation.outerHTML,      // HTML completo del clon (imágenes en Data URI)
        tipo: tipo,
        ciclo: localStorage.getItem("ciclo"),
        feedback: feedback
    };

    return questionData;
}
