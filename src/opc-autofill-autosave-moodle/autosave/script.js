import { draganddrop_image } from './questions-types/draganddrop_image.js';
import { draganddrop_text } from './questions-types/draganddrop_text.js';
import { inputchecked_opcionmultiple } from './questions-types/inputchecked_opcionmultiple.js';
import { inputradio_opcionmultiple_verdaderofalso } from './questions-types/inputradio_opcionmultiple_verdaderofalso.js';
import { inputtext_respuestacorta } from './questions-types/inputtext_respuestacorta.js';
import { select_emparejamiento } from './questions-types/select_emparejamiento.js';

import { getQuestionNumber } from './helpers.js';

// Exporta una función llamada contenedorAutoSave_js
export function contenedorAutoSave_js() {
    const SWITCH_ID = 'switch-autosave';
    const BODY_ID = 'body-autoquiz-autosave';
    const STORAGE_KEY = 'autosave-autoquizfillapp';
    const ACTIVADO = 'activado';
    const DESACTIVADO = 'desactivado';

    const interruptorAutoSave = document.getElementById(SWITCH_ID);
    const bodyAutoSave = document.getElementById(BODY_ID);

    if (!interruptorAutoSave) {
        console.error(`Error: No se encontró el elemento con ID '${SWITCH_ID}'`);
        return;
    }

    const estadoGuardado = localStorage.getItem(STORAGE_KEY) || DESACTIVADO;
    console.log(`[opc-autofill-autosave-moodle: autosave] AutoSave: ${estadoGuardado}`);

    interruptorAutoSave.checked = estadoGuardado === ACTIVADO;

    // **Hacer que actualizarVisibilidadBody sea async**
    const actualizarVisibilidadBody = async () => {
        const esPaginaQuiz = window.location.href.includes('/mod/quiz/attempt.php');

        if (esPaginaQuiz && interruptorAutoSave.checked) {
            if (bodyAutoSave) {
                bodyAutoSave.style.display = 'flex';
                console.log(`[opc-autofill-autosave-moodle: autosave] Iniciando AutoSave...`);
                await AutoSave_LocalStorage(); // Espera a que termine AutoSave
                console.log(`[opc-autofill-autosave-moodle: autosave] AutoSave completado.`);
            }
        } else if (interruptorAutoSave.checked) {
            console.log(`[opc-autofill-autosave-moodle: autosave] Esta página no soporta AutoSave.`);
        }
    };

    // **Llamar la función sin await para que no bloquee la ejecución**
    actualizarVisibilidadBody();

    // **Manejar cambios en el interruptor**
    interruptorAutoSave.addEventListener('change', () => {
        const estadoNuevo = interruptorAutoSave.checked ? ACTIVADO : DESACTIVADO;
        localStorage.setItem(STORAGE_KEY, estadoNuevo);
        console.log(`[opc-autofill-autosave-moodle: autosave] AutoSave: ${estadoNuevo}`);

        actualizarVisibilidadBody(); // Llamar sin await
    });
}


