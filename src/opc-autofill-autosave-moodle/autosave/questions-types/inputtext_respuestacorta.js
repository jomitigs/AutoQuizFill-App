import { feedbackQuestion, convertImageToDataUri, extractContentInOrder } from '../helpers.js';

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