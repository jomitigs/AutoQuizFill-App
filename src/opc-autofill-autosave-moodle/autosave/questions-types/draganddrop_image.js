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
 // Manejar respuestas tipo 'draganddrop' (image)
 export async function draganddrop_image(originalFormulationClearfix, questionsAutoSave) {
    const tipo = 'draganddrop_image';
    console.log(tipo);

    // Crear una lista para almacenar las respuestas directamente en questionsAutoSave
    const respuestas = questionsAutoSave.respuestas;

    const clonFormulation = originalFormulationClearfix.cloneNode(true);
    // Convierte las imágenes dentro del clon a formato Data URI
    await convertImgToDataUri(clonFormulation);

    // Seleccionar todos los elementos con la clase 'place' dentro de 'qtext' usando un selector más genérico
    const qtextZones = originalFormulationClearfix.querySelectorAll('[class*="dropzone"][class*="group"][class*="place"]');

    // Recorrer cada lugar (place) para verificar si contiene una respuesta o está vacío
    qtextZones.forEach((zoneElement) => {
        // Comprobar si el lugar está vacío (tiene la clase 'active')
        if (zoneElement.classList.contains('active')) {
            respuestas.push('n/a');
        } else {
            // Si el lugar no está vacío, buscar el hermano que contiene la respuesta
            const respuestaElement = zoneElement.nextElementSibling;
            if (respuestaElement && respuestaElement.classList.contains('draghome')) {
                const texto = respuestaElement.textContent.trim(); // Extraer el texto de la respuesta
                respuestas.push(texto || 'n/a'); // Agregar el texto o 'n/a' si el texto está vacío
            }
        }
    });

    // Imprimir el array de respuestas en la consola
    console.log('Respuestas encontradas:', respuestas);

    // Clonar el elemento formulation_clearfix y guardar el HTML en questionsAutoSave

    questionsAutoSave.html = clonFormulation.outerHTML; // Guardar el HTML del clon
    questionsAutoSave.tipo = tipo; // Guardar el tipo en el objeto questionsAutoSave
    const feedback = await feedbackQuestion(originalFormulationClearfix);
    questionsAutoSave.feedback = feedback;
    questionsAutoSave.ciclo = localStorage.getItem("ciclo");
}
