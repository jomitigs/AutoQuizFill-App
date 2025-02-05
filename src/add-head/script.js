/******************************************************
 * add-head.js - Carga de recursos (KaTeX, Poppins, FontAwesome)
 ******************************************************/

const listaRecursos = [
    { tipo: "link", url: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap", patron: /fonts\.googleapis\.com\/css2\?family=Poppins/, nombre: "Fuente Poppins" },
    { tipo: "link", url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css", patron: /font-awesome/, nombre: "Font Awesome" },
    { tipo: "link", url: "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css", patron: /katex\.min\.css/, nombre: "KaTeX CSS" },
    { tipo: "script", url: "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js", patron: /katex\.min\.js/, nombre: "KaTeX JS" },
    { tipo: "script", url: "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/contrib/auto-render.min.js", patron: /auto-render\.min\.js/, nombre: "KaTeX Auto Render" }
];

function agregarEnlaceSiNoExiste(url, patron, nombre) {
    if (!Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(link => patron.test(link.href))) {
        const enlace = document.createElement('link');
        enlace.rel = 'stylesheet';
        enlace.href = url;
        document.head.appendChild(enlace);
        console.log(`[add-head.js] ✅ ${nombre} agregado.`);
    }
}

function agregarScriptSiNoExiste(url, patron, nombre) {
    return new Promise((resolve) => {
        if (!Array.from(document.querySelectorAll('script')).some(script => patron.test(script.src))) {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.onload = () => {
                console.log(`[add-head.js] ✅ ${nombre} cargado correctamente.`);
                resolve();
            };
            document.head.appendChild(script);
        } else {
            console.log(`[add-head.js] ℹ️ ${nombre} ya existe.`);
            resolve();
        }
    });
}

/******************************************************
 * 3) Carga de los recursos (Solución RequireJS)
 ******************************************************/

(async () => {
    for (const recurso of listaRecursos) {
        if (recurso.tipo === "link") {
            agregarEnlaceSiNoExiste(recurso.url, recurso.patron, recurso.nombre);
        } else if (recurso.tipo === "script") {
            // 🔴 Solución: Deshabilitar RequireJS antes de cargar KaTeX
            let defineTemp = window.define;
            let moduleTemp = window.module;
            window.define = undefined;
            window.module = undefined;

            await agregarScriptSiNoExiste(recurso.url, recurso.patron, recurso.nombre);

            // 🔄 Restaurar RequireJS después de cargar KaTeX
            window.define = defineTemp;
            window.module = moduleTemp;
        }
    }

    console.log("[add-head.js] ✅ Todos los recursos se han cargado correctamente.");
})();