async function AutoSave_LocalStorage() {

    let contadorPreguntas = 0; // Contador de preguntas
    const todasLasPreguntas = {}; // Objeto para almacenar todas las preguntas

    // Obtener los elementos con clase '.formulation.clearfix'
    const originalAllFormulations = document.querySelectorAll('.formulation.clearfix');

    for (const formulation of originalAllFormulations) {
        // Obtener el número de pregunta o incrementar el contador
        const numeroPregunta = getQuestionNumber(formulation) || ++contadorPreguntas;

        const questionsAutoSave = {
            html: '',
            respuestas: [],
            enunciados: [],
            tipo: ''
        };

        // Verifica si solo existe un elemento con la clase '.qtext' en 'clonFormulation'
        const soloUnQtext = formulation.querySelectorAll('.qtext').length === 1;

        // Verifica si hay un radio button seleccionado con un valor distinto de "-1" y si solo hay un '.qtext'
        const inputRadioValido =
              soloUnQtext &&
              formulation.querySelector('input[type="radio"]:checked') !== null && // Verifica si hay un radio button seleccionado
              formulation.querySelector('input[type="radio"]:checked').value !== "-1"; // El valor del radio button no debe ser "-1"

        // Verifica si hay al menos un checkbox seleccionado y si no hay otros tipos de inputs o selects
        const inputsCheckboxValido =
              soloUnQtext &&
              formulation.querySelectorAll('input[type="checkbox"]:checked').length > 0 && // Al menos un checkbox está seleccionado
              !formulation.querySelector('input:not([type="checkbox"]):not([type="hidden"]), select'); // No debe haber otros inputs o selects

        // Verifica si hay algún select con un valor válido seleccionado, y si no hay otros tipos de inputs, botones o selects vacíos
        const selectsValido =
              soloUnQtext &&
              !formulation.querySelector('input:not([type="hidden"]), textarea, button, [type="radio"], [type="text"], [type="checkbox"]') && // No debe haber otros elementos
              Array.from(formulation.querySelectorAll("select")).some(select => { // Recorre todos los elementos select
                  const valor = select.value;
                  const texto = select.options[select.selectedIndex].text.trim().toLowerCase(); // Texto del select seleccionado en minúsculas
                  return valor !== "" && valor !== "0" && texto !== "elegir..." && texto !== "seleccionar..."; // Verifica que el valor no sea vacío o inválido
              });

        // Verifica si hay exactamente un input de tipo texto con contenido válido y sin otros inputs o selects presentes
        const inputTextValido =
              !formulation.querySelector('input[type="radio"], input[type="checkbox"], select') && // No debe haber radio, checkbox o selects
              formulation.querySelectorAll('input[type="text"]').length === 1 && // Debe haber solo un input de tipo texto
              Array.from(formulation.querySelectorAll('input[type="text"]')).some(input => input.value.trim() !== ""); // El valor del input de texto no debe estar vacío

        // Verifica si hay más de un input de tipo texto con contenido válido y sin otros inputs o selects presentes
        const inputsTextsValido =
              !formulation.querySelector('input[type="radio"], input[type="checkbox"], select') && // No debe haber radio, checkbox o selects
              formulation.querySelectorAll('input[type="text"]').length > 1 && // Debe haber más de un input de tipo texto
              Array.from(formulation.querySelectorAll('input[type="text"]')).some(input => input.value.trim() !== ""); // Al menos un input de texto debe tener valor

        // Verifica si hay varios inputs de texto o selects con valores válidos, sin otros tipos de inputs presentes
        const inputsTextsySelectValido =
              !formulation.querySelector('input[type="radio"], input[type="checkbox"]') && // No debe haber radio ni checkbox
              formulation.querySelectorAll('input[type="text"]').length > 1 && // Debe haber más de un input de texto
              Array.from(formulation.querySelectorAll('input[type="text"]')).some(input => input.value.trim() !== "") || // Al menos un input de texto debe tener valor
              Array.from(formulation.querySelectorAll("select")).some(select => { // O al menos un select debe tener valor válido
                  const valor = select.value;
                  const texto = select.options[select.selectedIndex].text.trim().toLowerCase(); // Texto del select seleccionado en minúsculas
                  return valor !== "" && valor !== "0" && texto !== "elegir..." && texto !== "seleccionar..."; // Verifica que el valor no sea vacío o inválido
              });

        const hasDraghome = formulation.querySelector('.draghome') !== null;
        const hasDropzones = formulation.querySelector('.dropzones') !== null;

        let seEjecutaFuncion = false;

        console.log(`[opc-autofill-autosave-moodle: autosave] Holi`);

        const condicionesPrint = {
            'inputradio_opcionmultiple_verdaderofalso': inputRadioValido,
            'inputchecked_opcionmultiple': inputsCheckboxValido,
            'select_emparejamiento': selectsValido,
            'inputtext_respuestacorta': inputTextValido,
            'inputtext_multiple_respuestacorta': inputsTextsValido,
            'inputtext_multiple_respuestacorta_select': inputsTextsySelectValido
        };
        
        for (const [clave, valor] of Object.entries(condicionesPrint)) {
            if (valor) {
                console.log(`[opc-autofill-autosave-moodle: autosave] Tipo de pregunta: '${clave}': ${valor}`);
            }
        }
        
        // Definir una lista de condiciones y sus correspondientes funciones
        const condiciones = [
            {
                cond: inputRadioValido,
                func: async () => await inputradio_opcionmultiple_verdaderofalso(formulation, questionsAutoSave)
            },
            {
                cond: inputsCheckboxValido,
                func: async () => await inputchecked_opcionmultiple(formulation, questionsAutoSave)
            },
            {
                cond: selectsValido,
                func: async () => await select_emparejamiento(formulation, questionsAutoSave)
            },
            {
                cond: inputTextValido,
                func: async () => await inputtext_respuestacorta(formulation, questionsAutoSave)
            },
            {
                cond: hasDraghome && !hasDropzones,
                func: async () => {
                    await new Promise(resolve => {
                        setTimeout(() => {
                            draganddrop_text(formulation, questionsAutoSave);
                            resolve();
                        }, 1000); // Retraso de 1 segundo
                    });
                }
            },
            {
                cond: hasDraghome && hasDropzones,
                func: async () => {
                    await new Promise(resolve => {
                        setTimeout(() => {
                            draganddrop_image(formulation, questionsAutoSave);
                            resolve();
                        }, 1000); // Retraso de 1 segundo
                    });
                }
            },
            {
                cond: inputsTextsValido,
                func: async () => await inputtext_multiple_respuestacorta(formulation, questionsAutoSave)
            },
            {
                cond: inputsTextsySelectValido,
                func: async () => await inputtext_multiple_respuestacorta_select(formulation, questionsAutoSave)
            }
        ];

        // Ejecutar la primera condición que se cumpla
        for (const { cond, func } of condiciones) {
            if (cond) {
                await func();
                seEjecutaFuncion = true;
                break; // Salir del bucle de condiciones una vez que se ejecuta una función
            }
        }

        // Convertir a string si solo hay una respuesta y agregar si hay contenido relevante
        if (seEjecutaFuncion) {
            if (questionsAutoSave.respuestas.length === 1) {
                questionsAutoSave.respuestas = questionsAutoSave.respuestas[0];
            }

            if (questionsAutoSave.html || questionsAutoSave.respuestas.length > 0 || questionsAutoSave.enunciados.length > 0) {
                todasLasPreguntas[`Pregunta${numeroPregunta}`] = questionsAutoSave;
            }
        }
    } // Cierre correcto del bucle for

    // Guardar todas las preguntas en localStorage
    try {
        sessionStorage.setItem('questions-AutoSave', JSON.stringify(todasLasPreguntas));
    } catch (error) {
        console.error('Error saving to sessionStorage', error);
    }

    // Obtener la URL actual
    // const currentUrl = window.location.pathname;

    // if (currentUrl.includes('/mod/quiz/review.php')) {
        // console.log('Página de revisión detectada. Ejecutando AutoSaveReview_Filter...');
        // Ejecuta AutoSaveReview_Filter y espera a que termine
        //await AutoSaveReview_Filter();
    // } else if (currentUrl.includes('/mod/quiz/attempt.php')) {
        //console.log('Página de intento detectada. Ejecutando mostrarRespuestas_AutoSave...');
        // Ejecuta mostrarRespuestas_AutoSave directamente en modo intento
        //mostrarRespuestas_AutoSave();
    //} else {
       // console.log('URL no coincide con /mod/quiz/review.php ni /mod/quiz/attempt.php. No se ejecuta ninguna acción.');
   // }

}