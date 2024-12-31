// addHead.js

/**
 * Inserta dinámicamente las fuentes Poppins y Font Awesome en el <head>.
 * Puedes importar y llamar a esta función en tu código para cargar las fuentes necesarias.
 */
export function addHead() {
    // Crear el elemento <link> para la fuente Poppins
    const poppinsLink = document.createElement('link');
    poppinsLink.rel = 'stylesheet';
    poppinsLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
    
    // Insertar el <link> de Poppins en el <head>
    document.head.appendChild(poppinsLink);
    console.log('addHead: Fuente Poppins inyectada en <head>');

    // Crear el elemento <link> para Font Awesome
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    fontAwesomeLink.integrity = 'sha512-p1UgS4mFjv7KxPqXe8cqkJ4LJrj+lPAZlBj5fz2jFnr6Yv+dZQl0k50K5xJdHjyTF3u4jC0aCjXh6zWriY9aUg=='; // Asegura la integridad del recurso
    fontAwesomeLink.crossOrigin = 'anonymous';
    fontAwesomeLink.referrerPolicy = 'no-referrer'; // Opcional, mejora la privacidad

    // Insertar el <link> de Font Awesome en el <head>
    document.head.appendChild(fontAwesomeLink);
    console.log('addHead: Font Awesome inyectado en <head>');
}

// Exponer la función directamente en el objeto global `window`
window.addHead = addHead;
