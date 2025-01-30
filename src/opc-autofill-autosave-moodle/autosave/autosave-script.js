import { draganddrop_image } from './questions-types/draganddrop_image.js';
import { draganddrop_text } from './questions-types/draganddrop_text.js';
import { inputchecked_opcionmultiple } from './questions-types/inputchecked_opcionmultiple.js';
import { inputradio_opcionmultiple_verdaderofalso } from './questions-types/inputradio_opcionmultiple_verdaderofalso.js';
import { inputtext_respuestacorta } from './questions-types/inputtext_respuestacorta.js';
import { select_emparejamiento } from './questions-types/select_emparejamiento.js';

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

                detectarCambiosPreguntas();

                mostrarRespuestas_AutoSave();
                
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

async function AutoSave_SessionStorage(formulations, forcedQuestionNumber = null) {
    // 1) Leer si ya existe algo en sessionStorage
    let existingData = {};
    try {
        const storageStr = sessionStorage.getItem('questions-AutoSave');
        if (storageStr) {
            existingData = JSON.parse(storageStr);
        }
    } catch (err) {
        console.error('Error al leer/parsing sessionStorage:', err);
        // existingData se queda como {}
    }

    // 2) Asegurarnos de que 'formulations' sea un array
    if (
        !NodeList.prototype.isPrototypeOf(formulations) &&
        !HTMLCollection.prototype.isPrototypeOf(formulations)
    ) {
        formulations = [formulations];
    }

    // 3) Configurar un contador local (solo se usa si NO tenemos `forcedQuestionNumber`
    //    ni un número de pregunta dentro de la etiqueta HTML)
    let contadorPreguntas = 0;

    // 4) Definir funciones por tipo de pregunta
    const tipoFunciones = {
        'inputradio_opcionmultiple_verdaderofalso': inputradio_opcionmultiple_verdaderofalso,
        'inputchecked_opcionmultiple': inputchecked_opcionmultiple,
        'select_emparejamiento': select_emparejamiento,
        'inputtext_respuestacorta': inputtext_respuestacorta,
        'draganddrop_text': async (formulation, questionsAutoSave) => {
            await new Promise((resolve) => setTimeout(() => {
                draganddrop_text(formulation, questionsAutoSave);
                resolve();
            }, 1000)); // Retraso de 1 segundo
        },
        'draganddrop_image': async (formulation, questionsAutoSave) => {
            await new Promise((resolve) => setTimeout(() => {
                draganddrop_image(formulation, questionsAutoSave);
                resolve();
            }, 1000)); // Retraso de 1 segundo
        }
        // otros tipos...
    };

    // 5) Iterar sobre cada .formulation (sea una o varias)
    for (const formulation of formulations) {
        // Determinar el número de pregunta
        const numeroPregunta =
            forcedQuestionNumber ||
            getQuestionNumber(formulation) ||
            ++contadorPreguntas;

        // Estructura para guardar datos de ESTA pregunta
        const questionsAutoSave = {
            html: '',
            respuestas: [],
            enunciados: [],
            tipo: ''
        };

        // Determinar el tipo de pregunta
        const tipoPregunta = determinarTipoPregunta(formulation);
        console.log(`[opc-autofill-autosave-moodle: autosave] Pregunta ${numeroPregunta}, tipo: ${tipoPregunta}`);

        // Ejecutar la función adecuada según el tipo de pregunta
        const func = tipoFunciones[tipoPregunta];
        if (func) {
            await func(formulation, questionsAutoSave);  // se llena questionsAutoSave
        }

        // Convertir a string si solo hay una respuesta
        if (questionsAutoSave.respuestas.length === 1) {
            questionsAutoSave.respuestas = questionsAutoSave.respuestas[0];
        }

        // Checar si se agregó algún contenido para esta pregunta
        const tieneContenido =
            questionsAutoSave.html ||
            (Array.isArray(questionsAutoSave.respuestas) && questionsAutoSave.respuestas.length > 0) ||
            (!Array.isArray(questionsAutoSave.respuestas) && questionsAutoSave.respuestas) ||
            questionsAutoSave.enunciados.length > 0;

        if (tieneContenido) {
            // Actualizar/Insertar la pregunta en el objeto "existingData"
            existingData[`Pregunta${numeroPregunta}`] = questionsAutoSave;
        }
    }

    // 6) Guardar el objeto completo en sessionStorage (SIN reemplazar todo, sino actualizándolo)
    try {
        sessionStorage.setItem('questions-AutoSave', JSON.stringify(existingData));
    } catch (error) {
        console.error('Error al guardar en sessionStorage:', error);
    }
}

