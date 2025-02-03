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
    // Obtiene el contenedor en el DOM donde se mostrarán las respuestas autoguardadas
    const autoSaveResponseContainer = document.getElementById('respuestasautosave');

    // Verifica que el contenedor exista en el DOM
    if (!autoSaveResponseContainer) {
        console.error('El elemento con id "respuestasautosave" no existe en el DOM.');
        return;
    }

    // Recupera las respuestas guardadas desde sessionStorage
    const savedResponses = sessionStorage.getItem('questions-AutoSave');
    if (!savedResponses) {
        autoSaveResponseContainer.innerHTML = '<span style="font-weight:500; color:red;">Sin responder</span>';
        console.log('No hay respuestas guardadas, mostrando "Sin responder".');
        return;
    }

    let parsedResponses;
    try {
        // Intenta convertir el JSON de respuestas a un objeto
        parsedResponses = JSON.parse(savedResponses);
    } catch (error) {
        console.error('Error al parsear las respuestas guardadas:', error);
        autoSaveResponseContainer.innerHTML = '<span style="font-weight:500; color:red;">Sin responder</span>';
        return;
    }

    // Formatea las respuestas y las muestra en el contenedor
    const formattedResponses = formatResponseData(parsedResponses);
    autoSaveResponseContainer.innerHTML = formattedResponses || '<span style="font-weight:500; color:red;">Sin responder</span>';
}

function formatResponseData(responseData) {
    let htmlOutput = '';

    // Itera sobre cada entrada (pregunta) del objeto de respuestas
    for (const [questionKey, questionData] of Object.entries(responseData)) {
        // Extrae el número de la pregunta (por ejemplo, de "Pregunta1" se obtiene "1")
        const questionNumber = questionKey.replace(/[^\d]/g, '');
        
        if (questionData.hasOwnProperty('opcionesRespuesta')) {
            // Verifica si existe opcionesRespuesta y si tiene elementos
            if (Array.isArray(questionData.opcionesRespuesta) && questionData.opcionesRespuesta.length > 0) {
                // Si hay opciones, se formatea usando el enunciado y las opciones de respuesta
                htmlOutput += `
                    <div class="preguntaautosave" id="${questionKey}">
                        <strong>Pregunta ${questionNumber}:</strong> ${processContent(questionData.enunciado, 'enunciado')}
                    </div>
                    <div class="respuestasautosave">
                        ${formatResponseOptions(questionData.opcionesRespuesta, questionData.respuestaCorrecta)}
                    </div>
                    <hr style="margin-top: 5px; margin-bottom: 0px;">
                `;
            } 
        
        } else if (!questionData.hasOwnProperty('opcionesRespuesta')) {
            // Si no hay opcionesRespuesta o está vacío, se muestra el enunciado y, si existe, la respuesta.
            // Si no hay respuesta, se muestran líneas debajo del enunciado.
            htmlOutput += `
                <div class="preguntaautosave" id="${questionKey}">
                    <strong>Pregunta ${questionNumber}:</strong> ${processContent(questionData.enunciado, 'enunciado')}
                </div>
            `;
            
            // Se determina si respuestaCorrecta es un array o una cadena
            if (Array.isArray(questionData.respuestaCorrecta)) {
                // Si es un array, se verifica que tenga elementos y se procesan
                if (questionData.respuestaCorrecta.length > 0) {
                    htmlOutput += `<div class="respuestasautosave">`;
                    questionData.respuestaCorrecta.forEach((respuesta) => {
                        // Se omiten respuestas vacías (después de quitar espacios)
                        if (respuesta && respuesta.trim() !== '') {
                            htmlOutput += processContent(respuesta, 'respuesta');
                        } else {
                            htmlOutput += `<em>___________</em>`;
                        }
                    });
                    htmlOutput += `</div>`;
                } else {
                    // Si el array está vacío, se muestra línea de respuesta
                    htmlOutput += `
                        <div class="respuestasautosave">
                            <em>___________</em>
                        </div>
                    `;
                }
            } else {
                // Si respuestaCorrecta es una cadena (o de otro tipo)
                if (questionData.respuestaCorrecta && questionData.respuestaCorrecta.trim() !== '') {
                    htmlOutput += `
                        <div class="respuestasautosave">
                            ${processContent(questionData.respuestaCorrecta, 'respuesta')}
                        </div>
                    `;
                } else {
                    htmlOutput += `
                        <div class="respuestasautosave">
                            <em>___________</em>
                        </div>
                    `;
                }
            }
            
            htmlOutput += `<hr style="margin-top: 5px; margin-bottom: 0px;">`;
        }
        
        else {
            // Si la estructura es la antigua, se esperan las propiedades "enunciados" y "respuestas"
            const { respuestas = [], enunciados = [], tipo = '' } = questionData;
            // Asegura que las respuestas sean un arreglo
            const finalResponses = Array.isArray(respuestas) ? respuestas : [respuestas];
            // Genera el contenido HTML consolidado de la respuesta
            const responseContentHTML = assembleResponseContent(enunciados, finalResponses, tipo, questionKey);

            htmlOutput += `
                <div class="preguntaautosave" id="${questionKey}">
                    <strong>Pregunta ${questionNumber}:</strong>
                </div>
                <div class="respuestasautosave">
                    ${responseContentHTML}
                </div>
                <hr style="margin-top:0px; margin-bottom:5px;">
            `;
        }
    }

    return htmlOutput;
}

