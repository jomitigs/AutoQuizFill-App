import { feedbackQuestion, File2DataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';

// Manejar respuestas tipo 'draganddrop_image'
export async function draganddrop_image(originalFormulationClearfix) {
    console.warn("hola.");
    // Definir el tipo de pregunta
    const tipo = 'draganddrop_image';
    console.log(tipo);

    // Crear un array para almacenar las respuestas (se usará como "respuestaCorrecta")
    const respuestas = [];

    // Clonar el elemento original para procesarlo
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // Convertir las imágenes dentro del clon a formato Data URI
    await File2DataUri(clonFormulation);

    // 1) Localizar el elemento que contiene el enunciado (qtext)
    const enunciadoElement = clonFormulation.querySelector('.qtext');
    let enunciado = '';
    if (enunciadoElement) {
        enunciado = await extractContentInOrder(enunciadoElement);
    } else {
        console.warn("No se encontró el elemento .qtext para extraer el enunciado.");
    }

    // 2) Obtener la imagen principal (dropbackground) dentro de .droparea
    let imagenDrop = '';
    const dropareaImg = clonFormulation.querySelector('.droparea img.dropbackground');
    if (dropareaImg) {
        imagenDrop = dropareaImg.getAttribute('src') || '';
    }

    // 3) Recopilar las "respuestas" realmente colocadas en cada .dropzone
    //    (las que aparecen con clase .placed, p. ej. choice1 placed inplace1)
    const dropzones = clonFormulation.querySelectorAll('.dropzones .dropzone');
    dropzones.forEach(dropzone => {
        // p.ej. class="dropzone group1 place1" => "place1"
        const placeClass = [...dropzone.classList].find(cls => cls.startsWith('place'));
        if (placeClass) {
            // Buscar si hay un elemento .draghome que coincida con la misma place (inplace1, inplace2, etc.)
            const occupant = dropzone.parentElement.querySelector(`.draghome.user-select-none.placed.in${placeClass}`);
            if (occupant) {
                respuestas.push(occupant.textContent.trim());
            } else {
                respuestas.push('');
            }
        }
    });

    // 4) Recopilar las opciones de respuesta únicas desde .draghomes
    const opcionesRespuestas = [];
    const draghomesContainer = clonFormulation.querySelector('.draghomes');
    if (draghomesContainer) {
        const draghomes = draghomesContainer.querySelectorAll('.draghome');
        draghomes.forEach(d => {
            const texto = d.textContent.trim();
            if (texto && !opcionesRespuestas.includes(texto)) {
                opcionesRespuestas.push(texto);
            }
        });
    }

    // 5) Obtener el feedback de la pregunta (si corresponde)
    const feedback = await feedbackQuestion(originalFormulationClearfix);

    // 6) Construir el objeto final con la estructura solicitada
    const questionData = {
        enunciado: enunciado,
        imagenDrop: imagenDrop,
        respuestaCorrecta: respuestas,  
        html: clonFormulation.outerHTML, 
        tipo: tipo,
        ciclo: localStorage.getItem("ciclo"),
        feedback: feedback,
        opcionesRespuestas: opcionesRespuestas
    };

    return questionData;
}
