import { obtenerFormulationClearfix,  extractContentInOrder } from '../../autofill-autosave-helpers.js';

export async function response_inputradio_opcionmultiple_verdaderofalso(pregunta, questionData) {
    // console.log("Respondiendo preguntas inputradio_opcionmultiple_verdaderofalso");

  // Aseguramos que questionData.RespuestaCorrecta tenga un valor.
  const respuestaCorrectaEsperada = (questionData && typeof questionData.respuestaCorrecta === 'string')
    ? questionData.respuestaCorrecta
    : '';
  // console.log("Respuesta correcta esperada:", respuestaCorrectaEsperada);

  // Obtenemos el contenedor de la formulación.
  const formulation = obtenerFormulationClearfix(pregunta);
  // console.log("Formulation:", formulation);

  // Obtenemos todos los inputs radio dentro de la formulación.
  const allInputRadio = formulation.querySelectorAll('input[type="radio"]');

  let opcionesRespuesta = [];
  let respuestaCorrecta = null;

  // Iteramos sobre cada input radio.
  for (const inputRadio of allInputRadio) {
    // Se asume que el label asociado es el siguiente elemento en el DOM.
    let labelInput = inputRadio.nextElementSibling;
    let textoOpcion = '';

    if (labelInput) {
      // Si el label contiene un elemento con clase "flex-fill", se extrae el contenido desde allí.
      const flexFillElement = labelInput.querySelector('.flex-fill');
      if (flexFillElement) {
        textoOpcion = await extractContentInOrder(flexFillElement);
      } else {
        // Si no, se extrae directamente del label.
        textoOpcion = await extractContentInOrder(labelInput);
      }
      // Si no se encuentra un elemento MathJax, se eliminan literales iniciales (como "a.", "b.", etc.).
      const mathJaxElement = labelInput.querySelector('.MathJax');
      if (!mathJaxElement) {
        textoOpcion = textoOpcion.replace(/^[a-zA-Z]\.|^[ivxlcdmIVXLCDM]+\./, '').trim();
      }
    } else {
      console.log("No se encontró label asociado para el input radio:", inputRadio);
    }

    opcionesRespuesta.push(textoOpcion);

    // Si el input ya está marcado, se registra su texto.
    if (inputRadio.checked) {
      // console.log("Input radio marcado encontrado. Respuesta correcta:", textoOpcion);
      respuestaCorrecta = textoOpcion;
    }

    // Solo comparamos si tenemos una respuesta esperada.
    if (respuestaCorrectaEsperada && textoOpcion.trim() === respuestaCorrectaEsperada.trim()) {
      // console.log("Respuesta esperada encontrada. Seleccionando la opción:", textoOpcion);
      inputRadio.checked = true;
      // Disparamos un evento de cambio, si es necesario.
      inputRadio.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  // console.log("Opciones de respuesta extraídas:", opcionesRespuesta);
  // console.log("Respuesta seleccionada:", respuestaCorrecta || respuestaCorrectaEsperada);
}
