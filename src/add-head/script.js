// addHead.js

/**
 * Inserta dinámicamente las fuentes Poppins y Font Awesome en el <head>.
 * Puedes importar y llamar a esta función en tu código para cargar las fuentes necesarias.
 */
export function addHead() {
    // URLs de las fuentes
    const poppinsHref = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
    const fontAwesomeHref = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';

    // Función para crear y añadir un <link> al <head> si no existe
    const appendLink = (href) => {
        if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
            console.log(`addHead: Estilo de ${href} inyectado en <head>`);
        } else {
            console.log(`addHead: Estilo de ${href} ya existe en <head>`);
        }
    };

    // Añadir la fuente Poppins
    appendLink(poppinsHref);

    // Añadir Font Awesome
    appendLink(fontAwesomeHref);
}

// Exponer la función directamente en el objeto global `window` si está disponible
if (typeof window !== 'undefined') {
    window.addHead = addHead;
}
