// idbSession.js

// Genera o recupera un identificador único para la pestaña (se almacena en sessionStorage)
let tabSessionId = sessionStorage.getItem('tabSessionId');
if (!tabSessionId) {
  tabSessionId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  sessionStorage.setItem('tabSessionId', tabSessionId);
}

export function getTabSessionId() {
  return tabSessionId;
}

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SessionStorageDB', 1);

    request.onerror = (event) => reject(event);

    request.onsuccess = (event) => resolve(event.target.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('store')) {
        db.createObjectStore('store');
      }
    };
  });
}

export async function idbGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('store', 'readonly');
    const store = tx.objectStore('store');
    const request = store.get(key);

    request.onerror = (event) => reject(event);
    request.onsuccess = (event) => resolve(event.target.result);
  });
}

export async function idbSet(key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('store', 'readwrite');
    const store = tx.objectStore('store');
    const request = store.put(value, key);

    request.onerror = (event) => reject(event);
    request.onsuccess = (event) => resolve(event.target.result);
  });
}

export async function idbDelete(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    console.log(`Intentando eliminar la llave: ${key}`);
    const tx = db.transaction('store', 'readwrite');
    const store = tx.objectStore('store');
    const request = store.delete(key);

    request.onerror = (event) => {
      console.error(`Error al eliminar la llave ${key}:`, event);
      reject(event);
    };

    request.onsuccess = (event) => {
      console.log(`Eliminación de la llave ${key} completada. Resultado:`, event.target.result);

      // Verificamos que la clave ya no exista
      const verifyTx = db.transaction('store', 'readonly');
      const verifyStore = verifyTx.objectStore('store');
      const getRequest = verifyStore.get(key);

      getRequest.onsuccess = () => {
        if (getRequest.result === undefined) {
          console.log(`La llave ${key} ha sido eliminada correctamente.`);
        } else {
          console.warn(`La llave ${key} aún existe:`, getRequest.result);
        }
      };

      getRequest.onerror = (err) => {
        console.error(`Error al verificar la eliminación de la llave ${key}:`, err);
      };

      resolve(event.target.result);
    };
  });
}
