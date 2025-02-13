import {  obtenerFormulationClearfix } from '../../autofill-autosave-helpers.js';

export function response_inputchecked_opcionmultiple(pregunta, questionData) {
    console.log("Respondiendo preguntas inputchecked_opcionmultiple")

    let formulation = obtenerFormulationClearfix(pregunta)

    console.log(formulation)

}
