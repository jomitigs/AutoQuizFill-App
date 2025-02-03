/**
 * Inserta dinámicamente fuentes (Poppins, Font Awesome), MathJax y Polyfill.io en el <head>.
 * Evita agregar múltiples versiones de los mismos recursos.
 */

// URLs de las fuentes y scripts
const poppinsHref = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
const fontAwesomeHref = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
const mathJaxSrc = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
const polyfillSrc = 'https://polyfill.io/v3/polyfill.min.js?features=es6';

// Patrones para identificar si los recursos ya están cargados
const poppinsPattern = /fonts\.googleapis\.com\/css2\?family=Poppins/;
const fontAwesomePattern = /font-awesome/;
const mathJaxPattern = /mathjax/;
const polyfillPattern = /polyfill\.io\/v3\/polyfill\.min\.js/;

/**
 * Inserta un <link> si no existe ya en <head>.
 */
const appendLinkIfNotExists = (href, pattern, resourceName) => {
    const existingLink = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .find(link => pattern.test(link.href));

    if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
        console.log(`addHead.js: ${resourceName} inyectado en <head>`);
    } else {
        console.log(`addHead.js: ${resourceName} ya existe en <head>`);
    }
};

/**
 * Inserta un <script> si no existe ya en <head>.
 */
const appendScriptIfNotExists = (src, pattern, resourceName, callback) => {
    const existingScript = Array.from(document.querySelectorAll('script'))
        .find(script => pattern.test(script.src));

    if (!existingScript) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = callback; // Ejecuta la función cuando el script haya cargado
        document.head.appendChild(script);
        console.log(`addHead.js: ${resourceName} inyectado en <head>`);
    } else {
        console.log(`addHead.js: ${resourceName} ya existe en <head>`);
        if (callback) callback(); // Ejecutar callback si el script ya estaba cargado
    }
};

// Añadir la fuente Poppins si no está presente
appendLinkIfNotExists(poppinsHref, poppinsPattern, 'Fuente Poppins');

// Añadir Font Awesome si no está presente
appendLinkIfNotExists(fontAwesomeHref, fontAwesomePattern, 'Font Awesome');

// Añadir MathJax si no está presente
appendScriptIfNotExists(mathJaxSrc, mathJaxPattern, 'MathJax', () => {
    if (window.MathJax) {
        console.log('MathJax está listo. Forzando renderización.');
        window.MathJax.typeset();
    }
});

// Añadir Polyfill.io si no está presente
appendScriptIfNotExists(polyfillSrc, polyfillPattern, 'Polyfill.io', () => {
    console.log('Polyfill.io cargado correctamente.');
});
