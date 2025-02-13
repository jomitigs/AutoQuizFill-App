import {  obtenerFormulationClearfix } from '../../autofill-autosave-helpers.js';


export function response_select_emparejamiento(pregunta, questionData) {
    console.log("Respondiendo preguntas select_emparejamiento")

    let formulation = obtenerFormulationClearfix(pregunta)

    console.log(formulation)

}
