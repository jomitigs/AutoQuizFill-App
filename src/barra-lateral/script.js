// Una vez AutoSave_ShowResponses haya finalizado, renderiza las fórmulas
const contenedor = document.getElementById('contenido-principal');
if (!contenedor) {
  console.warn("DEBUG: No se encontró el contenedor con id 'contenido-principal'.");
} else {
  console.log("DEBUG: Se encontró 'contenido-principal'.");
}

if (typeof renderMathInElement !== 'function') {
  console.warn("DEBUG: renderMathInElement NO está disponible. Asegúrate de que KaTeX y su auto-render se han cargado.");
} else {
  console.log("DEBUG: renderMathInElement está disponible.");
}

if (contenedor && typeof renderMathInElement === 'function') {
  try {
    renderMathInElement(contenedor, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\(', right: '\\)', display: false }
      ]
    });
    console.log("KaTeX: Expresiones renderizadas en 'contenido-principal'.");
  } catch (error) {
    console.error("DEBUG: Error al llamar a renderMathInElement:", error);
  }
} else {
  console.warn("DEBUG: No se pudo ejecutar renderMathInElement porque faltan algunos elementos.");
}
