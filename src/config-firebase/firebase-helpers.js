import { ref, get } from 'firebase/database';
import { database } from './script.js';

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

