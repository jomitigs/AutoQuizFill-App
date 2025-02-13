import {  obtenerFormulationClearfix } from '../../autofill-autosave-helpers.js';

export function response_draganddrop_image(pregunta, questionData) {
    console.log("Respondiendo preguntas draganddrop_image")

    let formulation = obtenerFormulationClearfix(pregunta)

    console.log(formulation)

}
