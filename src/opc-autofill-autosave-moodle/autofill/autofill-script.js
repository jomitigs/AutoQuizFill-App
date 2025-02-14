
import interact from 'interactjs';
import { getQuestionNumber, determinarTipoPregunta, renderizarPreguntas, normalizarHTML, compararPreguntas } from '../autofill-autosave-helpers.js';

import { getDataFromFirebase, getDataFromFirebaseAsync, saveNewQuestionsToFirebase, saveExistingQuestionsToFirebase } from '../../config-firebase/firebase-helpers.js';
import { idbGet, idbDelete } from '../../config-firebase/idbSession.js';

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

    // await AutoFill(preguntasFiltradas.dpnExistentesFilter);

    console.log(`[opc-autofill-autosave-moodle: autofill] Finalizando AutoFill...`);

}

function filterQuestions(dpnExistentes, dpnNuevas) {
    // Filtramos dpnExistentes: conservamos aquellas entradas cuyo valor de "previous" sea false.
    const filteredExistentes = Object.fromEntries(
      Object.entries(dpnExistentes).filter(([key, value]) => value.previous !== true)
    );
  
    // Filtramos dpnNuevas:
    // Se excluyen aquellas entradas donde la propiedad previous sea true.
    // Para las que queden, se asigna el valor "NO DATA".
    const filteredNuevas = Object.fromEntries(
      Object.entries(dpnNuevas)
        .filter(([key, value]) => !(value && value.previous === true))
        .map(([key]) => [key, "NO DATA"])
    );
  
    // Combinamos ambos objetos.
    const combined = { ...filteredExistentes, ...filteredNuevas };
  
    // Para cada entrada, generamos un objeto que incluya la clave ("clave") y el valor ("value")
    const dpnShowResponses = Object.entries(combined).reduce((acc, [key, value]) => {
      acc[key] = { clave: key, value }; // Aquí asignamos la propiedad "clave"
      return acc;
    }, {});
  
    return { dpnShowResponses, dpnExistentesFilter: filteredExistentes };
  }
  
  
 async function AutoFill(dpnExistentes, dataFirebaseNormalizada) {
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

        // Obtener el estado de "questions-AutoSave" desde sessionStorage
        const autoSaveData = sessionStorage.getItem("questions-AutoSave");
        let questionsAutoSave = {};
        if (autoSaveData) {
            try {
                questionsAutoSave = JSON.parse(autoSaveData);
            } catch (error) {
                console.error("Error al parsear questions-AutoSave desde sessionStorage", error);
            }
        }

        // Crear un objeto que almacene las relaciones (omitiendo las que tengan previous true)
        const questionMapping = {};
        Object.entries(dpnExistentes).forEach(([datapageQuestion, datafirebaseQuestionKey]) => {
            if (
                questionsAutoSave[datapageQuestion] &&
                questionsAutoSave[datapageQuestion].previous === true
            ) {
                console.log(
                    `Omitiendo ${datapageQuestion} porque 'previous' es true en questions-AutoSave`
                );
                return;
            }

            const questionData = dataFirebaseNormalizada[datafirebaseQuestionKey];
            if (questionData) {
                questionMapping[datapageQuestion] = questionData;
            } else {
                console.warn(`No se encontraron datos para la clave: ${datafirebaseQuestionKey}`);
            }
        });

        console.log("Preguntas a responder", questionMapping);

        // Crear un arreglo de promesas para cada respuesta
        const tareas = Object.entries(questionMapping).map(([datapageQuestion, questionData]) => {
            const questionType = questionData.tipo;
            if (funcQuestionType.hasOwnProperty(questionType)) {
                // Llamamos a la función correspondiente y asumimos que retorna una promesa (o bien la envolvemos en Promise.resolve si no es asíncrona)
                return Promise.resolve(funcQuestionType[questionType](datapageQuestion, questionData));
            } else {
                console.warn(`No se encontró función para el tipo de pregunta: ${questionType}`);
                return Promise.resolve(); // Para que no bloquee
            }
        });

        // Ejecutar todas las tareas en paralelo y esperar a que finalicen
        await Promise.all(tareas);
    } catch (error) {
        console.error("Error en AutoFill:", error);
    }
}



