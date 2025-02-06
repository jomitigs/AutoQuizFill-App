import { feedbackQuestion, File2DataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

// Manejar respuestas tipo 'draganddrop' (texto)
export async function draganddrop_text(originalFormulationClearfix) {
    // Definir el tipo de pregunta
    const tipo = 'draganddrop_text';
    console.log(tipo);

    // Crear un array para almacenar las respuestas encontradas (se usará como "respuestaCorrecta")
    const respuestas = [];

    // Clonar el elemento original para procesarlo (así no alteramos el DOM original)
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // Convertir las imágenes dentro del clon a formato Data URI (opcional, depende de tu caso)
    await File2DataUri(clonFormulation);

    // 1) Localizar el elemento que contiene el enunciado
    const enunciadoElement = clonFormulation.querySelector('.qtext');
    if (enunciadoElement) {
        // 2) Fusionar cada `place` con su posible `draghome` ocupante
        const placeElements = enunciadoElement.querySelectorAll('span[class*="place"][class*="drop"][class*="group"]');

        placeElements.forEach(place => {
            // Verificar si el siguiente hermano del `place` es un `span.draghome`
            let occupantText = '';
            const occupant = (place.nextElementSibling && place.nextElementSibling.classList.contains('draghome'))
                ? place.nextElementSibling
                : null;

            // Si hay ocupante, tomamos su texto y lo eliminamos del DOM
            if (occupant) {
                occupantText = occupant.textContent.trim();
                occupant.remove();
            }

            // Guardamos la respuesta en el array `respuestas`
            respuestas.push(occupantText || '');

            // Reemplazamos el propio `place` por un TextNode de la forma `[ texto ]` o `[ ]`
            const textBracket = occupantText ? `[ ${occupantText} ]` : '[ ]';
            place.replaceWith(document.createTextNode(textBracket));
        });
    } else {
        console.log("No se encontró el elemento .qtext para el preprocesado del enunciado.");
    }

    // Ahora que todos los `span.place...` y `span.draghome` han sido fusionados,
    // extraemos el enunciado en texto plano (o HTML en orden) con `extractContentInOrder`.
    let enunciado = '';
    if (enunciadoElement) {
        enunciado = await extractContentInOrder(enunciadoElement);
    } else {
        console.log("No se encontró el elemento .qtext para extraer el enunciado.");
    }
    console.log("Enunciado After", enunciado);

    // 3) Recopilar las opciones de respuesta únicas
    //    (en muchos casos Moodle las pone en un div con clase "user-select-none draggrouphomes1")
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

    // Mostrar en consola las respuestas encontradas y las opciones
    console.log('Respuestas encontradas:', respuestas);
    console.log('Opciones de respuestas:', opcionesRespuestas);

    // 4) Obtener el feedback de la pregunta (si corresponde)
    const feedback = await feedbackQuestion(originalFormulationClearfix);

    // 5) Construir el objeto `questionData` con la estructura solicitada
    const questionData = {
        enunciado: enunciado,           // El texto final del enunciado, con `[ ]` o `[ texto ]`
        respuestaCorrecta: respuestas,  // Array con el texto que había en cada hueco
        html: clonFormulation.outerHTML,
        tipo: tipo,
        ciclo: localStorage.getItem("ciclo"),
        feedback: feedback,
        opcionesRespuestas: opcionesRespuestas
    };

    return questionData;
}
