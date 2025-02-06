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

 // --- Preprocesado del clon antes de extraer el enunciado ---
console.log("Iniciando el preprocesado del clon...");

// 1. Reemplazar los <span> por "[ ]"
const enunciadoElement = clonFormulation.querySelector('.qtext');

if (enunciadoElement) {  // Verifica que el elemento existe en el clon
    console.log("Elemento .qtext encontrado dentro del clon.");

    const replacementText = document.createTextNode('[ ]');
    console.log("Nodo de texto '[ ]' creado.");

    enunciadoElement.parentNode.replaceChild(replacementText, enunciadoElement);
    console.log("Reemplazado el elemento .qtext por '[ ]' en el clon.");
} else {
    console.log("No se encontró el elemento .qtext dentro del clon.");
}

// --- Fin del preprocesado ---
console.log("Fin del preprocesado del clon.");

// Extraer el enunciado (ya modificado) del elemento con clase .qtext
let enunciado = '';

if (enunciadoElement) {
    console.log("Llamando a extractContentInOrder() para extraer el enunciado...");
    enunciado = await extractContentInOrder(enunciadoElement);
    console.log("Enunciado extraído con éxito:", enunciado);
} else {
    console.log("No se encontró el elemento .qtext para extraer el enunciado.");
}


    // Extraer las opciones de respuesta únicas a partir del div con clase "user-select-none draggrouphomes1"
    const opcionesRespuestas = [];
    const divOpciones = clonFormulation.querySelectorAll('div.user-select-none.draggrouphomes1');
    divOpciones.forEach(div => {
        const spans = div.querySelectorAll('span.draghome');
        spans.forEach(span => {
            const texto = span.textContent.trim();
            if (texto && !opcionesRespuestas.includes(texto)) {
                opcionesRespuestas.push(texto);
            }
        });
    });

    // Seleccionar todos los elementos que corresponden a las áreas de respuesta dentro de .qtext en el original
    const qtextPlaces = originalFormulationClearfix.querySelectorAll('[class*="place"][class*="drop"][class*="group"]');
    // Recorrer cada 'place' para verificar si contiene una respuesta o está vacío
    qtextPlaces.forEach((placeElement) => {
        // Si el lugar está vacío (tiene la clase 'active'), se considera sin respuesta
        if (placeElement.classList.contains('active')) {
            respuestas.push('');
        } else {
            // Si el lugar no está vacío, buscar el hermano que contiene la respuesta
            const respuestaElement = placeElement.nextElementSibling;
            if (respuestaElement && respuestaElement.classList.contains('draghome')) {
                const texto = respuestaElement.textContent.trim();
                respuestas.push(texto || '');
            }
        }
    });

    // Mostrar en consola las respuestas encontradas y las opciones de respuesta
    console.log('Respuestas encontradas:', respuestas);
    console.log('Opciones de respuestas:', opcionesRespuestas);

    // Obtener el feedback de la pregunta
    const feedback = await feedbackQuestion(originalFormulationClearfix);

    // Construir el objeto questionData con la estructura solicitada, incluyendo la propiedad opcionesRespuestas
    const questionData = {
        enunciado: enunciado,
        respuestaCorrecta: respuestas, // Puede ser un array vacío
        html: clonFormulation.outerHTML,
        tipo: tipo,
        ciclo: localStorage.getItem("ciclo"),
        feedback: feedback,
        opcionesRespuestas: opcionesRespuestas
    };

    return questionData;
}
