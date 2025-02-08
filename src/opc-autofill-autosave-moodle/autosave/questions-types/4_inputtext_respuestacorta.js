import { feedbackQuestion, File2DataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

export async function inputtext_respuestacorta(originalFormulationClearfix) {
    const tipo = 'inputtext_respuestacorta';

    // 1) Clonamos el elemento original para trabajar sobre la copia.
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // 2) Convertimos a Data URI todas las imágenes del clon.
    await File2DataUri(clonFormulation);

    // 3) Obtenemos la referencia a .qtext dentro del clon.
    const clonedQtext = clonFormulation.querySelector('.qtext');
    let enunciado = '';
    let enunciadoProcess = '';

    if (clonedQtext) {
        // Buscamos todos los <input type="text"> en TODO el clon
        const inputs = clonFormulation.querySelectorAll('input[type="text"]');

        inputs.forEach((input) => {
            // Eliminamos el label asociado al input (si existe)
            const label = clonFormulation.querySelector(`label[for="${input.id}"]`);
            if (label) {
                label.remove();
            }

            // Verificamos si el input está dentro del .qtext
            if (clonedQtext.contains(input)) {
                // Lo reemplazamos en el DOM por "[ ]"
                const placeholder = document.createTextNode('[ ]');
                input.parentNode.replaceChild(placeholder, input);
            }
        });

        // Obtenemos el enunciado resultante (HTML con "[ ]")
        enunciadoProcess = await extractContentInOrder(clonedQtext);

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
        enunciado: enunciadoProcess,       // Texto (HTML) con los [ ] en lugar de <input>
        respuestaCorrecta: respuestaCorrecta, 
        html: clonFormulation.outerHTML,   // HTML completo del clon (imágenes en Data URI)
        tipo: tipo,
        ciclo: localStorage.getItem("ciclo"),
        feedback: feedback
    };

    return questionData;
}
