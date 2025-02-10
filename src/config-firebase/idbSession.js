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
    const tx = db.transaction('store', 'readwrite');
    const store = tx.objectStore('store');
    const request = store.delete(key);

    request.onerror = (event) => reject(event);
    request.onsuccess = (event) => resolve(event.target.result);
  });
}
