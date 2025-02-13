
// src/katex-entry.js
import katex from 'katex';
import renderMathInElement from 'katex/contrib/auto-render';
// Importar la librería fast-levenshtein
import levenshtein from 'fast-levenshtein';

// Exponemos a window para que sea global
window.katex = katex;
window.renderMathInElement = renderMathInElement;

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

  const blocks = formulation_clearfix.querySelectorAll(".ablock.form-inline");
  let containsRespuesta = Array.from(blocks).some(block =>
    block.textContent.toLowerCase().includes("respuesta")
  );


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
      if (containsRespuesta) {
        return 'inputtext_respuestacorta2';
      } else {
        return 'inputtext_respuestacorta';
      }
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
        console.log(`Intentando procesar imagen: ${imagen.src}`);

        // Esperar a que la imagen se cargue (ya sea de caché o en tiempo real)
        await new Promise((resolver, rechazar) => {
          if (imagen.complete) {
            resolver();
          } else {
            imagen.onload = resolver;
            imagen.onerror = (error) => {
              console.error(`Error al cargar la imagen: ${imagen.src}`, error);
              rechazar(error);
            };
          }
        });

        // Dibujar la imagen en un canvas para obtener su Data URI
        const lienzo = document.createElement('canvas');
        const contexto = lienzo.getContext('2d');
        lienzo.width = imagen.naturalWidth;
        lienzo.height = imagen.naturalHeight;
        contexto.drawImage(imagen, 0, 0);

        const dataUriImagen = lienzo.toDataURL();
        console.log(`Imagen procesada con éxito: ${imagen.src}`);
        imagen.src = dataUriImagen;
      } catch (error) {
        console.error(`Error en la conversión de la imagen: ${imagen.src}`, error);
      }
    }
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
          //console.log('-> Agregando LaTeX al contenido:', latexCode);
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

export function renderizarPreguntas() {
  // 1. Verificar si existe la función renderMathInElement en window.
  if (typeof window.renderMathInElement !== 'function') {
    console.warn('[autofill-autosave-helpers] NO se encontró la función `renderMathInElement`. Asegúrate de cargar KaTeX AutoRender primero.');
    return;
  }

  // 2. Obtener el contenedor por id
  const contenedor = document.getElementById('barra-lateral-autoquizfillapp');
  if (!contenedor) {
    console.warn('[autofill-autosave-helpers] No se encontró el contenedor con id "barra-lateral-autoquizfillapp".');
    return;
  }

  // 3. Llamar a la función de KaTeX auto-render sobre el contenedor
  window.renderMathInElement(contenedor, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '\\(', right: '\\)', display: false },
    ],
    // Otras opciones opcionales de KaTeX auto-render
  });

}

