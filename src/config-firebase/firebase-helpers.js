// main.js

// Importa funciones de Firebase para obtener datos y la instancia de la base de datos.
import { ref, get } from 'firebase/database';
import { database } from './script.js'; // Asegúrate de que la ruta sea correcta
// Importa la función para normalizar datos (ajusta la ruta según tu estructura de carpetas)
import { normalizarHTML } from "../opc-autofill-autosave-moodle/autofill-autosave-helpers.js";
// Importa las funciones de IndexedDB
import { idbGet, idbSet, idbDelete, getTabSessionId } from './idbSession.js';

/**
 * Obtiene datos desde Firebase a partir de una ruta.
 * @param {string} path - La ruta en la base de datos de Firebase.
 * @returns {object|null} Los datos obtenidos o null si no existen.
 */
export async function getDataFromFirebase(path) {
  try {
    const reference = ref(database, path);
    const snapshot = await get(reference);

    if (snapshot.exists()) {
      return snapshot.val(); // Retorna los datos en formato JSON
    } else {
      console.warn(`No se encontró data en la ruta: ${path}`);
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener data desde Firebase: ${error.message}`);
    throw error;
  }
}

/**
 * Función para crear o actualizar datos en SessionStorageDB (IndexedDB).
 * Muestra en la consola la clave y el dato que se va a insertar, y luego lo almacena.
 * @param {string} customKey - La clave que se usará para almacenar los datos.
 * @param {*} data - Los datos a almacenar.
 */
async function createDataInSessionStorageDB(customKey, data) {
  console.log("==> Creando datos en SessionStorageDB:");
  console.log("Clave utilizada:", customKey);
  console.log("Dato a insertar:", data);
  
  await idbSet(customKey, data);
  console.log("Datos almacenados correctamente en IndexedDB bajo la clave:", customKey);
}

/**
 * Función principal que obtiene datos desde Firebase y los almacena en IndexedDB.
 * La actualización se realiza solo si no existe data o si el tabSessionId del dato almacenado
 * es diferente al de la pestaña actual.
 */
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
    if (storedData && storedData.tabSessionId === currentTabSessionId) {
      console.log("La data ya pertenece a esta pestaña (tabSessionId igual). No se actualiza.");
      return;
    } else {
        console.log("Actualizando data indexada.");
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
