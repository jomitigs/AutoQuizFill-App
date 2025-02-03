import { feedbackQuestion, File2DataUri, extractContentInOrder } from '../../autofill-autosave-helpers.js';



export async function inputradio_opcionmultiple_verdaderofalso(originalFormulationClearfix) {
    console.log("Procesando pregunta de tipo inputradio_opcionmultiple_verdaderofalso...");
    const tipo = 'inputradio_opcionmultiple_verdaderofalso';

    // Clonamos el elemento original para trabajar sobre una copia sin modificar el DOM.
    const clonFormulation = originalFormulationClearfix.cloneNode(true);
    console.log("Clon de la formulación creado.");

    if (clonFormulation.querySelectorAll('img').length > 0 || clonFormulation.querySelectorAll('audio').length > 0) {
        console.log("Convirtiendo imágenes a Data URI usando File2DataUri...");
        await File2DataUri(clonFormulation);
    }
    

    // Convertimos las imágenes dentro del clon a Data URI utilizando File2DataUri.
    console.log("Convirtiendo imágenes a Data URI usando File2DataUri...");
    await File2DataUri(clonFormulation);
    console.log("Imágenes convertidas.");

    // Extraemos el enunciado usando la función dedicada.
    const enunciado = await extractEnunciado(originalFormulationClearfix);

    // Extraemos las opciones de respuesta y la respuesta correcta.
    const { opcionesRespuesta, respuestaCorrecta } = await extractOpcionesYRespuesta(originalFormulationClearfix);

    // Obtenemos el feedback, si existe.
    console.log("Obteniendo feedback...");
    const feedback = await feedbackQuestion(originalFormulationClearfix);
    console.log("Feedback obtenido:", feedback);

    // Construimos el objeto questionData con la información obtenida.
    const questionData = {
        enunciado: enunciado,
        opcionesRespuesta: opcionesRespuesta,
        respuestaCorrecta: respuestaCorrecta,
        html: clonFormulation.outerHTML,
        tipo: tipo,
        ciclo: localStorage.getItem("ciclo"),
        feedback: feedback,
    };

    console.log("Objeto questionData generado:", questionData);
    return questionData;
}


export async function extractEnunciado(originalFormulationClearfix) {
    console.log("Extrayendo enunciado...");
    const enunciadoElement = originalFormulationClearfix.querySelector('.qtext');
    let enunciado = '';
    if (enunciadoElement) {
        enunciado = await extractContentInOrder(enunciadoElement);
        console.log("Enunciado extraído:", enunciado);
    } else {
        console.log("No se encontró el elemento .qtext para extraer el enunciado.");
    }
    return enunciado;
}

export async function extractOpcionesYRespuesta(originalFormulationClearfix) {
    console.log("Extrayendo opciones de respuesta...");
    const allInputRadio = originalFormulationClearfix.querySelectorAll('input[type="radio"]');
    let opcionesRespuesta = [];
    let respuestaCorrecta = '';

    for (const inputRadio of allInputRadio) {
        // Ignoramos inputs que correspondan a "Quitar mi elección" o similares.
        const parentDiv = inputRadio.closest('.qtype_multichoice_clearchoice');
        const isClearChoice = parentDiv !== null || inputRadio.value === "-1" || inputRadio.classList.contains('sr-only');
        if (isClearChoice) {
            console.log("Ignorando input radio (ClearChoice):", inputRadio);
            continue;
        }

        // Se asume que el label asociado es el siguiente elemento en el DOM.
        let labelInput = inputRadio.nextElementSibling;
        let textoOpcion = '';
        if (labelInput) {
            // Si el label contiene un elemento con clase "flex-fill", se extrae desde allí.
            const flexFillElement = labelInput.querySelector('.flex-fill');
            if (flexFillElement) {
                textoOpcion = await extractContentInOrder(flexFillElement);
                console.log("Opción extraída desde flex-fill:", textoOpcion);
            } else {
                // Si no, se extrae directamente del label.
                textoOpcion = await extractContentInOrder(labelInput);
                console.log("Opción extraída desde label:", textoOpcion);
            }
            // Si no se encuentra un elemento MathJax, se eliminan literales iniciales (como "a.", "b.", etc.).
            const mathJaxElement = labelInput.querySelector('.MathJax');
            if (!mathJaxElement) {
                const originalTexto = textoOpcion;
                textoOpcion = textoOpcion.replace(/^[a-zA-Z]\.|^[ivxlcdmIVXLCDM]+\./, '');
                if (originalTexto !== textoOpcion) {
                    console.log("Texto de opción modificado para eliminar literales iniciales:", textoOpcion);
                }
            }
        } else {
            console.log("No se encontró label asociado para el input radio:", inputRadio);
        }

        opcionesRespuesta.push(textoOpcion);

        // Si el input está marcado, se asigna su texto como respuesta correcta.
        if (inputRadio.checked) {
            console.log("Input radio marcado encontrado. Respuesta correcta:", textoOpcion);
            respuestaCorrecta = textoOpcion;
        }
    }

    console.log("Opciones extraídas:", opcionesRespuesta);
    console.log("Respuesta correcta:", respuestaCorrecta);

    return { opcionesRespuesta, respuestaCorrecta };
}
