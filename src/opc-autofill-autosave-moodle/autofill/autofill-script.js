
import { normalizarHTML, compararPreguntas } from '../autofill-autosave-helpers.js';
import { idbGet } from '../../config-firebase/idbSession.js';

import { response_inputradio_opcionmultiple_verdaderofalso } from './questions-types/1_inputradio_opcionmultiple_verdaderofalso.js';
import { response_inputchecked_opcionmultiple } from './questions-types/2_inputchecked_opcionmultiple.js';
import { response_select_emparejamiento } from './questions-types/3_select_emparejamiento.js';
import { response_inputtext_respuestacorta } from './questions-types/4_inputtext_respuestacorta.js';
import { response_inputtext_respuestacorta2 } from './questions-types/4_inputtext_respuestacorta2.js';
import { response_draganddrop_image } from './questions-types/6_draganddrop_image.js';
import { response_draganddrop_text } from './questions-types/5_draganddrop_text.js';
import { processContent, formatResponseOptions} from '../autosave/autosave-script.js';

export async function contenedorAutoFill_js() {
    console.log(`[opc-autofill-autosave-moodle: autofill] Iniciando AutoFill...`);

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

    console.log("dpnExistentes", comparedData.dpnExistentes);
    console.log("dpnNuevas", comparedData.dpnNuevas);

    let preguntasFiltradas = filterQuestions(comparedData.dpnExistentes, comparedData.dpnNuevas);

    console.log("Todas las dpnExistentes Filtradas", preguntasFiltradas.dpnExistentesFilter);

    console.log("Todas las dpnExistentes y dpnNuevas Filtradas", preguntasFiltradas.dpnShowResponses);

    await AutoFill(preguntasFiltradas.dpnExistentesFilter);
    AutoFill_ShowResponses(preguntasFiltradas.dpnShowResponses);
    console.log(`[opc-autofill-autosave-moodle: autofill] Finalizando AutoFill...`);


}

function filterQuestions(dpnExistentes, dpnNuevas) {
    // 1. Filtramos dpnExistentes: conservamos aquellas entradas cuyo "previous" sea false.
    const filteredExistentes = Object.fromEntries(
        Object.entries(dpnExistentes).filter(([_, valor]) => {
            return !(valor.data && valor.data.previous === true);
        })
    );

    // 2. Filtramos dpnNuevas:
    //    Se excluyen aquellas entradas donde la propiedad "previous" sea true.
    //    Para las que queden, se asigna el valor "NO DATA".
    const filteredNuevas = Object.fromEntries(
        Object.entries(dpnNuevas)
            .filter(([_, value]) => !(value && value.previous === true))
            .map(([key]) => [key, "NO DATA"])
    );

    // 3. Combinamos ambos objetos (dpnExistentes filtrados y dpnNuevas con "NO DATA").
    const combined = { ...filteredExistentes, ...filteredNuevas };

    // Función auxiliar para poner en mayúsculas el estado si coincide
    // con "verificado", "no verificado" o "sin responder".
    function normalizeEstado(estado) {
        if (!estado) return "";
        const lower = estado.toLowerCase();
        if (["verificado", "no verificado", "sin responder"].includes(lower)) {
            return lower.toUpperCase();
        }
        return estado; // si no coincide, lo devolvemos tal cual
    }

    // 4. Construimos el objeto final dpnShowResponses,
    //    donde cada entrada tendrá la forma:
    //    { estado: 'ALGÚN_ESTADO_EN_MAYÚSCULA' | 'NO DATA', data: {...} }
    const dpnShowResponses = Object.entries(combined).reduce((acc, [key, value]) => {
        // Si "value" es exactamente el string "NO DATA", proviene de dpnNuevas:
        if (value === "NO DATA") {
            acc[key] = { estado: "NO DATA" };
            return acc;
        }

        // Caso contrario, es un objeto proveniente de dpnExistentes
        // y contiene la estructura { questionXXXX: { ... }, previous, data, ... }
        // Necesitamos leer el "estado" dentro de la parte questionXXXX
        if (typeof value === "object" && value !== null) {
            // Buscamos la clave que empiece por "question"
            const questionKey = Object.keys(value).find(k => k.startsWith("question"));
            // Si existe, sacamos su estado y lo convertimos con normalizeEstado
            if (questionKey) {
                const questionData = value[questionKey];
                const estadoOriginal = questionData?.estado || "";
                const estadoNormalizado = normalizeEstado(estadoOriginal);

                // Guardamos data completa (el objeto 'value') y el estado normalizado
                acc[key] = {
                    estado: estadoNormalizado,
                    value
                };
                return acc;
            }
        }

        // Si no coincide con nada anterior, dejamos algo por defecto.
        // (No debería pasar a menos que haya un formato inesperado)
        acc[key] = {
            estado: "SIN ESTADO",
            data: value
        };
        return acc;
    }, {});

    return {
        dpnShowResponses,
        dpnExistentesFilter: filteredExistentes
    };
}

