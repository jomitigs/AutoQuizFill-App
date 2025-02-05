import { feedbackQuestion, File2DataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

// Manejar respuestas tipo 'draganddrop' (texto)
export async function draganddrop_text(originalFormulationClearfix) {
    // Definir el tipo de pregunta
    const tipo = 'draganddrop_text';
    console.log(tipo);

    // Crear un array para almacenar las respuestas encontradas (se usará como "respuestaCorrecta")
    const respuestas = [];

    // Clonar el elemento original
    const clonFormulation = originalFormulationClearfix.cloneNode(true);
    // Convertir las imágenes dentro del clon a formato Data URI
    await File2DataUri(clonFormulation);

    // Antes de extraer el enunciado, reemplazar los spans de tipo "place", "drop", "group", etc.
    // Se busca cualquier elemento <span> cuya clase contenga "place", "drop" y "group"
    const spansToReplace = clonFormulation.querySelectorAll('span[class*="place"][class*="drop"][class*="group"]');
    spansToReplace.forEach(span => {
        // Se crea un nodo de texto con corchetes y un espacio en blanco: "[ ]"
        const replacementText = document.createTextNode('[ ]');
        // Se reemplaza el span por el nodo de texto
        span.parentNode.replaceChild(replacementText, span);
    });

    // Extraer el enunciado (por ejemplo, el contenido dentro del elemento con clase .qtext)
    const enunciadoElement = clonFormulation.querySelector('.qtext');
    let enunciado = '';
    if (enunciadoElement) {
        enunciado = await extractContentInOrder(enunciadoElement);
    } else {
        console.log("No se encontró el elemento .qtext para extraer el enunciado.");
    }

    // Seleccionar todos los elementos que corresponden a las áreas de respuesta dentro de .qtext en el original
    const qtextPlaces = originalFormulationClearfix.querySelectorAll('[class*="place"][class*="drop"][class*="group"]');

    // Recorrer cada 'place' para verificar si contiene una respuesta o está vacío
    qtextPlaces.forEach((placeElement) => {
        // Si el lugar está vacío (tiene la clase 'active'), se considera sin respuesta
        if (placeElement.classList.contains('active')) {
            respuestas.push('n/a');
        } else {
            // Si el lugar no está vacío, buscar el hermano que contiene la respuesta
            const respuestaElement = placeElement.nextElementSibling;
            if (respuestaElement && respuestaElement.classList.contains('draghome')) {
                const texto = respuestaElement.textContent.trim(); // Extraer el texto de la respuesta
                respuestas.push(texto || 'n/a'); // Agregar el texto o 'n/a' si está vacío
            }
        }
    });

    // Mostrar en consola las respuestas encontradas
    console.log('Respuestas encontradas:', respuestas);

    // Obtener el feedback de la pregunta
    const feedback = await feedbackQuestion(originalFormulationClearfix);

    // Construir el objeto questionData con la estructura solicitada.
    const questionData = {
        enunciado: enunciado,
        respuestaCorrecta: respuestas, // Puede ser un array vacío
        html: clonFormulation.outerHTML,
        tipo: tipo,
        ciclo: localStorage.getItem("ciclo"),
        feedback: feedback,
    };

    return questionData;
}
