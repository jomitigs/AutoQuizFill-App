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
      // Se asume que lastKey tiene el formato "questionXXXX" donde XXXX es un número de 4 dígitos.
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
  
        // 2.2. Agregar la propiedad "estado" con valor "no verificado"
        questionData.estado = "no verificado";
  
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
      if (!reset &&
          storedData &&
          storedData.tabSessionId === currentTabSessionId &&
          storedData.ruta === ruta &&
          Object.keys(storedData).length !== 2) {
        console.log("La data ya pertenece a esta pestaña (tabSessionId igual). No se actualiza.");
        return;
      }
  
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
    // 1. Obtener la información de "questions-AutoSave" desde sessionStorage
    const autoSaveString = sessionStorage.getItem("questions-AutoSave");
    let autoSaveFull = {};
    if (autoSaveString) {
      try {
        autoSaveFull = JSON.parse(autoSaveString);
      } catch (err) {
        console.error("Error al parsear 'questions-AutoSave' desde sessionStorage:", err);
      }
    } else {
      console.warn("No se encontró 'questions-AutoSave' en sessionStorage.");
    }

    // 2. Leer en bloque el nodo destino en Firebase
    const destSnapshot = await get(ref(database, ruta));
    const destFull = destSnapshot.exists() ? destSnapshot.val() : {};

    // 3. Preparar el objeto de actualizaciones
    const updates = {};

    // Itera sobre cada entrada en el objeto "datos"
    for (const preguntaKey in datos) {
      if (!Object.prototype.hasOwnProperty.call(datos, preguntaKey)) continue;

      // La clave en Firebase destino para esta pregunta (ejemplo: "question0411")
      const firebaseKey = datos[preguntaKey];

      // Obtiene la información fuente de questions-AutoSave
      const sourceData = autoSaveFull[preguntaKey];
      if (!sourceData) {
        console.warn(`No se encontró información para ${preguntaKey} en questions-AutoSave.`);
        continue;
      }

      // Obtiene el dato actual en Firebase para esta clave
      const destData = destFull[firebaseKey] || {};

      let updatedData = {};

      if (destData.estado === "verificado") {
        // Si el registro está verificado: no se actualizan otros campos
        // Se actualiza únicamente el feedback si:
        //  - source tiene feedback no vacío, y
        //  - en Firebase no hay feedback (o está vacío)
        if (
          sourceData.feedback && sourceData.feedback.trim() !== "" &&
          (!destData.feedback || destData.feedback.trim() === "")
        ) {
          updatedData.feedback = sourceData.feedback;
        }
      } else {
        // Si el registro NO está verificado:
        // Comenzamos partiendo de lo que ya existe en Firebase...
        updatedData = { ...destData };

        // ...y sobrescribimos únicamente los campos que vienen en sourceData.
        for (const key in sourceData) {
          if (Object.prototype.hasOwnProperty.call(sourceData, key)) {
            updatedData[key] = sourceData[key];
          }
        }

        // Se elimina la clave "previous" (si existe) para que no se guarde en Firebase
        if (updatedData.hasOwnProperty("previous")) {
          delete updatedData.previous;
        }

        // Regla especial para "feedback":
        // Si el feedback del source está vacío y ya existe un feedback en Firebase, se conserva el existente.
        if (
          (!sourceData.feedback || sourceData.feedback.trim() === "") &&
          destData.feedback && destData.feedback.trim() !== ""
        ) {
          updatedData.feedback = destData.feedback;
        }
      }

      // Agrega la actualización si hay cambios (para evitar actualizaciones innecesarias)
      if (Object.keys(updatedData).length > 0 &&
          JSON.stringify(updatedData) !== JSON.stringify(destData)) {
        updates[firebaseKey] = updatedData;
      }
    }

    // 4. Realiza un único update en Firebase si hay cambios
    if (Object.keys(updates).length > 0) {
      await update(ref(database, ruta), updates);
      console.log("Se han actualizado las siguientes entradas:", updates);
    } else {
      console.log("No se realizaron actualizaciones, no se cumplieron las condiciones.");
    }
  } catch (error) {
    console.error("Error al guardar las preguntas en Firebase:", error);
    throw error;
  }
}



  

