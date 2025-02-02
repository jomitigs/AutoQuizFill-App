import { feedbackQuestion, convertImgToDataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

// Manejar respuestas tipo 'input checkbox'
export async function inputchecked_opcionmultiple(originalFormulationClearfix, questionsAutoSave) {

    const tipo = 'inputchecked_opcionmultiple';
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // Convierte las imágenes dentro del clon a formato Data URI
    await convertImgToDataUri(clonFormulation);

    const respuestas = [];
    const allInputCheckbox = originalFormulationClearfix.querySelectorAll('input[type="checkbox"]');

    allInputCheckbox.forEach((inputCheckbox) => {
        if (inputCheckbox.checked) {
            const labelId = CSS.escape(inputCheckbox.getAttribute('aria-labelledby'));
            const labelElement = originalFormulationClearfix.querySelector(`#${labelId}`);

            let textoRespuesta = '';
            if (labelElement) {
                textoRespuesta = Array.from(labelElement.querySelectorAll('div, span'))
                    .map(element => element.innerText.trim())
                    .join(' ');

                textoRespuesta = textoRespuesta.replace(/^[a-zA-Z]\.|^[ivxlcdmIVXLCDM]+\./, '').trim();
            }

            if (textoRespuesta) {
                respuestas.push(textoRespuesta);
            }
        }
    });

    // Guardar la información aunque no haya respuestas seleccionadas
    questionsAutoSave.respuestas = respuestas; // Si no hay respuestas, quedará como un array vacío
    questionsAutoSave.html = clonFormulation.outerHTML; // Guardar el HTML del clon
    questionsAutoSave.tipo = tipo;
    const feedback = await feedbackQuestion(originalFormulationClearfix);
    questionsAutoSave.feedback = feedback;
    questionsAutoSave.ciclo = localStorage.getItem("ciclo");
}
