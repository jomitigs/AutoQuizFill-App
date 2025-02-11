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
  try {
    // Abrir la base de datos usando tu función openDB
    const db = await openDB();
    console.log(`Intentando eliminar la llave "${key}"...`);

    return new Promise((resolve, reject) => {
      // Iniciar una transacción de lectura-escritura en el object store "store"
      const tx = db.transaction('store', 'readwrite');
      const store = tx.objectStore('store');
      const deleteRequest = store.delete(key);

      // Manejo de error al eliminar
      deleteRequest.onerror = (event) => {
        console.error(`Error al eliminar la llave "${key}":`, event);
        reject(event);
      };

      // Éxito en la eliminación
      deleteRequest.onsuccess = (event) => {
        console.log(`La llave "${key}" ha sido eliminada. Verificando...`);

        // Transacción para verificar que la llave ya no exista
        const verifyTx = db.transaction('store', 'readonly');
        const verifyStore = verifyTx.objectStore('store');
        const getRequest = verifyStore.get(key);

        getRequest.onsuccess = (e) => {
          if (e.target.result === undefined) {
            console.log(`Confirmación: la llave "${key}" ya no existe en la base de datos.`);
          } else {
            console.warn(`Advertencia: la llave "${key}" todavía existe con el valor:`, e.target.result);
          }
          resolve();
        };

        getRequest.onerror = (e) => {
          console.error(`Error al verificar la eliminación de la llave "${key}":`, e);
          reject(e);
        };
      };
    });
  } catch (err) {
    console.error(`Error al abrir la base de datos:`, err);
    throw err;
  }
}
