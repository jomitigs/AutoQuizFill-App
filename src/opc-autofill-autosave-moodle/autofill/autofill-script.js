
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
    console.log("Ejecutando AutoSave_Firebase...");

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

    console.log("DPN Existentes:", comparedData.dpnExistentes);

    AutoFill(comparedData.dpnExistentes);

}

export async function AutoFill(dpq) {
    try {
      // Se obtiene el objeto completo de preguntas desde la base de datos indexada
      const dataFirebaseNormalizada = await idbGet("dataFirebaseNormalizada");
  
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
  
      // 1. Crear un objeto que almacene todas las relaciones:
      // { datapageQuestion: questionData, ... }
      const questionMapping = {};
  
      Object.entries(dpq).forEach(([datapageQuestion, datafirebaseQuestionKey]) => {
        const questionData = dataFirebaseNormalizada[datafirebaseQuestionKey];
        if (questionData) {
          questionMapping[datapageQuestion] = questionData;
        } else {
          console.warn(`No se encontraron datos para la clave: ${datafirebaseQuestionKey}`);
        }
      });
  
      console.log("Preguntas a responder", questionMapping);
  
      // Obtener el estado de "questions-AutoSave" desde sessionStorage
      const autoSaveData = sessionStorage.getItem("questions-AutoSave");
      let questionsAutoSave = {};
      if (autoSaveData) {
        try {
          questionsAutoSave = JSON.parse(autoSaveData);
        } catch (e) {
          console.error("Error al parsear questions-AutoSave desde sessionStorage", e);
        }
      }
  
      // 2. Iterar sobre el objeto creado y ejecutar la función correspondiente
      Object.entries(questionMapping).forEach(([datapageQuestion, questionData]) => {
        // Verificar el estado en sessionStorage antes de ejecutar la función
        if (
          questionsAutoSave[datapageQuestion] &&
          questionsAutoSave[datapageQuestion].previous === true
        ) {
          console.log(
            `Ignorando ${datapageQuestion} ya que 'previous' es true en questions-AutoSave`
          );
          return; // Se omite la ejecución para esta pregunta
        }
  
        const questionType = questionData.tipo;
        if (funcQuestionType.hasOwnProperty(questionType)) {
          // Se llama a la función asociada pasando la clave de la pregunta y sus datos
          funcQuestionType[questionType](datapageQuestion, questionData);
        } else {
          console.warn(`No se encontró función para el tipo de pregunta: ${questionType}`);
        }
      });
    } catch (error) {
      console.error("Error en AutoFill:", error);
    }
  }
  
  