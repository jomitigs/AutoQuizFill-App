import { obtenerFormulationClearfix, extractContentInOrder } from '../../autofill-autosave-helpers.js';

export async function response_inputchecked_opcionmultiple(pregunta, questionData) {
  // console.log("Respondiendo preguntas inputchecked_opcionmultiple");

  // 1. Obtenemos las respuestas correctas esperadas desde questionData (clave: respuestaCorrecta).
  let respuestasCorrectasEsperadas = [];
  const respuestasData = questionData.respuestaCorrecta;
  if (respuestasData) {
    if (Array.isArray(respuestasData)) {
      respuestasCorrectasEsperadas = respuestasData.map(r => r.trim());
    } else if (typeof respuestasData === 'string') {
      respuestasCorrectasEsperadas = [respuestasData.trim()];
    }
  }
  // console.log("Respuestas correctas esperadas:", respuestasCorrectasEsperadas);

  // 2. Obtenemos el contenedor de la formulación.
  const formulation = obtenerFormulationClearfix(pregunta);
  // console.log("Formulation:", formulation);

  // 3. Obtenemos todos los inputs checkbox dentro de la formulación.
  const allInputCheckbox = formulation.querySelectorAll('input[type="checkbox"]');

  let opcionesRespuesta = [];
  let respuestaCorrecta = [];

  // 4. Iteramos sobre cada input checkbox.
  for (const inputCheckbox of allInputCheckbox) {
    // Se obtiene el id del label a partir del atributo "aria-labelledby".
    const labelId = inputCheckbox.getAttribute('aria-labelledby');
    if (!labelId) {
      console.log("No se encontró el atributo aria-labelledby para el input checkbox:", inputCheckbox);
      continue;
    }

    // Escapamos el id para usarlo en el selector.
    const escapedLabelId = CSS.escape(labelId);
    const labelElement = formulation.querySelector(`#${escapedLabelId}`);

    let textoOpcion = '';
    if (labelElement) {
      // Se extrae el contenido del label.
      textoOpcion = await extractContentInOrder(labelElement);
      // Se eliminan posibles literales iniciales (por ejemplo: "a.", "b.", etc.).
      textoOpcion = textoOpcion.replace(/^[a-zA-Z]\.|^[ivxlcdmIVXLCDM]+\./, '').trim();
    } else {
      console.log("No se encontró label asociado para el input checkbox con id:", labelId);
    }

    opcionesRespuesta.push(textoOpcion);

    // Si el checkbox ya está marcado, se añade su texto a las respuestas correctas.
    if (inputCheckbox.checked) {
      respuestaCorrecta.push(textoOpcion);
    }

    // Si el texto de la opción coincide con alguna de las respuestas correctas esperadas, se marca el checkbox.
    if (respuestasCorrectasEsperadas.some(r => r === textoOpcion)) {
      // console.log("Respuesta esperada encontrada. Seleccionando la opción:", textoOpcion);
      inputCheckbox.checked = true;
      inputCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  // console.log("Opciones de respuesta extraídas:", opcionesRespuesta);
  // console.log("Respuestas seleccionadas:",  respuestaCorrecta.length > 0 ? respuestaCorrecta : respuestasCorrectasEsperadas);
}