// =============================================================================
// Función principal asíncrona para comparar las preguntas de DPN y DFN.
// Se utiliza procesamiento concurrente para comparar candidatos en paralelo.
// =============================================================================
export async function compararPreguntas(dpn, dfn) {
  // Si dfn es vacío o solo contiene los metadatos ("ruta" y "tabSessionId"),
  // se omite la comparación y se consideran todas las preguntas de dpnOrigin como nuevas.
  const clavesDFN = Object.keys(dfn);
  if (
    clavesDFN.length === 0 ||
    (clavesDFN.length === 2 &&
      dfn.hasOwnProperty("ruta") &&
      dfn.hasOwnProperty("tabSessionId"))
  ) {
    console.log("dfn está vacío o solo contiene metadatos. Se asignan todas las preguntas de dpnOrigin como nuevas.");
    let dpnOrigin = sessionStorage.getItem("questions-AutoSave");
    dpnOrigin = JSON.parse(dpnOrigin);
    return { dpnExistentes: [], dpnNuevas: dpnOrigin };
  }

  let dpnExistentes = [];  // Almacena coincidencias encontradas: { dpn: { ... }, dfn: { ... } }
  let dpnNuevas = [];      // Almacena las preguntas de DPN sin coincidencia (con todos sus datos)

  // ---------------------------------------------------------------------------
  // Pre-indexar DFN: Agrupar por "tipo" y cantidad de elementos en "html"
  // ---------------------------------------------------------------------------
  let indiceDFN = {};
  for (const claveDFN in dfn) {
    const preguntaDFN = dfn[claveDFN];
    // console.log(`Procesando DFN: ${claveDFN}`, preguntaDFN);

    if (!preguntaDFN.html) {
      console.warn(`Elemento DFN "${claveDFN}" no tiene propiedad "html". Se omite.`);
      continue;
    }

    const cantidadHTML = preguntaDFN.html.length;
    const tipoPregunta = preguntaDFN.tipo;
    if (!indiceDFN[tipoPregunta]) {
      indiceDFN[tipoPregunta] = {};
    }
    if (!indiceDFN[tipoPregunta][cantidadHTML]) {
      indiceDFN[tipoPregunta][cantidadHTML] = [];
    }

    // Opcional: Precalcular el contenido de "html" y almacenarlo en caché para DFN.
    if (!cacheContenidoDFN[claveDFN]) {
      cacheContenidoDFN[claveDFN] = obtenerContenidoSeparadoYConcatenado(preguntaDFN.html);
    }

    // Se guarda la clave dentro del objeto para tenerla disponible
    indiceDFN[tipoPregunta][cantidadHTML].push({
      clave: claveDFN,
      ...preguntaDFN
    });
  }
  console.log("Índice DFN creado:", indiceDFN);

  // ---------------------------------------------------------------------------
  // Procesar cada pregunta de DPN concurrentemente.
  // Se crea una promesa por cada pregunta y se esperan todas con Promise.all.
  // ---------------------------------------------------------------------------
  const promesasDPN = Object.keys(dpn).map(async (claveDPN) => {
    const preguntaDPN = dpn[claveDPN];
    console.log(`Procesando DPN: ${claveDPN}`, preguntaDPN);

    // Si no existe la propiedad "html", se marca como nueva y se guarda la pregunta completa.
    if (!preguntaDPN.html) {
      console.warn(`Elemento DPN "${claveDPN}" no tiene propiedad "html". Se marca como nueva.`);
      dpnNuevas.push({ clave: claveDPN, ...preguntaDPN });
      return;
    }

    const tipoDPN = preguntaDPN.tipo;
    const cantidadDPN = preguntaDPN.html.length;

    // Si no hay preguntas en DFN del mismo tipo, se marca la pregunta como nueva.
    if (!indiceDFN[tipoDPN]) {
      console.log(`No existen preguntas DFN del tipo "${tipoDPN}" para DPN "${claveDPN}".`);
      dpnNuevas.push({ clave: claveDPN, ...preguntaDPN });
      return;
    }

    // Definir las cantidades permitidas en "html": si hay más de 10 elementos se permite ±1.
    let cantidadesPermitidas = [cantidadDPN];
    if (cantidadDPN > 10) {
      cantidadesPermitidas.push(cantidadDPN - 1, cantidadDPN + 1);
    }
    console.log(`Para DPN "${claveDPN}" se permiten cantidades:`, cantidadesPermitidas);

    // Recolectar candidatos de DFN que cumplan la cantidad en "html".
    let candidatos = [];
    cantidadesPermitidas.forEach(cantidad => {
      if (indiceDFN[tipoDPN][cantidad]) {
        candidatos = candidatos.concat(indiceDFN[tipoDPN][cantidad]);
      }
    });
    console.log(`Candidatos para DPN "${claveDPN}":`, candidatos);

    // Opcional: Precalcular el contenido para DPN y almacenarlo en caché.
    if (!cacheContenidoDPN[claveDPN]) {
      cacheContenidoDPN[claveDPN] = obtenerContenidoSeparadoYConcatenado(preguntaDPN.html);
    }

    // Crear una promesa para cada candidato que compare la pregunta DPN con el candidato DFN.
    // Se usa Promise.any para que se resuelva tan pronto como alguno cumpla la condición.
    const promesasCandidatos = candidatos.map(candidato => {
      return new Promise((resolve, reject) => {
        // console.log(`Comparando DPN "${claveDPN}" con candidato DFN "${candidato.clave}"`);
        const resultadoComparacion = compararHTML(preguntaDPN.html, candidato.html);
        // console.log(`Resultado de comparación:`, resultadoComparacion);
        if (resultadoComparacion.coincide) {
          console.log(`Resultado de comparación:`, resultadoComparacion);
          // Si hay coincidencia, se resuelve la promesa con todos los datos del candidato.
          resolve(candidato);
        } else {
          // Si no coincide, se rechaza la promesa.
          reject('No coincide');
        }
      });
    });

    try {
      // Promise.any se resuelve tan pronto como un candidato cumpla la condición.
      const candidatoCoincidente = await Promise.any(promesasCandidatos);
      const claveDFN = candidatoCoincidente.clave;

      dpnExistentes[claveDPN] = claveDFN;

    } catch (e) {
      // Si ninguno de los candidatos cumple, se marca la pregunta como nueva.
      console.log(`No se encontró coincidencia para DPN "${claveDPN}". Se marca como nueva.`);
      dpnNuevas.push(claveDPN);
    }
  });

  // Esperar a que se procesen todas las preguntas de DPN.
  await Promise.all(promesasDPN);

  // Recuperar los datos del sessionStorage
  let dpnOrigin = sessionStorage.getItem("questions-AutoSave");
  dpnOrigin = JSON.parse(dpnOrigin);

  const dpnNuevasData = {};

  // Iterar sobre dpnNuevas para extraer los datos de questions
  dpnNuevas.forEach((clave) => {
    if (dpnOrigin[clave]) {
      dpnNuevasData[clave] = dpnOrigin[clave]; // Inserta el objeto completo
    }
  });

  return { dpnExistentes: dpnExistentes, dpnNuevas: dpnNuevasData };
}

