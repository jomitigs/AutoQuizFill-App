// idbSession.js

// Genera o recupera un identificador único para la pestaña
let tabSessionId = sessionStorage.getItem('tabSessionId');
if (!tabSessionId) {
  tabSessionId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  sessionStorage.setItem('tabSessionId', tabSessionId);
}

/**
 * Retorna el identificador único de la pestaña.
 */
export function getTabSessionId() {
  return tabSessionId;
}

/**
 * Devuelve una clave “namespaced” usando el id de la pestaña.
 * @param {string} key - La clave lógica.
 */
export function getNamespacedKey(key) {
  return `${tabSessionId}_${key}`;
}

/**
 * Abre (o crea) la base de datos "SessionStorageDB" con un almacén llamado "store".
 */
export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SessionStorageDB', 1);

    request.onerror = event => reject(event);

    request.onsuccess = event => resolve(event.target.result);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('store')) {
        db.createObjectStore('store');
      }
    };
  });
}

/**
 * Obtiene un ítem de la base de datos por la clave dada.
 * @param {string} key - La clave para recuperar el dato.
 */
export async function idbGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('store', 'readonly');
    const store = tx.objectStore('store');
    const request = store.get(key);

    request.onerror = event => reject(event);
    request.onsuccess = event => resolve(event.target.result);
  });
}

/**
 * Guarda un ítem en la base de datos con la clave dada.
 * @param {string} key - La clave en la que se almacenará el dato.
 * @param {*} value - El valor a almacenar.
 */
export async function idbSet(key, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('store', 'readwrite');
    const store = tx.objectStore('store');
    const request = store.put(value, key);

    request.onerror = event => reject(event);
    request.onsuccess = event => resolve(event.target.result);
  });
}

/**
 * Elimina un ítem específico de la base de datos por la clave.
 * @param {string} key - La clave del dato a eliminar.
 */
export async function idbDelete(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('store', 'readwrite');
    const store = tx.objectStore('store');
    const request = store.delete(key);

    request.onerror = event => reject(event);
    request.onsuccess = event => resolve(event.target.result);
  });
}
