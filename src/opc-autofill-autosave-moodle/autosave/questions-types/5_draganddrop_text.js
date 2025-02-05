import { feedbackQuestion, File2DataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';


// Manejar respuestas tipo 'draganddrop' (texto)
export async function draganddrop_text(originalFormulationClearfix, questionsAutoSave) {
    // Agregar un retraso de 1 segundo antes de ejecutar el resto del código
    const tipo = 'draganddrop_text';
    console.log(tipo);

    // Crear una lista para almacenar las respuestas directamente en questionsAutoSave
    const respuestas = questionsAutoSave.respuestas;

    const clonFormulation = originalFormulationClearfix.cloneNode(true);
    // Convierte las imágenes dentro del clon a formato Data URI
    await File2DataUri(clonFormulation);

    // Seleccionar todos los elementos con la clase 'place' dentro de 'qtext' usando un selector más genérico
    const qtextPlaces = originalFormulationClearfix.querySelectorAll('[class*="place"][class*="drop"][class*="group"]');

    // Recorrer cada lugar (place) para verificar si contiene una respuesta o está vacío
    qtextPlaces.forEach((placeElement) => {
        // Comprobar si el lugar está vacío (tiene la clase 'active')
        if (placeElement.classList.contains('active')) {
            respuestas.push('n/a');
        } else {
            // Si el lugar no está vacío, buscar el hermano que contiene la respuesta
            const respuestaElement = placeElement.nextElementSibling;
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