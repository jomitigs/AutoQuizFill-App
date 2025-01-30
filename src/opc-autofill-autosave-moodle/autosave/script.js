// Exporta una función llamada contenedorAutoSave_js
export function contenedorAutoSave_js() {
    // Constantes para los IDs de los elementos y valores de estado
    const SWITCH_ID = 'switch-autosave';
    const BODY_ID = 'body-autoquiz-autosave';
    const STORAGE_KEY = 'autosave-autoquizfillapp';
    const ACTIVADO = 'activado';
    const DESACTIVADO = 'desactivado';

    // Obtener elementos del DOM
    const interruptorAutoSave = document.getElementById(SWITCH_ID);
    const bodyAutoSave = document.getElementById(BODY_ID);

    // Verificar la existencia del interruptor
    if (!interruptorAutoSave) {
        console.error(`Error: No se encontró el elemento con ID '${SWITCH_ID}'`);
        return;
    }

    // Obtener el estado guardado en localStorage
    const estadoGuardado = localStorage.getItem(STORAGE_KEY) || DESACTIVADO;
    console.log(`[opc-autofill-autosave-moodle: autosave] AutoSave: ${estadoGuardado}`);

    // Configurar el estado inicial del interruptor
    interruptorAutoSave.checked = estadoGuardado === ACTIVADO;
    console.log(`Estado inicial del interruptor: ${interruptorAutoSave.checked}`);

    // Función para actualizar la visibilidad del body
    const actualizarVisibilidadBody = () => {
        const esPaginaQuiz = window.location.href.includes('/mod/quiz/attempt.php') || 
                             window.location.href.includes('/mod/quiz/view.php?');
        if (esPaginaQuiz && interruptorAutoSave.checked) {
            if (bodyAutoSave) {
                bodyAutoSave.style.display = 'flex';
                console.log("Mostrando el elemento body-autoquiz-autosave.");
            }
        } 
        // No es necesario ocultar el body aquí ya que está oculto por defecto
    };

    // Inicializar la visibilidad del body al cargar
    actualizarVisibilidadBody();

    // Evento para manejar cambios en el interruptor
    interruptorAutoSave.addEventListener('change', () => {
        const estadoNuevo = interruptorAutoSave.checked ? ACTIVADO : DESACTIVADO;
        localStorage.setItem(STORAGE_KEY, estadoNuevo);
        console.log(`Estado actualizado en localStorage: ${estadoNuevo}`);

        actualizarVisibilidadBody();
    });

    console.log("Evento de cambio agregado al interruptor de AutoSave.");
}
