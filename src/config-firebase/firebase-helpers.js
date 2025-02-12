// Importa funciones de Firebase para obtener datos y la instancia de la base de datos.
import { ref, get, set, update } from "firebase/database";

import { database } from './script.js'; // Asegúrate de que la ruta sea correcta
// Importa la función para normalizar datos (ajusta la ruta según tu estructura de carpetas)
import { normalizarHTML } from "../opc-autofill-autosave-moodle/autofill-autosave-helpers.js";
// Importa las funciones de IndexedDB
import { idbGet, idbSet, idbDelete, getTabSessionId } from './idbSession.js';

export async function getDataFromFirebase(ruta) {
  try {
    const reference = ref(database, ruta);
    const snapshot = await get(reference);

    if (snapshot.exists()) {
      console.log(`Datos encontrados en la ruta "${ruta}":`, snapshot.val());
      return snapshot.val();
    } else {
      console.warn(`No se encontró data en la ruta: ${ruta}`);
      return {};
    }
  } catch (error) {
    console.error(`Error al obtener data desde Firebase: ${error.message}`);
    throw error;
  }
}



export async function saveNewQuestionsToFirebase(ruta, datos, lastKey) {
    try {
      // 1. Extraer el prefijo y la parte numérica de lastKey.
      // Se asume que lastKey tiene el formato "questionXXXX" donde XXXX es un número de 4 dígitos.
      const prefixMatch = lastKey.match(/^[a-zA-Z]+/);
      if (!prefixMatch) {
        throw new Error("Formato de lastKey inválido");
      }
      const prefix = prefixMatch[0];
      const numberPart = parseInt(lastKey.replace(prefix, ""), 10);
      if (isNaN(numberPart)) {
        throw new Error("La parte numérica de lastKey no es válida");
      }
  
      // 2. Renombrar claves y preparar datos para la actualización.
      const newQuestions = {};
      let currentNumber = numberPart;
  
      for (const key of Object.keys(datos)) {
        currentNumber++; // Incrementamos para la nueva pregunta
  
        // Clave con 4 dígitos (ej. question0005)
        const newKey = prefix + String(currentNumber).padStart(4, "0");
  
        // Copiamos los datos para no mutar el objeto original
        const questionData = { ...datos[key] };
  
        // 2.1. Eliminar la propiedad "previous" si existe
        delete questionData.previous;
  
        // 2.2. Agregar la propiedad "estado" con valor "no verificado"
        questionData.estado = "no verificado";
  
        // Guardamos en el objeto final con la nueva clave
        newQuestions[newKey] = questionData;
      }
  
      // 3. Usar `update` en lugar de `set` para agregar/mezclar sin reemplazar toda la rama.
      const dbRef = ref(database, ruta);
      await update(dbRef, newQuestions);
  
      console.log("Preguntas guardadas correctamente en Firebase");
      return newQuestions; // Opcional, por si quieres usar el resultado en otro lugar.
    } catch (error) {
      console.error("Error al guardar las preguntas en Firebase:", error);
      throw error;
    }
  }

async function createDataInSessionStorageDB(customKey, data) {
  console.log("==> Creando datos en SessionStorageDB:");
  console.log("Clave utilizada:", customKey);
  console.log("Dato a insertar:", data);
  
  await idbSet(customKey, data);
  console.log("Datos almacenados correctamente en IndexedDB bajo la clave:", customKey);
}

