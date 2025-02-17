import { File2DataUri } from '../../autofill-autosave-helpers.js';

export async function otroscasos(originalFormulationClearfix) {
    const tipo = 'otroscasos';

    // 1) Clonamos el elemento original para trabajar sobre la copia.
    const clonFormulation = originalFormulationClearfix.cloneNode(true);

    // 2) Convertimos a Data URI todas las imágenes del clon.
    await File2DataUri(clonFormulation);

    // 6) Construimos el objeto final questionData
    const questionData = {
        enunciado: "PREGUNTA NO SOPORTADA",       // Texto con [ ] donde estaban los inputs
        html: clonFormulation.outerHTML,   // HTML completo del clon (imágenes en Data URI)
        tipo: tipo,
        ciclo: localStorage.getItem("ciclo"),
    };

    return questionData;
}
