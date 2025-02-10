// worker.js

// Importar la función "distance" del paquete fastest-levenshtein.
// Este paquete provee una implementación optimizada en comparación con una función escrita a mano.
import { distance } from 'fastest-levenshtein';

// Escuchar mensajes enviados desde el hilo principal.
self.onmessage = (e) => {
  // Extraer las cadenas recibidas en el mensaje.
  const { cadena1, cadena2 } = e.data;

  // Calcular la distancia de Levenshtein entre ambas cadenas utilizando la función importada.
  const distancia = distance(cadena1, cadena2);

  // Enviar el resultado (la distancia) de vuelta al hilo principal.
  self.postMessage({ distancia });
};
