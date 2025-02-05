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
        // console.log(`${resourceName} inyectado en <head>`);
    } else {
        // console.log(`${resourceName} ya existe en <head>`);
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
        // console.log(`${resourceName} inyectado en <head>`);
    } else {
        // console.log(`${resourceName} ya existe en <head>`);
        if (callback) callback();
    }
};

// Agregar las hojas de estilo de las fuentes
appendLinkIfNotExists(poppinsHref, poppinsPattern, 'Fuente Poppins');
appendLinkIfNotExists(fontAwesomeHref, fontAwesomePattern, 'Font Awesome');

// Agregar KaTeX CSS
appendLinkIfNotExists(katexCssHref, katexCssPattern, 'KaTeX CSS');

/**
 * Espera hasta que la función renderMathInElement esté disponible,
 * comprobando cada 100 ms, hasta un timeout (por defecto 5000 ms).
 * Retorna una promesa que se resuelve cuando la función está disponible.
 */
async function waitForRenderMathInElement(timeout = 5000) {
    return new Promise((resolve, reject) => {
        let elapsed = 0;
        const interval = setInterval(() => {
            if (typeof window.renderMathInElement === 'function') {
                clearInterval(interval);
                resolve();
            } else {
                elapsed += 100;
                if (elapsed >= timeout) {
                    clearInterval(interval);
                    reject(new Error("Timeout waiting for renderMathInElement"));
                }
            }
        }, 100);
    });
}

// Inyectar KaTeX JS y luego el de auto-render
appendScriptIfNotExists(katexJsSrc, katexJsPattern, 'KaTeX JS', () => {
    appendScriptIfNotExists(katexAutoRenderSrc, katexAutoRenderPattern, 'KaTeX Auto Render', () => {
        // Opcional: Aquí puedes, por ejemplo, esperar a que renderMathInElement esté disponible
        waitForRenderMathInElement().then(() => {
            // Si deseas realizar un renderizado inmediato en algún contenedor que ya exista,
            // por ejemplo:
            const container = document.getElementById('contenido-principal');
            if (container) {
                renderMathInElement(container, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '\\(', right: '\\)', display: false }
                    ]
                });
                console.log("KaTeX auto-render: Expresiones renderizadas en 'contenido-principal'.");
            }
        }).catch((err) => {
            console.error(err);
        });
    });
});
