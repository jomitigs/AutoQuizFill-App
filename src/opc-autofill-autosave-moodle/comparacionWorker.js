import * as workerpool from 'workerpool';

import levenshtein from 'fast-levenshtein';

// Definir la función usando fast-levenshtein
function calcularSimilitudTexto(texto1, texto2) {
  if (texto1 === texto2) return 100;
  if (texto1.length === 0 && texto2.length === 0) return 100;
  const distancia = levenshtein.get(texto1, texto2);
  const longitudMaxima = Math.max(texto1.length, texto2.length);
  return ((longitudMaxima - distancia) / longitudMaxima) * 100;
}

// Exponer la función a través de workerpool
workerpool.worker({
  calcularSimilitudTexto
});
