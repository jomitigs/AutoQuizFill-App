// Importar el CSS (PostCSS lo inyectará en el bundle)
import './style.css'; // Importa el archivo de estilos CSS

const barraLateral = document.querySelector('#barra-lateral-autoquizfillapp');

// Mostrar login si el usuario no está autenticado
function mostrarLogin() {
    document.getElementById('login-autoquizfillapp').style.display = 'block';
    document.getElementById('panel-autofillquizapp').style.display = 'none';
}

// HTML, CSS y JS del Login
function login_AutoFillQuizApp(barraLateral) {
    const loginAutoFillQuizApp = document.createElement('div');
    loginAutoFillQuizApp.id = 'login-autoquizfillapp';
    loginAutoFillQuizApp.style.display = 'none'; // Ocultar login por defecto hasta verificar el estado de sesión
    loginAutoFillQuizApp.innerHTML = `
        <div class="contenedor-login-autoquizfillapp">
            <!-- Contenedor del título -->
            <div class="contenedor-titulo-autoquizfillapp">
                <h2 class="title-login-autoquizfillapp">AutoQuizFill App</h2>
            </div>

            <!-- Contenedor de los inputs -->
            <div class="contenedor-inputs-autoquizfillapp">
                <input type="email" id="login-correo-autoquizfillapp" class="login-entrada-autoquizfillapp" placeholder="Correo electrónico" autocomplete="email" form="fake-form" required>
                <input type="password" id="login-contrasena-autoquizfillapp" class="login-entrada-autoquizfillapp" placeholder="Contraseña" autocomplete="current-password" form="fake-form" required>
            </div>

            <!-- Contenedor del botón -->
            <div class="contenedor-boton-autoquizfillapp">
                <button id="login-boton-autoquizfillapp" class="login-boton-autoquizfillapp">Iniciar sesión</button>
            </div>
        </div>

        <!-- Formulario ficticio -->
        <form id="fake-form" style="display: none;"></form>
    `;

    barraLateral.appendChild(loginAutoFillQuizApp);

    // Permitir el inicio de sesión al presionar "Enter" en el campo de contraseña
    document.getElementById('login-contrasena-autoquizfillapp').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const correo = document.getElementById('login-correo-autoquizfillapp').value;
            const contrasena = document.getElementById('login-contrasena-autoquizfillapp').value;
            iniciarSesionAutoQuiz(correo, contrasena);
        }
    });

    // Evento de clic para el botón de iniciar sesión
    document.getElementById('login-boton-autoquizfillapp').addEventListener('click', function () {
        const correo = document.getElementById('login-correo-autoquizfillapp').value;
        const contrasena = document.getElementById('login-contrasena-autoquizfillapp').value;
        iniciarSesionAutoQuiz(correo, contrasena);
    });
}

// Inicializar la funcionalidad
document.addEventListener('DOMContentLoaded', () => {
    const barraLateral = document.getElementById('barra-lateral'); // Asegúrate de que este ID exista en tu HTML
    if (barraLateral) {
        login_AutoFillQuizApp(barraLateral);
        mostrarLogin(); // Llamar esta función según las necesidades de autenticación
    } else {
        console.error('No se encontró el elemento con ID "barra-lateral".');
    }
});
