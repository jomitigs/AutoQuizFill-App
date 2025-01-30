import { feedbackQuestion, convertImgToDataUri, extractContentInOrder } from '../helpers.js';

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
  // Manejar respuestas tipo 'input checkbox'
  export async function inputchecked_opcionmultiple(originalFormulationClearfix, questionsAutoSave) {

    const tipo = 'inputchecked_opcionmultiple';
    console.log(tipo);

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

    if (respuestas.length > 0) {
        questionsAutoSave.respuestas = respuestas;
        questionsAutoSave.html = clonFormulation.outerHTML; // Guardar el HTML del clon
        questionsAutoSave.tipo = tipo;
        const feedback = await feedbackQuestion(originalFormulationClearfix);
        questionsAutoSave.feedback = feedback;
        questionsAutoSave.ciclo = localStorage.getItem("ciclo");
    }
}
