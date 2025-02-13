
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
    console.log("DPN Nuevas:", comparedData.dpnNuevas);

    const funcQuestionType = {
        'inputradio_opcionmultiple_verdaderofalso': response_inputradio_opcionmultiple_verdaderofalso,
        'inputchecked_opcionmultiple':  response_inputchecked_opcionmultiple,
        'select_emparejamiento':  response_select_emparejamiento,
        'inputtext_respuestacorta':  response_inputtext_respuestacorta,
        'inputtext_respuestacorta2':  response_inputtext_respuestacorta2,
        'draganddrop_text':  response_draganddrop_text,
        'draganddrop_image':  response_draganddrop_image,
    };
}
