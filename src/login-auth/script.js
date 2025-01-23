// Importar el CSS (PostCSS lo inyectará en el bundle)
import './style.css'; // Importa el archivo de estilos CSS

// Asegúrate de que Firebase ya esté inicializado antes de este bloque

(function() {

     // Verificación de la sesión activa al cargar la página
    function verificarSesionUsuario() {
        autenticacion.onAuthStateChanged((usuario) => {
            if (usuario) {
                mostrarPanel(); // Usuario ya autenticado, mostrar el panel
            } else {
                console.log("[AutoQuizFill] No hay usuario autenticado. Mostrar login.");
                mostrarLogin(); // No hay sesión, mostrar el formulario de login
            }
        });
    }

    // Función para iniciar sesión
    function iniciarSesionAutoQuiz(correo, contrasena) {
        autenticacion.signInWithEmailAndPassword(correo, contrasena)
            .then(() => mostrarPanel())
            .catch((error) => alert("Error en inicio de sesión: " + error.message));
    }

    // Función para cerrar sesión
    function cerrarSesionAutoQuiz() {
        autenticacion.signOut().then(() => {
            mostrarLogin();  // Mostrar login tras cerrar sesión
        }).catch((error) => {
            console.error("Error al cerrar sesión:", error);
        });
    }

    // Función para manejar el envío del formulario de login
    function configurarEventos() {
        const formLogin = document.getElementById('formLogin');
        const botonCerrarSesion = document.getElementById('botonCerrarSesion');

        if (formLogin) {
            formLogin.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
                const correo = formLogin.querySelector('input[name="correo"]').value;
                const contrasena = formLogin.querySelector('input[name="contrasena"]').value;
                iniciarSesionAutoQuiz(correo, contrasena);
            });
        }

        if (botonCerrarSesion) {
            botonCerrarSesion.addEventListener('click', () => {
                cerrarSesionAutoQuiz();
            });
        }
    }

    // Inicialización de la IIFE
    function init() {
        verificarSesionUsuario();
        configurarEventos();
    }

    // Ejecutar la función de inicialización cuando el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', init);
})();
