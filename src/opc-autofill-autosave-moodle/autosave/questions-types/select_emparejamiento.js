import { feedbackQuestion, convertImgToDataUri, extractContentInOrder } from '../helpers.js';

// Manejar respuestas tipo 'input text' (respuesta corta)
 export async function inputtext_respuestacorta(originalFormulationClearfix, questionsAutoSave) {
    const tipo = 'inputtext_respuestacorta';
    const respuestas = questionsAutoSave.respuestas;
    let hayRespuestaLleno = false;

    const clonFormulation = originalFormulationClearfix.cloneNode(true);
    // Convierte las imágenes dentro del clon a formato Data URI
    await convertImgToDataUri(clonFormulation);

    const allInputText = originalFormulationClearfix.querySelectorAll('input[type="text"]');

    allInputText.forEach((inputText) => {
        const valor = inputText.value;
        respuestas.push(valor);

        if (valor) {
            hayRespuestaLleno = true;
        }
    });

    if (hayRespuestaLleno) {
        questionsAutoSave.html = clonFormulation.outerHTML; // Guardar el HTML del clon
        questionsAutoSave.tipo = tipo;
        const feedback = await feedbackQuestion(originalFormulationClearfix);
        questionsAutoSave.feedback = feedback;
        questionsAutoSave.ciclo = localStorage.getItem("ciclo");
    }
}
// Manejar respuestas tipo 'select'
export async function select_emparejamiento(originalFormulationClearfix, questionsAutoSave) {
    const tipo = 'select_emparejamiento'; // Define el tipo de pregunta como "select_emparejamiento"
    questionsAutoSave.respuestas = []; // Inicializa el array respuestas como vacío
    questionsAutoSave.enunciados = []; // Inicializa el array enunciados como vacío

    const clonFormulation = originalFormulationClearfix.cloneNode(true); // Crea un clon de la estructura HTML de la pregunta
    // Convierte las imágenes dentro del clon a formato Data URI para almacenar todo el contenido en texto
    await convertImgToDataUri(clonFormulation);

    const allSelects = originalFormulationClearfix.querySelectorAll('select'); // Obtiene todos los elementos <select> en la pregunta original

    // Itera sobre cada elemento <select> encontrado
    allSelects.forEach(async (selectElement) => {
        let opcionSeleccionada = selectElement.options[selectElement.selectedIndex]; // Obtiene la opción seleccionada

        if (opcionSeleccionada && opcionSeleccionada.value !== "0") { // Verifica que haya una opción seleccionada distinta de "0"
            let textoRespuesta = opcionSeleccionada.textContent.trim(); // Obtiene el texto de la opción seleccionada sin espacios adicionales
            if (textoRespuesta) {
                questionsAutoSave.respuestas.push(textoRespuesta); // Almacena el texto de la respuesta seleccionada
            }

            // Extrae el enunciado relacionado de la celda <td> más cercana que contiene el texto o una imagen
            let textoPregunta;
            const textoElement = selectElement.closest('tr').querySelector('td.text');
            if (textoElement) {
                // Verifica si contiene texto
                if (textoElement.innerText.trim()) {
                    textoPregunta = textoElement.innerText.trim();
                } else {
                    // Si no contiene texto, intenta procesar las imágenes
                    const imgElement = textoElement.querySelector('img');
                    if (imgElement) {
                        if (imgElement.src.includes('pluginfile.php')) {
                            try {
                                // Convertir a Data URI las imágenes que contienen 'pluginfile.php'
                                console.log('Convirtiendo imagen (pluginfile.php):', imgElement.src);

                                await new Promise((resolve, reject) => {
                                    if (imgElement.complete) {
                                        resolve();
                                    } else {
                                        imgElement.onload = resolve;
                                        imgElement.onerror = reject;
                                    }
                                });

                                const canvas = document.createElement('canvas');
                                const context = canvas.getContext('2d');
                                canvas.width = imgElement.naturalWidth;
                                canvas.height = imgElement.naturalHeight;

                                context.drawImage(imgElement, 0, 0);
                                const dataUri = canvas.toDataURL();
                                imgElement.src = dataUri; // Actualiza la fuente de la imagen al Data URI
                                textoPregunta = dataUri; // Usa el Data URI como textoPregunta
                                console.log('Imagen convertida a Data URI:', imgElement.src);
                            } catch (error) {
                                console.error('Error en la conversión de la imagen:', error);
                            }
                        } else {
                            textoPregunta = imgElement.src; // Usa la URL de la imagen como textoPregunta
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
}
