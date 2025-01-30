// Exporta una función llamada contenedorAutoSave_js
export function contenedorAutoSave_js() {

    // Obtiene el elemento del interruptor de AutoSave por su ID
    const interruptorAutoSave = document.getElementById('switch-autosave');

    // Si el elemento no existe, muestra un error en la consola y termina la ejecución
    if (!interruptorAutoSave) {
        console.error("Error: No se encontró el elemento con ID 'switch-autosave'");
        return;
    }

    // Obtiene el estado guardado en localStorage o asigna 'desactivado' si no existe
    const estadoInterruptorAutoSave = localStorage.getItem('autosave-autoquizfillapp') || 'desactivado';
    console.log("Estado guardado en localStorage:", estadoInterruptorAutoSave);

    // Configura el estado del interruptor basado en el valor guardado en localStorage
    interruptorAutoSave.checked = (estadoInterruptorAutoSave === 'activado');
    console.log("Estado inicial del interruptor:", interruptorAutoSave.checked);

    // Agrega un evento que escucha cambios en el interruptor de AutoSave
    interruptorAutoSave.addEventListener('change', function() {
        console.log("Cambio detectado en el interruptor. Nuevo estado:", this.checked);

        // Obtiene el elemento body-autoquiz-autosave por su ID
        const bodyAutoSave = document.getElementById('body-autoquiz-autosave');

        // Si el elemento no existe, muestra un mensaje en la consola
        if (!bodyAutoSave) {
            console.warn("Advertencia: No se encontró el elemento con ID 'body-autoquiz-autosave'");
        }

        // Verifica si el interruptor está activado y si la URL actual pertenece a las páginas del quiz
        if (
            this.checked && (window.location.href.includes('/mod/quiz/attempt.php') || window.location.href.includes('/mod/quiz/view.php?'))
        ) {
            console.log("AutoSave activado en una página de quiz.");

            // Guarda en localStorage que el AutoSave está activado
            localStorage.setItem('autosave-autoquizfillapp', 'activado');

            // Si el elemento bodyAutoSave existe, lo muestra estableciendo su display a 'flex'
            if (bodyAutoSave) {
                bodyAutoSave.style.display = 'flex';
                console.log("Mostrando el elemento body-autoquiz-autosave.");
            }
        } else {
            console.log("AutoSave desactivado o fuera de una página de quiz.");

            // Guarda en localStorage que el AutoSave está desactivado
            localStorage.setItem('autosave-autoquizfillapp', 'desactivado');

            // Si el elemento bodyAutoSave existe, lo oculta estableciendo su display a 'none'
            if (bodyAutoSave) {
                bodyAutoSave.style.display = 'none';
                console.log("Ocultando el elemento body-autoquiz-autosave.");
            }
        }
    });

    console.log("Evento de cambio agregado al interruptor de AutoSave.");
}
