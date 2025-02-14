// Importa funciones de Firebase para obtener datos y la instancia de la base de datos.
import { ref, get, set, update } from "firebase/database";

import { database } from './script.js'; // Asegúrate de que la ruta sea correcta
// Importa la función para normalizar datos (ajusta la ruta según tu estructura de carpetas)
import { normalizarHTML } from "../opc-autofill-autosave-moodle/autofill-autosave-helpers.js";
// Importa las funciones de IndexedDB
import { idbGet, idbSet, idbDelete, getTabSessionId } from './idbSession.js';

export async function getDataFromFirebase(ruta) {
  try {
    const reference = ref(database, ruta);
    const snapshot = await get(reference);

    if (snapshot.exists()) {
      console.log(`Datos encontrados en la ruta "${ruta}":`, snapshot.val());
      return snapshot.val();
    } else {
      console.warn(`No se encontró data en la ruta: ${ruta}`);
      return {};
    }
  } catch (error) {
    console.error(`Error al obtener data desde Firebase: ${error.message}`);
    throw error;
  }
}



export async function saveNewQuestionsToFirebase(ruta, datos, lastKey) {
  try {
    // 1. Obtener prefijo y parte numérica de lastKey
    const prefixMatch = lastKey.match(/^[a-zA-Z]+/);
    if (!prefixMatch) {
      throw new Error("Formato de lastKey inválido");
    }
    const prefix = prefixMatch[0];
    const numberPart = parseInt(lastKey.replace(prefix, ""), 10);
    if (isNaN(numberPart)) {
      throw new Error("La parte numérica de lastKey no es válida");
    }

    // 2. Renombrar claves y preparar datos
    const newQuestions = {};
    let currentNumber = numberPart;

    for (const key of Object.keys(datos)) {
      currentNumber++;

      const newKey = prefix + String(currentNumber).padStart(4, "0");
      const questionData = { ...datos[key] };

      // Eliminar "previous"
      delete questionData.previous;

      // =============================================
      // Determinar el estado según "respuestaCorrecta"
      // =============================================
      const rc = questionData.respuestaCorrecta; // atajo

      // si no existe o es null o undefined
      if (rc == null) {
        questionData.estado = "sin responder";
      }
      // caso 1: rc es un string
      else if (typeof rc === "string") {
        questionData.estado = rc.trim() === "" 
          ? "sin responder" 
          : "no verificado";
      }
      // caso 2: rc es un array
      else if (Array.isArray(rc)) {
        if (
          rc.length === 0 ||
          rc.every(res => typeof res === "string" && res.trim() === "")
        ) {
          questionData.estado = "sin responder";
        } else {
          questionData.estado = "no verificado";
        }
      }
      // caso 3: cualquier otra cosa no prevista
      else {
        questionData.estado = "sin responder";
      }

      newQuestions[newKey] = questionData;
    }

    // 3. Hacer el update en Firebase
    const dbRef = ref(database, ruta);
    await update(dbRef, newQuestions);
    console.log("Preguntas guardadas correctamente en Firebase");
    return newQuestions;

  } catch (error) {
    console.error("Error al guardar las preguntas en Firebase:", error);
    throw error;
  }
}



async function createDataInSessionStorageDB(customKey, data) {
  console.log("==> Creando datos en SessionStorageDB:");
  console.log("Clave utilizada:", customKey);
  console.log("Dato a insertar:", data);
  
  await idbSet(customKey, data);
  console.log("Datos almacenados correctamente en IndexedDB bajo la clave:", customKey);
}

export async function getDataFromFirebaseAsync(reset = false) {
    // Define la clave fija para almacenar la data
    const customKey = "dataFirebaseNormalizada";
  
    try {
      // Obtiene la ruta desde localStorage según una configuración
      const switchRutaDinamica = localStorage.getItem('switch-ruta-dinamica') === 'true';
      const ruta = switchRutaDinamica
        ? localStorage.getItem('configRutaDinamic')
        : localStorage.getItem('configRuta');
  
      if (!ruta) {
        console.warn("No se encontró una ruta válida.");
        return;
      }
  
      // Consulta la data almacenada en IndexedDB utilizando la clave
      const storedData = await idbGet(customKey);
      const currentTabSessionId = getTabSessionId();
    
      // Si reset es false y existe data que ya corresponde a la pestaña actual, se evita la actualización
      //if (!reset && storedData && storedData.tabSessionId === currentTabSessionId && storedData.ruta === ruta &&
          //Object.keys(storedData).length !== 2) {
        //console.log("La data ya pertenece a esta pestaña (tabSessionId igual). No se actualiza.");
        //return;
      //}
  
      // Se obtienen nuevos datos desde Firebase
      const dataFirebase = await getDataFromFirebase(ruta);
  
      if (dataFirebase) {
        // Normaliza la data y añade la ruta y el tabSessionId actual
        const normalizedData = {
          ...await normalizarHTML(dataFirebase),
          ruta,
          tabSessionId: currentTabSessionId
        };
  
        // Crea o actualiza la data en SessionStorageDB
        await createDataInSessionStorageDB(customKey, normalizedData);
      } else {
        console.warn("No se encontró data en Firebase.");
      }
    } catch (error) {
      console.error("Error en getDataFromFirebaseAsync:", error);
    }
  }
  
/**
 * Verifica si "respuestaCorrecta" tiene contenido real:
 * - Si es un string no vacío luego de trim().
 * - Si es un array con al menos un elemento no vacío.
 */
