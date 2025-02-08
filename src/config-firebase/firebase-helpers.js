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

        // Determinar la ruta de referencia
        const ruta = switchRutaDinamica
            ? sessionStorage.getItem('configRutaDinamic')
            : localStorage.getItem('configRuta');

        if (!ruta) {
            console.warn('No se encontró una ruta válida.');
            return;
        }

        // Verificamos si ya existe la clave y si la ruta es la misma
        const storedData = sessionStorage.getItem('dataFirebaseNormalizada');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData.ruta === ruta) {
                console.log('Los datos ya están almacenados y la ruta no ha cambiado. No se vuelve a ejecutar.');
                return;
            }
        }

        // Obtenemos la data desde Firebase
        const dataFirebase = await getDataFromFirebase(ruta);

        if (dataFirebase) {
            // Normalizamos la data y agregamos la ruta utilizada
            const dataFirebaseNormalizada = {
                ...await normalizarHTML(dataFirebase),
                ruta
            };

            // Guardamos la data en sessionStorage
            sessionStorage.setItem('dataFirebaseNormalizada', JSON.stringify(dataFirebaseNormalizada));
        } else {
            console.warn('No se encontró data en Firebase.');
        }
    } catch (error) {
        console.error(`Error en getDataFromFirebaseAsync: ${error.message}`);
    }
}


  
  
