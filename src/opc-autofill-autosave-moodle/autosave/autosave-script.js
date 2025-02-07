import { draganddrop_image } from './questions-types/6_draganddrop_image.js';
import { draganddrop_text } from './questions-types/5_draganddrop_text.js';
import { inputchecked_opcionmultiple } from './questions-types/2_inputchecked_opcionmultiple.js';
import { inputradio_opcionmultiple_verdaderofalso } from './questions-types/1_inputradio_opcionmultiple_verdaderofalso.js';
import { inputtext_respuestacorta } from './questions-types/4_inputtext_respuestacorta.js';
import { select_emparejamiento } from './questions-types/3_select_emparejamiento.js';
import interact from 'interactjs';
import { getQuestionNumber, determinarTipoPregunta, renderizarPreguntas } from '../autofill-autosave-helpers.js';

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

    // Ejemplo de importación:
    // import { renderizarPreguntas } from './autofill-autosave-helpers.js';

    const actualizarVisibilidadBody = async () => {
        const esPaginaQuiz = window.location.href.includes('/mod/quiz/attempt.php');

        if (esPaginaQuiz && interruptorAutoSave.checked) {
            if (bodyAutoSave) {
                bodyAutoSave.style.display = 'flex';

                console.log(`[opc-autofill-autosave-moodle: autosave] Iniciando AutoSave...`);

                const originalAllFormulations = document.querySelectorAll('.formulation.clearfix');
                await AutoSave_SessionStorage(originalAllFormulations); // Espera a que termine esa función

                await AutoSave_ShowResponses();

                // **Aquí** se llama a la función para renderizar expresiones LaTeX
                // (por ejemplo, en un contenedor con id="barra-lateral-autoquizfillapp").
                renderizarPreguntas();
                // O si tu función acepta un selector:
                // renderizarPreguntas('#barra-lateral-autoquizfillapp');

                detectarCambiosPreguntas();
                console.log(`[opc-autofill-autosave-moodle: autosave] AutoSave completado.`);
            }

        } else if (esPaginaQuiz && !interruptorAutoSave.checked) {
            if (bodyAutoSave) {
                bodyAutoSave.style.display = 'none';
                sessionStorage.removeItem('questions-AutoSave');
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
    // --------------------------------------------------------------------------
    // 1) Verificar si "questionsHtml" es una colección (NodeList, HTMLCollection)
    //    Si no, convertirlo en array.
    // --------------------------------------------------------------------------
    if (
        !NodeList.prototype.isPrototypeOf(questionsHtml) &&
        !HTMLCollection.prototype.isPrototypeOf(questionsHtml)
    ) {
        questionsHtml = [questionsHtml];
    }

    // --------------------------------------------------------------------------
    // 2) Si el array está vacío, terminamos.
    // --------------------------------------------------------------------------
    if (questionsHtml.length === 0) {
        console.error('[AutoSave_SessionStorage] No se pudo ejecutar: no hay preguntas para procesar.');
        return;
    }

    // --------------------------------------------------------------------------
    // 3) Definición de funciones para distintos tipos de pregunta (ya existentes)
    // --------------------------------------------------------------------------
    const funcQuestionType = {
        'inputradio_opcionmultiple_verdaderofalso': inputradio_opcionmultiple_verdaderofalso,
        'inputchecked_opcionmultiple': inputchecked_opcionmultiple,
        'select_emparejamiento': select_emparejamiento,
        'inputtext_respuestacorta': inputtext_respuestacorta,
        'draganddrop_text': draganddrop_text,
        'draganddrop_image': async (questionHtml) => {
            // Ejemplo "async"
            return await new Promise((resolve) =>
                setTimeout(() => {
                    resolve(draganddrop_image(questionHtml));
                }, 1000)
            );
        }
    };

    // --------------------------------------------------------------------------
    // 4) Lectura inicial del sessionStorage (si existe)
    // --------------------------------------------------------------------------
    let datosExistentes = {};
    let existeAlmacenamiento = false;

    try {
        const cadenaAlmacenamiento = sessionStorage.getItem('questions-AutoSave');
        if (cadenaAlmacenamiento) {
            datosExistentes = JSON.parse(cadenaAlmacenamiento);
            existeAlmacenamiento = true;
        }
    } catch (err) {
        console.error('[AutoSave_SessionStorage] Error al parsear sessionStorage:', err);
        datosExistentes = {};
    }

    // --------------------------------------------------------------------------
    // 5) Determinar si es Caso A (múltiples preguntas) o Caso B (1 con número).
    // --------------------------------------------------------------------------
    const esCasoA =
        questionsHtml.length > 1 ||
        (questionsHtml.length === 1 && numeroQuestionUpdate === null);

    if (esCasoA) {
        // =======================================================
        // CASO A: Múltiples preguntas,
        //         o bien 1 sola pero sin numeroQuestionUpdate
        // =======================================================
        const questionsHtmlObject = {};
        let contadorPreguntas = 0;
        const nuevosNumerosPreguntas = [];

        // Recorrer todas las preguntas que llegan en "questionsHtml"
        for (const questionHtml of questionsHtml) {
            // Determinar el número DE FORMA NUMÉRICA
            let numberQuestion = null;

            // Si se pasó un numeroQuestionUpdate, se intenta parsear a número
            if (numeroQuestionUpdate !== null) {
                const numParam = parseInt(numeroQuestionUpdate, 10);
                if (!isNaN(numParam)) {
                    numberQuestion = numParam;
                }
            }

            // Si no se obtuvo nada y la pregunta en sí lo tiene:
            if (numberQuestion === null) {
                // Aquí asumes que tu getQuestionNumber() retorna un string o número
                // Y lo conviertes a number:
                const value = getQuestionNumber(questionHtml);
                const numFromHtml = parseInt(value, 10);
                if (!isNaN(numFromHtml)) {
                    numberQuestion = numFromHtml;
                }
            }

            // Si aún es null, usar contador para asignar uno
            if (numberQuestion === null) {
                contadorPreguntas++;
                numberQuestion = contadorPreguntas;
            }

            // Guardar en array para luego chequear si está la #1
            nuevosNumerosPreguntas.push(numberQuestion);

            // Determinar tipo de pregunta (asumes que ya existe tu función)
            const questionType = determinarTipoPregunta(questionHtml);
            console.log(`[AutoSave_SessionStorage] Pregunta ${numberQuestion}, tipo: ${questionType}`);

            // Llamar la función correspondiente
            const funcion = funcQuestionType[questionType];
            if (!funcion) {
                console.warn(`No se encontró función para el tipo de pregunta: ${questionType}`);
                continue; 
            }

            const questionData = await funcion(questionHtml);

            // Agregar al objeto de nuevas preguntas
            questionsHtmlObject[`Pregunta${numberQuestion}`] = questionData;
        }

        // ----------------------------------------------------------------------
        // LÓGICA PRINCIPAL de "reemplazar" o "mezclar"
        // ----------------------------------------------------------------------
        // Checar si en las nuevas preguntas está la #1 (exacto, no 12, 10, etc.)
        const hayPregunta1 = nuevosNumerosPreguntas.includes(1);

        // Si NO hay datos en sessionStorage, se crea de cero
        if (!existeAlmacenamiento) {
            console.log('[AutoSave_SessionStorage] No hay datos previos en sessionStorage. Se crea nuevo.');
            sessionStorage.setItem('questions-AutoSave', JSON.stringify(questionsHtmlObject));
        } else {
            // Sí hay datos previos
            if (hayPregunta1) {
                // REEMPLAZAR todo
                console.log('[AutoSave_SessionStorage] Se detectó la pregunta #1, se REEMPLAZA todo el contenido.');
                sessionStorage.setItem('questions-AutoSave', JSON.stringify(questionsHtmlObject));
            } else {
                // MEZCLAR: old -> previous:true, new -> previous:false
                console.log('[AutoSave_SessionStorage] No está la #1. Se mezclan datos: antiguos previous:true, nuevos previous:false.');

                // a) Marcar existentes
                for (const key in datosExistentes) {
                    if (Object.hasOwn(datosExistentes, key)) {
                        datosExistentes[key].previous = true;
                    }
                }

                // b) Insertar/actualizar las nuevas
                for (const key in questionsHtmlObject) {
                    if (Object.hasOwn(questionsHtmlObject, key)) {
                        questionsHtmlObject[key].previous = false;
                        datosExistentes[key] = questionsHtmlObject[key];
                    }
                }

                // c) Guardar resultado
                sessionStorage.setItem('questions-AutoSave', JSON.stringify(datosExistentes));
            }
        }
    } else {
        // =====================================
        // CASO B: 1 pregunta con un número
        // =====================================
        const questionHtml = questionsHtml[0];
        const numberQuestion = parseInt(numeroQuestionUpdate, 10);

        const questionType = determinarTipoPregunta(questionHtml);
        console.log(`[AutoSave_SessionStorage] Pregunta ${numberQuestion}, tipo: ${questionType}`);

        const funcion = funcQuestionType[questionType];
        if (!funcion) {
            console.warn(`No se encontró función para el tipo de pregunta: ${questionType}`);
            return;
        }

        const questionData = await funcion(questionHtml);

        // Actualiza o crea esta pregunta en los datos existentes
        datosExistentes[`Pregunta${numberQuestion}`] = questionData;

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

    // 1. Escucha los cambios en inputs, selects y checkboxes
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

            // Realiza el proceso de autoguardado
            await procesoAutoSave(event.target);
        });
    });

    // 2. Configura los elementos "draghome" para que sean arrastrables
    interact('.draghome').draggable({
        inertia: true,

        onmove: function (event) {
            // Lógica durante el arrastre (opcional)
            // console.log('Elemento se está arrastrando:', event.target);
        },

        onend: async function (event) {
            console.log('Evento onend disparado para:', event.target);

            // Obtén la posición de soltado
            const dropX = event.pageX;
            const dropY = event.pageY;
            console.log(`Elemento soltado en X: ${dropX}, Y: ${dropY}`);

            // Esperar a que ocurra algún cambio en el DOM
            console.log('Esperando mutación en el DOM...');
            await new Promise(resolve => {
                const observer = new MutationObserver(() => {
                    // Al detectar una mutación, se desconecta el observer
                    observer.disconnect();
                    console.log('Se ha detectado un cambio en el DOM');
                    resolve();
                });
                // Observa todo el <body> buscando cambios estructurales (nuevos nodos, etc.)
                observer.observe(document.body, { childList: true, subtree: true });
            });

            console.log('Ahora llamamos a procesoAutoSave...');
            await procesoAutoSave(event.target);
            console.log('procesoAutoSave finalizado.2');
        }
    });

}

