import { draganddrop_image } from './questions-types/draganddrop_image.js';
import { draganddrop_text } from './questions-types/draganddrop_text.js';
import { inputchecked_opcionmultiple } from './questions-types/2_inputchecked_opcionmultiple.js';
import { inputradio_opcionmultiple_verdaderofalso } from './questions-types/1_inputradio_opcionmultiple_verdaderofalso.js';
import { inputtext_respuestacorta } from './questions-types/4_inputtext_respuestacorta.js';
import { select_emparejamiento } from './questions-types/3_select_emparejamiento.js';

import { getQuestionNumber, determinarTipoPregunta } from '../autofill-autosave-helpers.js';

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
                const originalAllFormulations = document.querySelectorAll('.formulation.clearfix');

                await AutoSave_SessionStorage(originalAllFormulations); // Espera a que termine AutoSave
                AutoSave_ShowResponses();
                
                if (window.MathJax && window.MathJax.Hub) {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("Pregunta2")]);
                  }                

                detectarCambiosPreguntas();

                console.log(`[opc-autofill-autosave-moodle: autosave] AutoSave completado.`);
            }
        } else if (esPaginaQuiz && !interruptorAutoSave.checked) {
            if (bodyAutoSave) {
                bodyAutoSave.style.display = 'none';
            }

        } else if (!esPaginaQuiz) {
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

async function AutoSave_SessionStorage(questionsHtml, numeroQuestionUpdate = null) {

    // 1) Verificar si "questionsHtml" es una colección (NodeList o HTMLCollection).
    //    Si no lo es, se convierte a array para procesarlo de forma uniforme.
    if (!NodeList.prototype.isPrototypeOf(questionsHtml) && !HTMLCollection.prototype.isPrototypeOf(questionsHtml)) {
        questionsHtml = [questionsHtml];
    }

    // 2) Si el array está vacío, se muestra un error y se termina la ejecución.
    if (questionsHtml.length === 0) {
        console.error('[AutoSave_SessionStorage] No se pudo ejecutar porque no cumple con los argumentos correctos');
        return;
    }

    const funcQuestionType = {
        'inputradio_opcionmultiple_verdaderofalso': inputradio_opcionmultiple_verdaderofalso,
        'inputchecked_opcionmultiple': inputchecked_opcionmultiple,
        'select_emparejamiento': select_emparejamiento,
        'inputtext_respuestacorta': inputtext_respuestacorta,
        'draganddrop_text': async (questionHtml) => {
            return await new Promise(resolve => setTimeout(() => {
                resolve(draganddrop_text(questionHtml));
            }, 1000));
        },
        'draganddrop_image': async (questionHtml) => {
            return await new Promise(resolve => setTimeout(() => {
                resolve(draganddrop_image(questionHtml));
            }, 1000));
        }
        // Otros tipos se pueden agregar de forma similar...
    };

    // ——————————————————————————————————————————————————————
    // Determinar el caso a ejecutar:
    //   - Caso A: Si hay más de 1 elemento O si hay 1 elemento y numeroQuestionUpdate es null.
    //   - Caso B: Si hay 1 elemento y numeroQuestionUpdate tiene un valor.
    // ——————————————————————————————————————————————————————
    if (questionsHtml.length > 1 || (questionsHtml.length === 1 && numeroQuestionUpdate === null)) {
        // *************** Caso A ***************

        // Se crea un objeto nuevo para almacenar la información de todas las preguntas.
        const questionsHtmlObject = {};
        let contadorPreguntas = 0;

        // Iterar sobre cada elemento de "questionsHtml"
        for (const questionHtml of questionsHtml) {
            // Determinar el número de la pregunta:
            // - Se utiliza numeroQuestionUpdate si tiene un valor.
            // - Si no, se intenta obtener mediante obtenerNumeroPregunta.
            // - Finalmente, se incrementa un contador si aún no se determina.
            const numberQuestion =
                numeroQuestionUpdate ||
                getQuestionNumber(questionHtml) ||
                ++contadorPreguntas;

            // Determinar el tipo de pregunta mediante la función determinarTipoPregunta.
            const questionType = determinarTipoPregunta(questionHtml);
            console.log(`[AutoSave_SessionStorage] Pregunta ${numberQuestion}, tipo: ${questionType}`);

            // Buscar la función correspondiente al tipo de pregunta.
            const funcion = funcQuestionType[questionType];
            let questionData;
            if (funcion) {
                // Se invoca la función y se espera que retorne el objeto con la información de la pregunta.
                questionData = await funcion(questionHtml);
            } else {
                console.warn(`No se encontró función para el tipo de pregunta: ${questionType}`);
                continue;
            }

            // Se almacena directamente la información de la pregunta, usando la clave "PreguntaNueva" seguida del número.
            questionsHtmlObject[`Pregunta${numberQuestion}`] = questionData;
        }

        // Guardar el objeto completo en sessionStorage.
        try {
            sessionStorage.setItem('questions-AutoSave', JSON.stringify(questionsHtmlObject));
            console.log('[AutoSave_SessionStorage] Se ha guardado la información de múltiples preguntas.');
        } catch (error) {
            console.error('Error al guardar en sessionStorage:', error);
        }

    } else {
        // *************** Caso B ***************

        // Leer la información existente en sessionStorage.
        let datosExistentes = {};
        try {
            const cadenaAlmacenamiento = sessionStorage.getItem('questions-AutoSave');
            if (cadenaAlmacenamiento) {
                datosExistentes = JSON.parse(cadenaAlmacenamiento);
            }
        } catch (err) {
            console.error('[AutoSave_SessionStorage] Error al parsear sessionStorage:', err);
            datosExistentes = {};
        }

        // Procesar la única pregunta.
        const questionHtml = questionsHtml[0];
        // En este caso, numeroQuestionUpdate tiene un valor y se usa directamente.
        const numberQuestion = numeroQuestionUpdate;
        const questionType = determinarTipoPregunta(questionHtml);
        console.log(`[AutoSave_SessionStorage] Pregunta ${numberQuestion}, tipo: ${questionType}`);

        const funcion = funcQuestionType[questionType];
        let questionData;
        if (funcion) {
            questionData = await funcion(questionHtml);
        } else {
            console.warn(`No se encontró función para el tipo de pregunta: ${questionType}`);
            return;
        }

        // Se almacena directamente la información de la pregunta, usando la clave "PreguntaNueva" seguida del número.
        datosExistentes[`Pregunta${numberQuestion}`] = questionData;

        // Guardar el objeto actualizado en sessionStorage.
        try {
            sessionStorage.setItem('questions-AutoSave', JSON.stringify(datosExistentes));
            console.log('[AutoSave_SessionStorage] Se ha actualizado la información de 1 pregunta.');
        } catch (error) {
            console.error('Error al guardar en sessionStorage:', error);
        }
    }
}

// -----------------------------------------------------------------------
// Función que detecta los cambios y actúa según exista o no 'questions-AutoSave'
// -----------------------------------------------------------------------
function detectarCambiosPreguntas() {

    // Selecciona todos los inputs y selects que quieres escuchar
    const elementos = document.querySelectorAll(
        'input[type="radio"], select, input[type="checkbox"], input[type="text"]'
    );

    elementos.forEach(el => {
        el.addEventListener('change', async (event) => {
            // Si el cambio se produjo dentro del contenedor "barra-lateral-autoquizfillapp", se ignora
            if (event.target.closest('#barra-lateral-autoquizfillapp')) {
                return;
            }

            console.log('[opc-autofill-autosave-moodle: autosave] Cambio detectado');

            // Verificamos si 'questions-AutoSave' existe en sessionStorage
            let questionsAutoSaveStr = sessionStorage.getItem('questions-AutoSave');

            if (!questionsAutoSaveStr) {
                console.log("'questions-AutoSave' no existe. Llamando a AutoSave_SessionStorage por primera vez.");
                // Si NO existe, llamamos la función general y guardamos todo por primera vez
                const originalAllFormulations = document.querySelectorAll('.formulation.clearfix');
                await AutoSave_SessionStorage(originalAllFormulations);
            } else {
                // Si SÍ existe, lo parseamos
                const questionsAutoSave = JSON.parse(questionsAutoSaveStr);

                // Ubicamos la .formulation.clearfix donde ocurrió el cambio
                const formulation = event.target.closest('.formulation.clearfix');

                if (!formulation) {
                    console.warn('No se encontró el elemento .formulation.clearfix cercano. Saliendo.');
                    return; // Si por algún motivo no lo encuentra, salimos
                }

                // Obtenemos el número de la pregunta (por ejemplo con getQuestionNumber)
                const numeroPregunta = getQuestionNumber(formulation);

                console.log('[opc-autofill-autosave-moodle: autosave] Actualizando Pregunta', numeroPregunta);
                if (!numeroPregunta) {
                    console.warn('No se pudo obtener el número de pregunta. Saliendo.');
                    return; // Si no lo obtienes, salimos
                }

                // Construimos la llave, por ejemplo "Pregunta1", "Pregunta2", etc.
                const preguntaKey = `Pregunta${numeroPregunta}`;

                // Revisamos si esa pregunta ya existe en el objeto guardado
                if (questionsAutoSave[preguntaKey]) {
                    // Recuperamos ese objeto (ya contiene "tipo", "html", etc.)
                    const preguntaObj = questionsAutoSave[preguntaKey];

                    // Llamamos la versión reducida que actualiza SOLO ESTA PREGUNTA
                    await AutoSave_SessionStorage(formulation, numeroPregunta);

                } else {
                    console.log(`La pregunta ${preguntaKey} no existe en questionsAutoSave. Llamando a AutoSave_SessionStorage.`);
                    // Si no encuentra la pregunta, podemos forzar a guardar todo de nuevo
                }
            }
        });
    });

}

function AutoSave_ShowResponses() {
    const container = document.getElementById('respuestasautosave');
    if (!container) return console.error('Elemento "respuestasautosave" no encontrado.');
    
    const savedData = sessionStorage.getItem('questions-AutoSave');
    if (!savedData) return (container.innerHTML = '<span style="font-weight:500; color:red;">Sin responder</span>');
    
    try {
        const responses = JSON.parse(savedData);
        container.innerHTML = Object.entries(responses).map(([key, data]) => {
            const questionNumber = key.replace(/\D/g, '');
            let html = `<div class="preguntaautosave" id="${key}">`;
            if (data.enunciado) html += `<strong>Pregunta ${questionNumber}:</strong> ${processContent(data.enunciado)}`;
            
            if (data.tipo === 'inputradio_opcionmultiple_verdaderofalso' || data.tipo === 'inputchecked_opcionmultiple') {
                if (Array.isArray(data.opcionesRespuesta) && data.opcionesRespuesta.length) {
                    html += `<div class="respuestasautosave">${formatResponseOptions(data.opcionesRespuesta, data.respuestaCorrecta)}</div>`;
                }
            } else if (data.tipo === 'select_emparejamiento') {
                if (Array.isArray(data.opcionesEnunciados) && Array.isArray(data.respuestaCorrecta)) {
                    html += `<div class="respuestasautosave">` + data.opcionesEnunciados.map((enunciado, i) => {
                        const respuesta = data.respuestaCorrecta[i]?.trim() || "Elegir...";
                        return `<div>• ${processContent(enunciado)} - <span style="font-weight:500; color:${respuesta !== "Elegir..." ? "MediumBlue" : "black"};">${processContent(respuesta)}</span></div>`;
                    }).join('') + `</div>`;
                }
            } else if (data.tipo === 'inputtext_respuestacorta') {
                const respuestas = (Array.isArray(data.respuestaCorrecta) ? data.respuestaCorrecta : [data.respuestaCorrecta])
                    .filter(Boolean).map(processContent).join('') || '<em>___________</em>';
                html += `<div class="respuestasautosave">${respuestas}</div>`;
            }
            return html + '<hr style="margin-top: 5px; margin-bottom: 0px;">';
        }).join('');
    } catch (error) {
        console.error('Error al parsear las respuestas:', error);
        container.innerHTML = '<span style="font-weight:500; color:red;">Sin responder</span>';
    }
}

function formatResponseOptions(options, selected) {
    const selectedSet = new Set(Array.isArray(selected) ? selected.map(s => s.trim()) : [selected?.trim()]);
    return options.map((option, i) => {
        const literal = options.length > 1 ? String.fromCharCode(97 + i) + '. ' : (i + 1) + '. ';
        return `<div><span style="font-weight:500; ${selectedSet.has(option.trim()) ? 'color:MediumBlue;' : ''}">${literal}${processContent(option)}</span></div>`;
    }).join('');
}

function processContent(content) {
    if (!content) return '<span style="font-weight:500; color:red;">Sin responder</span>';
    return content.replace(/(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi, '<img src="$1" alt="Imagen" style="max-width: 200px; max-height: 150px;">')
                  .replace(/(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg);base64,[a-zA-Z0-9+/=]+)/gi, '<img src="$1" alt="Imagen" style="max-width: 200px; max-height: 150px;">')
                  .replace(/<math[^>]*>[\s\S]*?<\/math>/g, '<span style="font-size: 1.5em;">$&</span>')
                  .replace(/(\r\n|\n|\r)/g, '<br>');
}