function assembleResponseContent(questionPrompts, finalResponses, questionType, questionKey) {
    let responseHTML = '';

    if (questionPrompts.length > 0 && questionPrompts.length === finalResponses.length) {
        // Si la cantidad de enunciados coincide con la de respuestas, se mapean en pares
        responseHTML = questionPrompts
            .map((prompt, index) => {
                const response = finalResponses[index];
                return `${processContent(prompt, 'enunciado')} <strong>➔</strong> ${processContent(response, 'respuesta')}`;
            })
            .join('<br>');
    } else if (finalResponses.length > 1) {
        // Si hay múltiples respuestas pero la cantidad no coincide con los enunciados
        if (questionPrompts.length > 0 && questionPrompts.length !== finalResponses.length) {
            responseHTML = finalResponses
                .map(response => `<strong>${processContent(response, 'respuesta')}</strong>`)
                .join('<br>');
        } else {
            // Si no hay enunciados, se formatean las respuestas de manera múltiple
            responseHTML = formatMultipleResponseItems(finalResponses, questionType);
        }
    } else {
        // Caso de una única respuesta
        const response = finalResponses[0] || '';
        responseHTML = `<strong>${processContent(response, 'respuesta')}</strong>`;
    }

    // Si no se generó contenido, se indica "Sin responder"
    if (!responseHTML) {
        responseHTML = `<span id="${questionKey}" style="font-weight:500; color:red;">Sin responder</span>`;
    }

    return responseHTML;
}

function formatResponseOptions(options, selectedResponse) {
    if (!options || !Array.isArray(options)) return '';

    // Normaliza la respuesta seleccionada a un arreglo de valores recortados
    let selectedResponses = [];
    if (Array.isArray(selectedResponse)) {
        selectedResponses = selectedResponse.map(resp => resp.trim());
    } else if (typeof selectedResponse === 'string') {
        selectedResponses = [selectedResponse.trim()];
    }

    return options
        .map((option, index) => {
            // Asigna una letra (a., b., c., …) o número si solo hay una opción
            const literal = options.length > 1 
                ? String.fromCharCode(97 + index) + '. ' 
                : (index + 1) + '. ';

            // Procesa el contenido de la opción
            let formattedOption = processContent(option, 'respuesta');

            // Si la opción está entre las seleccionadas, se resalta
            if (selectedResponses.includes(option.trim())) {
                formattedOption = `<span style="font-weight:500; color:MediumBlue;">${literal}${formattedOption}</span>`;
            } else {
                formattedOption = `<span style="font-weight:500;">${literal}</span>${formattedOption}`;
            }
            return `<div>${formattedOption}</div>`;
        })
        .join('');
}

function processContent(content, contentType) {
    const imageRegex = /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi;
    const dataUriRegex = /(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg);base64,[a-zA-Z0-9+/=]+)/gi;
    const mathRegex = /<math[^>]*>[\s\S]*?<\/math>/g;

    // Reemplaza URLs de imágenes, datos URI y etiquetas de matemáticas por contenido HTML apropiado
    let processedContent = content
        .replace(imageRegex, (match) => createImgTag(match, contentType))
        .replace(dataUriRegex, (match) => createImgTag(match, contentType))
        .replace(mathRegex, (match) => `<span style="font-size: 1.5em;">${match}</span>`)
        .replace(/(\r\n|\n|\r)/g, '<br>');

    return processedContent || `<span style="font-weight:500; color:red;">Sin responder</span>`;
}

function createImgTag(src, contentType) {
    const altText = contentType === 'enunciado' ? 'Imagen de enunciado' : 'Imagen de respuesta';
    return `<img src="${src}" alt="${altText}" style="max-width: 200px; max-height: 150px;">`;
}

function formatMultipleResponseItems(responses, questionType) {
    if (questionType === 'draganddrop_text' || questionType === 'draganddrop_image') {
        return responses
            .map((response, index) => `${index + 1}. ${processContent(response, 'respuesta')}`)
            .join('<br>');
    } else {
        return responses
            .map(response => `• ${processContent(response, 'respuesta')}`)
            .join('<br>');
    }
}

