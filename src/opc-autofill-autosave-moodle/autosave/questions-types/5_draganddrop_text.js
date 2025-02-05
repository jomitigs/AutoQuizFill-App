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
    // 1. Reemplazar los <span> que contengan "place", "drop" y "group" por "[ ]"
    const spansToReplace = clonFormulation.querySelectorAll('span[class*="place"][class*="drop"][class*="group"]');
    spansToReplace.forEach(span => {
        const replacementText = document.createTextNode('[ ]');
        span.parentNode.replaceChild(replacementText, span);
    });

    // 2. Eliminar cualquier <span> con clase "draghome" que se encuentre dentro del enunciado
    const enunciadoElement = clonFormulation.querySelector('.qtext');
    if (enunciadoElement) {
        const draghomeSpans = enunciadoElement.querySelectorAll('span.draghome');
        draghomeSpans.forEach(span => span.remove());
    } else {
        console.log("No se encontró el elemento .qtext para el preprocesado del enunciado.");
    }
    // --- Fin del preprocesado ---
    console.log("Enunciado Before", enunciadoElement);

    // Extraer el enunciado (ya modificado) del elemento con clase .qtext
    let enunciado = '';
    if (enunciadoElement) {
        enunciado = await extractContentInOrder(enunciadoElement);
    } else {
        console.log("No se encontró el elemento .qtext para extraer el enunciado.");
    }
    console.log("Enunciado After",enunciado );
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


    const qtextPlaces = originalFormulationClearfix.querySelectorAll('[class*="place"][class*="drop"][class*="group"]');

    qtextPlaces.forEach((placeElement) => {
        // Buscar el siguiente hermano del elemento 'placeElement'
        const respuestaElement = placeElement.nextElementSibling;
    
        if (respuestaElement && respuestaElement.classList.contains('draghome')) {
            // Si existe y tiene la clase 'draghome', extraer el texto
            respuestas.push(respuestaElement.textContent.trim() || '');
        } else {
            // Si no existe o no tiene la clase 'draghome', agregar un string vacío
            respuestas.push('');
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
