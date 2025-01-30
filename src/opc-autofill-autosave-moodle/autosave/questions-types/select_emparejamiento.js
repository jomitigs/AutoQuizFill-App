import { 
    feedbackQuestion, 
    convertImgToDataUri, 
    extractContentInOrder, 
    convertImageToDataUri
} from '../../autofill-autosave-helpers.js';

// Manejar respuestas tipo 'select'
export async function select_emparejamiento(originalFormulationClearfix, questionsAutoSave) {
    const tipo = 'select_emparejamiento'; // Define el tipo de pregunta como "select_emparejamiento"
    questionsAutoSave.respuestas = [];    // Inicializa el array respuestas como vacío
    questionsAutoSave.enunciados = [];    // Inicializa el array enunciados como vacío

    // Crea un clon de la estructura HTML de la pregunta
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // Convierte las imágenes dentro del clon a formato Data URI para almacenar todo el contenido en texto
    await convertImgToDataUri(clonFormulation);

    // Obtiene todos los elementos <select> en la pregunta original
    const allSelects = originalFormulationClearfix.querySelectorAll('select');

    // Itera sobre cada elemento <select> encontrado
    allSelects.forEach(async (selectElement) => {
        // Obtiene la opción seleccionada
        let opcionSeleccionada = selectElement.options[selectElement.selectedIndex];

        if (opcionSeleccionada) {
            // Si el valor es "0", la respuesta será una cadena vacía, de lo contrario, es el texto de la opción
            let textoRespuesta = (opcionSeleccionada.value === "0")
                ? ""
                : opcionSeleccionada.textContent.trim();

            // Almacena la respuesta (vacía o con texto, según corresponda)
            questionsAutoSave.respuestas.push(textoRespuesta);

            // Extrae el enunciado relacionado de la celda <td> más cercana que contiene el texto o una imagen
            let textoPregunta;
            const textoElement = selectElement.closest('tr').querySelector('td.text');
            if (textoElement) {
                // Verifica si contiene texto
                if (textoElement.innerText.trim()) {
                    textoPregunta = textoElement.innerText.trim();
                } else {
                    // Si no contiene texto, intenta procesar la(s) imagen(es)
                    const imgElement = textoElement.querySelector('img');
                    if (imgElement) {
                        // Si la imagen proviene de 'pluginfile.php', la convertimos a Data URI
                        if (imgElement.src.includes('pluginfile.php')) {
                            try {
                                console.log('Convirtiendo imagen (pluginfile.php):', imgElement.src);
                                const dataUri = await convertImageToDataUri(imgElement);
                                imgElement.src = dataUri;
                                textoPregunta = dataUri;
                                console.log('Imagen convertida a Data URI:', imgElement.src);
                            } catch (error) {
                                console.error('Error en la conversión de la imagen:', error);
                            }
                        } else {
                            // Si la imagen no está en pluginfile.php, usamos su URL como textoPregunta
                            textoPregunta = imgElement.src;
                            console.log('La imagen no se convierte:', imgElement.src);
                        }
                    }
                }

                // Almacena el enunciado en questionsAutoSave.enunciados
                if (textoPregunta) {
                    questionsAutoSave.enunciados.push(textoPregunta);
                    console.log(`Enunciado almacenado: ${textoPregunta}`);
                }
            }
        }
    });

    // Guarda el HTML del clon y el tipo de pregunta después de procesar todas las selecciones
    questionsAutoSave.html = clonFormulation.outerHTML;
    questionsAutoSave.tipo = tipo;

    // Llama a la función feedbackQuestion para obtener retroalimentación de la pregunta y la almacena
    const feedback = await feedbackQuestion(originalFormulationClearfix);
    questionsAutoSave.feedback = feedback;

    // Guarda el valor de "ciclo" de localStorage en el objeto questionsAutoSave
    questionsAutoSave.ciclo = localStorage.getItem("ciclo");

    //console.log(`[opc-autofill-autosave-moodle: autosave/questions-types] Pregunta guardada en SessionStorage`);
}
