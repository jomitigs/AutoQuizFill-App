// main.js

// Importa funciones de Firebase para obtener datos y la instancia de la base de datos.
import { ref, get, push, set } from "firebase/database";

import { database } from './script.js'; // Asegúrate de que la ruta sea correcta
// Importa la función para normalizar datos (ajusta la ruta según tu estructura de carpetas)
import { normalizarHTML } from "../opc-autofill-autosave-moodle/autofill-autosave-helpers.js";
// Importa las funciones de IndexedDB
import { idbGet, idbSet, idbDelete, getTabSessionId } from './idbSession.js';


export async function saveQuestionsToFirebase(ruta, datos, lastKey) {
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

    // 2. Renombrar las claves principales de "datos" secuencialmente.
    const newQuestions = {};
    let currentNumber = numberPart;
    for (const key of Object.keys(datos)) {
      currentNumber++; // Incrementamos para la nueva pregunta
      // Creamos la nueva clave con el número formateado a 4 dígitos
      const newKey = prefix + String(currentNumber).padStart(4, "0");
      newQuestions[newKey] = datos[key];
    }

    // 3. Guardar el objeto en Firebase en la ruta indicada.
    const dbRef = ref(database, ruta);
    await set(dbRef, newQuestions);

    console.log("Preguntas guardadas correctamente en Firebase");
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

export async function getDataFromFirebaseAsync() {
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
  
    // Si existe data y el tabSessionId es igual al actual, no se actualiza
    if (storedData && storedData.tabSessionId === currentTabSessionId && storedData.ruta === ruta) {
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
