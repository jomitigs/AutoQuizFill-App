import { obtenerFormulationClearfix } from '../../autofill-autosave-helpers.js';

export async function response_select_emparejamiento(pregunta, questionData) {
  console.log("Respondiendo preguntas select emparejamiento");

  // 1. Extraer los arrays de enunciados y respuestas correctas de questionData.
  let opcionesEnunciadosEsperadas = [];
  let respuestasCorrectasEsperadas = [];
  if (questionData) {
    if (Array.isArray(questionData.opcionesEnunciados)) {
      opcionesEnunciadosEsperadas = questionData.opcionesEnunciados.map(enun => enun.trim());
    } else if (typeof questionData.opcionesEnunciados === 'string') {
      opcionesEnunciadosEsperadas = [questionData.opcionesEnunciados.trim()];
    }
    if (Array.isArray(questionData.respuestaCorrecta)) {
      respuestasCorrectasEsperadas = questionData.respuestaCorrecta.map(resp => resp.trim());
    } else if (typeof questionData.respuestaCorrecta === 'string') {
      respuestasCorrectasEsperadas = [questionData.respuestaCorrecta.trim()];
    }
  }
  console.log("Opciones enunciados esperadas:", opcionesEnunciadosEsperadas);
  console.log("Respuestas correctas esperadas:", respuestasCorrectasEsperadas);

  // 2. Obtener el contenedor de la formulación.
  const formulation = obtenerFormulationClearfix(pregunta);
  console.log("Formulation:", formulation);

  // 3. Obtener todos los <select> dentro de la formulación.
  const allSelects = formulation.querySelectorAll('select');

  // Variables para almacenar enunciados y respuestas seleccionadas (opcional, para depuración).
  let enunciadosEncontrados = [];
  let respuestasSeleccionadas = [];

  // 4. Iterar sobre cada <select>.
  for (const selectElement of allSelects) {
    // Buscamos el enunciado asociado al <select> en la misma fila (<tr>), en la celda con clase "text".
    let textoPregunta = '';
    const textoElement = selectElement.closest('tr')?.querySelector('td.text');
    if (textoElement) {
      // Si la celda tiene texto, lo usamos como enunciado.
      if (textoElement.innerText.trim()) {
        textoPregunta = textoElement.innerText.trim();
      } else {
        // Si no hay texto, buscamos si contiene una imagen.
        const imgElement = textoElement.querySelector('img');
        if (imgElement) {
          textoPregunta = imgElement.src;
          console.log('Obteniendo imagen ya convertida:', imgElement.src);
        }
      }
    }

    // Si se obtuvo un enunciado, lo procesamos.
    if (textoPregunta) {
      enunciadosEncontrados.push(textoPregunta);
      // Buscamos la posición de este enunciado en el array de enunciados esperados.
      const index = opcionesEnunciadosEsperadas.indexOf(textoPregunta);
      if (index !== -1) {
        // Si se encontró, la respuesta correcta correspondiente es:
        const respuestaEsperada = respuestasCorrectasEsperadas[index];
        console.log("Enunciado encontrado:", textoPregunta, " - Respuesta esperada:", respuestaEsperada);

        // Recorremos las opciones del <select> para encontrar aquella que coincida con la respuesta.
        for (const option of selectElement.options) {
          // Se ignora la opción "Elegir..." (valor "0").
          if (option.value !== "0") {
            if (option.textContent.trim() === respuestaEsperada) {
              // Seleccionamos esta opción.
              selectElement.value = option.value;
              selectElement.dispatchEvent(new Event('change', { bubbles: true }));
              respuestasSeleccionadas.push(respuestaEsperada);
              console.log("Seleccionado en select:", respuestaEsperada);
              break; // Terminamos de iterar las opciones para este <select>.
            }
          }
        }
      } else {
        console.log("El enunciado no coincide con ninguno esperado:", textoPregunta);
      }
    }
  }

  console.log("Enunciados encontrados:", enunciadosEncontrados);
  console.log("Respuestas seleccionadas:", respuestasSeleccionadas);
}
