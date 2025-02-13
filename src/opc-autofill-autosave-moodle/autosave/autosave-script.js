import { draganddrop_image } from './questions-types/6_draganddrop_image.js';
import { draganddrop_text } from './questions-types/5_draganddrop_text.js';
import { inputchecked_opcionmultiple } from './questions-types/2_inputchecked_opcionmultiple.js';
import { inputradio_opcionmultiple_verdaderofalso } from './questions-types/1_inputradio_opcionmultiple_verdaderofalso.js';
import { inputtext_respuestacorta } from './questions-types/4_inputtext_respuestacorta.js';
import { inputtext_respuestacorta2 } from './questions-types/4_inputtext_respuestacorta2.js';
import { select_emparejamiento } from './questions-types/3_select_emparejamiento.js';


import interact from 'interactjs';
import { getQuestionNumber, determinarTipoPregunta, renderizarPreguntas, normalizarHTML, compararPreguntas } from '../autofill-autosave-helpers.js';

import { getDataFromFirebase, getDataFromFirebaseAsync, saveNewQuestionsToFirebase, saveExistingQuestionsToFirebase } from '../../config-firebase/firebase-helpers.js';
import { idbGet, idbDelete } from '../../config-firebase/idbSession.js';


// Exporta una función llamada contenedorAutoSave_js
export function contenedorAutoSave_js() {      
    console.log(`[opc-autofill-autosave-moodle: autosave] Iniciando AutoSave...`);

    // Mostrar las respuestas auto-guardadas y esperar a que se complete el proceso
    AutoSave_ShowResponses();

    // Iniciar el monitoreo de cambios en las preguntas para actualizaciones dinámicas
    detectarCambiosPreguntas();
    console.log(`[opc-autofill-autosave-moodle: autosave] AutoSave completado.`);
}

export async function AutoSaveQuestions_SessionStorage(questionsHtml, numeroQuestionUpdate = null) {
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
        console.error('[AutoSaveQuestions_SessionStorage] No se pudo ejecutar: no hay preguntas para procesar.');
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
        'inputtext_respuestacorta2': inputtext_respuestacorta2,
        'draganddrop_text': draganddrop_text,
        'draganddrop_image': draganddrop_image,
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
        console.error('[AutoSaveQuestions_SessionStorage] Error al parsear sessionStorage:', err);
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
        // CASO A: Múltiples preguntas, o bien 1 sola pero sin numeroQuestionUpdate
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
            // console.log(`[AutoSaveQuestions_SessionStorage] Pregunta ${numberQuestion}, tipo: ${questionType}`);

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
            console.log('[AutoSaveQuestions_SessionStorage] No hay datos previos en sessionStorage. Se crea nuevo.');

            // Insertar/actualizar las nuevas
            for (const key in questionsHtmlObject) {
                if (Object.hasOwn(questionsHtmlObject, key)) {
                    questionsHtmlObject[key].previous = false;
                    datosExistentes[key] = questionsHtmlObject[key];
                }
            }

            sessionStorage.setItem('questions-AutoSave', JSON.stringify(questionsHtmlObject));


        } else {
            // Sí hay datos previos
            if (hayPregunta1) {
                // REEMPLAZAR todo
                //console.log('[AutoSaveQuestions_SessionStorage] Se detectó la pregunta #1, se REEMPLAZA todo el contenido.');

                // Insertar/actualizar las nuevas
                for (const key in questionsHtmlObject) {
                    if (Object.hasOwn(questionsHtmlObject, key)) {
                        questionsHtmlObject[key].previous = false;
                        datosExistentes[key] = questionsHtmlObject[key];
                    }
                }

                sessionStorage.setItem('questions-AutoSave', JSON.stringify(questionsHtmlObject));
            } else {
                // MEZCLAR: old -> previous:true, new -> previous:false
                console.log('[AutoSaveQuestions_SessionStorage] No está la #1. Se mezclan datos: antiguos previous:true, nuevos previous:false.');

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
        console.log(`[AutoSaveQuestions_SessionStorage] Pregunta ${numberQuestion}, tipo: ${questionType}`);

        const funcion = funcQuestionType[questionType];
        if (!funcion) {
            console.warn(`No se encontró función para el tipo de pregunta: ${questionType}`);
            return;
        }

        // 2) Procesar la nueva (o actualizada) pregunta
        const questionData = await funcion(questionHtml);

        // 3) A esta pregunta le asignamos previous: false
        questionData.previous = false;
        datosExistentes[`Pregunta${numberQuestion}`] = questionData;

        // 4) Guardar todo en sessionStorage
        try {
            sessionStorage.setItem('questions-AutoSave', JSON.stringify(datosExistentes));
            console.log('[AutoSaveQuestions_SessionStorage] Se ha actualizado la información de 1 pregunta con previous:false.');
        } catch (error) {
            console.error('Error al guardar en sessionStorage:', error);
        }
    }


}

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

    const boton = document.getElementById("upload-autosave");

    // Verificar que el botón exista en el DOM antes de asignar el evento
    if (boton) {
        boton.addEventListener("click", AutoSave_Firebase);
    } else {
        console.error("El botón con ID 'upload-autosave' no fue encontrado.");
    }

}

