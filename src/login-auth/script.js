// Importar el CSS (PostCSS lo inyectará en el bundle)
import './style.css'; // Importa el archivo de estilos CSS

// Asegúrate de que Firebase ya esté inicializado antes de este bloque

(function () {
    console.log("[AutoQuizFill] Script cargado."); // Depuración al cargar el script

    // Verificación de la sesión activa al cargar la página
    function verificarSesionUsuario() {
        console.log("[AutoQuizFill] Verificando sesión activa...");
        autenticacion.onAuthStateChanged((usuario) => {
            if (usuario) {
                console.log("[AutoQuizFill] Usuario autenticado:", usuario);
                mostrarPanel(); // Usuario ya autenticado, mostrar el panel
            } else {
                console.log("[AutoQuizFill] No hay usuario autenticado. Mostrar login.");
                mostrarLogin(); // No hay sesión, mostrar el formulario de login
            }
        });
    }

    // Función para iniciar sesión
    function iniciarSesionAutoQuiz(correo, contrasena) {
        console.log("[AutoQuizFill] Intentando iniciar sesión con correo:", correo);
        autenticacion.signInWithEmailAndPassword(correo, contrasena)
            .then(() => {
                console.log("[AutoQuizFill] Inicio de sesión exitoso.");
                mostrarPanel();
            })
            .catch((error) => {
                console.error("[AutoQuizFill] Error en inicio de sesión:", error);
                alert("Error en inicio de sesión: " + error.message);
            });
    }

    // Función para cerrar sesión
    function cerrarSesionAutoQuiz() {
        console.log("[AutoQuizFill] Intentando cerrar sesión...");
        autenticacion.signOut().then(() => {
            console.log("[AutoQuizFill] Cierre de sesión exitoso.");
            mostrarLogin(); // Mostrar login tras cerrar sesión
        }).catch((error) => {
            console.error("[AutoQuizFill] Error al cerrar sesión:", error);
        });
    }

    // Función para manejar el envío del formulario de login
    function configurarEventos() {
        console.log("[AutoQuizFill] Configurando eventos...");
        const formLogin = document.getElementById('formLogin');
        const botonCerrarSesion = document.getElementById('botonCerrarSesion');

        if (formLogin) {
            console.log("[AutoQuizFill] Formulario de login encontrado.");
            formLogin.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
                const correo = formLogin.querySelector('input[name="correo"]').value;
                const contrasena = formLogin.querySelector('input[name="contrasena"]').value;
                console.log("[AutoQuizFill] Formulario enviado. Correo:", correo);
                iniciarSesionAutoQuiz(correo, contrasena);
            });
        } else {
            console.warn("[AutoQuizFill] Formulario de login no encontrado.");
        }

        if (botonCerrarSesion) {
            console.log("[AutoQuizFill] Botón de cerrar sesión encontrado.");
            botonCerrarSesion.addEventListener('click', () => {
                cerrarSesionAutoQuiz();
            });
        } else {
            console.warn("[AutoQuizFill] Botón de cerrar sesión no encontrado.");
        }
    }

    // Inicialización de la IIFE
    function init() {
        console.log("[AutoQuizFill] Inicializando...");
        verificarSesionUsuario();
        configurarEventos();
    }

    // Ejecutar la función de inicialización cuando el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', () => {
        console.log("[AutoQuizFill] DOM completamente cargado.");
        init();
    });
})();
