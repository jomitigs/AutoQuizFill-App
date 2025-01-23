// addHead.js

/**
 * Inserta dinámicamente las fuentes Poppins y Font Awesome en el <head>.
 * Evita agregar múltiples versiones de las mismas fuentes.
 * Puedes importar y llamar a esta función en tu código para cargar las fuentes necesarias.
 */
export function addHead() {
    // URLs de las fuentes
    const poppinsHref = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
    const fontAwesomeHref = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';

    // Patrones para identificar si las fuentes ya están cargadas
    const poppinsPattern = /fonts\.googleapis\.com\/css2\?family=Poppins/;
    const fontAwesomePattern = /font-awesome/;

    /**
     * Crea y añade un <link> al <head> si no existe una hoja de estilos que coincida con el patrón proporcionado.
     *
     * @param {string} href - La URL de la hoja de estilos a añadir.
     * @param {RegExp} pattern - La expresión regular para verificar si la hoja de estilos ya está presente.
     * @param {string} resourceName - Nombre descriptivo del recurso para fines de logging.
     */
    const appendLinkIfNotExists = (href, pattern, resourceName) => {
        const existingLink = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .find(link => pattern.test(link.href));

        if (!existingLink) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
            console.log(`addHead: ${resourceName} inyectado en <head>`);
        } else {
            console.log(`addHead: ${resourceName} ya existe en <head>`);
        }
    };

    // Añadir la fuente Poppins si no está presente
    appendLinkIfNotExists(poppinsHref, poppinsPattern, 'Fuente Poppins');

    // Añadir Font Awesome si no está presente
    appendLinkIfNotExists(fontAwesomeHref, fontAwesomePattern, 'Font Awesome');
}

// Exponer la función directamente en el objeto global `window` si está disponible
if (typeof window !== 'undefined') {
    window.addHead = addHead;
}