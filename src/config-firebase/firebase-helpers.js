import { ref, get } from 'firebase/database';
import { database } from './script.js';
import { normalizarHTML } from "../opc-autofill-autosave-moodle/autofill-autosave-helpers.js";
import { idbGet, idbSet, idbDelete, getNamespacedKey } from './idbSession.js';


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

async function createDataInSessionStorageDB(customKey, data) {
    // Genera la clave "namespaced" utilizando el ID único de la pestaña
    const dataKey = getNamespacedKey(customKey);
    console.log("==> Creando datos en SessionStorageDB:");
    console.log("Clave utilizada:", dataKey);
    console.log("Dato a insertar:", data);

    await idbSet(dataKey, data);
    console.log("Datos almacenados correctamente en IndexedDB bajo la clave:", dataKey);
}

export async function getDataFromFirebaseAsync() {

    const customKey = "dataFirebaseNormalizada"

    try {
        // Ejemplo de condición: usar una ruta configurada en localStorage
        const switchRutaDinamica = localStorage.getItem('switch-ruta-dinamica') === 'true';
        const ruta = switchRutaDinamica
            ? localStorage.getItem('configRutaDinamic')
            : localStorage.getItem('configRuta');

        if (!ruta) {
            console.warn("No se encontró una ruta válida.");
            return;
        }

        // Genera la clave "namespaced" para consultar si ya existe la data
        const dataKey = getNamespacedKey(customKey);
        const storedData = await idbGet(dataKey);

        // Condición: Si ya existe data y la ruta coincide, no se crea nada nuevo
        if (storedData && storedData.ruta === ruta) {
            console.log("Ya existe data para esta ruta con la clave indicada. No se crea nueva entrada.");
            return;
        }

        // Obtiene la data simulada desde Firebase
        const dataFirebase = await getDataFromFirebase(ruta);
        if (dataFirebase) {
            // Normaliza la data y añade la ruta utilizada
            const normalizedData = {
                ...await normalizarHTML(dataFirebase),
                ruta: ruta
            };

            // Llama a la función que crea los datos en SessionStorageDB
            await createDataInSessionStorageDB(customKey, normalizedData);
        } else {
            console.warn("No se encontró data en Firebase.");
        }
    } catch (error) {
        console.error("Error en getDataFromFirebaseAsync:", error);
    }
}


function deleteSessionStorageDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase("SessionStorageDB");

        request.onsuccess = function () {
            console.log("SessionStorageDB eliminada con éxito.");
            resolve();
        };

        request.onerror = function (event) {
            console.error("Error al eliminar SessionStorageDB:", event);
            reject(event);
        };

        request.onblocked = function () {
            console.warn("La eliminación de SessionStorageDB fue bloqueada.");
        };
    });
}

window.addEventListener('beforeunload', async () => {
    try {
        await deleteSessionStorageDB();
    } catch (error) {
        console.error("Error al eliminar la base de datos SessionStorageDB:", error);
    }
});





