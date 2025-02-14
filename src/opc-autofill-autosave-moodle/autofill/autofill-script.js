
import { normalizarHTML, compararPreguntas } from '../autofill-autosave-helpers.js';
import { idbGet } from '../../config-firebase/idbSession.js';

import { response_inputradio_opcionmultiple_verdaderofalso } from './questions-types/1_inputradio_opcionmultiple_verdaderofalso.js';
import { response_inputchecked_opcionmultiple } from './questions-types/2_inputchecked_opcionmultiple.js';
import { response_select_emparejamiento } from './questions-types/3_select_emparejamiento.js';
import { response_inputtext_respuestacorta } from './questions-types/4_inputtext_respuestacorta.js';
import { response_inputtext_respuestacorta2 } from './questions-types/4_inputtext_respuestacorta2.js';
import { response_draganddrop_image } from './questions-types/6_draganddrop_image.js';
import { response_draganddrop_text } from './questions-types/5_draganddrop_text.js';

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
            visiblePart.style.padding = '0.5rem 0';
            visiblePart.innerHTML = `
              <div><strong>Enunciado:</strong> ${infoData.enunciado || '(Sin enunciado)'}</div>
            `;
  
            // --- PARTE OCULTA (opciones, respuestas correctas, etc.) ---
            const hiddenPart = document.createElement('div');
            hiddenPart.style.padding = '0.5rem 0';
  
            // Dependemos del tipo de pregunta
            const tipo = infoData.tipo || 'desconocido';
  
            if (tipo === 'inputradio_opcionmultiple_verdaderofalso' && infoData.opcionesRespuesta) {
              hiddenPart.innerHTML = `
                <div><strong>Opciones de respuesta:</strong></div>
                <ul>
                  ${infoData.opcionesRespuesta.map(opc => `<li>${opc}</li>`).join('')}
                </ul>
                <div><strong>Respuesta correcta:</strong> ${infoData.respuestaCorrecta || 'N/A'}</div>
              `;
            } else if (
              tipo === 'inputtext_respuestacorta' ||
              tipo === 'inputtext_respuestacorta2'
            ) {
              // respuestaCorrecta puede ser un string o un array
              const respCorrecta = Array.isArray(infoData.respuestaCorrecta)
                ? infoData.respuestaCorrecta.join(', ')
                : infoData.respuestaCorrecta || 'N/A';
  
              hiddenPart.innerHTML = `
                <div><strong>Respuesta esperada:</strong> ${respCorrecta}</div>
              `;
            } else {
              // Caso genérico
              hiddenPart.innerHTML = `
                <div><em>Tipo de pregunta:</em> ${tipo}</div>
                <div><em>Aquí podrías personalizar la vista según el tipo…</em></div>
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
  





