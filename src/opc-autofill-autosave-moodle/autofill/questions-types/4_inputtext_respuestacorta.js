import {  obtenerFormulationClearfix } from '../../autofill-autosave-helpers.js';

export function response_inputtext_respuestacorta(pregunta, questionData) {
    console.log("Respondiendo preguntas inputtext_respuestacorta")

    let formulation = obtenerFormulationClearfix(pregunta);

    console.log(formulation)
}
