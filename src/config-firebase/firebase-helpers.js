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
    // 1. Extraer el prefijo y la parte numérica de lastKey.
    const prefixMatch = lastKey.match(/^[a-zA-Z]+/);
    if (!prefixMatch) {
      throw new Error("Formato de lastKey inválido");
    }
    const prefix = prefixMatch[0];
    const numberPart = parseInt(lastKey.replace(prefix, ""), 10);
    if (isNaN(numberPart)) {
      throw new Error("La parte numérica de lastKey no es válida");
    }

    // 2. Renombrar claves y preparar datos para la actualización.
    const newQuestions = {};
    let currentNumber = numberPart;

    for (const key of Object.keys(datos)) {
      currentNumber++; // Incrementamos para la nueva pregunta

      // Clave con 4 dígitos (ej. question0005)
      const newKey = prefix + String(currentNumber).padStart(4, "0");

      // Copiamos los datos para no mutar el objeto original
      const questionData = { ...datos[key] };

      // 2.1. Eliminar la propiedad "previous" si existe
      delete questionData.previous;

      // 2.2. Comprobar la propiedad "respuestaCorrecta" para determinar el estado
      if (
        !Array.isArray(questionData.respuestaCorrecta) ||                       // No es un array
        questionData.respuestaCorrecta.length === 0 ||                          // Array vacío
        questionData.respuestaCorrecta.every(
          (respuesta) => typeof respuesta === "string" && respuesta.trim() === ""
        ) // Todos los elementos son strings vacíos
      ) {
        questionData.estado = "sin responder";
      } else {
        questionData.estado = "no verificado";
      }

      // Guardamos en el objeto final con la nueva clave
      newQuestions[newKey] = questionData;
    }

    // 3. Usar `update` en lugar de `set` para agregar/mezclar sin reemplazar toda la rama.
    const dbRef = ref(database, ruta);
    await update(dbRef, newQuestions);

    console.log("Preguntas guardadas correctamente en Firebase");
    return newQuestions; // Opcional, por si quieres usar el resultado en otro lugar.
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

        const firebaseKey = Object.keys(preguntaObj).find((key) =>
          key.startsWith("question")
        );
  
        if (!firebaseKey) {
          console.warn(`No se encontró ninguna clave tipo 'questionXXXX' en ${preguntaKey}`);
          continue;
        }
  
        console.log(`\nProcesando ${preguntaKey} con firebaseKey: ${firebaseKey}`);
  
        // La parte principal (por ejemplo, question0043) que ya tiene enunciado, estado, feedback, etc.
        const questionBlock = preguntaObj[firebaseKey];
  
        // La parte "data", que puede tener html, ciclo, enunciado, etc.
        const dataBlock = preguntaObj.data || {};
  
        const sourceData = {
          ...questionBlock,
          ...dataBlock,
        };
  
        // 3b. Leemos lo que ya existe en Firebase para esa clave
        const destData = destFull[firebaseKey] || {};
        console.log(`Datos actuales en Firebase para ${firebaseKey}:`, destData);
  
        // 3c. Aplicamos la lógica de actualización
        let updatedData = {};
  
        if (destData.estado === "verificado") {
          // Caso 1: Registro verificado
          console.log(`El registro ${firebaseKey} está verificado.`);
          // Únicamente actualizar el feedback si en sourceData viene algo y en destData está vacío
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
            // No hay cambios (o no se cumplen las condiciones para actualizar feedback)
            console.log(
              `No se actualiza 'feedback' para ${firebaseKey} porque no se cumplieron las condiciones.`
            );
          }
        } else {
          // Caso 2: Registro NO verificado
          console.log(`El registro ${firebaseKey} NO está verificado. Se fusionarán los datos.`);
  
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
        console.log("Se han actualizado las siguientes entradas en Firebase:", updates);
      } else {
        console.log("No se realizaron actualizaciones, no se cumplieron las condiciones.");
      }
    } catch (error) {
      console.error("Error al guardar las preguntas en Firebase:", error);
      throw error;
    }
  }
  




  