export async function getDataFromFirebaseAsync(reset = false) {
    // Define la clave fija para almacenar la data
    const customKey = "dataFirebaseNormalizada";
  
    try {
      // Obtiene la ruta desde localStorage según una configuración
      const switchRutaDinamica = localStorage.getItem('switch-ruta-dinamica') === 'true';
      const ruta = switchRutaDinamica
        ? localStorage.getItem('configRutaDinamic')
        : localStorage.getItem('configRuta');
  
      if (!ruta) {
        console.warn("No se encontró una ruta válida.");
        return;
      }
  
      // Consulta la data almacenada en IndexedDB utilizando la clave
      const storedData = await idbGet(customKey);
      const currentTabSessionId = getTabSessionId();
    
      // Si reset es false y existe data que ya corresponde a la pestaña actual, se evita la actualización
      if (!reset &&
          storedData &&
          storedData.tabSessionId === currentTabSessionId &&
          storedData.ruta === ruta &&
          Object.keys(storedData).length !== 2) {
        console.log("La data ya pertenece a esta pestaña (tabSessionId igual). No se actualiza.");
        return;
      }
  
      // Se obtienen nuevos datos desde Firebase
      const dataFirebase = await getDataFromFirebase(ruta);
  
      if (dataFirebase) {
        // Normaliza la data y añade la ruta y el tabSessionId actual
        const normalizedData = {
          ...await normalizarHTML(dataFirebase),
          ruta,
          tabSessionId: currentTabSessionId
        };
  
        // Crea o actualiza la data en SessionStorageDB
        await createDataInSessionStorageDB(customKey, normalizedData);
      } else {
        console.warn("No se encontró data en Firebase.");
      }
    } catch (error) {
      console.error("Error en getDataFromFirebaseAsync:", error);
    }
  }
  
  export async function saveExistingQuestionsToFirebase(ruta, datos) {
    try {
      // Itera sobre cada entrada en el objeto 'datos'
      for (const preguntaKey in datos) {
        if (datos.hasOwnProperty(preguntaKey)) {
          // Se obtiene la clave en Firebase (por ejemplo, "question0411")
          const firebaseKey = datos[preguntaKey];
  
          // 1. Obtiene el dato fuente (source) desde "questions-AutoSave/<PreguntaX>"
          const autoSaveRef = ref(database, `questions-AutoSave/${preguntaKey}`);
          const autoSaveSnapshot = await get(autoSaveRef);
          if (!autoSaveSnapshot.exists()) {
            console.warn(`No se encontró información para ${preguntaKey} en questions-AutoSave.`);
            continue; // Si no existe la información fuente, se pasa a la siguiente pregunta.
          }
          const sourceData = autoSaveSnapshot.val();
  
          // 2. Obtiene el dato destino desde "<ruta>/<firebaseKey>"
          const destRef = ref(database, `${ruta}/${firebaseKey}`);
          const destSnapshot = await get(destRef);
          let destData = {};
          if (destSnapshot.exists()) {
            destData = destSnapshot.val();
          } else {
            console.warn(`No se encontró información para ${firebaseKey} en la ruta ${ruta}. Se procederá a crearla.`);
          }
  
          // Variable para armar los datos que se van a actualizar
          let updatedData = {};
  
          // 3. Aplicar reglas según el estado actual en el destino
          if (destData && destData.estado === "verificado") {
            // REGLA PARA REGISTROS VERIFICADOS:
            // Si el estado es "verificado", NO se actualizan otros campos, excepto el feedback.
            // Se actualiza el feedback solo si el source tiene un valor no vacío y el destino no tiene feedback.
            if (sourceData.feedback && sourceData.feedback.trim() !== "") {
              if (!destData.feedback || destData.feedback.trim() === "") {
                updatedData.feedback = sourceData.feedback;
              }
            }
            // Ningún otro campo se actualiza
          } else {
            // REGLA PARA REGISTROS NO VERIFICADOS:
            // Se actualizan todos los campos usando los datos del source...
            updatedData = { ...sourceData };
  
            // ...con la regla especial para "feedback":
            // Si el feedback del source está vacío y el destino ya tiene un valor (no vacío),
            // se conserva el feedback del destino.
            if (
              (!sourceData.feedback || sourceData.feedback.trim() === "") &&
              destData.feedback &&
              destData.feedback.trim() !== ""
            ) {
              updatedData.feedback = destData.feedback;
            }
          }
  
          // Solo se ejecuta la actualización si hay algún campo que modificar
          if (Object.keys(updatedData).length > 0) {
            await update(destRef, updatedData);
            console.log(`Se ha actualizado ${firebaseKey} con la información de ${preguntaKey}.`);
          } else {
            console.log(`No se realizaron actualizaciones para ${firebaseKey} (no se cumplían las condiciones).`);
          }
        }
      }
      console.log("Proceso de actualización completado.");
    } catch (error) {
      console.error("Error al actualizar las preguntas en Firebase:", error);
      throw error;
    }
  }
  

