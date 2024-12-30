// addHead.js

/**
 * Inserta dinámicamente la fuente Poppins en el <head>.
 * Puedes importarla y llamarla en tu código para cargar la fuente.
 */
export function addHead() {
    // Crea el elemento <link> que cargará la fuente
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
  
    // Inserta el <link> en el <head>
    document.head.appendChild(link);
  }
  