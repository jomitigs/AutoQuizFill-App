// main.js

// Importa funciones de Firebase para obtener datos y la instancia de la base de datos.
import { ref, get } from 'firebase/database';
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
      return snapshot.val(); // Retorna los datos en formato JSON
    } else {
      console.warn(`No se encontró data en la ruta: ${ruta}`);
      return null;
    }
  } catch (error) {
    console.error(`Error al obtener data desde Firebase: ${error.message}`);
    throw error;
  }
}

export async function saveDataToFirebase(ruta, datos) {
    console.log(`Guardando datos en la ruta: ${ruta}`);
  
    // Inicializar la base de datos y la referencia a la ruta especificada
    const db = getDatabase();
    const refDB = ref(db, ruta);
  
    try {
      // Verificar si 'datos' es un array o un único objeto
      if (Array.isArray(datos)) {
        for (const dato of datos) {
          // Agregar la clave 'estado'
          const datoConEstado = { ...dato, estado: 'no verificado' };
          // Crear una nueva entrada con una clave única
          const newRef = push(refDB);
          await set(newRef, datoConEstado);
          console.log("Guardado:", datoConEstado);
        }
      } else {
        const datoConEstado = { ...datos, estado: 'no verificado' };
        const newRef = push(refDB);
        await set(newRef, datoConEstado);
        console.log("Guardado:", datoConEstado);
      }
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
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
