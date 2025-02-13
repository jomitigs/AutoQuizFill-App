import { obtenerFormulationClearfix } from '../../autofill-autosave-helpers.js';

export async function response_inputtext_respuestacorta2(pregunta, questionData) {
  console.log("Iniciando response_inputtext_respuestacorta2");
  console.log("Pregunta:", pregunta);
  console.log("Question Data:", questionData);

  // Aseguramos que questionData.respuestaCorrecta tenga un valor.
  const respuestaCorrectaEsperada = (questionData && typeof questionData.respuestaCorrecta === 'string')
    ? questionData.respuestaCorrecta
    : '';
  console.log("Respuesta correcta esperada:", respuestaCorrectaEsperada);

  // Obtenemos el contenedor de la formulación.
  const formulation = obtenerFormulationClearfix(pregunta);
  console.log("Formulation encontrada:", formulation);

  // Buscamos el input text dentro de la formulación.
  const inputText = formulation.querySelector('input[type="text"]');
  if (!inputText) {
    console.log("No se encontró input text en la pregunta:", pregunta);
    return;
  }
  console.log("Input text encontrado:", inputText);

  // Pegamos la respuesta correcta en el input text.
  inputText.value = respuestaCorrectaEsperada;
  console.log("Asignado valor al input text:", respuestaCorrectaEsperada);

  // Disparamos un evento de cambio para notificar la modificación.
  inputText.dispatchEvent(new Event('change', { bubbles: true }));
  console.log("Evento 'change' disparado en input text.");
}
