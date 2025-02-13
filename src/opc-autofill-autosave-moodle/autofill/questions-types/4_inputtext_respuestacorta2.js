import { obtenerFormulationClearfix } from '../../autofill-autosave-helpers.js';

export async function response_inputtext_respuestacorta2(pregunta, questionData) {
  console.log("Iniciando response_inputtext_respuestacorta2");
  console.log("Pregunta:", pregunta);
  console.log("Question Data:", questionData);

  // Aseguramos que questionData.respuestaCorrecta tenga un valor.
  let respuestaCorrectaEsperada = '';
  if (questionData) {
    if (typeof questionData.respuestaCorrecta === 'string') {
      respuestaCorrectaEsperada = questionData.respuestaCorrecta;
    } else if (Array.isArray(questionData.respuestaCorrecta) && questionData.respuestaCorrecta.length > 0) {
      respuestaCorrectaEsperada = questionData.respuestaCorrecta[0];
    }
  }
    
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

  // Asignamos el valor al input y actualizamos también el atributo "value"
  inputText.value = respuestaCorrectaEsperada;
  inputText.setAttribute('value', respuestaCorrectaEsperada);
  console.log("Valor asignado al input text:", inputText.value);

  // Disparamos eventos para notificar la modificación.
  const eventInput = new Event('input', { bubbles: true });
  const eventChange = new Event('change', { bubbles: true });
  inputText.dispatchEvent(eventInput);
  inputText.dispatchEvent(eventChange);
  console.log("Eventos 'input' y 'change' disparados en input text.");
}
