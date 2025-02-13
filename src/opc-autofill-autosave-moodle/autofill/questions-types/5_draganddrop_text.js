import interact from 'interactjs';
import { obtenerFormulationClearfix } from '../../autofill-autosave-helpers.js';

/**
 * Función auxiliar que simula el movimiento de drag and drop usando una animación CSS.
 * Aunque interactjs se utiliza principalmente para habilitar comportamientos interactivos,
 * aquí aprovechamos que ya configuramos el elemento como draggable (si fuera necesario)
 * para moverlo visualmente al dropzone.
 *
 * @param {HTMLElement} choice - Elemento draggable que se moverá.
 * @param {HTMLElement} place - Elemento dropzone destino.
 * @returns {Promise} - Resuelve cuando finaliza la animación.
 */
function simulateDragAndDropInteract(choice, place) {
  return new Promise(resolve => {
    // Obtener las dimensiones y posiciones actuales.
    const choiceRect = choice.getBoundingClientRect();
    const dropRect = place.getBoundingClientRect();
    
    // Calcular la posición central del dropzone y ajustar para centrar el elemento choice.
    const targetX = dropRect.left + (dropRect.width / 2) - (choiceRect.width / 2);
    const targetY = dropRect.top + (dropRect.height / 2) - (choiceRect.height / 2);
    
    // Calcular el desplazamiento que se debe aplicar.
    const deltaX = targetX - choiceRect.left;
    const deltaY = targetY - choiceRect.top;
    
    // Opcional: Si deseas que interactjs se encargue de configurar el elemento como draggable,
    // podrías hacerlo aquí. Sin embargo, para la simulación programática usamos una transición CSS.
    
    // Aplicar una transición para simular el movimiento.
    choice.style.transition = 'transform 0.5s ease';
    choice.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    
    // Una vez finalizada la transición, resolver la promesa.
    choice.addEventListener('transitionend', () => {
      // Limpiar la transición para evitar conflictos futuros.
      choice.style.transition = '';
      resolve();
    }, { once: true });
  });
}

/**
 * Función que responde una pregunta de drag and drop de tipo texto utilizando interactjs
 * para mejorar la simulación del movimiento.
 *
 * @param {HTMLElement} pregunta - Elemento o identificador de la pregunta.
 * @param {Object} questionData - Objeto con los datos de la pregunta. Debe incluir:
 *        questionData.respuestaCorrecta => Array con las respuestas correctas. Una cadena vacía ("")
 *        indica que en esa posición no se coloca respuesta.
 */
export function response_draganddrop_text(pregunta, questionData) {
  // Se obtiene la formulación correspondiente usando la función proporcionada.
  let formulation = obtenerFormulationClearfix(pregunta);
  if (!formulation) {
    console.error('No se encontró la formulación para la pregunta:', pregunta);
    return;
  }

  // Se busca el primer "place" que contenga las clases "place", "drop" y "group"
  // para extraer el identificador del grupo (por ejemplo, "group1").
  const firstPlace = formulation.querySelector('[class*="place"][class*="drop"][class*="group"]');
  if (!firstPlace) {
    console.error('No se pudo encontrar un "place" en la formulación.');
    return;
  }
  const groupClass = Array.from(firstPlace.classList).find(cls => cls.startsWith('group'));
  if (!groupClass) {
    console.error('No se pudo determinar el grupo a partir del "place".');
    return;
  }

  console.log(`Procesando grupo: ${groupClass}`);

  // Iteramos sobre cada respuesta correcta. Si la cadena es vacía, se omite esa posición.
  questionData.respuestaCorrecta.forEach((respuesta, index) => {
    setTimeout(async () => {
      if (!respuesta) {
        console.log(`Posición ${index + 1} está vacía, omitiendo.`);
        return;
      }

      // Seleccionar el "place" correspondiente a la posición (se espera una clase del tipo "placeX").
      const place = formulation.querySelector(`.place${index + 1}.drop.${groupClass}`);
      if (!place) {
        console.log(`No se encontró el lugar para la respuesta "${respuesta}" en el grupo ${groupClass}`);
        return;
      }

      // Comprobar si ya existe una respuesta colocada.
      const existingPlaced = place.nextElementSibling &&
                             place.nextElementSibling.classList.contains('draghome') &&
                             place.nextElementSibling.classList.contains('placed');
      if (existingPlaced) {
        console.log(`El lugar ${index + 1} ya tiene una respuesta colocada.`);
        return;
      }

      // Buscar el elemento draggable (choice) que contenga el texto de la respuesta.
      const choice = Array.from(document.querySelectorAll(`.draghome.user-select-none.${groupClass}`))
        .find(el => el.innerText.trim() === respuesta);
      if (!choice) {
        console.log(`No se encontró la respuesta "${respuesta}" en el grupo ${groupClass}`);
        return;
      }

      console.log(`Colocando respuesta "${respuesta}" en la posición ${index + 1} del grupo ${groupClass}`);

      // Simular el drag and drop utilizando interactjs (nuestra función de simulación).
      await simulateDragAndDropInteract(choice, place);

      // Actualizar el input oculto asociado al "place" para que el sistema detecte la respuesta.
      const hiddenInput = formulation.querySelector(`input.place${index + 1}.${groupClass}`);
      if (hiddenInput) {
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

      // Insertar en el DOM el elemento visual que indica la respuesta colocada.
      const placedElementHTML = `<span class="draghome user-select-none choice${getValueForRespuesta(choice)} ${groupClass} placed inplace${index + 1}" tabindex="0">${respuesta}</span>`;
      place.insertAdjacentHTML('afterend', placedElementHTML);

      // Actualizar el estado del elemento original.
      choice.classList.remove('unplaced');
      choice.style.display = 'none';

      console.log(`Respuesta "${respuesta}" colocada en la posición ${index + 1} del grupo ${groupClass}`);
    }, index * 1500); // Se establece un retraso de 1.5 segundos entre cada respuesta.
  });

  console.log('Automatización de drag and drop finalizada.');
}

function getValueForRespuesta(choiceElement) {
    const classes = Array.from(choiceElement.classList);
    const choiceClass = classes.find(cls => cls.startsWith('choice'));
    if (choiceClass) {
        const choiceNumber = choiceClass.replace('choice', '');
        return choiceNumber;
    }
    return "0"; // Valor por defecto si no se encuentra la clase "choiceX"
}