export async function normalizarHTML(input) {
  // Caso 1: Entrada es un string HTML directo.
  if (typeof input === "string") {
    return await normalizarHTMLString(input);
  }

  // Caso 2: Entrada es un objeto (no null).
  if (typeof input === "object" && input !== null) {
    // Caso 2.a: Si el objeto tiene la propiedad "html" (string).
    if (input.hasOwnProperty("html") && typeof input.html === "string") {
      return {
        ...input,
        html: await normalizarHTMLString(input.html)
      };
    }
    // Caso 2.b: Objeto con múltiples claves (por ejemplo, 1000 preguntas).
    const keys = Object.keys(input);
    const promiseArray = keys.map(key => {
      const valor = input[key];
      if (typeof valor === "object" && valor !== null && typeof valor.html === "string") {
        return normalizarHTMLString(valor.html).then(normalizedHTML => {
          return { key, value: { ...valor, html: normalizedHTML } };
        });
      } else {
        return Promise.resolve({ key, value: valor });
      }
    });
    const results = await Promise.all(promiseArray);
    const resultObject = {};
    results.forEach(({ key, value }) => {
      resultObject[key] = value;
    });
    return resultObject;
  }

  // Si la entrada no es string ni objeto, se retorna tal cual.
  return input;
}

async function normalizarHTMLString(html) {
  // Crear un contenedor temporal y convertir el string a un fragmento DOM.
  const tempDiv = document.createElement('div');
  const fragment = document.createRange().createContextualFragment(html);
  tempDiv.appendChild(fragment);

  tempDiv.querySelectorAll(
    '.accesshide, .custom-watermark,.validationerror , .sr-only , .qtype_multichoice_clearchoice'
  ).forEach(el => el.remove());

  // Eliminar el <legend> con clase "prompt h6 font-weight-normal sr-only"
  tempDiv.querySelectorAll('legend.prompt.h6.font-weight-normal.sr-only')
    .forEach(el => el.remove());

  // Eliminar elementos con la clase "answernumber"
  tempDiv.querySelectorAll('.answernumber')
    .forEach(el => el.remove());

      // Eliminar el <legend> con clase "prompt h6 font-weight-normal sr-only"
  tempDiv.querySelectorAll('option[value="0"]')
  .forEach(el => el.remove());

  tempDiv.querySelectorAll('span.draghome.dragplaceholder.active').forEach(el => {
    const tieneClaseChoice = Array.from(el.classList).some(cls => /^choice\d+$/.test(cls));
    const tieneClaseGroup = Array.from(el.classList).some(cls => /^group\d+$/.test(cls));
    if (tieneClaseChoice && tieneClaseGroup) {
      el.remove();
    }
  });

  // Extraer el contenido utilizando la función extractContent (se asume que devuelve una lista)
  let combinedResults = await extractContent(tempDiv);

  // Filtrar la lista final para eliminar elementos vacíos o que contengan solo espacios y saltos de línea.
  combinedResults = combinedResults.filter(item => item.trim() !== '');

  return combinedResults; // Retornar la lista filtrada
}

