import { obtenerFormulationClearfix } from '../../autofill-autosave-helpers.js';

export async function response_inputtext_respuestacorta(pregunta, questionData) {
  // Aseguramos que questionData.respuestaCorrecta tenga un valor.
  const respuestaCorrectaEsperada = (questionData && typeof questionData.respuestaCorrecta === 'string')
    ? questionData.respuestaCorrecta
    : '';

  // Obtenemos el contenedor de la formulación.
  const formulation = obtenerFormulationClearfix(pregunta);

  // Buscamos el input text dentro de la formulación.
  const inputText = formulation.querySelector('input[type="text"]');

  if (!inputText) {
    console.log("No se encontró input text en la pregunta:", pregunta);
    return;
  }

  // Pegamos la respuesta correcta en el input text.
  inputText.value = respuestaCorrectaEsperada;

  // Disparamos un evento de cambio para notificar la modificación.
  inputText.dispatchEvent(new Event('change', { bubbles: true }));
}
