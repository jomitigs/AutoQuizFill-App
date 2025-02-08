import { feedbackQuestion, File2DataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

export async function inputtext_respuestacorta2(originalFormulationClearfix) {
    const tipo = 'inputtext_respuestacorta2';

    // 1) Clonamos el elemento original para trabajar sobre la copia.
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // 2) Convertimos a Data URI todas las imágenes del clon.
    await File2DataUri(clonFormulation);

    // 3) Obtenemos la referencia a .qtext dentro del clon.
    const clonedQtext = clonFormulation.querySelector('.qtext');
    let enunciadoProcess = '';

    if (clonedQtext) {
        // Extraemos el contenido de .qtext sin modificaciones
        enunciadoProcess = await extractContentInOrder(clonedQtext);
    } else {
        console.log("No se encontró el elemento .qtext para extraer el enunciado.");
    }

    // 4) Buscamos el <div class="ablock form-inline"> hermano de .qtext
    let respuestaCorrecta = [];
    const respuestaContainer = originalFormulationClearfix.querySelector('.ablock.form-inline');
    
    if (respuestaContainer) {
        const inputText = respuestaContainer.querySelector('input[type="text"]');
        if (inputText) {
            respuestaCorrecta.push(inputText.value.trim());
        }
    }

    // 5) Obtenemos el feedback de la pregunta
    const feedback = await feedbackQuestion(originalFormulationClearfix);

    // 6) Construimos el objeto final questionData
    const questionData = {
        enunciado: enunciadoProcess,       // Texto del enunciado sin modificaciones
        respuestaCorrecta: respuestaCorrecta, 
        html: clonFormulation.outerHTML,   // HTML completo del clon (imágenes en Data URI)
        tipo: tipo,
        ciclo: localStorage.getItem("ciclo"),
        feedback: feedback
    };

    return questionData;
}
