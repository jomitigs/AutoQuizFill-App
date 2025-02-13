import {  obtenerFormulationClearfix } from '../../autofill-autosave-helpers.js';

export function response_inputtext_respuestacorta2(pregunta, questionData) {
    console.log("Respondiendo preguntas inputtext_respuestacorta2")

    let formulation = obtenerFormulationClearfix(pregunta)

    console.log(formulation)

}
