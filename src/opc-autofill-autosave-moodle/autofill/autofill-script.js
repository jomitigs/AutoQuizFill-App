
import interact from 'interactjs';
import { getQuestionNumber, determinarTipoPregunta, renderizarPreguntas, normalizarHTML, compararPreguntas } from '../autofill-autosave-helpers.js';

import { getDataFromFirebase, getDataFromFirebaseAsync, saveNewQuestionsToFirebase, saveExistingQuestionsToFirebase } from '../../config-firebase/firebase-helpers.js';
import { idbGet, idbDelete } from '../../config-firebase/idbSession.js';

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
}