async function AutoFill(dpnExistentes) {
    try {
        // Mapeo de funciones según el tipo de pregunta
        const funcQuestionType = {
            'inputradio_opcionmultiple_verdaderofalso': response_inputradio_opcionmultiple_verdaderofalso,
            'inputchecked_opcionmultiple': response_inputchecked_opcionmultiple,
            'select_emparejamiento': response_select_emparejamiento,
            'inputtext_respuestacorta': response_inputtext_respuestacorta,
            'inputtext_respuestacorta2': response_inputtext_respuestacorta2,
            'draganddrop_text': response_draganddrop_text,
            'draganddrop_image': response_draganddrop_image,
        };

        // Se crea un arreglo para almacenar las tareas (promesas) a ejecutar
        const tareas = [];

        Object.entries(dpnExistentes).forEach(([dpnQuestion, questionContainer]) => {
            // Se verifica si la propiedad 'previous' es true, en cuyo caso se omite la pregunta.
            if (questionContainer.previous === true) {
                console.log(`Omitiendo ${dpnQuestion} porque 'previous' es true`);
                return; // Se omite esta iteración
            }

            // Se obtiene la clave que contiene los datos de la pregunta (ignorando la propiedad 'previous')
            const questionDataKey = Object.keys(questionContainer).find(key => key !== "previous");

            if (!questionDataKey) {
                console.warn(`No se encontró la data de pregunta para ${dpnQuestion}`);
                return;
            }

            // Se obtiene la data de la pregunta
            const questionData = questionContainer[questionDataKey];
            console.log(`Procesando ${dpnQuestion}:`, questionData);

            // Se extrae el tipo de pregunta para determinar la función a ejecutar
            const questionType = questionData.tipo;

            // Se verifica que exista una función mapeada para este tipo de pregunta
            if (funcQuestionType.hasOwnProperty(questionType)) {
                // Se llama a la función correspondiente pasando la clave de la pregunta y su data.
                // Se envuelve en Promise.resolve para tratarlo uniformemente como promesa.
                tareas.push(Promise.resolve(funcQuestionType[questionType](dpnQuestion, questionData)));
            } else {
                console.warn(`No se encontró función para el tipo de pregunta: ${questionType}`);
            }
        });

        // Se ejecutan todas las tareas en paralelo y se espera a que todas finalicen
        await Promise.all(tareas);
    } catch (error) {
        console.error("Error en AutoFill:", error);
    }
}

