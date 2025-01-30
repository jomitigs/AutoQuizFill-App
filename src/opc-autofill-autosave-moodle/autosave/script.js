export function contenedorAutoSave_js() {

    const interruptorAutoSave = document.getElementById('switch-autosave');
    const estadoInterruptorAutoSave = localStorage.getItem('autosave-autoquizfillapp') || 'desactivado';

    // Estado del interruptor de AutoSave basado en localStorage
    interruptorAutoSave.checked = (estadoInterruptorAutoSave === 'activado');

    interruptorAutoSave.addEventListener('change', function() {
        // Obtener el elemento body-autoquiz-autosave para mostrar/ocultar
        const bodyAutoSave = document.getElementById('body-autoquiz-autosave');

        if (
            this.checked && (window.location.href.includes('/mod/quiz/attempt.php') || window.location.href.includes('/mod/quiz/view.php?'))
        ) {
            localStorage.setItem('autosave-autoquizfillapp', 'activado');
            // Mostrar el body cuando AutoSave está activado
            if (bodyAutoSave) {
                bodyAutoSave.style.display = 'flex';
            }
        } else {
            localStorage.setItem('autosave-autoquizfillapp', 'desactivado');
            // Ocultar el body cuando AutoSave está desactivado
            if (bodyAutoSave) {
                bodyAutoSave.style.display = 'none';
            }
        }
    });
}