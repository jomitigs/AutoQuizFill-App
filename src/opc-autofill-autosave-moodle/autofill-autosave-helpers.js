
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

export async function File2DataUri(files) {
    let imagenes = [];
    let audios = [];
  
      if (files instanceof HTMLImageElement) {
        imagenes = [files];
      } else if (files instanceof HTMLAudioElement) {
        audios = [files];
      } else if (files instanceof HTMLElement) {
        imagenes = Array.from(files.querySelectorAll('img'));
        audios = Array.from(files.querySelectorAll('audio'));
      } else {
        // Si el tipo de entrada no es soportado, se lanza un error que se captura inmediatamente
        console.log("Tipo de entrada no soportado. Proporcione un elemento HTML, una imagen o un audio.");
      }
  
    // --- Procesar imágenes ---
    for (const imagen of imagenes) {
      // Procesar solo imágenes cuya URL contenga 'pluginfile.php'
      if (imagen.src.includes('pluginfile.php')) {
        try {
          // Esperar a que la imagen se cargue (ya sea de caché o en tiempo real)
          await new Promise((resolver, rechazar) => {
            if (imagen.complete) {
              resolver();
            } else {
              imagen.onload = resolver;
              imagen.onerror = rechazar;
            }
          });
  
          // Dibujar la imagen en un canvas para obtener su Data URI
          const lienzo = document.createElement('canvas');
          const contexto = lienzo.getContext('2d');
          lienzo.width = imagen.naturalWidth;
          lienzo.height = imagen.naturalHeight;
          contexto.drawImage(imagen, 0, 0);
  
          const dataUriImagen = lienzo.toDataURL();
          imagen.src = dataUriImagen;
        } catch (error) {
          console.error('Error en la conversión de la imagen:', error);
        }
      }
      // Si la imagen no contiene 'pluginfile.php', se deja sin cambios.
    }
  
    // --- Procesar audios ---
    const umbralDuracionAudio = 60; // Duración umbral en segundos
    const umbralTamanoAudio = 10 * 1024 * 1024; // Tamaño umbral en bytes (10 MB)
  
    for (const audio of audios) {
      // Procesar solo si la URL existe y contiene 'pluginfile.php'
      if (audio.src && audio.src.includes('pluginfile.php')) {
        try {
          // Esperar a que se carguen los metadatos del audio (para obtener la duración)
          await new Promise((resolver, rechazar) => {
            if (audio.readyState >= 1 && !isNaN(audio.duration)) {
              resolver();
            } else {
              audio.onloadedmetadata = resolver;
              audio.onerror = rechazar;
            }
          });
  
          // Obtener el blob del audio para revisar el tamaño
          const respuesta = await fetch(audio.src);
          const blob = await respuesta.blob();
  
          /*  
            Se realiza la conversión si:
            - El audio dura menos o igual al umbral, o
            - Si dura más, pero su tamaño es inferior al umbral.
            Esto permite convertir audios largos que estén bien comprimidos (por ejemplo, 5 minutos y 1 MB)
            y omitir la conversión en casos donde el audio sea extenso y pesado.
          */
          if (audio.duration > umbralDuracionAudio && blob.size > umbralTamanoAudio) {
            console.log('Audio demasiado largo y pesado, se omite la conversión:', audio.src);
            continue;
          }
  
          // Convertir el blob a Data URI usando FileReader
          const dataUriAudio = await new Promise((resolver, rechazar) => {
            const lector = new FileReader();
            lector.onloadend = () => resolver(lector.result);
            lector.onerror = rechazar;
            lector.readAsDataURL(blob);
          });
  
          audio.src = dataUriAudio;
        } catch (error) {
          console.error('Error en la conversión del audio a Data URI:', error);
        }
      }
    }
  }

  export async function extractContentInOrder(node) {
    //console.log('Iniciando extracción de contenido para el nodo:', node);
    let content = '';
  
    for (const child of node.childNodes) {
      //console.log('Procesando child node con nodeType:', child.nodeType);
  
      // 1) Nodos de texto
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent;
        //console.log('-> Nodo de texto encontrado:', text);
  
        if (text && text !== '\n') {
          content += text;
          //console.log('-> Agregando al contenido:', text);
        }
  
      // 2) Nodos de elemento
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const tagName = child.tagName.toLowerCase();
        //console.log('-> Nodo de elemento encontrado con tagName:', tagName);
  
        // ------------------------------------------------------------------------
        // Ignorar nodos <span> que sean de MathJax o MathJax_Preview
        // ------------------------------------------------------------------------
        if (
          tagName === 'span' &&
          (child.classList.contains('MathJax') || child.classList.contains('MathJax_Preview'))
        ) {
          //console.log('-> Ignorando nodo <span> con clase MathJax o MathJax_Preview');
          continue; // No procesamos este nodo ni sus hijos
        }
  
        // ------------------------------------------------------------------------
        // A) <script type="math/tex">
        // ------------------------------------------------------------------------
        if (tagName === 'script' && child.getAttribute('type') === 'math/tex') {
          const latexCode = child.textContent.trim();
          //console.log('-> Nodo <script type="math/tex"> detectado, LaTeX:', latexCode);
  
          if (latexCode) {
            // Se añade un espacio si es necesario
            if (content.length > 0 && !content.endsWith(' ') && !content.endsWith('\u00A0')) {
              content += ' ';
            }
            // Encierrar el código LaTeX entre \(...\)
            content += `\\(${latexCode}\\)`;
            console.log('-> Agregando LaTeX al contenido:', latexCode);
          }
  
        // ------------------------------------------------------------------------
        // C) <img>
        // ------------------------------------------------------------------------
        } else if (tagName === 'img') {
          //console.log('-> Encontrado <img> con src');
          const src = child.getAttribute('src');
          if (src) {
            if (content.length > 0 && !content.endsWith(' ') && !content.endsWith('\u00A0')) {
              content += ' ';
            }
            content += src;
            //console.log('-> Agregando src al contenido:', src);
          }
  
        // ------------------------------------------------------------------------
        // D) <sub> y <sup>
        // ------------------------------------------------------------------------
        } else if (tagName === 'sub' || tagName === 'sup') {
          //console.log(`-> Encontrado <${tagName}>; conservando la etiqueta completa.`);
          // Se conserva la etiqueta completa
          content += child.outerHTML;
  
        // ------------------------------------------------------------------------
        // E) <p> (procesado recursivo + saltos de línea)
        // ------------------------------------------------------------------------
        } else if (tagName === 'p') {
          //console.log('-> Encontrado <p>. Procesando recursivamente su contenido...');
          const childContent = await extractContentInOrder(child);
          if (childContent) {
            if (content.length > 0 && !content.endsWith('\n')) {
              content += '\n';
            }
            content += childContent + '\n';
           // console.log('-> Contenido extraído de <p>:', childContent);
          }
  
        // ------------------------------------------------------------------------
        // F) <br> (salto de línea)
        // ------------------------------------------------------------------------
        } else if (tagName === 'br') {
          //console.log('-> Encontrado <br>. Añadiendo salto de línea.');
          content += '\n';
  
        // ------------------------------------------------------------------------
        // G) Otros elementos (procesado recursivo)
        // ------------------------------------------------------------------------
        } else {
          //console.log('-> Nodo de tipo desconocido. Procesando recursivamente...');
          const childContent = await extractContentInOrder(child);
          if (childContent) {
            content += childContent;
           // console.log('-> Contenido extraído del nodo hijo desconocido:', childContent);
          }
        }
      }
    }
  
   // console.log('Contenido acumulado para este nodo:', content);
    return content;
  }
  
  
  
 
  /**
 * Convierte LaTeX a MathML sin afectar la parte visible de la web.
 * Detecta la versión de MathJax (v3 o v2) y utiliza el método correspondiente.
 * Retorna una promesa que se resuelve con el MathML resultante.
 *
 * @param {string} latexCode - Código LaTeX a convertir.
 * @param {boolean} [displayMode=false] - true para ecuación de bloque, false para en línea.
 * @returns {Promise<string>} - Promesa con el MathML.
 */