function mostrarRespuestas_AutoSave() {
    // Obtiene el elemento del DOM con el id 'respuestasautosave'
    const elementoRespuestasAutoSave = document.getElementById('respuestasautosave');
    // Obtiene el elemento del DOM con el id 'preguntaautosave' (aunque no se utiliza en el código proporcionado)
    const elementoPreguntaAutoSave = document.getElementById('preguntaautosave');

    // Verifica si el elemento 'respuestasautosave' existe en el DOM
    if (!elementoRespuestasAutoSave) {
        // Si no existe, muestra un error en la consola y termina la función
        console.error('El elemento con id "respuestasautosave" no existe en el DOM.');
        return;
    }

    // Obtiene las respuestas guardadas en sessionStorage bajo la clave 'questions-AutoSave'
    // Si no existen, asigna 'N/A'
    const respuestasGuardadas = sessionStorage.getItem('questions-AutoSave') || 'N/A';

    // Verifica si hay respuestas guardadas diferentes a 'N/A'
    if (respuestasGuardadas !== 'N/A') {
        // Parsea el JSON de las respuestas guardadas a un objeto de JavaScript
        const respuestasObj = JSON.parse(respuestasGuardadas);
        // Inicializa una cadena para almacenar las respuestas formateadas
        let respuestasFormateadas = '';

        // Itera sobre cada par clave-valor en el objeto de respuestas
        for (const [key, value] of Object.entries(respuestasObj)) {
            // Solo procesa las claves que comienzan con 'Pregunta'
            if (key.startsWith('Pregunta')) {
                // Extrae las respuestas y enunciados del objeto de la respuesta
                const respuestas = value.respuestas || [];
                const enunciados = value.enunciados || [];
                // Número de la pregunta (clave)
                const numeroPregunta = key;
                // Tipo de pregunta
                const tipoPregunta = value.tipo || '';
                // Asegura que las respuestas sean un arreglo
                const respuestasFinales = Array.isArray(respuestas) ? respuestas : [respuestas];

                // Inicializa una cadena para almacenar las respuestas en HTML
                let respuestasHTML = '';

                // Función auxiliar para procesar cada respuesta individualmente
                const procesarRespuesta = (respuesta) => {
                    // Expresión regular para identificar elementos <math>...</math>
                    const mathRegex = /<math[^>]*>[\s\S]*?<\/math>/g;

                    // Expresión regular para identificar URLs de imágenes
                    const imageRegex = /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi;

                    // Expresión regular para identificar Data URIs de imágenes (base64)
                    const dataUriRegex = /(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg)\;base64,[a-zA-Z0-9+/=]+)/gi;

                    // Reemplaza las URLs de imágenes con etiquetas <img> adecuadas
                    let respuestaProcesada = respuesta.replace(imageRegex, (match) => {
                        return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 200px; max-height: 150px;">`;
                    });

                    // Reemplaza las imágenes en formato Data URI con etiquetas <img>
                    respuestaProcesada = respuestaProcesada.replace(dataUriRegex, (match) => {
                        return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 200px; max-height: 150px;">`;
                    });

                    // Envuelve los elementos MathML en un <span> con un tamaño de fuente aumentado
                    respuestaProcesada = respuestaProcesada.replace(mathRegex, (match) => {
                        return `<span style="font-size: 1.5em;">${match}</span>`;
                    });

                    // Reemplaza los saltos de línea con <br> para mantener el formato en HTML
                    respuestaProcesada = respuestaProcesada.replace(/(\r\n|\n|\r)/g, '<br>');

                    // Retorna la respuesta procesada
                    return respuestaProcesada;
                };

                // Verifica si hay enunciados y si la cantidad de enunciados coincide con la de respuestas
                if (enunciados.length > 0 && enunciados.length === respuestasFinales.length) {
                    // Mapea cada enunciado con su respuesta correspondiente y los formatea en HTML
                    respuestasHTML = enunciados.map((enunciado, index) => {
                        const respuesta = respuestasFinales[index];

                        // Expresiones regulares para imágenes, similares a las usadas en procesarRespuesta
                        const imageRegex = /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi;
                        const dataUriRegex = /(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg);base64,[a-zA-Z0-9+/=]+)/gi;

                        // Procesa el enunciado reemplazando URLs o Data URIs con etiquetas <img>
                        let enunciadoProcesado = enunciado.replace(imageRegex, (match) => {
                            return `<img src="${match}" alt="Imagen de enunciado" style="max-width: 200px; max-height: 150px;">`;
                        });

                        enunciadoProcesado = enunciadoProcesado.replace(dataUriRegex, (match) => {
                            return `<img src="${match}" alt="Imagen de enunciado" style="max-width: 200px; max-height: 150px;">`;
                        });

                        // Procesa la respuesta de manera similar
                        let respuestaProcesada = respuesta.replace(imageRegex, (match) => {
                            return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 200px; max-height: 150px;">`;
                        });

                        respuestaProcesada = respuestaProcesada.replace(dataUriRegex, (match) => {
                            return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 200px; max-height: 150px;">`;
                        });

                        // Retorna el enunciado y la respuesta procesados en formato HTML, separados por una flecha
                        return `${enunciadoProcesado} <strong>➔</strong> ${respuestaProcesada}`;
                    }).join('<br>'); // Une todas las parejas enunciado-respuesta con saltos de línea
                }
                // Caso donde no hay enunciados pero hay múltiples respuestas
                else if (enunciados.length === 0 && respuestasFinales.length > 1) {
                    // Verifica el tipo de pregunta para formatear adecuadamente
                    if (tipoPregunta === 'draganddrop_text' || tipoPregunta === 'draganddrop_image') {
                        // Si es de tipo 'draganddrop', numera las respuestas
                        respuestasHTML = respuestasFinales.map((respuesta, index) => {
                            return `${index + 1}. ${procesarRespuesta(respuesta)}`;
                        }).join('<br>');
                    } else {
                        // Para otros tipos de preguntas, utiliza viñetas
                        respuestasHTML = respuestasFinales.map(respuesta => {
                            return `• ${procesarRespuesta(respuesta)}`;
                        }).join('<br>');
                    }
                } else {
                    // Si solo hay una respuesta, la procesa directamente
                    const respuesta = respuestasFinales[0] || '';
                    respuestasHTML = procesarRespuesta(respuesta);
                }

                // Añade al contenido formateado la pregunta y sus respuestas en HTML
                respuestasFormateadas += `
                    <div class="preguntaautosave">
                        ${numeroPregunta}:
                    </div>
                    <div class="respuestasautosave">
                        ${respuestasHTML}
                    </div>`;
            }
        }

        // Inserta el contenido formateado en el elemento del DOM correspondiente
        elementoRespuestasAutoSave.innerHTML = respuestasFormateadas;

    } else {
        // Si no hay respuestas guardadas, muestra 'N/A' en el elemento y registra un mensaje en la consola
        elementoRespuestasAutoSave.textContent = respuestasGuardadas;
        console.log('No hay respuestas guardadas, mostrando "N/A".');
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
            console.log('[opc-autofill-autosave-moodle: autosave] Cambio detectado');
            
            // Verificamos si 'questions-AutoSave' existe en localStorage
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
                    await AutoSave_SessionStorage(formulation,numeroPregunta);

                } else {
                    console.log(`La pregunta ${preguntaKey} no existe en questionsAutoSave. Llamando a AutoSave_SessionStorage.`);
                    // Si no encuentra la pregunta, podemos forzar a guardar todo de nuevo
                }
            }
        });
    });

}


