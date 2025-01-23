// src/config-firebase/script.js

// Importa solo las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// =====================
// Configuración de Firebase
// =====================
const configuracionFirebaseAutoQuiz = {
  apiKey: "AIzaSyANIA0nk7P3RTo33P86jmW3GM6jMxxdoAs",
  authDomain: "moodlequizdatascraping.firebaseapp.com",
  databaseURL: "https://moodlequizdatascraping-default-rtdb.firebaseio.com",
  projectId: "moodlequizdatascraping",
  storageBucket: "moodlequizdatascraping.appspot.com",
  messagingSenderId: "782692660220",
  appId: "1:782692660220:web:8258d30da03e338f4c3879"
};

// Muestra la configuración en la consola para depuración
console.log("Configuración de Firebase:", configuracionFirebaseAutoQuiz);

// Inicializa Firebase
const app = initializeApp(configuracionFirebaseAutoQuiz);
console.log("Firebase App inicializada:", app);

// Inicializa servicios de Firebase
const autenticacion = getAuth(app);
console.log("Servicio de autenticación (Auth) inicializado:", autenticacion);

const database = getDatabase(app);
console.log("Servicio de base de datos (Database) inicializado:", database);

// Exponer las variables en el objeto global `window`
window.autenticacion = autenticacion;
window.database = database;

export { autenticacion, database };
