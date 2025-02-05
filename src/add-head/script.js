/******************************************************
 * add-head.js
 * 
 * Se encarga de inyectar dinámicamente en el <head>:
 *  - Fuentes (Poppins, Font Awesome)
 *  - KaTeX (CSS, JS y AutoRender)
 * 
 * Al terminar, deja un mensaje en consola.
 * 
 * NO realiza ninguna renderización de LaTeX.
 ******************************************************/

/******************************************************
 * 1) Lista de recursos
 ******************************************************/

// Cada objeto describe un recurso con:
// - tipo: "link" (CSS) o "script" (JS)
// - url:   la URL del recurso
// - patron: para comprobar si ya se inyectó
// - nombre: texto descriptivo para depuración

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
    },
    {
      tipo: "link",
      url: "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css",
      patron: /katex\.min\.css/,
      nombre: "KaTeX CSS"
    },
    {
      tipo: "script",
      url: "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js",
      patron: /katex\.min\.js/,
      nombre: "KaTeX JS"
    },
    {
      tipo: "script",
      url: "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/contrib/auto-render.min.js",
      patron: /auto-render\.min\.js/,
      nombre: "KaTeX Auto Render"
    }
  ];
  
  /******************************************************
   * 2) Funciones para inyectar enlaces y scripts
   ******************************************************/
  
  function agregarEnlaceSiNoExiste(url, patron, nombre) {
    const existe = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .some(enlace => patron.test(enlace.href));
    if (!existe) {
      const enlace = document.createElement('link');
      enlace.rel = 'stylesheet';
      enlace.href = url;
      document.head.appendChild(enlace);
      // console.log(`${nombre} agregado en <head>`);
    } else {
      // console.log(`${nombre} ya existe en <head>`);
    }
  }
  
  function agregarScriptSiNoExiste(url, patron, nombre, callback) {
    const existe = Array.from(document.querySelectorAll('script'))
      .some(script => patron.test(script.src));
    if (!existe) {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = callback;
      document.head.appendChild(script);
      // console.log(`${nombre} agregado en <head>`);
    } else {
      // console.log(`${nombre} ya existe en <head>`);
      if (callback) callback();
    }
  }
  
  /******************************************************
   * 3) Carga directa de los recursos secuencialmente
   ******************************************************/
  
  (async () => {
    for (const recurso of listaRecursos) {
      if (recurso.tipo === "link") {
        // Para enlaces (CSS), se inyecta y continuamos
        agregarEnlaceSiNoExiste(recurso.url, recurso.patron, recurso.nombre);
      } else if (recurso.tipo === "script") {
        // Para scripts (JS), esperamos a que termine de cargarse
        await new Promise((resolve) => {
          agregarScriptSiNoExiste(recurso.url, recurso.patron, recurso.nombre, resolve);
        });
      }
    }
    console.log("add-head.js: Todos los recursos se han cargado correctamente.");
  })();