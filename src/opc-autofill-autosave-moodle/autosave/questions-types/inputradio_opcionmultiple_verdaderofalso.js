import { feedbackQuestion, convertImgToDataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

// Manejar respuestas tipo 'input text' (respuesta corta)
 export async function inputtext_respuestacorta(originalFormulationClearfix, questionsAutoSave) {
    const tipo = 'inputtext_respuestacorta';
    const respuestas = questionsAutoSave.respuestas;
    let hayRespuestaLleno = false;

    const clonFormulation = originalFormulationClearfix.cloneNode(true);
    // Convierte las imágenes dentro del clon a formato Data URI
    await convertImgToDataUri(clonFormulation);

    const allInputText = originalFormulationClearfix.querySelectorAll('input[type="text"]');

    allInputText.forEach((inputText) => {
        const valor = inputText.value;
        respuestas.push(valor);

        if (valor) {
            hayRespuestaLleno = true;
        }
    });

    if (hayRespuestaLleno) {
        questionsAutoSave.html = clonFormulation.outerHTML; // Guardar el HTML del clon
        questionsAutoSave.tipo = tipo;
        const feedback = await feedbackQuestion(originalFormulationClearfix);
        questionsAutoSave.feedback = feedback;
        questionsAutoSave.ciclo = localStorage.getItem("ciclo");
    }
}
    // Manejar respuestas tipo 'input radio'
    export async function inputradio_opcionmultiple_verdaderofalso(originalFormulationClearfix, questionsAutoSave) {
        const tipo = 'inputradio_opcionmultiple_verdaderofalso';
        const clonFormulation = originalFormulationClearfix.cloneNode(true);

        // Convierte las imágenes dentro del clon a formato Data URI
        await convertImgToDataUri(clonFormulation);

        // Selecciona todos los elementos de tipo radio dentro del originalFormulationClearfix
        const allInputRadio = originalFormulationClearfix.querySelectorAll('input[type="radio"]');

        for (const inputRadio of allInputRadio) {
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