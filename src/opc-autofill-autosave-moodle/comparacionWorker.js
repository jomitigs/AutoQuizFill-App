// comparacionWorker.js
// ===============================================
// Importar workerpool y fast-levenshtein optimizado.
// ===============================================
const workerpool = require('workerpool');
const levenshtein = require('fast-levenshtein');

/**
 * Función que calcula el porcentaje de similitud entre dos textos
 * utilizando fast-levenshtein.
 * 
 * @param {string} texto1 Primer texto.
 * @param {string} texto2 Segundo texto.
 * @returns {number} Porcentaje de similitud (0 a 100).
 */
function calcularSimilitudTexto(texto1, texto2) {
  // Si los textos son idénticos, se retorna 100 sin cálculos adicionales.
  if (texto1 === texto2) return 100;
  if (texto1.length === 0 && texto2.length === 0) return 100;
  
  // Calcular la distancia de Levenshtein usando fast-levenshtein.
  const distancia = levenshtein.get(texto1, texto2);
  const longitudMaxima = Math.max(texto1.length, texto2.length);
  const similitud = ((longitudMaxima - distancia) / longitudMaxima) * 100;
  return similitud;
}

// Exponer la función para que pueda ser llamada desde el pool.
workerpool.worker({
  calcularSimilitudTexto: calcularSimilitudTexto
});
