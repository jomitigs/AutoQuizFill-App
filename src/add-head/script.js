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
        //console.log(`[add-head.js] ✅ ${nombre} agregado.`);
    }
}

function agregarScriptSiNoExiste(url, patron, nombre) {
    return new Promise((resolve) => {
        if (!Array.from(document.querySelectorAll('script')).some(script => patron.test(script.src))) {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.onload = () => {
                //console.log(`[add-head.js] ✅ ${nombre} cargado correctamente.`);
                resolve();
            };
            document.head.appendChild(script);
        } else {
            //console.log(`[add-head.js] ℹ️ ${nombre} ya existe.`);
            resolve();
        }
    });
}

/******************************************************
 * 🔍 Carga de los recursos (Solución RequireJS con Depuración)
 ******************************************************/

(async () => {
    for (const recurso of listaRecursos) {
        if (recurso.tipo === "link") {
            agregarEnlaceSiNoExiste(recurso.url, recurso.patron, recurso.nombre);
        } else if (recurso.tipo === "script") {
            // ✅ Guardamos el estado original de RequireJS antes de deshabilitarlo
            let defineTemp = window.define;
            let moduleTemp = window.module;
            let requireTemp = window.require; // También guardamos `require`, por si acaso

            //console.log(`[add-head.js] 🔴 Deshabilitando RequireJS antes de cargar ${recurso.nombre}...`);
            window.define = undefined;
            window.module = undefined;
            window.require = undefined; // Desactivamos `require` también

            await agregarScriptSiNoExiste(recurso.url, recurso.patron, recurso.nombre);

            //console.log(`[add-head.js] 🔄 Restaurando RequireJS después de cargar ${recurso.nombre}...`);
            window.define = defineTemp;
            window.module = moduleTemp;
            window.require = requireTemp; // Restauramos `require`

            // 🚀 Depuración final: Verificamos si RequireJS fue restaurado correctamente
            //console.log(`[add-head.js] ✅ RequireJS restaurado:`);
            //console.log("🔹 typeof window.define:", typeof window.define);
            //console.log("🔹 typeof window.module:", typeof window.module);
            //console.log("🔹 typeof window.require:", typeof window.require);
        }
    }

    //console.log("[add-head.js] ✅ Todos los recursos se han cargado correctamente.");
})();
