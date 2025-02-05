/******************************************************
 * add-head.js - Carga de recursos (Fuentes y FontAwesome)
 ******************************************************/

const listaRecursos = [
    {
      tipo: "link",
      url: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap",
      patron: /fonts\.googleapis\.com\/css2\?family=Poppins/,
      nombre: "Fuente Poppins"
    },
    {
      tipo: "link",
      url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
      patron: /font-awesome/,
      nombre: "Font Awesome"
    }
  ];
  
  function agregarEnlaceSiNoExiste(url, patron, nombre) {
    if (!Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(link => patron.test(link.href))) {
      const enlace = document.createElement('link');
      enlace.rel = 'stylesheet';
      enlace.href = url;
      document.head.appendChild(enlace);
      console.log(`[add-head.js] ✅ ${nombre} agregado.`);
    } else {
      console.log(`[add-head.js] ℹ️ ${nombre} ya existe.`);
    }
  }
  
  (async () => {
    for (const recurso of listaRecursos) {
      if (recurso.tipo === "link") {
        agregarEnlaceSiNoExiste(recurso.url, recurso.patron, recurso.nombre);
      }
    }
    console.log("[add-head.js] ✅ Todos los recursos (Fuentes y FontAwesome) se han cargado correctamente.");
  })();
  