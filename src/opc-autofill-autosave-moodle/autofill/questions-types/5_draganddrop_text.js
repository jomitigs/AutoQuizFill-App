import interact from 'interactjs';
import { obtenerFormulationClearfix } from '../../autofill-autosave-helpers.js';

/**
 * Simula el drag and drop calculando las posiciones relativas al contenedor padre (offsetParent)
 * para evitar que el elemento se quede fuera de lugar.
 *
 * @param {HTMLElement} choice - Elemento draggable que se moverá.
 * @param {HTMLElement} place - Elemento dropzone destino.
 * @returns {Promise} - Resuelve cuando finaliza la animación.
 */
function simulateDragAndDropInteract(choice, place) {
  return new Promise(resolve => {
    // Usamos el contenedor offsetParent (o document.body de respaldo)
    const container = choice.offsetParent || document.body;
    const containerRect = container.getBoundingClientRect();
    const choiceRect = choice.getBoundingClientRect();
    const dropRect = place.getBoundingClientRect();

    // Posición actual del elemento relativa al contenedor
    const currentX = choiceRect.left - containerRect.left;
    const currentY = choiceRect.top - containerRect.top;

    // Calcula la posición objetivo (centrando el choice en el dropzone) relativa al contenedor
    const targetX =
      dropRect.left -
      containerRect.left +
      dropRect.width / 2 -
      choiceRect.width / 2;
    const targetY =
      dropRect.top -
      containerRect.top +
      dropRect.height / 2 -
      choiceRect.height / 2;

    const deltaX = targetX - currentX;
    const deltaY = targetY - currentY;

    // Aplicamos la transición para simular el movimiento
    choice.style.transition = 'transform 0.5s ease';
    choice.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    // Una vez finalizada la transición...
    choice.addEventListener(
      'transitionend',
      () => {
        // Limpiamos la transición
        choice.style.transition = '';

        // Actualizamos los atributos de posición para interact.js (si está configurado)
        choice.setAttribute('data-x', targetX);
        choice.setAttribute('data-y', targetY);

        resolve();
      },
      { once: true }
    );
  });
}

/**
 * Función que responde una pregunta de drag and drop tipo texto utilizando interact.js
 * para simular el movimiento y actualizar el estado del sistema.
 *
 * @param {HTMLElement} pregunta - Elemento o identificador de la pregunta.
 * @param {Object} questionData - Objeto con los datos de la pregunta, que debe incluir:
 *        questionData.respuestaCorrecta => Array con las respuestas correctas. Una cadena vacía ("")
 *        indica que en esa posición no se coloca respuesta.
 */
export function response_draganddrop_text(pregunta, questionData) {
  const formulation = obtenerFormulationClearfix(pregunta);
  if (!formulation) {
    console.error('No se encontró la formulación para la pregunta:', pregunta);
    return;
  }

  // Buscamos el primer "place" que contenga las clases "place", "drop" y "group"
  const firstPlace = formulation.querySelector(
    '[class*="place"][class*="drop"][class*="group"]'
  );
  if (!firstPlace) {
    console.error('No se pudo encontrar un "place" en la formulación.');
    return;
  }
  const groupClass = Array.from(firstPlace.classList).find(cls =>
    cls.startsWith('group')
  );
  if (!groupClass) {
    console.error('No se pudo determinar el grupo a partir del "place".');
    return;
  }

  console.log(`Procesando grupo: ${groupClass}`);

  // Iteramos sobre cada respuesta correcta (omitiendo las posiciones vacías)
  questionData.respuestaCorrecta.forEach((respuesta, index) => {
    setTimeout(async () => {
      if (!respuesta) {
        console.log(`Posición ${index + 1} está vacía, omitiendo.`);
        return;
      }

      // Seleccionamos el "place" correspondiente a la posición (clase: placeX)
      const place = formulation.querySelector(
        `.place${index + 1}.drop.${groupClass}`
      );
      if (!place) {
        console.log(
          `No se encontró el lugar para la respuesta "${respuesta}" en el grupo ${groupClass}`
        );
        return;
      }

      // Verificamos si ya existe una respuesta colocada
      const existingPlaced =
        place.nextElementSibling &&
        place.nextElementSibling.classList.contains('draghome') &&
        place.nextElementSibling.classList.contains('placed');
      if (existingPlaced) {
        console.log(
          `El lugar ${index + 1} ya tiene una respuesta colocada.`
        );
        return;
      }

      // Buscamos el elemento draggable (choice) que contenga el texto de la respuesta
      const choice = Array.from(
        document.querySelectorAll(`.draghome.user-select-none.${groupClass}`)
      ).find(el => el.innerText.trim() === respuesta);
      if (!choice) {
        console.log(
          `No se encontró la respuesta "${respuesta}" en el grupo ${groupClass}`
        );
        return;
      }

      console.log(
        `Colocando respuesta "${respuesta}" en la posición ${index + 1} del grupo ${groupClass}`
      );

      // Simulamos el drag and drop con la función actualizada
      await simulateDragAndDropInteract(choice, place);

      // Actualizamos el input oculto para que el sistema detecte la respuesta
      const hiddenInput = formulation.querySelector(
        `input.place${index + 1}.${groupClass}`
      );
      if (hiddenInput) {
        const value = getValueForRespuesta(choice);
        hiddenInput.value = value;
        if (window.jQuery) {
          window.jQuery(hiddenInput).trigger('change');
          window.jQuery(hiddenInput).trigger('input');
        } else {
          hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
          hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        console.log(
          `Input oculto actualizado para place${index + 1} con valor "${value}"`
        );
      } else {
        console.error(
          `No se encontró el input oculto para place${index + 1} en el grupo ${groupClass}`
        );
        return;
      }

      // Insertamos el elemento visual que indica la respuesta colocada
      const placedElementHTML = `<span class="draghome user-select-none choice${getValueForRespuesta(
        choice
      )} ${groupClass} placed inplace${index + 1}" tabindex="0">${respuesta}</span>`;
      place.insertAdjacentHTML('afterend', placedElementHTML);

      // Actualizamos el estado del elemento original
      choice.classList.remove('unplaced');
      choice.style.display = 'none';

      console.log(
        `Respuesta "${respuesta}" colocada en la posición ${index + 1} del grupo ${groupClass}`
      );
    }, index * 1500); // Retardo de 1.5 segundos entre cada respuesta
  });

  console.log('Automatización de drag and drop finalizada.');
}

/**
 * Extrae el valor a partir de la clase "choiceX" del elemento.
 *
 * @param {HTMLElement} choiceElement - Elemento draggable.
 * @returns {string} - El número extraído o "0" si no se encuentra.
 */
function getValueForRespuesta(choiceElement) {
  const classes = Array.from(choiceElement.classList);
  const choiceClass = classes.find(cls => cls.startsWith('choice'));
  if (choiceClass) {
    return choiceClass.replace('choice', '');
  }
  return "0";
}
