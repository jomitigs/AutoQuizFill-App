import { 
    feedbackQuestion, 
    File2DataUri, 
    extractContentInOrder
} from '../../autofill-autosave-helpers.js';

/**
 * Procesa preguntas de emparejamiento basadas en <select>.
 * Se clona el elemento original, se convierten las imágenes a Data URI,
 * se extrae el enunciado, las respuestas seleccionadas y las opciones únicas de los <select>.
 *
 * @param {HTMLElement} originalFormulationClearfix - Elemento DOM original de la pregunta.
 * @returns {Object} Objeto questionData con la información procesada.
 */
export async function select_emparejamiento(originalFormulationClearfix) {
    const tipo = 'select_emparejamiento';

    // Clonamos el elemento original para trabajar sobre una copia sin modificar el DOM.
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // Convertimos las imágenes del clon a Data URI si es necesario.
    if (clonFormulation.querySelectorAll('img').length > 0) {
        await File2DataUri(clonFormulation);
    }

    // Extraemos el enunciado usando la función dedicada.
    const enunciado = await extractEnunciado(clonFormulation);

    // Extraemos las opciones de emparejamiento, las respuestas correctas y las opciones únicas de los select.
    const { opcionesEnunciados, respuestaCorrecta, opcionesSelect } = await extractOpcionesYRespuesta(originalFormulationClearfix);

    // Obtenemos el feedback, si existe.
    const feedback = await feedbackQuestion(originalFormulationClearfix);

    // Construimos el objeto questionData con la información obtenida.
    const questionData = {
        enunciado: enunciado,
        opcionesEnunciados: opcionesEnunciados,
        respuestaCorrecta: respuestaCorrecta,
        opcionesSelect: opcionesSelect,  // Opciones únicas sin repetir
        html: clonFormulation.outerHTML,
        tipo: tipo,
        ciclo: localStorage.getItem("ciclo"),
        feedback: feedback,
    };

    console.log("Objeto questionData generado:", questionData);
    return questionData;
}

/**
 * Extrae el enunciado usando la función dedicada.
 *
 * @param {HTMLElement} clonFormulation - Elemento DOM clonado de la pregunta.
 * @returns {string} El enunciado extraído.
 */
export async function extractEnunciado(clonFormulation) {
    const enunciadoElement = clonFormulation.querySelector('.qtext');
    let enunciado = '';
    if (enunciadoElement) {
        enunciado = await extractContentInOrder(enunciadoElement);
    } else {
        console.log("No se encontró el elemento .qtext para extraer el enunciado.");
    }
    return enunciado;
}

/**
 * Extrae las opciones de emparejamiento, las respuestas correctas y las opciones únicas de los <select>.
 *
 * @param {HTMLElement} originalFormulationClearfix - Elemento DOM original de la pregunta.
 * @returns {Object} Objeto con las opciones de emparejamiento, respuestas correctas y opciones únicas de los select.
 */
export async function extractOpcionesYRespuesta(originalFormulationClearfix) {
    const allSelects = originalFormulationClearfix.querySelectorAll('select');
    let opcionesEnunciados = [];
    let respuestaCorrecta = [];
    let opcionesSelectSet = new Set(); // Usamos un Set para evitar duplicados

    for (const selectElement of allSelects) {
        // Obtenemos todas las opciones dentro del <select>, omitiendo "Elegir..."
        for (const option of selectElement.options) {
            if (option.value !== "0") {
                opcionesSelectSet.add(option.textContent.trim());
            }
        }

        // Obtenemos la opción seleccionada en el <select>
        let opcionSeleccionada = selectElement.options[selectElement.selectedIndex];

        if (opcionSeleccionada) {
            // Si el valor es "0", interpretamos que no se seleccionó opción, por lo que la respuesta es cadena vacía.
            let textoRespuesta = (opcionSeleccionada.value === "0")
                ? ""
                : opcionSeleccionada.textContent.trim();

            // Almacenamos la respuesta seleccionada.
            respuestaCorrecta.push(textoRespuesta);

            // Buscamos el enunciado asociado a este <select>.
            let textoPregunta;
            const textoElement = selectElement.closest('tr')?.querySelector('td.text');
            if (textoElement) {
                // Si la celda contiene texto, lo usamos como enunciado.
                if (textoElement.innerText.trim()) {
                    textoPregunta = textoElement.innerText.trim();
                } else {
                    // Si no contiene texto, buscamos una imagen.
                    const imgElement = textoElement.querySelector('img');
                    if (imgElement) {
                        // La imagen ya fue convertida a Data URI (si era necesario) durante File2DataUri.
                        textoPregunta = imgElement.src;
                        console.log('Obteniendo imagen ya convertida:', imgElement.src);
                    }
                }

                // Si se obtuvo algún enunciado (ya sea texto o imagen), lo almacenamos.
                if (textoPregunta) {
                    opcionesEnunciados.push(textoPregunta);
                }
            }
        }
    }

    return { 
        opcionesEnunciados, 
        respuestaCorrecta, 
        opcionesSelect: Array.from(opcionesSelectSet) // Convertimos el Set en una lista sin repeticiones
    };
}
