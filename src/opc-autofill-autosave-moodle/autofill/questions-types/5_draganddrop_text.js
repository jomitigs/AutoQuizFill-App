import {  obtenerFormulationClearfix } from '../../autofill-autosave-helpers.js';

import interact from 'interactjs'; // Importamos interactjs, opcional para mejorar la simulación

/**
 * Función que responde una pregunta de drag and drop de tipo texto.
 * @param {HTMLElement} pregunta - El elemento o identificador de la pregunta.
 * @param {Object} questionData - Objeto con los datos de la pregunta, donde questionData.respuestaCorrecta es un array con las respuestas.
 */
export async function response_draganddrop_text(pregunta, questionData) {
    // Obtener el elemento formulation utilizando la función proporcionada.
    let formulation = obtenerFormulationClearfix(pregunta);
    if (!formulation) {
        console.error('No se encontró la formulación para la pregunta:', pregunta);
        return;
    }

    // Buscar el primer "place" que contenga las clases "place", "drop" y "group" para extraer el identificador de grupo.
    const firstPlace = formulation.querySelector('[class*="place"][class*="drop"][class*="group"]');
    if (!firstPlace) {
        console.error('No se pudo encontrar un "place" en la formulación.');
        return;
    }

    // Extraer la clase que identifica el grupo (ejemplo: group1, group2, etc.)
    const groupClass = Array.from(firstPlace.classList).find(cls => cls.startsWith('group'));
    if (!groupClass) {
        console.error('No se pudo determinar el grupo a partir del "place".');
        return;
    }

    console.log(`Procesando grupo: ${groupClass}`);

    // Iteramos sobre cada respuesta del array. Una cadena vacía indica que no se debe colocar respuesta en esa posición.
    questionData.respuestaCorrecta.forEach((respuesta, index) => {
        // Usamos setTimeout para espaciar las acciones (por ejemplo, 1500 ms entre cada respuesta)
        setTimeout(async () => {
            // Si la respuesta está vacía, se omite esta posición.
            if (!respuesta) {
                console.log(`Posición ${index + 1} está vacía, omitiendo.`);
                return;
            }

            // Seleccionar el "place" correspondiente a esta posición: se espera que tenga una clase del tipo "placeX", "drop" y el grupo.
            const place = formulation.querySelector(`.place${index + 1}.drop.${groupClass}`);
            if (!place) {
                console.log(`No se encontró el lugar para la respuesta "${respuesta}" en el grupo ${groupClass}`);
                return;
            }

            // Verificar si en este "place" ya se ha colocado una respuesta (buscando un hermano inmediato con clases indicativas).
            const existingPlaced = place.nextElementSibling &&
                                   place.nextElementSibling.classList.contains('draghome') &&
                                   place.nextElementSibling.classList.contains('placed');
            if (existingPlaced) {
                console.log(`El lugar ${index + 1} ya tiene una respuesta colocada.`);
                return;
            }

            // Buscar el elemento "choice" (la opción draggable) que coincida con el texto de la respuesta.
            const choice = Array.from(document.querySelectorAll(`.draghome.user-select-none.${groupClass}`))
                .find(el => el.innerText.trim() === respuesta);
            if (!choice) {
                console.log(`No se encontró la respuesta "${respuesta}" en el grupo ${groupClass}`);
                return;
            }

            console.log(`Colocando respuesta "${respuesta}" en la posición ${index + 1} del grupo ${groupClass}`);

            // Simular la acción de drag and drop.
            // Aquí se puede utilizar la función personalizada simulateDragAndDropMouse,
            // o, si se prefiere, implementar la simulación con interactjs.
            // Por ejemplo, se podría configurar el elemento como draggable y el target como dropzone.
            await simulateDragAndDropMouse(choice, place);

            // Actualizar el input oculto asociado al "place" para que Moodle (u otro sistema) detecte la respuesta.
            const hiddenInput = formulation.querySelector(`input.place${index + 1}.${groupClass}`);
            if (hiddenInput) {
                // Se obtiene un valor (por ejemplo, mediante una función que extraiga algún identificador) de la respuesta.
                const value = getValueForRespuesta(choice);
                hiddenInput.value = value;
                // Disparar los eventos 'change' e 'input' para que se detecte el cambio.
                if (window.jQuery) {
                    window.jQuery(hiddenInput).trigger('change');
                    window.jQuery(hiddenInput).trigger('input');
                } else {
                    hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
                    hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
                }
                console.log(`Input oculto actualizado para place${index + 1} con valor "${value}"`);
            } else {
                console.error(`No se encontró el input oculto para place${index + 1} en el grupo ${groupClass}`);
                return;
            }

            // Insertar el elemento visual que representa la respuesta colocada.
            const placedElementHTML = `<span class="draghome user-select-none choice${getValueForRespuesta(choice)} ${groupClass} placed inplace${index + 1}" tabindex="0">${respuesta}</span>`;
            place.insertAdjacentHTML('afterend', placedElementHTML);

            // Actualizar el elemento original: se remueve la clase "unplaced" y se oculta, simulando que ya ha sido usado.
            choice.classList.remove('unplaced');
            choice.style.display = 'none';

            console.log(`Respuesta "${respuesta}" colocada en la posición ${index + 1} del grupo ${groupClass}`);
        }, index * 1500); // Ajusta el retraso según sea necesario
    });

    console.log('Automatización de drag and drop finalizada.');
}

