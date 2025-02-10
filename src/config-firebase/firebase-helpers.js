import { ref, get } from 'firebase/database';
import { database } from './script.js';
import { normalizarHTML } from "../opc-autofill-autosave-moodle/autofill-autosave-helpers.js";

export async function getDataFromFirebase(path) {
    try {
        const reference = ref(database, path);
        const snapshot = await get(reference);
        
        if (snapshot.exists()) {
            return snapshot.val(); // Returns data in JSON format
        } else {
            console.warn(`No data found at path: ${path}`);
            return null;
        }
    } catch (error) {
        console.error(`Error getting data from Firebase: ${error.message}`);
        throw error;
    }
}

export async function getDataFromFirebaseAsync() {
    try {
      const switchRutaDinamica = localStorage.getItem('switch-ruta-dinamica') === 'true';
  
      // Determinar la ruta de referencia usando localStorage para la configuración.
      const ruta = switchRutaDinamica
        ? localStorage.getItem('configRutaDinamic')
        : localStorage.getItem('configRuta');
  
      if (!ruta) {
        console.warn('No se encontró una ruta válida.');
        return;
      }
  
      // Genera la clave "namespaced" para esta pestaña
      const dataKey = getNamespacedKey('dataFirebaseNormalizada');
  
      // Verifica si ya existe la data en IndexedDB y si la ruta coincide
      const storedData = await idbGet(dataKey);
      if (storedData && storedData.ruta === ruta) {
        console.log('Los datos ya están almacenados y la ruta no ha cambiado. No se vuelve a ejecutar.');
        return;
      }
  
      // Obtén la data desde Firebase
      const dataFirebase = await getDataFromFirebase(ruta);
  
      if (dataFirebase) {
        // Normaliza la data y agrega la ruta utilizada
        const dataFirebaseNormalizada = {
          ...await normalizarHTML(dataFirebase),
          ruta
        };
  
        // Guarda la data en IndexedDB para esta pestaña
        await idbSet(dataKey, dataFirebaseNormalizada);
        console.log('Datos guardados en IndexedDB para la pestaña:', dataFirebaseNormalizada);
      } else {
        console.warn('No se encontró data en Firebase.');
      }
    } catch (error) {
      console.error(`Error en getDataFromFirebaseAsync: ${error.message}`);
    }
  }
  
  // Al cerrar la pestaña se limpia el dato correspondiente a esta sesión
  window.addEventListener('beforeunload', async () => {
    try {
      const dataKey = getNamespacedKey('dataFirebaseNormalizada');
      await idbDelete(dataKey);
      console.log('Datos de la pestaña limpiados en IndexedDB');
    } catch (error) {
      console.error("Error al limpiar los datos de la pestaña en IndexedDB:", error);
    }
  });
  

  
  
