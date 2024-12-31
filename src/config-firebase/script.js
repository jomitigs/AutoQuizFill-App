// src/config-firebase/script.js

// Importa Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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

// Inicializa Firebase si no ha sido inicializado previamente
if (!firebase.apps.length) {
    firebase.initializeApp(configuracionFirebaseAutoQuiz);
} else {
    firebase.app(); // Usa la instancia ya inicializada
}

// Inicializa servicios de Firebase
const autenticacion = firebase.auth();
const database = firebase.database();

// Exponer las variables en el objeto global `window`
window.autenticacion = autenticacion;
window.database = database;
