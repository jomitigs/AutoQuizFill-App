
import interact from 'interactjs';
import { getQuestionNumber, determinarTipoPregunta, renderizarPreguntas,  normalizarHTML, compararPreguntas } from '../autofill-autosave-helpers.js';

import { getDataFromFirebase, getDataFromFirebaseAsync,  saveNewQuestionsToFirebase, saveExistingQuestionsToFirebase} from '../../config-firebase/firebase-helpers.js';
import { idbGet, idbDelete} from '../../config-firebase/idbSession.js';

export function contenedorAutoFill_js() {
}