async function procesoAutoSave(elemento) {
    // Verifica si 'questions-AutoSave' existe en sessionStorage
    let questionsAutoSaveStr = sessionStorage.getItem('questions-AutoSave');

    if (!questionsAutoSaveStr) {
        console.log("'questions-AutoSave' no existe. Llamando a AutoSaveQuestions_SessionStorage por primera vez.");
        // Si no existe, se guarda todo de una vez
        const originalAllFormulations = document.querySelectorAll('.formulation.clearfix');
        await AutoSaveQuestions_SessionStorage(originalAllFormulations);
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
            await AutoSaveQuestions_SessionStorage(formulation, numeroPregunta);
            console.log('AutoSave_ShowResponses iniciado');
            await AutoSave_ShowResponses(numeroPregunta);

            // Llamada para renderizar expresiones LaTeX
            renderizarPreguntas();
        } else {
            console.log(`La pregunta ${preguntaKey} no existe en questionsAutoSave. Llamando a AutoSaveQuestions_SessionStorage.`);
            // Aquí podrías forzar a guardar todo de nuevo o manejar el caso que prefieras.
        }
    }
}

export function AutoSave_ShowResponses(numeroPregunta) {
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

            // Si se recibe el parámetro numeroPregunta, solo procesamos esa pregunta
            if (numeroPregunta !== undefined && numeroPregunta !== null) {
                const key = 'Pregunta' + numeroPregunta;
                const data = responses[key];

                // Solo mostramos si esa pregunta tiene 'previous: false'
                if (data && data.previous === false) {

                    let html = `<div class="preguntaautosave" id="${key}">`;

                    if (data.enunciado && data.tipo !== 'draganddrop_text' && data.tipo !== 'inputtext_respuestacorta') {

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
                        const respuestas = Array.isArray(data.respuestaCorrecta) ? data.respuestaCorrecta : [];
                        let respuestaIndex = 0;

                        let enunciadoProcesado = data.enunciado.replace(/\[(.*?)\]/g, (match, contenido) => {
                            let respuesta = respuestas[respuestaIndex] !== undefined ? respuestas[respuestaIndex] : '';
                            respuestaIndex++; // Avanzamos al siguiente elemento en la lista

                            return `<strong style="font-weight: 500;">[<span style="color: mediumblue;">${respuesta}</span>]</strong>`;
                        });

                        // Procesamos el contenido antes de añadirlo a HTML
                        enunciadoProcesado = processContent(enunciadoProcesado);

                        html += `<div class="respuestasautosave"><strong>Pregunta ${numeroPregunta}:</strong> ${enunciadoProcesado}</div>`;
                    }

                    else if (data.tipo === 'inputtext_respuestacorta2') {
                        const respuestas = Array.isArray(data.respuestaCorrecta) ? data.respuestaCorrecta : [];

                        html += '<div class="respuestasautosave">';
                        html += '<strong style="font-weight: 500;">Respuesta:</strong><br>';

                        respuestas.forEach((resp) => {
                            html += `<strong style="font-weight: 500;">[</strong><span style="color: mediumblue; font-weight: 500;">${resp}</span><strong style="font-weight: 500;">]</strong> `;
                        });

                        html += '</div>';


                    }

                    else if (data.tipo === 'draganddrop_text') {
                        // Se asume que 'data.enunciado' contiene el texto con [ ] como marcador
                        let enunciado = data.enunciado;
                        enunciado = enunciado.replace(/\[(.*?)\]/g, (match, textoDentro) => {
                            const contenido = textoDentro.trim();
                            if (contenido.length > 0) {
                                return `<span style="font-weight:500;">[</span>
                                        <span style="font-weight:500; color:MediumBlue;">${contenido}</span>
                                        <span style="font-weight:500;">]</span>`;
                            } else {
                                return `<span style="font-weight:500;">[ ]</span>`;
                            }
                        });

                        enunciado = `<strong>Pregunta ${numeroPregunta}:</strong> ` + enunciado;
                        html += `<div class="enunciado">${enunciado}</div>`;
                    } else if (data.tipo === 'draganddrop_image') {
                        const isArray = Array.isArray(data.respuestaCorrecta);
                        const respuestaArray = isArray ? data.respuestaCorrecta : [data.respuestaCorrecta];
                        const imagenDrop = data.imagenDrop;

                        const opcionesHTML = respuestaArray
                            .map(opc => ` <strong style="font-weight: 500">[</strong> <strong style="font-weight: 500; color: mediumblue;">${opc}</strong><strong style="font-weight: 500">]</strong> `)
                            .join(' ');

                        html += `
                            <div>
                                <div style="margin-bottom: 5px;">
                                    ${opcionesHTML}
                                </div>
                                <img src="${imagenDrop}" alt="Imagen de arrastre" class="img-fluid w-100" />
                            </div>
                        `;
                    }

                    // Agregamos el hr solo si esta pregunta no es la última dentro de las guardadas
                    let preguntas = JSON.parse(sessionStorage.getItem('questions-AutoSave'));
                    let keysPreguntas = Object.keys(preguntas);
                    let maxNumero = 0;
                    keysPreguntas.forEach(function (keyIt) {
                        var num = parseInt(keyIt.replace('Pregunta', ''), 10);
                        if (num > maxNumero) {
                            maxNumero = num;
                        }
                    });
                    if (numeroPregunta < maxNumero) {
                        html += '<hr style="margin-top: 5px; margin-bottom: 5px;"></div>';
                    }

                    // Actualizamos / insertamos el contenido
                    let updatedElement = container.querySelector(`#${key}`);
                    if (updatedElement) {
                        updatedElement.outerHTML = html;
                        updatedElement = container.querySelector(`#${key}`);
                    } else {
                        const tempContainer = document.createElement('div');
                        tempContainer.innerHTML = html;
                        updatedElement = tempContainer.firstElementChild;
                        container.appendChild(updatedElement);
                    }

                    // Enfocamos la pregunta actualizada
                    if (updatedElement && typeof updatedElement.scrollIntoView === 'function') {
                        updatedElement.scrollIntoView({ behavior: 'auto', block: 'center' });
                    }
                } else {
                    console.warn(
                        data
                            ? `La pregunta ${numeroPregunta} existe, pero no tiene previous: true. No se muestra.`
                            : `No se encontró la información para ${key} en los datos guardados.`
                    );
                }
                return resolve();
            }

            // Si no se recibió numeroPregunta, procesamos TODAS las preguntas
            // 1) Tomamos todas las entradas
            const entries = Object.entries(responses);
            // 2) Filtramos solo las que tengan previous: true
            const filteredEntries = entries.filter(([key, data]) => data.previous === false);

            // 3) Renderizamos únicamente las preguntas filtradas
            container.innerHTML = filteredEntries
                .map(([key, data], index, array) => {
                    const questionNumber = key.replace(/\D/g, '');
                    let html = `<div class="preguntaautosave" id="${key}">`;

                    if (data.enunciado && data.tipo !== 'draganddrop_text' && data.tipo !== 'inputtext_respuestacorta') {

                        html += `<strong>Pregunta ${questionNumber}:</strong> ${processContent(data.enunciado)}`;

                    }


                    if (data.tipo === 'inputradio_opcionmultiple_verdaderofalso' || data.tipo === 'inputchecked_opcionmultiple') {
                        if (Array.isArray(data.opcionesRespuesta) && data.opcionesRespuesta.length) {
                            html += `<div class="respuestasautosave">${formatResponseOptions(
                                data.opcionesRespuesta,
                                data.respuestaCorrecta
                            )}</div>`;
                        }
                    } else if (data.tipo === 'select_emparejamiento') {
                        if (Array.isArray(data.opcionesEnunciados) && Array.isArray(data.respuestaCorrecta)) {
                            html +=
                                `<div class="respuestasautosave">` +
                                data.opcionesEnunciados
                                    .map((enunciado, i) => {
                                        const respuesta = data.respuestaCorrecta[i]?.trim() || 'Elegir...';
                                        return `<div>• ${processContent(
                                            enunciado
                                        )} - <span style="font-weight:500; color:${respuesta !== 'Elegir...' ? 'MediumBlue' : 'black'
                                            };">${processContent(respuesta)}</span></div>`;
                                    })
                                    .join('') +
                                `</div>`;
                        }


                    } else if (data.tipo === 'inputtext_respuestacorta') {
                        const respuestas = Array.isArray(data.respuestaCorrecta) ? data.respuestaCorrecta : [];
                        let respuestaIndex = 0;

                        let enunciadoProcesado = data.enunciado.replace(/\[(.*?)\]/g, (match, contenido) => {
                            let respuesta = respuestas[respuestaIndex] !== undefined ? respuestas[respuestaIndex] : '';
                            respuestaIndex++; // Avanzamos al siguiente elemento en la lista

                            return `<strong style="font-weight: 500;">[<span style="color: mediumblue;">${respuesta}</span>]</strong>`;
                        });

                        enunciadoProcesado = processContent(enunciadoProcesado);

                        html += `<div class="respuestasautosave"><strong>Pregunta ${questionNumber}:</strong> ${enunciadoProcesado}</div>`;




                    }

                    else if (data.tipo === 'inputtext_respuestacorta2') {
                        const respuestas = Array.isArray(data.respuestaCorrecta) ? data.respuestaCorrecta : [];

                        html += '<div class="respuestasautosave">';
                        html += '<strong style="font-weight: 500;">Respuesta:</strong><br>';

                        respuestas.forEach((resp) => {
                            html += `<strong style="font-weight: 500;">[</strong><span style="color: mediumblue; font-weight: 500;">${resp}</span><strong style="font-weight: 500;">]</strong> `;
                        });

                        html += '</div>';


                    }

                    else if (data.tipo === 'draganddrop_text') {
                        let enunciado = data.enunciado;
                        enunciado = enunciado.replace(/\[(.*?)\]/g, (match, textoDentro) => {
                            const contenido = textoDentro.trim();
                            if (contenido.length > 0) {
                                return `<span style="font-weight:500;">[</span>
                                        <span style="font-weight:500; color:MediumBlue;">${contenido}</span>
                                        <span style="font-weight:500;">]</span>`;
                            } else {
                                return `<span style="font-weight:500;">[ ]</span>`;
                            }
                        });
                        enunciado = `<strong>Pregunta ${questionNumber}:</strong> ` + enunciado;
                        html += `<div class="enunciado">${enunciado}</div>`;
                    } else if (data.tipo === 'draganddrop_image') {
                        const isArray = Array.isArray(data.respuestaCorrecta);
                        const respuestaArray = isArray ? data.respuestaCorrecta : [data.respuestaCorrecta];
                        const imagenDrop = data.imagenDrop;

                        const opcionesHTML = respuestaArray
                            .map(
                                (opc) =>
                                    ` <strong style="font-weight: 500">[</strong> <strong style="font-weight: 500; color: mediumblue;">${opc}</strong><strong style="font-weight: 500">]</strong> `
                            )
                            .join(' ');

                        html += `
                            <div>
                                <div style="margin-bottom: 5px;">
                                    ${opcionesHTML}
                                </div>
                                <img src="${imagenDrop}" alt="Imagen de arrastre" class="img-fluid w-100" />
                            </div>
                        `;
                    }

                    // Solo agregamos la línea separadora si NO es el último elemento en el nuevo array filtrado
                    html += index < array.length - 1 ? '<hr style="margin-top: 5px; margin-bottom: 5px;"></div>' : '</div>';
                    return html;
                })
                .join('');

            resolve();
        } catch (error) {
            console.error('Error al parsear las respuestas:', error);
            container.innerHTML = '<span style="font-weight:500; color:red;">Error</span>';
            reject(error);
        }
    });
}

