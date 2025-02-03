import { draganddrop_image } from './questions-types/draganddrop_image.js';
import { draganddrop_text } from './questions-types/draganddrop_text.js';
import { inputchecked_opcionmultiple } from './questions-types/2_inputchecked_opcionmultiple.js';
import { inputradio_opcionmultiple_verdaderofalso } from './questions-types/1_inputradio_opcionmultiple_verdaderofalso.js';
import { inputtext_respuestacorta } from './questions-types/inputtext_respuestacorta.js';
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
                 // mostrarRespuestas_AutoSave();

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
        console.log('[AutoSave_SessionStorage] Ejecutando Caso A: Reemplazando completamente sessionStorage.');

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
        // Se ejecuta cuando hay un solo elemento y numeroQuestionUpdate tiene un valor.
        console.log('[AutoSave_SessionStorage] Ejecutando Caso B: Actualizando datos existentes en sessionStorage.');

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




function mostrarRespuestas_AutoSave() {
    const elementoRespuestasAutoSave = document.getElementById('respuestasautosave');

    if (!elementoRespuestasAutoSave) {
        console.error('[mostrarRespuestas_AutoSave] El elemento con id "respuestasautosave" no existe en el DOM.');
        return;
    }

    const respuestasGuardadas = sessionStorage.getItem('questions-AutoSave');
    if (!respuestasGuardadas) {
        // En este caso no se asocia a una pregunta en particular,
        // pero si lo deseas podrías establecer un id por defecto.
        elementoRespuestasAutoSave.innerHTML = '<span style="font-weight:500; color:red;">Sin responder</span>';
        console.log('No hay respuestas guardadas, mostrando "Sin responder".');
        return;
    }

    let respuestasObj;
    try {
        respuestasObj = JSON.parse(respuestasGuardadas);
    } catch (error) {
        console.error('Error al parsear las respuestas guardadas:', error);
        elementoRespuestasAutoSave.innerHTML = '<span style="font-weight:500; color:red;">Sin responder</span>';
        return;
    }

    const respuestasFormateadas = formatearRespuestas(respuestasObj);
    elementoRespuestasAutoSave.innerHTML = respuestasFormateadas || '<span style="font-weight:500; color:red;">Sin responder</span>';
}

/**
 * Formatea las respuestas guardadas en HTML.
 */
function formatearRespuestas(respuestasObj) {
    let html = '';

    for (const [clave, valor] of Object.entries(respuestasObj)) {
        if (clave.startsWith('Pregunta')) {
            const { respuestas = [], enunciados = [], tipo = '' } = valor;
            const numeroPregunta = clave; // Por ejemplo "Pregunta1"
            const respuestasFinales = Array.isArray(respuestas) ? respuestas : [respuestas];

            let respuestasHTML = '';

            if (enunciados.length > 0 && enunciados.length === respuestasFinales.length) {
                respuestasHTML = enunciados
                    .map((enunciado, index) => {
                        const respuesta = respuestasFinales[index];
                        return `${procesarContenido(enunciado, 'enunciado')} <strong>➔</strong> ${procesarContenido(respuesta, 'respuesta')}`;
                    })
                    .join('<br>');
            } else if (respuestasFinales.length > 1) {
                respuestasHTML = formatearRespuestasMultiples(respuestasFinales, tipo);
            } else {
                const respuesta = respuestasFinales[0] || '';
                respuestasHTML = procesarContenido(respuesta, 'respuesta');
            }

            // Si no hay respuesta, se muestra "Sin responder" con el estilo y el id de la pregunta.
            const contenidoRespuesta = respuestasHTML
                ? respuestasHTML
                : `<span id="${numeroPregunta}" style="font-weight:500; color:red;">Sin responder</span>`;

            html += `
                <div class="preguntaautosave" id="${numeroPregunta}">
                    ${numeroPregunta}:
                </div>
                <div class="respuestasautosave">
                    ${contenidoRespuesta}
                </div>`;
        }
    }

    return html;
}

/**
 * Procesa el contenido para reemplazar imágenes, MathML y saltos de línea.
 */
function procesarContenido(contenido, tipo) {
    const imageRegex = /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi;
    const dataUriRegex = /(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg);base64,[a-zA-Z0-9+/=]+)/gi;
    const mathRegex = /<math[^>]*>[\s\S]*?<\/math>/g;

    let procesado = contenido
        .replace(imageRegex, (match) => crearEtiquetaImg(match, tipo))
        .replace(dataUriRegex, (match) => crearEtiquetaImg(match, tipo))
        .replace(mathRegex, (match) => `<span style="font-size: 1.5em;">${match}</span>`)
        .replace(/(\r\n|\n|\r)/g, '<br>');

    // Si después de procesar el contenido queda vacío, se retorna "Sin responder" con el estilo indicado.
    return procesado || `<span style="font-weight:500; color:red;">Sin responder</span>`;
}

/**
 * Crea una etiqueta <img> con los atributos adecuados.
 */
function crearEtiquetaImg(src, tipo) {
    const altText = tipo === 'enunciado' ? 'Imagen de enunciado' : 'Imagen de respuesta';
    return `<img src="${src}" alt="${altText}" style="max-width: 200px; max-height: 150px;">`;
}

/**
 * Formatea múltiples respuestas según el tipo de pregunta.
 */
function formatearRespuestasMultiples(respuestas, tipoPregunta) {
    if (tipoPregunta === 'draganddrop_text' || tipoPregunta === 'draganddrop_image') {
        return respuestas
            .map((respuesta, index) => `${index + 1}. ${procesarContenido(respuesta, 'respuesta')}`)
            .join('<br>');
    } else {
        return respuestas
            .map(respuesta => `• ${procesarContenido(respuesta, 'respuesta')}`)
            .join('<br>');
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


