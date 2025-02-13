// Si lo deseas, puedes importar interactjs para usar funcionalidades avanzadas en el futuro
import interact from 'interactjs';

/**
 * Función que responde la pregunta de tipo "drag and drop text" utilizando los datos proporcionados.
 * @param {HTMLElement} pregunta - Elemento que representa la pregunta en el DOM.
 * @param {Object} questionData - Objeto con los datos de la pregunta, donde questionData.respuestaCorrecta es un array con las respuestas correctas. 
 *                                 Algunas entradas pueden ser cadenas vacías, lo que indica que en esa posición no se debe colocar nada.
 */
export async function response_draganddrop_text(pregunta, questionData) {
    console.log('Iniciando response_draganddrop_text para la pregunta:', pregunta);

    // Se obtiene la formulación específica (el contenedor con las clases "formulation clearfix") usando la función auxiliar.
    let formulation = obtenerFormulationClearfix(pregunta);
    if (!formulation) {
        console.error("No se encontró la formulación para la pregunta", pregunta);
        return;
    }

    // Buscar el primer elemento "place" para extraer la clase de grupo (por ejemplo, "group1")
    const firstPlace = formulation.querySelector('[class*="place"][class*="drop"][class*="group"]');
    if (!firstPlace) {
        console.error('No se pudo encontrar un "place" en esta formulación.');
        return;
    }
    // Se extrae la clase que comience con "group" para identificar el grupo
    const groupClass = Array.from(firstPlace.classList).find(cls => cls.startsWith('group'));
    if (!groupClass) {
        console.error('No se pudo determinar el número del grupo.');
        return;
    }
    console.log(`Procesando grupo: ${groupClass}`);

    // Iteramos de forma secuencial sobre cada respuesta definida en questionData.respuestaCorrecta.
    // Se asume que el array tiene la posición de cada respuesta, pudiendo incluir cadenas vacías.
    for (let index = 0; index < questionData.respuestaCorrecta.length; index++) {
        const respuesta = questionData.respuestaCorrecta[index];

        // Si la respuesta es vacía, se omite la acción (es decir, se deja el drop zone sin respuesta).
        if (!respuesta || respuesta.trim() === "") {
            console.log(`No se coloca ninguna respuesta en la posición ${index + 1} (valor vacío).`);
            continue;
        }

        // Seleccionar el drop zone correspondiente, basado en la posición (place1, place2, etc.) y el grupo.
        const place = formulation.querySelector(`.place${index + 1}.drop.${groupClass}`);
        if (!place) {
            console.log(`No se encontró el lugar para la respuesta "${respuesta}" en el grupo ${groupClass}`);
            continue;
        }

        // Verificar si ya hay una respuesta colocada en este drop zone
        const existingPlaced = place.nextElementSibling &&
                              place.nextElementSibling.classList.contains('draghome') &&
                              place.nextElementSibling.classList.contains('placed');
        if (existingPlaced) {
            console.log(`El lugar ${index + 1} ya tiene una respuesta colocada.`);
            continue;
        }

        // Buscar la opción de respuesta (elemento draggable) que contenga exactamente el texto de "respuesta"
        const choice = Array.from(document.querySelectorAll(`.draghome.user-select-none.${groupClass}`))
                            .find(el => el.innerText.trim() === respuesta);
        if (!choice) {
            console.log(`No se encontró la respuesta "${respuesta}" en el grupo ${groupClass}`);
            continue;
        }

        console.log(`Colocando respuesta "${respuesta}" en el lugar ${index + 1} del grupo ${groupClass}`);

        // Simular el drag and drop: se arrastra el elemento "choice" y se suelta en el "place"
        await simulateDragAndDropMouse(choice, place);

        // Actualizar el valor del input oculto asociado al drop zone para que Moodle registre la respuesta
        const hiddenInput = formulation.querySelector(`input.place${index + 1}.${groupClass}`);
        if (hiddenInput) {
            const value = getValueForRespuesta(choice);
            hiddenInput.value = value;
            // Disparar eventos de cambio para que Moodle detecte la actualización
            if (window.jQuery) {
                window.jQuery(hiddenInput).trigger('change');
                window.jQuery(hiddenInput).trigger('input');
            } else {
                hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
                hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
            console.log(`Actualizado el valor oculto para place${index + 1}: "${respuesta}" con valor "${value}"`);
        } else {
            console.error(`No se encontró el input oculto para place${index + 1} en el grupo ${groupClass}`);
            continue;
        }

        // Crear y añadir el elemento visual que representa la respuesta colocada
        const placedElementHTML = `<span class="draghome user-select-none choice${getValueForRespuesta(choice)} ${groupClass} placed inplace${index + 1}" tabindex="0">${respuesta}</span>`;
        place.insertAdjacentHTML('afterend', placedElementHTML);

        // Remover la clase "unplaced" del elemento draggable para indicar que ya ha sido utilizado
        choice.classList.remove('unplaced');

        // Ocultar el elemento draggable original, en caso de que Moodle requiera que no se muestre
        choice.style.display = 'none';

        console.log(`Respuesta "${respuesta}" colocada en el lugar ${index + 1} del grupo ${groupClass}`);

        // (Opcional) Esperar un breve periodo antes de procesar la siguiente respuesta para asegurar estabilidad
        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    console.log('Automatización de drag and drop finalizada.');
}


/**
 * Función auxiliar para extraer el valor de respuesta a partir del elemento draggable.
 * Se asume que dicho valor se encuentra en una clase con el formato "choiceX".
 * @param {HTMLElement} choiceElement - Elemento que representa la opción draggable.
 * @returns {string} - El número de la elección como string, o "0" si no se encuentra.
 */
function getValueForRespuesta(choiceElement) {
    const classes = Array.from(choiceElement.classList);
    const choiceClass = classes.find(cls => cls.startsWith('choice'));
    if (choiceClass) {
        const choiceNumber = choiceClass.replace('choice', '');
        return choiceNumber;
    }
    return "0"; // Valor por defecto si no se encuentra la clase "choiceX"
}


/**
 * Función que simula el comportamiento de drag and drop utilizando eventos de mouse y drag.
 * @param {HTMLElement} draggableElement - Elemento que se va a arrastrar.
 * @param {HTMLElement} dropZoneElement - Zona donde se soltará el elemento.
 * @returns {Promise} - Se resuelve cuando la secuencia de eventos ha finalizado.
 */
function simulateDragAndDropMouse(draggableElement, dropZoneElement) {
    return new Promise((resolve, reject) => {
        try {
            // Obtener las coordenadas de los elementos (bounding box)
            const draggableRect = draggableElement.getBoundingClientRect();
            const dropZoneRect = dropZoneElement.getBoundingClientRect();

            // Calcular las coordenadas centrales para simular los eventos
            const draggableCenter = {
                x: draggableRect.left + draggableRect.width / 2,
                y: draggableRect.top + draggableRect.height / 2
            };
            const dropZoneCenter = {
                x: dropZoneRect.left + dropZoneRect.width / 2,
                y: dropZoneRect.top + dropZoneRect.height / 2
            };

            // Crear un objeto DataTransfer para los eventos de drag
            const dataTransfer = new DataTransfer();

            /**
             * Función para crear y despachar un evento de mouse.
             * @param {string} type - Tipo de evento (e.g., 'mousedown', 'mousemove', 'mouseup').
             * @param {number} clientX - Coordenada X.
             * @param {number} clientY - Coordenada Y.
             * @param {number} buttons - Botones del mouse (valor por defecto 1).
             * @returns {MouseEvent} - El evento creado.
             */
            function createMouseEvent(type, clientX, clientY, buttons = 1) {
                return new MouseEvent(type, {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: clientX,
                    clientY: clientY,
                    buttons: buttons
                });
            }

            /**
             * Función para crear y despachar un evento de drag.
             * @param {string} type - Tipo de evento de drag (e.g., 'dragstart', 'dragover', 'drop').
             * @param {number} clientX - Coordenada X.
             * @param {number} clientY - Coordenada Y.
             * @returns {DragEvent} - El evento creado.
             */
            function createDragEvent(type, clientX, clientY) {
                return new DragEvent(type, {
                    bubbles: true,
                    cancelable: true,
                    clientX: clientX,
                    clientY: clientY,
                    dataTransfer: dataTransfer
                });
            }

            // Secuencia asíncrona para disparar los eventos en orden:
            async function dragAndDropSequence() {
                try {
                    // 1. Mover el cursor al centro del elemento draggable
                    window.dispatchEvent(createMouseEvent('mousemove', draggableCenter.x, draggableCenter.y));

                    // 2. Presionar el botón del mouse sobre el draggable
                    draggableElement.dispatchEvent(createMouseEvent('mousedown', draggableCenter.x, draggableCenter.y));

                    // 3. Iniciar el drag (dragstart)
                    draggableElement.dispatchEvent(createDragEvent('dragstart', draggableCenter.x, draggableCenter.y));

                    // 4. Mover el cursor hasta el centro de la drop zone
                    window.dispatchEvent(createMouseEvent('mousemove', dropZoneCenter.x, dropZoneCenter.y));

                    // 5. Disparar eventos de drag sobre la drop zone
                    dropZoneElement.dispatchEvent(createDragEvent('dragenter', dropZoneCenter.x, dropZoneCenter.y));
                    dropZoneElement.dispatchEvent(createDragEvent('dragover', dropZoneCenter.x, dropZoneCenter.y));

                    // 6. Soltar el elemento (drop)
                    dropZoneElement.dispatchEvent(createDragEvent('drop', dropZoneCenter.x, dropZoneCenter.y));

                    // 7. Finalizar el drag (dragleave y dragend)
                    dropZoneElement.dispatchEvent(createDragEvent('dragleave', dropZoneCenter.x, dropZoneCenter.y));
                    draggableElement.dispatchEvent(createDragEvent('dragend', dropZoneCenter.x, dropZoneCenter.y));

                    // 8. Soltar el botón del mouse
                    dropZoneElement.dispatchEvent(createMouseEvent('mouseup', dropZoneCenter.x, dropZoneCenter.y, 0));

                    // Esperar un momento para que se procesen los eventos
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                } catch (error) {
                    console.error('Error en la secuencia de drag and drop:', error);
                    reject(error);
                }
            }

            dragAndDropSequence();
        } catch (error) {
            console.error('Error en la simulación de drag and drop:', error);
            reject(error);
        }
    });
}
