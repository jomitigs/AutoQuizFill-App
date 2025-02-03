/**
 * Inserta dinámicamente las fuentes Poppins y Font Awesome, y también KaTeX (CSS y JS) en el <head>.
 * Evita agregar múltiples versiones de los mismos recursos.
 * Puedes importar y llamar a esta función en tu código para cargar los recursos necesarios.
 */

// URLs de las fuentes
const poppinsHref = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
const fontAwesomeHref = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';

// URL y patrones para KaTeX
const katexCssHref = 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css';
const katexJsSrc = 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js';
const katexAutoRenderSrc = 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/contrib/auto-render.min.js';

// Patrones para identificar si los recursos ya están cargados
const poppinsPattern = /fonts\.googleapis\.com\/css2\?family=Poppins/;
const fontAwesomePattern = /font-awesome/;
const katexCssPattern = /katex\.min\.css/;
const katexJsPattern = /katex\.min\.js/;
const katexAutoRenderPattern = /auto-render\.min\.js/;

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
        // console.log(`addHead.js: ${resourceName} inyectado en <head>`);
    } else {
        // console.log(`addHead.js: ${resourceName} ya existe en <head>`);
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
        script.onload = callback;
        document.head.appendChild(script);
        // console.log(`addHead.js: ${resourceName} inyectado en <head>`);
    } else {
        // console.log(`addHead.js: ${resourceName} ya existe en <head>`);
        if (callback) callback();
    }
};

// Agregar las hojas de estilo de las fuentes
appendLinkIfNotExists(poppinsHref, poppinsPattern, 'Fuente Poppins');
appendLinkIfNotExists(fontAwesomeHref, fontAwesomePattern, 'Font Awesome');

// Agregar KaTeX CSS
appendLinkIfNotExists(katexCssHref, katexCssPattern, 'KaTeX CSS');

// Agregar el script de KaTeX y luego el de auto-render, esperando que el contenedor esté disponible.
appendScriptIfNotExists(katexJsSrc, katexJsPattern, 'KaTeX JS', () => {
    // Una vez cargado KaTeX, cargamos el script de auto-render.
    appendScriptIfNotExists(katexAutoRenderSrc, katexAutoRenderPattern, 'KaTeX Auto Render', () => {
        // Espera hasta que el contenedor "contenido-principal" esté en el DOM
        const intervalID = setInterval(() => {
            const container = document.getElementById('contenido-principal');
            if (container && typeof renderMathInElement === 'function') {
                // Cuando se encuentre el contenedor y renderMathInElement esté disponible, se renderizan las expresiones.
                renderMathInElement(container, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '\(', right: '\)', display: false }
                    ]
                });
                console.log("KaTeX auto-render: Expresiones renderizadas en 'contenido-principal'.");
                clearInterval(intervalID);
            }
        }, 2000); // Comprueba cada 100 ms
    });
});
