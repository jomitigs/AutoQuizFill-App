import { obtenerFormulationClearfix } from '../../autofill-autosave-helpers.js';

export async function response_inputradio_opcionmultiple_verdaderofalso(pregunta, questionData) {
  console.log("Respondiendo preguntas inputradio_opcionmultiple_verdaderofalso");

  // 1. Obtenemos la respuesta correcta esperada desde questionData, o asignamos una cadena vacía si no está definida.
  const respuestaCorrectaEsperada = typeof questionData.RespuestaCorrecta === "string" 
    ? questionData.RespuestaCorrecta 
    : "";
    
  if (!respuestaCorrectaEsperada) {
    console.error("RespuestaCorrecta no está definida o es vacía en questionData");
    return;
  }
  console.log("Respuesta correcta esperada:", respuestaCorrectaEsperada);

  // 2. Obtenemos el contenedor de la formulación.
  const formulation = obtenerFormulationClearfix(pregunta);
  console.log("Formulation:", formulation);

  // 3. Obtenemos todos los inputs radio dentro de la formulación.
  const allInputRadio = formulation.querySelectorAll('input[type="radio"]');

  let opcionesRespuesta = [];
  let respuestaCorrecta = null;

  // 4. Iteramos sobre cada input radio.
  for (const inputRadio of allInputRadio) {
    let labelInput = inputRadio.nextElementSibling;
    let textoOpcion = "";
    
    if (labelInput) {
      // Si el label contiene un elemento con clase "flex-fill", se extrae el contenido desde allí.
      const flexFillElement = labelInput.querySelector('.flex-fill');
      if (flexFillElement) {
        textoOpcion = await extractContentInOrder(flexFillElement) || "";
      } else {
        // Si no, se extrae directamente del label.
        textoOpcion = await extractContentInOrder(labelInput) || "";
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

    // Si el input ya está marcado, registramos su texto.
    if (inputRadio.checked) {
      console.log("Input radio marcado encontrado. Respuesta correcta:", textoOpcion);
      respuestaCorrecta = textoOpcion;
    }

    // 5. Comparamos asegurándonos de que 'textoOpcion' no sea undefined.
    if (textoOpcion && textoOpcion.trim() === respuestaCorrectaEsperada.trim()) {
      console.log("Respuesta esperada encontrada. Seleccionando la opción:", textoOpcion);
      inputRadio.checked = true;
      // Disparamos un evento de cambio si es necesario.
      inputRadio.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  console.log("Opciones de respuesta extraídas:", opcionesRespuesta);
  console.log("Respuesta seleccionada:", respuestaCorrecta || respuestaCorrectaEsperada);
}