async function procesoAutoSave(elemento) {
    // Verifica si 'questions-AutoSave' existe en sessionStorage
    let questionsAutoSaveStr = sessionStorage.getItem('questions-AutoSave');

    if (!questionsAutoSaveStr) {
        console.log("'questions-AutoSave' no existe. Llamando a AutoSave_SessionStorage por primera vez.");
        // Si no existe, se guarda todo de una vez
        const originalAllFormulations = document.querySelectorAll('.formulation.clearfix');
        await AutoSave_SessionStorage(originalAllFormulations);
        await AutoSave_ShowResponses();

        // Llamada para renderizar expresiones LaTeX (u otro proceso similar)
        renderizarPreguntas();
    } else {
        // Se parsea el objeto guardado
        const questionsAutoSave = JSON.parse(questionsAutoSaveStr);

        // Ubica el elemento .formulation.clearfix más cercano al elemento disparador
        const formulation = elemento.closest('.formulation.clearfix');

        if (!formulation) {
            console.warn('No se encontró el elemento .formulation.clearfix cercano. Saliendo.');
            return;
        }

        // Se obtiene el número de la pregunta (por ejemplo, mediante getQuestionNumber)
        const numeroPregunta = getQuestionNumber(formulation);

        console.log('[opc-autofill-autosave-moodle: autosave] Actualizando Pregunta', numeroPregunta);
        if (!numeroPregunta) {
            console.warn('No se pudo obtener el número de pregunta. Saliendo.');
            return;
        }

        // Construye la llave de la pregunta, por ejemplo "Pregunta1", "Pregunta2", etc.
        const preguntaKey = `Pregunta${numeroPregunta}`;

        // Si la pregunta ya existe en el objeto guardado, se actualiza
        if (questionsAutoSave[preguntaKey]) {
            await AutoSave_SessionStorage(formulation, numeroPregunta);
            console.log('AutoSave_ShowResponses iniciado');
            await AutoSave_ShowResponses(numeroPregunta);

            // Llamada para renderizar expresiones LaTeX
            renderizarPreguntas();
        } else {
            console.log(`La pregunta ${preguntaKey} no existe en questionsAutoSave. Llamando a AutoSave_SessionStorage.`);
            // Aquí podrías forzar a guardar todo de nuevo o manejar el caso que prefieras.
        }
    }
}