function formatResponseOptions(options, selected) {
    // Convertimos selected en un conjunto para facilitar la comparación
    const selectedSet = new Set(
        Array.isArray(selected)
            ? selected.map(s => s.trim())
            : [selected?.trim()]
    );

    return options.map((option, i) => {
        const literal = options.length > 1
            ? String.fromCharCode(97 + i) + '. '
            : (i + 1) + '. ';

        const isSelected = selectedSet.has(option.trim());
        // Procesamos el contenido y luego verificamos si contiene una imagen
        const processedContent = processContent(option);
        const containsImage = /<img\s+[^>]*>/.test(processedContent);

        if (containsImage && isSelected) {
            // Si contiene imagen y está seleccionado, se aplica el overlay
            // y el literal se muestra en MediumBlue y con font-weight:500
            return `
                <div class="respuesta">
                    <span style="font-weight:500; color:MediumBlue;">${literal}</span>
                    <div class="img-overlay">
                        ${processedContent}
                    </div>
                </div>
            `;
        } else {
            // En otro caso, se aplica el estilo normal (p.ej., color MediumBlue si está seleccionado)
            return `
                <div class="respuesta">
                    <span style="font-weight:500; ${isSelected ? 'color:MediumBlue;' : ''}">
                        ${literal}${processedContent}
                    </span>
                </div>
            `;
        }
    }).join('');
}