function hasRespuestaCorrecta(data) {
  const rc = data.respuestaCorrecta;

  // Si no existe o es nulo/undefined, retornamos false
  if (rc == null) return false;

  // Caso: respuestaCorrecta es string
  if (typeof rc === "string") {
    return rc.trim() !== "";
  }

  // Caso: respuestaCorrecta es array
  if (Array.isArray(rc)) {
    // Si al menos un elemento es un string no vacío, retornamos true
    return rc.some(
      (item) => typeof item === "string" && item.trim() !== ""
    );
  }

  // Cualquier otro tipo (número, objeto, etc.) se considera "no tiene valor"
  return false;
}

export async function saveExistingQuestionsToFirebase(ruta, datos) {
  try {
    console.log("Iniciando la actualización de preguntas en Firebase.");

    // 1. Leer en bloque el nodo destino en Firebase
    const destSnapshot = await get(ref(database, ruta));
    const destFull = destSnapshot.exists() ? destSnapshot.val() : {};
    console.log(`Datos actuales en Firebase en la ruta '${ruta}':`, destFull);

    // 2. Preparar objeto de actualizaciones
    const updates = {};

    // 3. Iterar sobre cada entrada en el objeto "datos"
    for (const preguntaKey in datos) {
      if (!Object.prototype.hasOwnProperty.call(datos, preguntaKey)) continue;

      const preguntaObj = datos[preguntaKey];

      // Buscar la clave tipo "questionXXXX"
      const firebaseKey = Object.keys(preguntaObj).find((key) =>
        key.startsWith("question")
      );

      if (!firebaseKey) {
        console.warn(
          `No se encontró ninguna clave tipo 'questionXXXX' en ${preguntaKey}`
        );
        continue;
      }

      console.log(`\nProcesando ${preguntaKey} con firebaseKey: ${firebaseKey}`);

      // La parte principal (question0043, etc.)
      const questionBlock = preguntaObj[firebaseKey];

      // La parte "data" (puede tener html, ciclo, enunciado, etc.)
      const dataBlock = preguntaObj.data || {};

      // Merge inicial de la data fuente
      const sourceData = {
        ...questionBlock,
        ...dataBlock,
      };

      // 3b. Leemos lo que ya existe en Firebase para esa clave
      const destData = destFull[firebaseKey] || {};
      console.log(`Datos actuales en Firebase para ${firebaseKey}:`, destData);

      // 3c. Aplicamos la lógica de actualización
      let updatedData = {};

      // CASO 1: Registro verificado
      if (destData.estado === "verificado") {
        console.log(`El registro ${firebaseKey} está verificado.`);

        // Únicamente actualizar feedback si:
        // - Viene algo nuevo en sourceData.feedback
        // - Y en destData.feedback está vacío
        if (
          sourceData.feedback &&
          sourceData.feedback.trim() !== "" &&
          (!destData.feedback || destData.feedback.trim() === "")
        ) {
          updatedData = {
            ...destData, // partimos de lo que ya existe
            feedback: sourceData.feedback,
          };
          console.log(
            `Actualizando 'feedback' para ${firebaseKey}:\n` +
              `- Nuevo feedback: "${sourceData.feedback}"\n` +
              `- Feedback anterior: "${destData.feedback || "(vacío)"}"`
          );
        } else {
          console.log(
            `No se actualiza 'feedback' para ${firebaseKey} porque no se cumplieron las condiciones.`
          );
        }

        // En caso de que esté verificado, NO cambiamos el estado ni otros campos.
      }

      // CASO 2: Registro NO verificado
      else {
        console.log(
          `El registro ${firebaseKey} NO está verificado. Se fusionarán los datos.`
        );

        // Partimos de lo que ya hay en Firebase
        updatedData = { ...destData };

        // Fusionamos / sobreescribimos con todo lo que nos trae "sourceData"
        for (const key in sourceData) {
          if (Object.prototype.hasOwnProperty.call(sourceData, key)) {
            updatedData[key] = sourceData[key];
          }
        }

        // Si "previous" existe, lo removemos
        if (updatedData.hasOwnProperty("previous")) {
          delete updatedData.previous;
          console.log(`Eliminando la clave "previous" para ${firebaseKey}.`);
        }

        // Regla especial para "feedback":
        // si el nuevo feedback está vacío, conservamos el existente
        if (
          (!sourceData.feedback || sourceData.feedback.trim() === "") &&
          destData.feedback &&
          destData.feedback.trim() !== ""
        ) {
          updatedData.feedback = destData.feedback;
          console.log(
            `Conservando el feedback existente para ${firebaseKey} porque el nuevo viene vacío.`
          );
        }

        // ================================
        // NUEVA LÓGICA: estado según "respuestaCorrecta"
        // ================================
        if (hasRespuestaCorrecta(updatedData)) {
          updatedData.estado = "no verificado";
        } else {
          updatedData.estado = "sin responder";
        }
      }

      // 3d. Verificamos si hay cambios efectivos
      if (
        Object.keys(updatedData).length > 0 &&
        JSON.stringify(updatedData) !== JSON.stringify(destData)
      ) {
        updates[firebaseKey] = updatedData;
        console.log(`Datos a actualizar para ${firebaseKey}:`, updatedData);
      } else {
        console.log(`No hay cambios para ${firebaseKey}.`);
      }
    }

    // 4. Realizamos un único update en Firebase si hay cambios
    if (Object.keys(updates).length > 0) {
      await update(ref(database, ruta), updates);
      console.log(
        "Se han actualizado las siguientes entradas en Firebase:",
        updates
      );
    } else {
      console.log("No se realizaron actualizaciones, no se cumplieron las condiciones.");
    }
  } catch (error) {
    console.error("Error al guardar las preguntas en Firebase:", error);
    throw error;
  }
}

  




  

