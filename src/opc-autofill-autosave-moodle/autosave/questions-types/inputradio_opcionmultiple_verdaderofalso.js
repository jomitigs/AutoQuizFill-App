import { feedbackQuestion, convertImgToDataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

// Manejar respuestas tipo 'input radio'
export async function inputradio_opcionmultiple_verdaderofalso(originalFormulationClearfix, questionsAutoSave) {
    const tipo = 'inputradio_opcionmultiple_verdaderofalso';
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // Convierte las imágenes dentro del clon a formato Data URI
    await convertImgToDataUri(clonFormulation);

    // Selecciona todos los elementos de tipo radio dentro del originalFormulationClearfix
    const allInputRadio = originalFormulationClearfix.querySelectorAll('input[type="radio"]');

    let isAnyChecked = false; // Bandera para verificar si algún radio está seleccionado

    for (const inputRadio of allInputRadio) {
        // **Condición para ignorar los elementos "Quitar mi elección"**
        // Puedes ajustar las condiciones según las características específicas de tus elementos
        const parentDiv = inputRadio.closest('.qtype_multichoice_clearchoice');
        const isClearChoice = parentDiv !== null || inputRadio.value === "-1" || inputRadio.classList.contains('sr-only');

        if (isClearChoice) {
            continue; // Saltar este inputRadio y pasar al siguiente
        }

        if (inputRadio.checked) {
            isAnyChecked = true; // Indica que al menos un radio está seleccionado
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

                // Dado que normalmente los radios son mutuamente excluyentes, podemos salir del ciclo
                break;
            }
        }
    }

    if (!isAnyChecked) {
        // Si ningún radio está seleccionado, agregar una respuesta vacía
        questionsAutoSave.respuestas.push('');
    }

    // Guardar el HTML del clon en el objeto questionsAutoSave
    questionsAutoSave.html = clonFormulation.outerHTML;
    questionsAutoSave.tipo = tipo;
    
    // Obtener y guardar el feedback
    const feedback = await feedbackQuestion(originalFormulationClearfix);
    questionsAutoSave.feedback = feedback;
    
    // Guardar el ciclo actual desde el localStorage
    questionsAutoSave.ciclo = localStorage.getItem("ciclo");

    console.log(`[opc-autofill-autosave-moodle: autosave/questions-types] Pregunta guardada en SessionStorage`);
}
