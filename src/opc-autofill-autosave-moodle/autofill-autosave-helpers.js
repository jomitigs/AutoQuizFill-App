export async function feedbackQuestion(originalFormulationClearfix) {
    // console.log('Iniciando feedbackQuestion');

    // Encontrar el hermano de originalFormulationClearfix que tiene clase "outcome clearfix"
    let hermano = originalFormulationClearfix.nextElementSibling;
    // console.log('Buscando hermano con clase "outcome clearfix"');

    while (hermano) {
        // console.log('Revisando elemento:', hermano);
        if (hermano.classList.contains('outcome') && hermano.classList.contains('clearfix')) {
            // console.log('Hermano encontrado:', hermano);
            break;
        }
        hermano = hermano.nextElementSibling;
    }
    if (!hermano) {
        // console.error('No se encontró el hermano con clase "outcome clearfix"');
        return '';
    }

    // Dentro del hermano, encontrar el elemento con clase "feedback"
    // console.log('Buscando elemento con clase "feedback" dentro del hermano');
    let feedback = hermano.querySelector('.feedback');
    if (!feedback) {
        console.error('No se encontró el elemento con clase "feedback"');
        return '';
    }

    // Dentro de feedback, encontrar el elemento con clase "generalfeedback"
    // console.log('Buscando elemento con clase "generalfeedback" dentro de feedback');
    let generalFeedback = feedback.querySelector('.generalfeedback');
    if (!generalFeedback) {
        console.error('No se encontró el elemento con clase "generalfeedback"');
        return '';
    }

    // Clonar el elemento generalFeedback para no modificar el original
    // console.log('Clonando el elemento generalFeedback');
    let generalFeedbackClone = generalFeedback.cloneNode(true);

    // Procesar imágenes que contienen 'pluginfile.php' en su URL en el clon
    // console.log('Buscando imágenes en generalFeedbackClone');
    let images = generalFeedbackClone.querySelectorAll('img');
    if (images.length > 0) {
        // console.log('Se encontraron imágenes:', images.length);
        let promises = [];

        images.forEach(img => {
            // console.log('Procesando imagen:', img.src);
            if (img.src.includes('pluginfile.php')) {
                // console.log('La imagen contiene "pluginfile.php" en la URL');
                let promise = convertImageToDataUri(img.src).then(dataUri => {
                    img.src = dataUri;
                    // console.log('Imagen convertida a Data URI');
                }).catch(error => {
                    console.error(error);
                });
                promises.push(promise);
            } else {
                // console.log('La imagen no contiene "pluginfile.php", se omite la conversión');
            }
        });

        // Esperar a que todas las conversiones terminen
        await Promise.all(promises);
    } else {
        // console.log('No se encontraron imágenes en generalFeedbackClone');
    }

    // Eliminar <p> vacíos o con solo <br>, espacios o <span> sin contenido
    // console.log('Eliminando <p> vacíos de generalFeedbackClone');
    let paragraphs = generalFeedbackClone.querySelectorAll('p');
    paragraphs.forEach(p => {
        if (!p.textContent.trim() && !p.querySelector('img')) {
            // console.log('Eliminando <p> vacío o sin contenido relevante:', p);
            p.remove();
        }
    });

    // Extraer el contenido HTML del clon después de procesar las imágenes y eliminar <p> vacíos
    let textoFeedback = generalFeedbackClone.innerHTML;
    // console.log('Contenido del textoFeedback:', textoFeedback);

    // Retornar el texto del feedback
    return textoFeedback;
}

export async function extractContentInOrder(node) {
    let content = '';

    for (const child of node.childNodes) {
        if (child.nodeType === Node.TEXT_NODE) {
            // Extraer el contenido de texto sin aplicar .trim() para preservar los espacios
            const text = child.textContent;
            if (text && text !== '\n') { // Evitar añadir contenido vacío o solo saltos de línea
                content += text;
            }
        } else if (child.nodeType === Node.ELEMENT_NODE) {
            const tagName = child.tagName.toLowerCase();

            if (tagName === 'script' && child.getAttribute('type') === 'math/tex') {
                // Ignorar los scripts de tipo MathJax
                continue;
            } else if (child.classList.contains('MathJax')) {
                // Extraer MathML de los elementos MathJax si existen
                const mathml = child.getAttribute('data-mathml');
                if (mathml) {
                    if (content.length > 0 && !content.endsWith(' ') && !content.endsWith('\u00A0')) {
                        content += ' ';
                    }
                    content += mathml;
                }
            } else if (tagName === 'img') {
                // Extraer el atributo 'src' de las imágenes
                const src = child.getAttribute('src');
                if (src) {
                    if (content.length > 0 && !content.endsWith(' ') && !content.endsWith('\u00A0')) {
                        content += ' ';
                    }

                    if (src.includes('pluginfile.php')) {
                        try {
                            // Convertir la imagen a Data URI si contiene 'pluginfile.php'
                            const dataUri = await convertImageToDataUri(src);
                            content += dataUri; // Añadir el Data URI en lugar de la URL original
                        } catch (error) {
                            console.error('Error en la conversión de la imagen:', error);
                            content += src; // Si falla la conversión, mantener el src original
                        }
                    } else {
                        content += src; // Si no contiene 'pluginfile.php', mantener el src original
                    }
                }
            } else if (tagName === 'sub' || tagName === 'sup') {
                // Añadir etiquetas <sub> o <sup> sin espacios adicionales
                content += child.outerHTML;
            } else if (tagName === 'p') {
                // Procesar recursivamente el contenido del <p>
                const childContent = await extractContentInOrder(child);
                if (childContent) {
                    if (content.length > 0 && !content.endsWith('\n')) {
                        content += '\n'; // Añadir un salto de línea antes del nuevo párrafo
                    }
                    content += childContent + '\n'; // Añadir el contenido del párrafo seguido de un salto de línea
                }
            } else if (tagName === 'br') {
                // Añadir un salto de línea por cada <br>
                content += '\n';
            } else {
                // Procesar recursivamente otros elementos hijos
                const childContent = await extractContentInOrder(child);
                if (childContent) {
                    content += childContent;
                }
            }
        }
    }

    return content;
}

