
import { normalizarHTML, compararPreguntas } from '../autofill-autosave-helpers.js';
import { idbGet} from '../../config-firebase/idbSession.js';

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

    console.log(`[opc-autofill-autosave-moodle: autofill] Finalizando AutoFill...`);

}

function filterQuestions(dpnExistentes, dpnNuevas) {
    // 1. Filtramos dpnExistentes: conservamos aquellas entradas cuyo "previous" sea false.
    const filteredExistentes = Object.fromEntries(
      Object.entries(dpnExistentes).filter(([key, value]) => value.previous !== true)
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
            data: value
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