async function extractContent(node) {
  let tokens = [];

  for (const child of node.childNodes) {
    // ------------------------------------------------------------------------
    // 1) Nodos de texto
    // ------------------------------------------------------------------------
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent;
      if (text && text.trim() !== '') {
        const trimmedText = text.trim();
        // Si el texto parece ser una expresión matemática completa delimitada por "\(" y "\)"
        if (trimmedText.startsWith("\\(") && trimmedText.endsWith("\\)")) {
          // Se remueven los delimitadores y se añade como un único token
          tokens.push(trimmedText.slice(2, -2).trim());
        } else {
          // Para texto normal se separa en palabras
          tokens.push(...trimmedText.split(/\s+/));
        }
      }
    }
    // ------------------------------------------------------------------------
    // 2) Nodos de elemento
    // ------------------------------------------------------------------------
    else if (child.nodeType === Node.ELEMENT_NODE) {
      const tagName = child.tagName.toLowerCase();

      // Ignorar nodos <span> de MathJax o MathJax_Preview
      if (
        tagName === 'span' &&
        (child.classList.contains('MathJax') || child.classList.contains('MathJax_Preview'))
      ) {
        continue; // Se omite este nodo y sus hijos
      }

      // A) Elemento <script type="math/tex">: extraer el código LaTeX sin modificar
      if (tagName === 'script' && child.getAttribute('type') === 'math/tex') {
        const latexCode = child.textContent.trim();
        if (latexCode) {
          tokens.push(latexCode);
        }
      }
      // B) Elemento <img>: extraer el atributo src
      else if (tagName === 'img') {
        const src = child.getAttribute('src');
        if (src) {
          tokens.push(src);
        }
      }
      // C) Elementos <sub> y <sup>: conservar la etiqueta completa
      else if (tagName === 'sub' || tagName === 'sup') {
        tokens.push(child.outerHTML);
      }
      // D) Elemento <p>: procesar recursivamente (se podría agregar un salto de línea)
      else if (tagName === 'p') {
        const childTokens = await extractContent(child);
        if (childTokens && childTokens.length > 0) {
          tokens.push(...childTokens);
        }
        // Si deseas marcar fin de párrafo, puedes descomentar la siguiente línea:
        // tokens.push('\n');
      }
      // E) Elemento <br>: añadir un salto de línea
      else if (tagName === 'br') {
        tokens.push('\n');
      }
      // F) Otros elementos: procesarlos recursivamente
      else {
        const childTokens = await extractContent(child);
        if (childTokens && childTokens.length > 0) {
          tokens.push(...childTokens);
        }
      }
    }
  }

  return tokens;
}

// =============================================================================
// Cachés para optimización: Almacenan el resultado del procesamiento de la propiedad
// "html" para cada pregunta, evitando recalcular la separación de contenido en cada comparación.
// =============================================================================
const cacheContenidoDPN = {};
const cacheContenidoDFN = {};

// =============================================================================
// Función para calcular la distancia de Levenshtein entre dos cadenas.
// Permite medir la diferencia entre dos textos.
// =============================================================================
function calcularDistanciaLevenshtein(cadena1, cadena2) {
  // La función get de fast-levenshtein retorna la distancia entre ambas cadenas.
  return levenshtein.get(cadena1, cadena2);
}

// =============================================================================
// Función para calcular el porcentaje de similitud entre dos textos.
// Si los textos son exactamente iguales se retorna 100 sin calcular la distancia.
// =============================================================================
function calcularSimilitudTexto(texto1, texto2) {
  if (texto1 === texto2) return 100;
  if (texto1.length === 0 && texto2.length === 0) return 100;
  const distancia = calcularDistanciaLevenshtein(texto1, texto2);
  const longitudMaxima = Math.max(texto1.length, texto2.length);
  const similitud = ((longitudMaxima - distancia) / longitudMaxima) * 100;
  return similitud;
}

// =============================================================================
// Función para procesar la lista "html": Separa en dos arreglos (texto y medios)
// y genera un string con todo el texto concatenado.
// =============================================================================
function obtenerContenidoSeparadoYConcatenado(listaHTML) {
  let contenidoTexto = [];
  let contenidoMedios = [];
  listaHTML.forEach(elemento => {
    if (typeof elemento === 'string') {
      // Si la cadena contiene "http://" o "https://" o "data:" se considera un medio.
      if (elemento.includes("http://") || elemento.includes("https://") || elemento.includes("data:")) {
        contenidoMedios.push(elemento);
      } else {
        contenidoTexto.push(elemento);
      }
    } else {
      // Si es un objeto, se asume que tiene la propiedad "tipo".
      if (elemento.tipo === 'media') {
        contenidoMedios.push(elemento.contenido);
      } else {
        contenidoTexto.push(elemento.contenido);
      }
    }
  });
  const textoConcatenado = contenidoTexto.join(" ").trim();
  return { texto: contenidoTexto, medios: contenidoMedios, textoConcatenado: textoConcatenado };
}