export function getQuestionNumber(formulation_clearfix) {
    let contenedorPadre = formulation_clearfix.closest('.content');
    if (contenedorPadre) {
        let infoHermanos = contenedorPadre.parentElement.querySelector('.info');
        if (infoHermanos) {
            let numeroPreguntaSpan = infoHermanos.querySelector('.rui-qno');
            return numeroPreguntaSpan ? numeroPreguntaSpan.textContent.trim() : null; // Retornar número
        }
    }
    return null; // Sin número
}

// Función auxiliar para determinar el tipo de pregunta
export function determinarTipoPregunta(formulation_clearfix) {
    const hayUnSoloQtext = formulation_clearfix.querySelectorAll('.qtext').length === 1;
    const dropzonesElement = formulation_clearfix.querySelector('.dropzones') !== null;
    const draghomesElement = formulation_clearfix.querySelector('.draghome') !== null;

    const inputTextCount = formulation_clearfix.querySelectorAll('input[type="text"]').length;
    const inputRadioCount = formulation_clearfix.querySelectorAll('input[type="radio"]').length;
    const inputCheckboxCount = formulation_clearfix.querySelectorAll('input[type="checkbox"]').length;
    const selectCount = formulation_clearfix.querySelectorAll('select').length;

    if (hayUnSoloQtext) {
        if (inputRadioCount > 0 && inputCheckboxCount === 0 && selectCount === 0 && !dropzonesElement && !draghomesElement) {
            return 'inputradio_opcionmultiple_verdaderofalso';
        }
        if (inputCheckboxCount > 0 && inputRadioCount === 0 && selectCount === 0 && !dropzonesElement && !draghomesElement) {
            return 'inputchecked_opcionmultiple';
        }
        if (selectCount > 0 && inputRadioCount === 0 && inputCheckboxCount === 0 && !dropzonesElement && !draghomesElement) {
            return 'select_emparejamiento';
        }
        if (inputTextCount === 1 && inputRadioCount === 0 && inputCheckboxCount === 0 && selectCount === 0 && !dropzonesElement && !draghomesElement) {
            return 'inputtext_respuestacorta';
        }
    }

    if (draghomesElement && !dropzonesElement) {
        return 'draganddrop_text';
    }

    if (draghomesElement && dropzonesElement) {
        return 'draganddrop_image';
    }

    return 'otroscasos';
}

export async function convertImgToDataUri(clonFormulation) {
    const images = clonFormulation.querySelectorAll('img');

    for (const img of images) {
        if (img.src === 'https://profes.ac/pub/logoap.svg') {
            img.remove(); // Eliminar la imagen no deseada
            // console.log('Imagen eliminada:', img.src);
        } else if (img.src.includes('pluginfile.php')) { // Convertir solo si la URL contiene 'pluginfile.php'
            try {
                // Convertir a Data URI las imágenes que contienen 'pluginfile.php'
                // console.log('Convirtiendo imagen (pluginfile.php):', img.src);

                await new Promise((resolve, reject) => {
                    if (img.complete) {
                        resolve();
                    } else {
                        img.onload = resolve;
                        img.onerror = reject;
                    }
                });

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;

                context.drawImage(img, 0, 0);
                const dataUri = canvas.toDataURL();
                img.src = dataUri;
                // console.log('Imagen convertida a Data URI:', img.src);

            } catch (error) {
                console.error('Error en la conversión de la imagen:', error);
            }
        } else {
            // No se convierte si no contiene 'pluginfile.php'
            // console.log('La imagen no se convierte:', img.src);
        }
    }
}

export function convertImageToDataUri(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;

        img.onload = function () {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            context.drawImage(img, 0, 0);
            const dataUri = canvas.toDataURL();
            resolve(dataUri);
        };

        img.onerror = function () {
            reject('Error en la conversión a Data URI');
        };
    });
}
