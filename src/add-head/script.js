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

const listaRecursos = [
    { tipo: "link", url: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap", patron: /fonts\.googleapis\.com\/css2\?family=Poppins/, nombre: "Fuente Poppins" },
    { tipo: "link", url: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css", patron: /font-awesome/, nombre: "Font Awesome" },
    { tipo: "link", url: "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css", patron: /katex\.min\.css/, nombre: "KaTeX CSS" },
    { tipo: "script", url: "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js", patron: /katex\.min\.js/, nombre: "KaTeX JS" },
    { tipo: "script", url: "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/contrib/auto-render.min.js", patron: /auto-render\.min\.js/, nombre: "KaTeX Auto Render" }
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
        console.log(`[add-head.js] ${nombre} agregado en <head>`);
    } else {
        console.log(`[add-head.js] ${nombre} ya existe en <head>`);
    }
}

function agregarScriptSiNoExiste(url, patron, nombre) {
    return new Promise((resolve) => {
        const existe = Array.from(document.querySelectorAll('script'))
            .some(script => patron.test(script.src));
        if (!existe) {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.onload = () => {
                console.log(`[add-head.js] ${nombre} cargado correctamente.`);
                resolve();
            };
            document.head.appendChild(script);
        } else {
            console.log(`[add-head.js] ${nombre} ya existe en <head>`);
            resolve();
        }
    });
}

/******************************************************
 * 3) Carga de los recursos secuencialmente
 ******************************************************/

(async () => {
    for (const recurso of listaRecursos) {
        if (recurso.tipo === "link") {
            agregarEnlaceSiNoExiste(recurso.url, recurso.patron, recurso.nombre);
        } else if (recurso.tipo === "script") {
            await agregarScriptSiNoExiste(recurso.url, recurso.patron, recurso.nombre);
        }
    }

    // 🟢 Verificar si `renderMathInElement` está disponible
    let intentos = 0;
    const intervalo = setInterval(() => {
        if (typeof window.renderMathInElement === "function") {
            clearInterval(intervalo);
            console.log("[add-head.js] ✅ KaTeX AutoRender está listo.");
        } else {
            intentos++;
            console.warn(`[add-head.js] ⚠️ Intento ${intentos}: Aún no está disponible renderMathInElement.`);
            if (intentos >= 10) { // 10 intentos (~1 segundo en total)
                clearInterval(intervalo);
                console.error("[add-head.js] ❌ Error: No se pudo cargar KaTeX AutoRender.");
            }
        }
    }, 100);

    console.log("[add-head.js] Todos los recursos se han cargado correctamente.");
})();