function processContent(content) {
    if (!content) return '<span style="font-weight:500; color:red;">Sin responder</span>';
    return content
        .replace(/(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi, '<img src="$1" alt="Imagen" style="max-width: 200px; max-height: 150px;">')
        .replace(/(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg);base64,[a-zA-Z0-9+/=]+)/gi, '<img src="$1" alt="Imagen" style="max-width: 200px; max-height: 150px;">')
        .replace(/(\r\n|\n|\r)/g, '<br>');
}

export async function AutoSave_Firebase() {
    console.log("Ejecutando AutoSave_Firebase...");

    const switchRutaDinamica = localStorage.getItem('switch-ruta-dinamica') === 'true';
    const ruta = switchRutaDinamica
        ? localStorage.getItem('configRutaDinamic')
        : localStorage.getItem('configRuta');

    const dataPage = JSON.parse(sessionStorage.getItem('questions-AutoSave'));

    const dataPageNormalizada = await normalizarHTML(dataPage);
    console.log('DataPageNormalizada:', dataPageNormalizada);

    const dataFirebaseNormalizada = await idbGet("dataFirebaseNormalizada");
    console.log('DataFirebaseNormalizada:', dataFirebaseNormalizada);

    // 🟢 ESPERAR a que `compararPreguntas` termine antes de seguir
    const comparedData = await compararPreguntas(dataPageNormalizada, dataFirebaseNormalizada);

    console.log("DPN Existentes:", comparedData.dpnExistentes);
    console.log("DPN Nuevas:", comparedData.dpnNuevas);

    const dfnKeys = Object.keys(dataFirebaseNormalizada);

    const validKeys = dfnKeys.filter(key => key !== "ruta" && key !== "tabSessionId");

    const lastKey = validKeys.length
        ? validKeys.reduce((max, key) =>
            parseInt(key.replace("question", ""), 10) >
                parseInt(max.replace("question", ""), 10)
                ? key
                : max,
            validKeys[0])
        : "question0000";

    console.log("lastKey1:", lastKey);

    // 🟢 Aseguramos que `saveNewQuestionsToFirebase` solo se ejecute después de que `compararPreguntas` termine
    saveNewQuestionsToFirebase(ruta, comparedData.dpnNuevas, lastKey);

    saveExistingQuestionsToFirebase(ruta, comparedData.dpnExistentes);

    // Si estás dentro de una función async
    getDataFromFirebaseAsync(true);

}

