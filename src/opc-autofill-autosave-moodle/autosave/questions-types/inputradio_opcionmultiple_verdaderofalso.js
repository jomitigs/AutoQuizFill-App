import { feedbackQuestion, convertImgToDataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

// Manejar respuestas tipo 'input radio'
export async function inputradio_opcionmultiple_verdaderofalso(originalFormulationClearfix, questionsAutoSave) {
    const tipo = 'inputradio_opcionmultiple_verdaderofalso';
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // Convierte las imágenes dentro del clon a formato Data URI
    await convertImgToDataUri(clonFormulation);

    // Selecciona todos los elementos de tipo radio dentro del originalFormulationClearfix
    const allInputRadio = originalFormulationClearfix.querySelectorAll('input[type="radio"]');

    for (const inputRadio of allInputRadio) {
        // **Condición para ignorar los elementos "Quitar mi elección"**
        // Puedes ajustar las condiciones según las características específicas de tus elementos
        const parentDiv = inputRadio.closest('.qtype_multichoice_clearchoice');
        const isClearChoice = parentDiv !== null || inputRadio.value === "-1" || inputRadio.classList.contains('sr-only');

        if (isClearChoice) {
            continue; // Saltar este inputRadio y pasar al siguiente
        }

        if (inputRadio.checked) {
            let labelInput = inputRadio.nextElementSibling;
            let textoRespuesta = '';

            if (labelInput) {
                const flexFillElement = labelInput.querySelector('.flex-fill');

                // Extraer contenido del elemento .flex-fill si existe
                if (flexFillElement) {
                    textoRespuesta = await extractContentInOrder(flexFillElement);
                } else {
                    // Si no hay .flex-fill, extraer contenido directamente del label
                    textoRespuesta = await extractContentInOrder(labelInput);
                }

                // Limpiar literales iniciales solo si no hay elementos MathJax presentes
                const mathJaxElement = labelInput.querySelector('.MathJax');
                if (!mathJaxElement) {
                    // Eliminar literales iniciales como "A." o "i."
                    textoRespuesta = textoRespuesta.replace(/^[a-zA-Z]\.|^[ivxlcdmIVXLCDM]+\./, '');
                    // No aplicamos trim para preservar los espacios y saltos de línea
                }

                if (textoRespuesta) {
                    // Guardar la respuesta en el objeto questionsAutoSave
                    questionsAutoSave.respuestas.push(textoRespuesta);
                }

                // Guardar el HTML del clon en el objeto questionsAutoSave
                questionsAutoSave.html = clonFormulation.outerHTML;
                questionsAutoSave.tipo = tipo;
                const feedback = await feedbackQuestion(originalFormulationClearfix);
                questionsAutoSave.feedback = feedback;
                questionsAutoSave.ciclo = localStorage.getItem("ciclo");
            }
        }
    }
}