// =============================================================================
// Función para comparar dos arreglos de medios (enlaces).
// Se requiere que ambos arreglos tengan la misma cantidad y que sus elementos sean idénticos,
// sin importar el orden.
// =============================================================================
function compararMedios(arregloMedios1, arregloMedios2) {
  if (arregloMedios1.length !== arregloMedios2.length) return false;
  let mediosNoEmparejados = arregloMedios2.slice();
  for (const medio1 of arregloMedios1) {
    const indiceCoincidente = mediosNoEmparejados.findIndex(medio2 => compararContenidoMedios(medio1, medio2));
    if (indiceCoincidente === -1) {
      return false;
    } else {
      mediosNoEmparejados.splice(indiceCoincidente, 1);
    }
  }
  return true;
}

// =============================================================================
// Función para comparar dos elementos de medios (simulación de comparación exacta).
// En una implementación real se podría utilizar una comparación de píxeles o pHash.
// =============================================================================
function compararContenidoMedios(medio1, medio2) {
  return medio1 === medio2;
}

// =============================================================================
// Función para comparar el contenido de "html" de dos preguntas.
// Se aprovechan los datos precalculados (o se generan y almacenan en caché si es la primera vez).
// =============================================================================
function compararHTML(htmlDPN, htmlDFN) {
  let contenidoDPN = obtenerContenidoSeparadoYConcatenado(htmlDPN);
  let contenidoDFN = obtenerContenidoSeparadoYConcatenado(htmlDFN);

  // Se pueden almacenar en caché utilizando algún identificador único si se requiere
  // (en este ejemplo se utiliza directamente el array "html" como parámetro).

  // Si los textos concatenados son idénticos, se omite el cálculo completo.
  if (contenidoDPN.textoConcatenado === contenidoDFN.textoConcatenado) {
    const mediosOk = compararMedios(contenidoDPN.medios, contenidoDFN.medios);
    return { coincide: mediosOk, similitudTexto: 100, mediosCoinciden: mediosOk };
  }

  const similitudTexto = calcularSimilitudTexto(contenidoDPN.textoConcatenado, contenidoDFN.textoConcatenado);
  const mediosCoinciden = compararMedios(contenidoDPN.medios, contenidoDFN.medios);
  const coincide = (similitudTexto >= 99) && mediosCoinciden;

  return { coincide: coincide, similitudTexto: similitudTexto, mediosCoinciden: mediosCoinciden };
}

export function obtenerFormulationClearfix(preguntaStr) {
  // Extrae el número de la cadena, por ejemplo: "Pregunta7" → "7"
  const match = preguntaStr.match(/Pregunta(\d+)/);
  if (!match) {
    console.error('El formato de la pregunta no es válido. Usa "PreguntaXX"');
    return null;
  }
  const numeroPregunta = match[1];

  // Busca todos los elementos con class "info"
  const infoElements = document.querySelectorAll('.info');
  let infoTarget = null;
  infoElements.forEach((info) => {
    // Busca dentro de info un elemento con class "rui-qno" (sin importar si está dentro de un h4 o no)
    const span = info.querySelector('.rui-qno');
    if (span && span.textContent.trim() === numeroPregunta) {
      infoTarget = info;
    }
  });

  if (!infoTarget) {
    console.error(`No se encontró la pregunta número ${numeroPregunta}`);
    return null;
  }

  // Encuentra el hermano con class "content"
  let contentElement = infoTarget.nextElementSibling;
  while (contentElement && !contentElement.classList.contains('content')) {
    contentElement = contentElement.nextElementSibling;
  }
  if (!contentElement) {
    console.error('No se encontró el elemento "content" hermano de la pregunta');
    return null;
  }

  // Dentro de "content", devuelve el elemento que contiene la formulación (class "formulation clearfix")
  const formulationElement = contentElement.querySelector('.formulation.clearfix');
  if (!formulationElement) {
    console.error('No se encontró el elemento ".formulation.clearfix" dentro de "content"');
    return null;
  }

  return formulationElement;
}