function AutoFill_ShowResponses(responseQuestions) {
    return new Promise((resolve, reject) => {
      const container = document.getElementById('respuestasautofill');
      if (!container) {
        console.error('Elemento "respuestasautofill" no encontrado.');
        return reject('Elemento "respuestasautofill" no encontrado.');
      }
  
      // Limpia el contenedor por si tuviera contenido anterior
      container.innerHTML = '';
  
      // 1) Obtener todas las claves y ordenarlas por número.
      //    Ej.: "Pregunta2" => 2, "Pregunta12" => 12, etc.
      let questionKeys = Object.keys(responseQuestions);
      questionKeys.sort((a, b) => {
        const numA = parseInt(a.replace('Pregunta', ''), 10);
        const numB = parseInt(b.replace('Pregunta', ''), 10);
        return numA - numB;
      });
  
      // Mapeo de los estados con las clases de badge correspondientes
      const stateToBadgeClass = {
        'NO DATA': 'badge-no-data',
        'NO VERIFICADO': 'badge-no-verificado',
        'SIN RESPONDER': 'badge-sin-responder',
        'VERIFICADO': 'badge-verificado'
      };
  
      // 2) Recorremos las claves ya ordenadas
      for (let key of questionKeys) {
        const questionData = responseQuestions[key];
        const estado = questionData.estado || 'NO DATA';
        const preguntaNumber = key.replace('Pregunta', ''); // Para extraer el número
  
        // Creamos el contenedor principal para cada pregunta
        const questionContainer = document.createElement('div');
        questionContainer.classList.add('question-container');
  
        // Creamos el encabezado (título, badge y botón de mostrar/ocultar si corresponde)
        const questionHeader = document.createElement('div');
        questionHeader.classList.add('question-header');
  
        // Título de la pregunta
        const questionTitle = document.createElement('div');
        questionTitle.classList.add('question-title');
        questionTitle.innerHTML = `Pregunta ${preguntaNumber}:`;
  
        // Badge de estado
        const badge = document.createElement('span');
        badge.classList.add(
          'question-state-badge',
          stateToBadgeClass[estado] || 'badge-no-data' // Por si no existe la clase, usa 'NO DATA'
        );
        badge.textContent = estado.toLowerCase();
  
        // Insertamos título y badge en el encabezado
        questionTitle.appendChild(badge);
        questionHeader.appendChild(questionTitle);
  
        // Crear contenedor de detalles que se mostrará/ocultará
        let detailContainer = null;
        let showHideBtn = null;
  
        // Solo mostramos el botón y el contenedor de detalles
        // en caso de 'NO VERIFICADO' o 'VERIFICADO'
        if (estado === 'NO VERIFICADO' || estado === 'VERIFICADO') {
          showHideBtn = document.createElement('button');
          showHideBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
          showHideBtn.classList.add('btn-toggle-visibility');
  
          // Contenedor con la info a mostrar/ocultar
          detailContainer = document.createElement('div');
          detailContainer.classList.add('detail-container'); // inicia con display: none
  
          // Lógica de mostrar/ocultar
          let isVisible = false;
          showHideBtn.addEventListener('click', () => {
            isVisible = !isVisible;
            if (isVisible) {
              detailContainer.style.display = 'block';
              showHideBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
            } else {
              detailContainer.style.display = 'none';
              showHideBtn.innerHTML = '<i class="fa-solid fa-eye"></i>';
            }
          });
  
          // Agregamos el botón al header
          questionHeader.appendChild(showHideBtn);
        }
  
        // Insertamos el encabezado en el contenedor principal
        questionContainer.appendChild(questionHeader);
  
        // Para NO DATA o SIN RESPONDER, no mostramos info extra
        if (estado === 'NO VERIFICADO' || estado === 'VERIFICADO') {
          // Obtenemos la info de la pregunta (enunciado, respuestas, etc.)
          const questionValue = questionData.value || {};
          const infoData = questionValue.data || null;
  
          if (infoData) {
            // --- PARTE SIEMPRE VISIBLE (enunciado) ---
            const visiblePart = document.createElement('div');
            visiblePart.innerHTML = `
              <div>${processContent(infoData.enunciado) || '(Sin enunciado)'}</div>
            `;
  
            // --- PARTE OCULTA (opciones, respuestas correctas, etc.) ---
            const hiddenPart = document.createElement('div');
  
            // Dependemos del tipo de pregunta
            const tipo = infoData.tipo || 'desconocido';
  
            // ----------------------------------------------------------------
            // Aquí adaptamos la lógica de tu snippet original
            // ----------------------------------------------------------------
            if (
              tipo === 'inputradio_opcionmultiple_verdaderofalso' ||
              tipo === 'inputchecked_opcionmultiple'
            ) {
              // Se verifica si hay opciones
              if (
                Array.isArray(infoData.opcionesRespuesta) &&
                infoData.opcionesRespuesta.length
              ) {
                // Usando tu lógica para formatear (puedes llamar a formatResponseOptions
                // o bien reproducir la lógica inline).
                hiddenPart.innerHTML = `
                  <div class="respuestasautosave">
                    ${infoData.opcionesRespuesta
                      .map((opc, i) => {
                        // Generar la letra para cada opción: a, b, c, d, ...
                        const letter = String.fromCharCode(97 + i);
  
                        // Verificar si la respuesta correcta es un array o un valor único
                        const isCorrect = Array.isArray(infoData.respuestaCorrecta)
                          ? infoData.respuestaCorrecta.includes(opc)
                          : opc === infoData.respuestaCorrecta;
  
                        // Resaltar en color mediumblue si es respuesta correcta
                        return `
                          <div style="font-weight: 500; ${
                            isCorrect ? 'color: mediumblue;' : ''
                          }">
                            ${letter}. ${processContent(opc)}
                          </div>
                        `;
                      })
                      .join('')}
                  </div>
                `;
              }
            } else if (tipo === 'select_emparejamiento') {
              // select_emparejamiento
              if (
                Array.isArray(infoData.opcionesEnunciados) &&
                Array.isArray(infoData.respuestaCorrecta)
              ) {
                hiddenPart.innerHTML = `
                  <div class="respuestasautosave">
                    ${infoData.opcionesEnunciados
                      .map((enunciado, i) => {
                        const respuesta = infoData.respuestaCorrecta[i]?.trim() || 'Elegir...';
                        return `
                          <div>
                            • ${processContent(enunciado)} - 
                            <span style="font-weight:500; color:${
                              respuesta !== 'Elegir...' ? 'MediumBlue' : 'black'
                            };">${processContent(respuesta)}</span>
                          </div>
                        `;
                      })
                      .join('')}
                  </div>
                `;
              }
            } else if (tipo === 'inputtext_respuestacorta') {
              // Aquí la respuestaCorrecta puede ser un array o un string
              // Se busca reemplazar corchetes [ ] con las respuestas
              const respuestas = Array.isArray(infoData.respuestaCorrecta)
                ? infoData.respuestaCorrecta
                : [];
  
              let respuestaIndex = 0;
              let enunciadoProcesado = infoData.enunciado.replace(
                /\[(.*?)\]/g,
                (match, contenido) => {
                  let resp =
                    respuestas[respuestaIndex] !== undefined
                      ? respuestas[respuestaIndex]
                      : '';
                  respuestaIndex++;
                  return `<strong style="font-weight: 500;">[<span style="color: mediumblue;">${resp}</span>]</strong>`;
                }
              );
  
              enunciadoProcesado = processContent(enunciadoProcesado);
  
              hiddenPart.innerHTML = `
                <div class="respuestasautosave">
                  <strong>Pregunta ${preguntaNumber}:</strong> ${enunciadoProcesado}
                </div>
              `;
            } else if (tipo === 'inputtext_respuestacorta2') {
              // Aquí las respuestas suelen listarse al final
              const respuestas = Array.isArray(infoData.respuestaCorrecta)
                ? infoData.respuestaCorrecta
                : [];
  
              hiddenPart.innerHTML = `
                <div class="respuestasautosave">
                  <strong style="font-weight: 500;">Respuesta:</strong><br>
                  ${respuestas
                    .map(
                      (resp) => `
                        <strong style="font-weight: 500;">[</strong>
                        <span style="color: mediumblue; font-weight: 500;">${resp}</span>
                        <strong style="font-weight: 500;">]</strong> 
                      `
                    )
                    .join('')}
                </div>
              `;
            } else if (tipo === 'draganddrop_text') {
              // Reemplazar [ ] vacíos con las respuestas
              let enunciado = infoData.enunciado;
              let contador = 0;
  
              enunciado = enunciado.replace(/\[\s*\]/g, () => {
                const respuesta = infoData.respuestaCorrecta[contador] || '';
                contador++;
                return `
                  <span style="font-weight:500;">[</span>
                  <span style="font-weight:500; color:MediumBlue;">${respuesta}</span>
                  <span style="font-weight:500;">]</span>
                `;
              });
  
              enunciado = `<strong>Pregunta ${preguntaNumber}:</strong> ` + enunciado;
              hiddenPart.innerHTML = `
                <div class="enunciado">${processContent(enunciado)}</div>
              `;
            } else if (tipo === 'draganddrop_image') {
              // Mostramos la imagen y debajo las respuestas correctas
              const isArray = Array.isArray(infoData.respuestaCorrecta);
              const respuestaArray = isArray ? infoData.respuestaCorrecta : [infoData.respuestaCorrecta];
              const imagenDrop = infoData.imagenDrop;
  
              const opcionesHTML = respuestaArray
                .map(
                  (opc) => `
                    <strong style="font-weight: 500">[</strong>
                    <strong style="font-weight: 500; color: mediumblue;">${opc}</strong>
                    <strong style="font-weight: 500">]</strong>
                  `
                )
                .join(' ');
  
              hiddenPart.innerHTML = `
                <div>
                  <div style="margin-bottom: 5px;">
                    ${opcionesHTML}
                  </div>
                  <img src="${imagenDrop}" alt="Imagen de arrastre" class="img-fluid w-100" />
                </div>
              `;
            } else {
              // Caso genérico
              hiddenPart.innerHTML = `
                <div><em>Tipo de pregunta:</em> ${tipo}</div>
                <div><em>(Vista sin personalizar para este tipo)</em></div>
              `;
            }
  
            // Insertamos la parte visible y la oculta en detailContainer
            if (detailContainer) {
              detailContainer.appendChild(visiblePart);
              detailContainer.appendChild(hiddenPart);
              questionContainer.appendChild(detailContainer);
            }
          } else {
            // Si no hay infoData
            if (detailContainer) {
              const noInfo = document.createElement('div');
              noInfo.style.marginTop = '1rem';
              noInfo.textContent = 'Sin información de la pregunta.';
              detailContainer.appendChild(noInfo);
              questionContainer.appendChild(detailContainer);
            }
          }
        }
  
        // Finalmente, añadimos el 'questionContainer' al contenedor principal
        container.appendChild(questionContainer);
      }
  
      // Si todo va bien, resolvemos la promesa
      resolve('HTML generado exitosamente');
    });
  }
  
  