export async function convertLatexToMathML(latexCode, displayMode = false) {
    if (!window.MathJax) {
      throw new Error("MathJax no está cargado en la página.");
    }
  
    // Si MathJax.tex2mmlPromise existe, asumimos que es v3
    if (typeof MathJax.tex2mmlPromise === 'function') {
      return await MathJax.tex2mmlPromise(latexCode, { display: displayMode });
    }
    // Si MathJax.Hub existe, asumimos que es v2
    else if (window.MathJax.Hub) {
      return await convertWithMathJaxV2(latexCode, displayMode);
    }
    else {
      throw new Error("No se pudo determinar la versión de MathJax.");
    }
  }
  
  /**
   * Conversión con MathJax v2.
   * Crea un contenedor temporal oculto para procesar el LaTeX sin afectar la vista.
   *
   * @param {string} latexCode - Código LaTeX a convertir.
   * @param {boolean} displayMode - true para bloque, false para en línea.
   * @returns {Promise<string>} - Promesa con el MathML.
   */
  function convertWithMathJaxV2(latexCode, displayMode) {
    return new Promise((resolve, reject) => {
      // Crear un contenedor oculto
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.top = '-9999px';
      container.style.visibility = 'hidden';
      
      // Inserta el LaTeX con los delimitadores adecuados según el modo.
      container.innerHTML = displayMode ? '$$' + latexCode + '$$' : '\\(' + latexCode + '\\)';
      
      // Agrega el contenedor al DOM (puedes insertarlo en el body sin afectar la vista)
      document.body.appendChild(container);
      
      // Forzar que MathJax procese el contenedor
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, container]);
      MathJax.Hub.Queue(() => {
        const mathElements = container.getElementsByTagName('math');
        if (mathElements.length > 0) {
          const mathml = mathElements[0].outerHTML;
          document.body.removeChild(container);
          resolve(mathml);
        } else {
          document.body.removeChild(container);
          reject(new Error("No se generó MathML con MathJax v2."));
        }
      });
    });
  }
  