function AutoSave_ShowResponses(numeroPregunta) {

    return new Promise((resolve, reject) => {
        const container = document.getElementById('respuestasautosave');
        if (!container) {
            console.error('Elemento "respuestasautosave" no encontrado.');
            return reject('Elemento "respuestasautosave" no encontrado.');
        }

        const savedData = sessionStorage.getItem('questions-AutoSave');
        if (!savedData) {
            // Solo si no existe ningún dato, se muestra el mensaje.
            container.innerHTML = '<span style="font-weight:500; color:red;">Sin responder</span>';
            return resolve();
        }

        try {
            const responses = JSON.parse(savedData);

            // Si se recibe el parámetro, solo procesamos esa pregunta
            if (numeroPregunta !== undefined && numeroPregunta !== null) {
                const key = 'Pregunta' + numeroPregunta;
                const data = responses[key];
                if (data) {
                    // Construimos el HTML para esa pregunta

                    let html = `<div class="preguntaautosave" id="${key}">`;

                    if (data.enunciado && data.tipo !== 'draganddrop_text') {

                        html += `<strong>Pregunta ${numeroPregunta}:</strong> ${processContent(data.enunciado)}`;

                    }

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

                        const isArray = Array.isArray(data.respuestaCorrecta);
                        const respuestaArray = isArray ? data.respuestaCorrecta : [data.respuestaCorrecta];
                        const filteredRespuestas = respuestaArray.filter(Boolean);
                        const processedRespuestas = filteredRespuestas.map(processContent);
                        const joinedRespuestas = processedRespuestas.join('');
                        const respuestas = joinedRespuestas || '<em>___________</em>';

                        // Agregar al HTML el bloque con las respuestas
                        html += `<div class="respuestasautosave" style="font-weight:500; color: MediumBlue;">${respuestas}</div>`;

                    } else if (data.tipo === 'draganddrop_text') {
                        // Verificar si la respuesta correcta es un array o un único valor
                        const isArray = Array.isArray(data.respuestaCorrecta);
                        const respuestaArray = isArray ? data.respuestaCorrecta : [data.respuestaCorrecta];

                        // Se asume que 'data.enunciado' es el texto que contiene el marcador "[ ]"
                        let enunciado = data.enunciado;

                        // Expresión regular que busca:
                        //   - El carácter '['
                        //   - Cualquier texto (incluido texto vacío) hasta encontrar el carácter ']'
                        //   - Capturamos lo que esté entre corchetes en un grupo (para poder usarlo luego)
                        enunciado = enunciado.replace(/\[(.*?)\]/g, (match, textoDentro) => {
                            // 'textoDentro' es lo que estaba entre los corchetes.

                            // Eliminamos espacios en blanco al inicio y final.
                            // Con esto verificamos si realmente hay contenido dentro o está vacío.
                            const contenido = textoDentro.trim();

                            if (contenido.length > 0) {
                                // Si sí hay contenido dentro, lo ponemos en negrita y de color azul.
                                return `<span style="font-weight:500;">[</span>` +
                                    `<span style="font-weight:500; color:MediumBlue;">${contenido}</span>` +
                                    `<span style="font-weight:500;">]</span>`;
                            } else {
                                // Si no hay contenido, solo estilizamos los corchetes.
                                return `<span style="font-weight:500;">[ ]</span>`;
                            }
                        });

                        // Agregar el encabezado "Pregunta {numeroPregunta}:" en negrita al inicio del enunciado
                        enunciado = `<strong>Pregunta ${numeroPregunta}:</strong> ` + enunciado;

                        // Agregar al HTML el bloque con el enunciado modificado
                        html += `<div class="enunciado">${enunciado}</div>`;
                    } else if (data.tipo === 'draganddrop_image') {
                        // Verificar si la respuesta correcta es un array o un único valor
                        const isArray = Array.isArray(data.respuestaCorrecta);
                        const respuestaArray = isArray ? data.respuestaCorrecta : [data.respuestaCorrecta];
                    
                        // Obtenemos la imagen principal
                        const imagenDrop = data.imagenDrop;
                    
                        // Construimos el bloque HTML de las opciones encerradas en corchetes
                        // con negrita 500 y color mediumblue
                        const opcionesHTML = respuestaArray
                            .map(opc => ` <strong style="font-weight: 500">[</strong> <strong style="font-weight: 500; color: mediumblue;">${opc}</strong><strong style="font-weight: 500">]</strong> `)
                            .join(' ');
                    
                        // Agregamos al HTML la imagen y debajo las opciones
                        html += `
                            <div>
                                <div style="margin-bottom: 5px;">
                                    ${opcionesHTML}
                                </div>
                                <img src="${imagenDrop}" alt="Imagen de arrastre" class="img-fluid w-100" />
    
                            </div>
                        `;
                    }
                    
                    // Se recupera el objeto guardado y se parsea
                    // Recuperamos el objeto de preguntas del sessionStorage y lo parseamos
                    let preguntas = JSON.parse(sessionStorage.getItem('questions-AutoSave'));

                    // Obtenemos las claves del objeto
                    let keysPreguntas = Object.keys(preguntas);

                    // Calculamos el número máximo de pregunta extrayendo el número de cada clave
                    let maxNumero = 0;
                    keysPreguntas.forEach(function (key) {
                        // Suponemos que la clave tiene el formato "PreguntaXX"
                        var num = parseInt(key.replace('Pregunta', ''), 10);
                        if (num > maxNumero) {
                            maxNumero = num;
                        }
                    });

                    // Si el número de la pregunta actual no es el último, agregamos el <hr>
                    if (numeroPregunta < maxNumero) {
                        html += '<hr style="margin-top: 5px; margin-bottom: 5px;"></div>';
                    }

                    // Buscamos el elemento de esa pregunta dentro del contenedor
                    let updatedElement = container.querySelector(`#${key}`);
                    if (updatedElement) {
                        // Si existe, actualizamos su contenido sin modificar el resto
                        updatedElement.outerHTML = html;
                        // Luego, reobtenemos el elemento actualizado
                        updatedElement = container.querySelector(`#${key}`);
                    } else {
                        // Si no existe, creamos un nodo a partir del HTML y lo insertamos al final
                        const tempContainer = document.createElement('div');
                        tempContainer.innerHTML = html;
                        updatedElement = tempContainer.firstElementChild;
                        container.appendChild(updatedElement);
                    }

                    // Enfocamos la pregunta actualizada desplazando la vista hacia ella
                    if (updatedElement && typeof updatedElement.scrollIntoView === 'function') {
                        updatedElement.scrollIntoView({ behavior: 'auto', block: 'center' });
                    }

                    return resolve();
                } else {
                    console.warn(`No se encontró la información para ${key} en los datos guardados.`);
                    return resolve();
                }
            }

            // Si no se recibió un parámetro, procesamos y mostramos TODAS las respuestas
            const entries = Object.entries(responses);
            container.innerHTML = entries.map(([key, data], index, array) => {
                const questionNumber = key.replace(/\D/g, '');
                let html = `<div class="preguntaautosave" id="${key}">`;


                if (data.enunciado && data.tipo !== 'draganddrop_text') {

                    html += `<strong>Pregunta ${questionNumber}:</strong> ${processContent(data.enunciado)}`;

                }

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
                        .filter(Boolean)
                        .map(processContent)
                        .join('') || '<em>________-----------</em>';
                    html += `<div class="respuestasautosave">${respuestas}</div>`;

                } else if (data.tipo === 'draganddrop_text') {
                    // Verificar si la respuesta correcta es un array o un único valor
                    const isArray = Array.isArray(data.respuestaCorrecta);
                    const respuestaArray = isArray ? data.respuestaCorrecta : [data.respuestaCorrecta];

                    // Se asume que 'data.enunciado' es el texto que contiene el marcador "[ ]"
                    let enunciado = data.enunciado;

                    // Expresión regular que busca:
                    //   - El carácter '['
                    //   - Cualquier texto (incluido texto vacío) hasta encontrar el carácter ']'
                    //   - Capturamos lo que esté entre corchetes en un grupo (para poder usarlo luego)
                    enunciado = enunciado.replace(/\[(.*?)\]/g, (match, textoDentro) => {
                        // 'textoDentro' es lo que estaba entre los corchetes.

                        // Eliminamos espacios en blanco al inicio y final.
                        // Con esto verificamos si realmente hay contenido dentro o está vacío.
                        const contenido = textoDentro.trim();

                        if (contenido.length > 0) {
                            // Si sí hay contenido dentro, lo ponemos en negrita y de color azul.
                            return `<span style="font-weight:500;">[</span>` +
                                `<span style="font-weight:500; color:MediumBlue;">${contenido}</span>` +
                                `<span style="font-weight:500;">]</span>`;
                        } else {
                            // Si no hay contenido, solo estilizamos los corchetes.
                            return `<span style="font-weight:500;">[ ]</span>`;
                        }
                    });

                    // Agregar el encabezado "Pregunta {numeroPregunta}:" en negrita al inicio del enunciado
                    enunciado = `<strong>Pregunta ${questionNumber}:</strong> ` + enunciado;

                    // Agregar al HTML el bloque con el enunciado modificado
                    html += `<div class="enunciado">${enunciado}</div>`;
                } else if (data.tipo === 'draganddrop_image') {
                    // Verificar si la respuesta correcta es un array o un único valor
                    const isArray = Array.isArray(data.respuestaCorrecta);
                    const respuestaArray = isArray ? data.respuestaCorrecta : [data.respuestaCorrecta];
                
                    // Obtenemos la imagen principal
                    const imagenDrop = data.imagenDrop;
                
                    // Construimos el bloque HTML de las opciones encerradas en corchetes
                    // con negrita 500 y color mediumblue
                    const opcionesHTML = respuestaArray
                        .map(opc => ` <strong style="font-weight: 500">[</strong> <strong style="font-weight: 500; color: mediumblue;">${opc}</strong><strong style="font-weight: 500">]</strong> `)
                        .join(' ');
                
                    // Agregamos al HTML la imagen y debajo las opciones
                    html += `
                        <div>
                            <div style="margin-bottom: 5px;">
                                ${opcionesHTML}
                            </div>
                            <img src="${imagenDrop}" alt="Imagen de arrastre" class="img-fluid w-100" />

                        </div>
                    `;
                }
                
                // Solo agregamos la línea separadora si NO es el último elemento
                html += (index < array.length - 1) ? '<hr style="margin-top: 5px; margin-bottom: 5px;"></div>' : '</div>';
                return html;
            }).join('');
            resolve();
        } catch (error) {
            console.error('Error al parsear las respuestas:', error);
            container.innerHTML = '<span style="font-weight:500; color:red;">Sin responder</span>';
            reject(error);
        }
    });
}

// Función auxiliar que formatea las opciones de respuesta (ya la tienes definida)
function formatResponseOptions(options, selected) {
    const selectedSet = new Set(Array.isArray(selected) ? selected.map(s => s.trim()) : [selected?.trim()]);
    return options.map((option, i) => {
        const literal = options.length > 1 ? String.fromCharCode(97 + i) + '. ' : (i + 1) + '. ';
        return `<div><span style="font-weight:500; ${selectedSet.has(option.trim()) ? 'color:MediumBlue;' : ''}">${literal}${processContent(option)}</span></div>`;
    }).join('');
}

// Función auxiliar que procesa el contenido (ya la tienes definida)
function processContent(content) {
    if (!content) return '<span style="font-weight:500; color:red;">Sin responder</span>';
    return content.replace(/(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi, '<img src="$1" alt="Imagen" style="max-width: 200px; max-height: 150px;">')
        .replace(/(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg);base64,[a-zA-Z0-9+/=]+)/gi, '<img src="$1" alt="Imagen" style="max-width: 200px; max-height: 150px;">')
        .replace(/(\r\n|\n|\r)/g, '<br>');
}

