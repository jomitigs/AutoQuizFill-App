

    document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' }));
    document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap' }));

    function cssAutoQuizFillApp() {
        cssLogin_AutoFillQuizApp();
        cssPanel_AutoFillQuizApp();
        cssMenu_AutoFillQuizApp();
        opcionConfigRuta_css();
        opcionAutoQuiz_css();
        opcionGestionUsuarios_css();
    }

    // =====================
    // Configuración de Firebase
    // =====================
    const configuracionFirebaseAutoQuiz = {
        apiKey: "AIzaSyANIA0nk7P3RTo33P86jmW3GM6jMxxdoAs",
        authDomain: "moodlequizdatascraping.firebaseapp.com",
        databaseURL: "https://moodlequizdatascraping-default-rtdb.firebaseio.com",
        projectId: "moodlequizdatascraping",
        storageBucket: "moodlequizdatascraping.appspot.com",
        messagingSenderId: "782692660220",
        appId: "1:782692660220:web:8258d30da03e338f4c3879"
    };

    firebase.initializeApp(configuracionFirebaseAutoQuiz);
    const autenticacion = firebase.auth(); // Inicialización de Firebase Authentication
    const database = firebase.database();

    // =====================
    // Funciones de Autenticación
    // =====================

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

    // =====================
    // Interfaz de Usuario (UI)
    // =====================

    function barraLateral_AutoQuizFillApp() {
        // Crear la barra lateral
        const barraLateral = document.createElement('div');
        barraLateral.id = 'barra-lateral-autoquizfillapp'; // ID único
        barraLateral.className = 'barra-lateral-autoquizfillapp'; // Clase única
        barraLateral.style.width = '27.5%'; // Ajuste del ancho a 27.5%
        barraLateral.style.minWidth = '350px'; // Ancho mínimo de 350px
        barraLateral.style.maxWidth = '500px'; // Ancho máximo de 500px
        barraLateral.style.height = '100%'; // Ocupa toda la altura de la ventana
        barraLateral.style.position = 'fixed';
        barraLateral.style.top = '0';
        barraLateral.style.left = '0';
        barraLateral.style.backgroundColor = '#ecf0f1';
        barraLateral.style.padding = '20px';
        barraLateral.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        barraLateral.style.zIndex = '9999';
        barraLateral.style.display = 'flex';
        barraLateral.style.flexDirection = 'column';
        barraLateral.style.alignItems = 'flex-start'; // Alinea el contenido a la izquierda
        barraLateral.style.overflowY = 'auto'; // Hacer el contenido desplazable si excede el tamaño
        barraLateral.style.scrollbarWidth = 'none'; // Ocultar barra de desplazamiento en Firefox

        // Ocultar la barra de desplazamiento en Webkit (Chrome, Safari, Edge)
        barraLateral.style.msOverflowStyle = 'none'; // Ocultar barra de desplazamiento en IE 10+
        barraLateral.style.overflowX = 'hidden'; // Evitar el desplazamiento horizontal innecesario

        // Crear el botón de mostrar/ocultar (todo tu código sigue igual)
        const botonMostrarOcultar = document.createElement('button');
        botonMostrarOcultar.id = 'boton-mostrar-ocultar-autoquizfillapp';
        botonMostrarOcultar.style.position = 'fixed';
        botonMostrarOcultar.style.top = '20px';
        botonMostrarOcultar.style.left = `calc(${barraLateral.style.minWidth} + 6%)`;
        botonMostrarOcultar.style.zIndex = '10000';
        botonMostrarOcultar.style.width = '40px';
        botonMostrarOcultar.style.height = '40px';
        botonMostrarOcultar.style.cursor = 'pointer';
        botonMostrarOcultar.style.border = 'none';
        botonMostrarOcultar.style.backgroundColor = '#3498db';
        botonMostrarOcultar.style.color = '#ffffff';
        botonMostrarOcultar.style.borderRadius = '5px';
        botonMostrarOcultar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        botonMostrarOcultar.style.display = 'flex';
        botonMostrarOcultar.style.justifyContent = 'center';
        botonMostrarOcultar.style.alignItems = 'center';
        botonMostrarOcultar.style.fontSize = '18px';

        const iconFlecha = '<i class="fa-solid fa-angles-right"></i>'; // Icono de flecha derecha
        const iconFlechaRotada = '<i class="fa-solid fa-angles-right fa-rotate-180"></i>'; // Icono de flecha rotada
        botonMostrarOcultar.innerHTML = iconFlechaRotada;

        // Funciones para reposicionar el botón y ajustar el contenido
        function reposicionarBoton() {
            const barraWidth = barraLateral.getBoundingClientRect().width;
            botonMostrarOcultar.style.left = `calc(${barraWidth}px + 10px)`;
        }

        function ajustarContenidoPagina() {
            const barraWidth = barraLateral.getBoundingClientRect().width;
            const contenido = document.querySelector('body');
            contenido.style.marginLeft = `${barraWidth}px`;
            contenido.style.width = `calc(100% - ${barraWidth}px)`;
        }

        const resizeObserver = new ResizeObserver(() => {
            reposicionarBoton();
            ajustarContenidoPagina();
        });

        resizeObserver.observe(barraLateral);

        let isBarraVisible = false;

        botonMostrarOcultar.addEventListener('click', () => {
            if (isBarraVisible) {
                barraLateral.style.display = 'none';
                botonMostrarOcultar.innerHTML = iconFlecha;
                botonMostrarOcultar.style.left = '10px';
                document.querySelector('body').style.marginLeft = '0';
                document.querySelector('body').style.width = '100%';
                isBarraVisible = false;
            } else {
                barraLateral.style.display = 'flex';
                botonMostrarOcultar.innerHTML = iconFlechaRotada;
                reposicionarBoton();
                ajustarContenidoPagina();
                isBarraVisible = true;
            }
        });

        document.body.appendChild(barraLateral);
        document.body.appendChild(botonMostrarOcultar);

        ajustarContenidoPagina();

        return barraLateral;
    }

    // :::::: Login ::::::

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
                    <button id="login-login-boton-autoquizfillappfillapp" class="login-boton-autoquizfillapp">Iniciar sesión</button>
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
        document.getElementById('login-login-boton-autoquizfillappfillapp').addEventListener('click', function () {
            const correo = document.getElementById('login-correo-autoquizfillapp').value;
            const contrasena = document.getElementById('login-contrasena-autoquizfillapp').value;
            iniciarSesionAutoQuiz(correo, contrasena);
        });
    }

    function cssLogin_AutoFillQuizApp() {

        const csslogin = `

            /* Estilos para el contenedor principal */
            .contenedor-login-autoquizfillapp {
                width: 90%;
                max-width: 400px; /* Limitar el ancho máximo */
                padding: 20px;
                box-sizing: border-box;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 25%; /* Centra verticalmente en la mitad superior */
                left: 50%;
                transform: translate(-50%, -25%);
                font-family: 'Poppins', sans-serif; /* Aplicar fuente Poppins */
            }

            /* Estilos para el título */
            .contenedor-titulo-autoquizfillapp h2 {
                font-family: 'Poppins', sans-serif; /* Asegurar que el título también use Poppins */
                font-size: 32px;
                color: #333;
                margin-bottom: 20px;
                text-align: center;
            }


            #titulo-verified {
                font-family: 'Poppins', sans-serif; /* Asegurar que el título también use Poppins */
                font-size: 18px;
                margin-bottom: 20px;
                text-align: center;
                font-weight: 600;
                color: #34495e;
                margin: 0;

            }

            /* Estilos para los inputs */
            .contenedor-inputs-autoquizfillapp {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin-bottom: 20px;
            }

            .login-entrada-autoquizfillapp {
                width: 100%;
                padding: 10px;
                font-size: 16px;
                border: 1px solid #bdc3c7;
                border-radius: 5px;
                box-sizing: border-box;
                font-family: 'Poppins', sans-serif; /* Aplicar fuente Poppins a los inputs */
            }

            .login-entrada-autoquizfillapp:focus {
                border-color: #3498db;
                outline: none;
                box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
            }

            /* Estilos para el botón */
            .contenedor-boton-autoquizfillapp {
                width: 100%;
                display: flex;
                justify-content: center;
            }

            .login-boton-autoquizfillapp {
                width: 100%;
                padding: 10px;
                background-color: #3498db;
                color: white;
                font-size: 16px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                font-family: 'Poppins', sans-serif; /* Aplicar fuente Poppins al botón */
            }

            .login-boton-autoquizfillapp:hover {
                background-color: #2980b9;
            }

        `;

        const cssAutoQuizFillApp = document.createElement("style");
        cssAutoQuizFillApp.type = "text/css";
        cssAutoQuizFillApp.innerText = csslogin;
        document.head.appendChild(cssAutoQuizFillApp);
    }

    // :::::: Panel ::::::

    // Mostrar Panel si el usuario está autenticado
    function mostrarPanel() {
        document.getElementById('login-autoquizfillapp').style.display = 'none';
        document.getElementById('panel-autofillquizapp').style.display = 'block';
    }

    function panel_AutoFillQuizApp(barraLateral) {
        // Crear el contenedor principal del panel
        const contenedor = document.createElement('div');
        contenedor.id = 'panel-autofillquizapp';
        contenedor.classList.add('panel-autofillquizapp');
        contenedor.style.display = 'none'; // Oculto por defecto

        // Crear la cabecera que contiene el botón y el título
        const panelHeader = document.createElement('div');
        panelHeader.classList.add('panel-header');

        // Botón de hamburguesa para abrir el menú (sin fondo)
        const botonMenu = document.createElement('button');
        botonMenu.id = 'boton-hamburguesa-autofillquizapp';
        botonMenu.classList.add('boton-hamburguesa-autofillquizapp');
        botonMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';

        // Título de la opción seleccionada, centrado
        const tituloOpcion = document.createElement('span');
        tituloOpcion.id = 'titulo-autofillquizapp';
        tituloOpcion.classList.add('titulo-autofillquizapp');
        tituloOpcion.innerHTML = 'AutoFillQuiz App'; // Opción por defecto

        // Contenedor del contenido principal donde se mostrará el contenido de cada opción
        const contenedorContenido = document.createElement('div');
        contenedorContenido.id = 'contenido-principal';
        contenedorContenido.classList.add('contenido-principal-autofillquizapp');
        contenedorContenido.innerHTML = opcionAutoQuiz_html(); // Mostrar contenido de AutoFill por defecto

        // Agregar el botón de menú y el título al encabezado
        panelHeader.appendChild(botonMenu);
        panelHeader.appendChild(tituloOpcion);

        // Agregar el encabezado y el contenido principal al contenedor del panel
        contenedor.appendChild(panelHeader);
        contenedor.appendChild(contenedorContenido);

        // Agregar el contenedor del panel a la barra lateral
        barraLateral.appendChild(contenedor);

        // Esperar a que el HTML esté completamente cargado antes de ejecutar el JS
        setTimeout(() => {
            opcionAutoQuiz_js(); // Ejecutar el script de AutoFill una vez que el contenido está cargado
        }, 100); // Esperar un breve tiempo para asegurar que el HTML esté cargado

        // Evento para abrir el menú al hacer clic en el botón de hamburguesa
        botonMenu.addEventListener('click', () => {
            // console.log("Botón de hamburguesa clickeado"); // Verifica si se ejecuta
            const menu = document.getElementById('menu-autofillquizapp');
            if (menu) {
                menu.style.display = 'flex'; // Mostrar menú
            } else {
                console.error("El menú no se encontró en el DOM.");
            }
        });


        return contenedor;
    }

    function cssPanel_AutoFillQuizApp() {
        const estilosPanel = `
   /* El panel ocupará todo el ancho y la altura */
#panel-autofillquizapp {
    display: flex;
    flex-direction: column; /* Disposición en columna */
    height: 100vh; /* Ocupar toda la altura de la ventana */
    width: 100%; /* Ocupar el 100% del ancho del contenedor padre */
    background-color: #f4f7fa; /* Color de fondo más suave */
    font-family: 'Poppins', sans-serif; /* Aplicando la fuente Poppins */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra suave */
    border-radius: 8px; /* Bordes redondeados para suavizar el diseño */
    box-sizing: border-box; /* Para evitar desbordamientos por padding */
    overflow: hidden; /* Evitar que el contenido sobresalga */
    position: relative; /* Necesario para contener los elementos hijos */
}

    /* Cabecera del panel: botón a la izquierda, título centrado */
    .panel-header {
        display: flex;
        justify-content: flex-start; /* Alinear el botón y el título */
        align-items: center;
        padding: 15px 20px; /* Mayor espacio para una mejor sensación */
        background-color: #ffffff; /* Fondo blanco limpio para el header */
        border-bottom: 1px solid #e1e4e8; /* Borde inferior suave */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Sombra ligera */
        height: 60px; /* Asegura suficiente altura para el botón y el título */
        position: relative;
    }

    /* Título centrado */
    #titulo-autofillquizapp {
        font-size: 22px; /* Tamaño más grande para el título */
        font-weight: 600;
        color: #34495e; /* Un color más oscuro y elegante */
        text-align: center;
        flex-grow: 1; /* Ocupar el espacio disponible */
        margin-left: 20px; /* Ajuste para crear espacio entre el botón y el título */
    }

/* Ajuste para asegurarse de que el botón tiene el espacio adecuado */
#boton-hamburguesa-autofillquizapp {
    background-color: #0073e6; /* Fondo blanco */
    color: #ffffff; /* Azul moderno para el icono */
    border: 2px solid #0073e6; /* Bordes sutiles con el mismo color que el icono */
    border-radius: 5px; /* Botón redondo */
    cursor: pointer; /* Cambia el cursor a mano */
    font-size: 24px; /* Tamaño del icono */
    width: 40px; /* Ancho fijo */
    height: 40px; /* Alto fijo */
    display: inline-flex; /* Usar flexbox para alinear */
    justify-content: center; /* Centrar horizontalmente el icono */
    align-items: center; /* Centrar verticalmente el icono */
    padding: 0; /* Eliminar padding */
    margin: 0; /* Eliminar márgenes */
    position: relative; /* Mantener la posición en su contenedor */
    z-index: 1000; /* Asegura que el botón esté por encima de otros elementos */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave para darle profundidad */
    transition: all 0.3s ease; /* Transición suave para el hover */
}

/* Hover para darle efecto */
#boton-hamburguesa-autofillquizapp:hover {
    background-color: #002c67; /* Fondo azul al hacer hover */
    color: #ffffff; /* Color blanco para el icono en hover */
    border: 2px solid #002c67; /* Bordes sutiles con el mismo color que el icono */

    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); /* Aumenta ligeramente la sombra en hover */
    transform: translateY(-2px); /* Levanta el botón ligeramente en hover */
}

/* Icono del botón de hamburguesa */
#boton-hamburguesa-autofillquizapp i {
    pointer-events: none; /* Asegura que el icono no interfiera con el clic */
}


/* Contenido principal ocupará el resto del espacio */
#contenido-principal {
    flex-grow: 1; /* Ocupar el espacio restante debajo del encabezado */
    width: 100%; /* Asegurarse de que ocupe todo el ancho */
    padding: 20px; /* Espaciado interno */
    background-color: #ffffff; /* Fondo blanco para el contenido */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); /* Sombra ligera */
    overflow-y: auto; /* Permitir scroll si el contenido es largo */
    -ms-overflow-style: none;  /* Ocultar barra en IE y Edge */
    scrollbar-width: none;  /* Ocultar barra en Firefox */
    border-radius: 0 0 8px 8px; /* Redondear la parte inferior */
    box-sizing: border-box; /* Evitar desbordamientos */
}

/* Ocultar barra de desplazamiento en navegadores basados en WebKit */
#contenido-principal::-webkit-scrollbar {
    display: none; /* Ocultar barra de desplazamiento */
}

    `;

        const hojaEstilosPanel = document.createElement("style");
        hojaEstilosPanel.type = "text/css";
        hojaEstilosPanel.innerText = estilosPanel;
        document.head.appendChild(hojaEstilosPanel);
    }

    // :::::: Menú ::::::

    function menu_AutoFillQuizApp() {
        // Crear el contenedor del menú lateral
        const menu = document.createElement('div');
        menu.id = 'menu-autofillquizapp';
        menu.classList.add('menu-autofillquizapp');
        menu.style.display = 'none'; // Oculto por defecto

        // Crear el contenedor para el botón de cerrar y la palabra Menú
        const contenedorHeader = document.createElement('div');
        contenedorHeader.classList.add('contenedor-header-menu');

        // Título "Menú"
        const tituloMenu = document.createElement('span');
        tituloMenu.classList.add('titulo-menu');
        tituloMenu.innerText = 'Menú';

        // Botón para cerrar el menú
        const botonCerrar = document.createElement('button');
        botonCerrar.id = 'boton-cerrar-menu-autofillquizapp';
        botonCerrar.classList.add('boton-cerrar-menu-autofillquizapp');
        botonCerrar.innerHTML = '<i class="fa-solid fa-times"></i>'; // Icono de cierre

        // Añadir evento para cerrar el menú cuando se haga clic en el botón
        botonCerrar.addEventListener('click', () => {
            menu.style.display = 'none'; // Ocultar menú
        });

        // Añadir el botón de cerrar y el título al contenedor de cabecera
        contenedorHeader.appendChild(botonCerrar);
        contenedorHeader.appendChild(tituloMenu);

        // Crear el contenedor de las opciones del menú
        const contenedorOpciones = document.createElement('div');
        contenedorOpciones.classList.add('contenedor-opciones-menu');

        // Crear las opciones del menú, incluyendo la nueva opción "Gestion de Usuarios"
        const opciones = ['AutoFill', 'Configuración de Ruta', 'Generar PDF de preguntas', 'Gestión de Usuarios'];
        opciones.forEach(opcion => {
            const botonOpcion = document.createElement('button');
            botonOpcion.id = `opcion-${opcion.toLowerCase().replace(/ /g, '-')}-autofillquizapp`;
            botonOpcion.classList.add('opcion-menu-autofillquizapp');

            // Asignar el icono correspondiente
            let icono;
            switch (opcion) {
                case 'AutoFill':
                    icono = 'edit';
                    break;
                case 'Configuración de Ruta':
                    icono = 'database';
                    break;
                case 'Generar PDF de preguntas':
                    icono = 'file-pdf';
                    break;
                case 'Gestión de Usuarios':
                    icono = 'id-card';
                    break;
                default:
                    icono = 'circle';
            }

            botonOpcion.innerHTML = `<i class="fa-solid fa-${icono}"></i> ${opcion}`; // Icono según la opción

            // Añadir evento para manejar la selección de una opción del menú
            botonOpcion.addEventListener('click', async () => { // Convertir la función en asíncrona
                const contenedorContenido = document.getElementById('contenido-principal');
                if (contenedorContenido) {
                    // Mostrar el contenido y ejecutar el script correspondiente a la opción seleccionada
                    if (opcion === 'AutoFill') {
                        localStorage.setItem('ultimoHtml', 'opcionAutoQuiz_html' );
                        localStorage.setItem('ultimoJs', 'opcionAutoQuiz_js');

                        contenedorContenido.innerHTML = opcionAutoQuiz_html(); // Mostrar contenido de AutoFill

                        try {
                            await opcionAutoQuiz_js(); // Ejecutar el script de AutoQuiz y esperar su finalización

                        } catch (error) {
                            console.error('Error al ejecutar opcionAutoQuiz_js:', error);
                        }

                    } else if (opcion === 'Configuración de Ruta') {
                        localStorage.setItem('ultimoHtml', 'opcionConfigRuta_html' );
                        localStorage.setItem('ultimoJs', 'opcionConfigRuta_js');

                        contenedorContenido.innerHTML = opcionConfigRuta_html(); // Mostrar contenido de Configuración de Ruta
                        opcionConfigRuta_js(); // Ejecutar el script de Configuración de Ruta
                    } else if (opcion === 'Generar PDF de preguntas') {
                        localStorage.setItem('ultimoHtml', 'opcionGenerarPDF_html' );
                        localStorage.setItem('ultimoJs', 'opcionGenerarPDF_js');

                        contenedorContenido.innerHTML = opcionGenerarPDF_html(); // Mostrar contenido de Generar PDF
                        opcionGenerarPDF_js(); // Ejecutar el script para generar PDF
                    } else if (opcion === 'Gestión de Usuarios') {
                        localStorage.setItem('ultimoHtml', 'opcionGestionUsuarios_html' );
                        localStorage.setItem('ultimoJs', 'opcionGestionUsuarios_js');

                        contenedorContenido.innerHTML = opcionGestionUsuarios_html(); // Mostrar contenido de Gestión de Usuarios
                        opcionGestionUsuarios_js(); // Ejecutar el script para Gestión de Usuarios
                    }
                    menu.style.display = 'none'; // Ocultar el menú después de seleccionar una opción
                }
            });

            // Añadir el botón de opción al contenedor de opciones
            contenedorOpciones.appendChild(botonOpcion);
        });

        // Crear el contenedor para el botón de cerrar sesión
        const contenedorCerrarSesion = document.createElement('div');
        contenedorCerrarSesion.classList.add('contenedor-cerrar-sesion');

        // Botón para cerrar sesión
        const botonCerrarSesion = document.createElement('button');
        botonCerrarSesion.id = 'boton-cerrar-sesion';
        botonCerrarSesion.classList.add('boton-cerrar-sesion');
        botonCerrarSesion.innerText = 'Cerrar Sesión';

        // Asignar la función de cerrar sesión y ocultar el menú
        botonCerrarSesion.addEventListener('click', () => {
            cerrarSesionAutoQuiz(); // Llama a la función para cerrar sesión
            menu.style.display = 'none'; // Ocultar el menú después de cerrar sesión
        });

        // Añadir el botón de cerrar sesión al contenedor
        contenedorCerrarSesion.appendChild(botonCerrarSesion);

        // Añadir el contenedor de cabecera, opciones y el botón de cerrar sesión al menú
        menu.appendChild(contenedorHeader);
        menu.appendChild(contenedorOpciones);
        menu.appendChild(contenedorCerrarSesion);

        // Retornar el menú para ser usado en otro lugar
        return menu;
    }


    function cssMenu_AutoFillQuizApp() {
        const estilosMenu = `
    /* Estilos para el menú lateral */
    #menu-autofillquizapp {
        position: fixed;
        top: 0;
        left: 0; /* Posicionar el menú a la izquierda */
        width: 350px; /* Ancho de 350px */
        height: 100vh; /* Ocupar toda la altura de la pantalla */
        background-color: #2c3e50; /* Fondo oscuro elegante */
        color: #ecf0f1; /* Texto claro */
        z-index: 10000;
        display: none; /* Oculto por defecto */
        flex-direction: column;
        padding-top: 20px;
        border-radius: 0 5px 5px 0; /* Borde redondeado en los lados derecho */
        overflow-y: auto; /* Scroll si es necesario */
        box-shadow: 2px 0 12px rgba(0, 0, 0, 0.2); /* Sombra suave */
        font-family: 'Poppins', sans-serif; /* Aplicar Poppins a todo el menú */
    }

    /* Contenedor del botón cerrar y la palabra Menú */
    .contenedor-header-menu {
        display: flex;
        align-items: center;
        justify-content: space-between; /* Alinear título a la izquierda y botón a la derecha */
        padding: 10px;
        position: relative;
    }

    /* Botón para cerrar el menú, alineado a la derecha */
    #boton-cerrar-menu-autofillquizapp {
        background-color: #e74c3c; /* Fondo rojo típico de los botones de cerrar */
        color: #fff;
        border: none;
        font-size: 18px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 5px;
        position: absolute;
        right: 25px; /* Posicionar a la derecha */
    }

    #boton-cerrar-menu-autofillquizapp:hover {
        background-color: #c0392b; /* Cambio de color en hover */
    }

    /* Título "Menú", alineado a la izquierda */
    .titulo-menu {
        font-size: 22px;
        font-weight: bold;
        color: #ecf0f1;
        font-family: 'Poppins', sans-serif; /* Aplicar Poppins al título */
        text-align: left;
        flex-grow: 1; /* Ocupa el espacio disponible */
        margin-left: 10px; /* Separación desde el borde izquierdo */
    }

    /* Contenedor de las opciones */
    .contenedor-opciones-menu {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
    }

    /* Opciones del menú */
    .opcion-menu-autofillquizapp {
        width: 100%;
        padding: 15px 20px;
        background: none;
        border: none;
        color: #ecf0f1;
        font-size: 18px;
        text-align: left;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-family: 'Poppins', sans-serif; /* Aplicar Poppins a las opciones */
        transition: background-color 0.3s ease, padding-left 0.3s ease;
    }

    .opcion-menu-autofillquizapp:hover {
        background-color: rgba(255, 255, 255, 0.1); /* Efecto hover */
        padding-left: 30px; /* Animación de desplazamiento */
    }

    .opcion-menu-autofillquizapp i {
        margin-right: 15px; /* Espacio entre el icono y el texto */
    }

    /* Contenedor para el botón de cerrar sesión */
    .contenedor-cerrar-sesion {
        margin-top: auto; /* Poner el botón de cerrar sesión al final del menú */
        padding: 20px;
    }

    /* Botón para cerrar sesión */
    .boton-cerrar-sesion {
        width: 100%;
        padding: 12px;
        background-color: #e74c3c;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
        font-family: 'Poppins', sans-serif; /* Aplicar Poppins al botón de cerrar sesión */
    }

    .boton-cerrar-sesion:hover {
        background-color: #c0392b;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    /* Responsivo para pantallas pequeñas */
    @media (max-width: 768px) {
        #menu-autofillquizapp {
            width: 250px;
        }

        .opcion-menu-autofillquizapp {
            font-size: 16px;
        }
    }
    `;

        const hojaEstilosMenu = document.createElement("style");
        hojaEstilosMenu.type = "text/css";
        hojaEstilosMenu.innerText = estilosMenu;
        document.head.appendChild(hojaEstilosMenu);
    }

    // :::::: Opcion  ::::::

    function opcionGestionUsuarios_css() {
        const estilosGestionUsuarios = `

.btn-copiar-usuarios-firebase {
    display: flex;
    align-items: center;
    justify-content: center; /* Alineación horizontal */
    background-color: #333;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
}

.btn-copiar-usuarios-firebase:hover {
    background-color: black;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}


        .comprobar-usuarios {
            margin-top: 10px;
             margin-bottom: 10px;
        }
                .guardar-usuarios-filtro {

             margin-bottom: 10px;
        }

.header-comprobar-usuarios h2 {
    font-size: 20px;
    font-weight: 600;
    color: #34495e;

    margin-bottom: 10px;
    text-align: center; /* Centrar el texto */
}

.header-filtrar-usuarios h2 {
    font-size: 20px;
    font-weight: 600;
    color: #34495e;

    margin-bottom: 10px;
    text-align: center; /* Centrar el texto */
}




        .body-gestion-usuarios {
            display: flex;
            flex-direction: column;
            gap: 0px;
            font-size: 16px;
            width: 100%; /* Para que ocupe el 100% del ancho del contenedor padre */
        }

        /* Botones estilizados */

.botonBorrarUsuarios {
    width: 100%;
    padding: 12px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

}

/* Efecto hover en los botones */
.botonBorrarUsuarios:hover {
    background-color: #c0392b;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.estilo-gestion-usuarios-boton {
    width: 100%;
    padding: 12px;
    background-color: #0072c5;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

}

/* Efecto hover en los botones */
.estilo-gestion-usuarios-boton:hover {
    background-color: #002c67;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

        .subcontainer-gestion-usuarios {
                margin-top: 10px;
            margin-bottom: 10px;
            background-color: #f4f4f4;
            padding: 10px 15px;
            border-radius: 8px;
            border: 1px solid #dcdcdc;
            overflow-y: auto; /* Habilitar desplazamiento si es necesario */

.estilo-gestion-usuarios-boton.usuarios {
    margin-top: 8px; /* Ajusta el valor según el espacio que necesites */
}

        }

    `;

        const hojaGestionUsuarios = document.createElement("style");
        hojaGestionUsuarios.type = "text/css";
        hojaGestionUsuarios.innerText = estilosGestionUsuarios;
        document.head.appendChild(hojaGestionUsuarios);
    }


    // Función para generar HTML base
    function opcionGestionUsuarios_html() {
        return `
        <div class="header-autoquiz">
            <!-- Título -->
            <h3 id="titulo-autoquiz">Gestión de Usuarios</h3>
        </div>


        <div id="container-comprobar-usuarios" class="subcontainer-gestion-usuarios ">

         <div class="body-gestion-usuarios">
            <!-- Body -->
            <label for="loginUrlSelect" class="estilo-configruta-item">URL de la Página</label>
            <select id="loginUrlSelect" class="estilo-configruta-select" style="margin-bottom: 10px;">
            </select>

            <label for="loginCicloSelect" class="estilo-configruta-item">Ciclo</label>
            <select id="loginCicloSelect" class="estilo-configruta-select" style="margin-bottom: 10px;">
            </select>
        </div>


            <div class="header-comprobar-usuarios">

            </div>


            <div class="guardar-usuarios">
                <button id="botonGuardar" class="estilo-gestion-usuarios-boton usuarios">Usuarios a Comprobar</button>
                <textarea id="textoUsuarios" placeholder="Pegue aquí los datos de los usuarios" style="display:none; width:100%; height:100px; margin-top:10px;"></textarea>
            </div>

            <div class="comprobar-usuarios">
                <button id="botonComprobar" class="estilo-gestion-usuarios-boton comprobar">Comprobar Usuarios</button>
            </div>

                        <div id="copiar-usuarios-firebase">
                <button id="btn-copiar-usuarios-firebase" class="btn-copiar-usuarios-firebase">
               <i class="fa-solid fa-copy" style="margin-right: 5px; font-size: 12px;"></i> Copiar Usuarios de Firebase</button>
            </div>


            <div id="comprobar-usuarios"></div>



                        <label for="carreraSelect" class="estilo-configruta-item">Carrera</label>
            <select id="carreraSelect" class="estilo-configruta-select" style="margin-bottom: 10px;">
            </select>

            <div class="guardar-usuarios-filtro">
                <button id="botonGuardar-usuarios-filtro" class="estilo-gestion-usuarios-boton usuarios">Usuarios a Filtrar</button>
                <textarea id="textoUsuariosFiltro" placeholder="Pegue aquí los datos de los usuarios" style="display:none; width:100%; height:100px; margin-top:10px;"></textarea>
            </div>

            <div class="borrar-usuarios">
                <button id="botonBorrarUsuarios" class="botonBorrarUsuarios">Borrar Usuarios</button>
                <textarea id="textoBorrarUsuarios" placeholder="Pegue aquí los datos de los usuarios" style="display:none; width:100%; height:100px; margin-top:10px;"></textarea>
            </div>
        </div>




        </div>


    `;
    }

    // Función principal
    async function opcionGestionUsuarios_js() {
        console.log('Iniciando');

        // Esperar a que el contenedor principal esté en el DOM
        const contenedorPrincipal = await esperarContenedorPrincipal();

        // Agregar el HTML base en el contenedor deseado
        contenedorPrincipal.innerHTML = opcionGestionUsuarios_html();

        // Referencia al select y a Firebase para loginUrl
        const dbRefLoginUrl = firebase.database().ref('GestionDeUsuarios/loginUrl');
        const loginUrlSelect = document.getElementById('loginUrlSelect');

        // Crear y agregar la opción por defecto
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = "Seleccione una opción";
        loginUrlSelect.appendChild(defaultOption);

        // Cargar opciones desde Firebase para loginUrlSelect
        dbRefLoginUrl.on('value', (snapshot) => {
            if (snapshot.exists()) {
                loginUrlSelect.innerHTML = '';
                loginUrlSelect.appendChild(defaultOption);

                const data = snapshot.val();
                console.log("Datos obtenidos de Firebase (loginUrl):", data);

                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const option = document.createElement('option');
                        option.value = data[key];
                        option.textContent = key;
                        loginUrlSelect.appendChild(option);
                    }
                }

                const opcionGuardada = localStorage.getItem('selectedLoginUrl');
                if (opcionGuardada) {
                    loginUrlSelect.value = opcionGuardada;
                }
            } else {
                console.error("No se encontraron datos en la referencia de Firebase especificada.");
                alert("No se encontraron datos para cargar en el select. Verifica la referencia en Firebase.");
            }
        }, (error) => {
            console.error("Error al obtener datos de Firebase (loginUrl):", error);
            alert("Error al obtener datos de Firebase. Verifica la consola para más detalles.");
        });

        // Guardar la opción seleccionada y su texto en el almacenamiento local
        loginUrlSelect.addEventListener('change', () => {
            localStorage.setItem('selectedLoginUrl', loginUrlSelect.value);
        });

        // Llamar a la función para cargar ciclos en loginCicloSelect
        cargarCiclosDesdeFirebase();

        // Llamar a la función para cargar carreras en carreraSelect
        cargarCarrerasDesdeFirebase();

        // Configurar el botón "Filtrar Usuarios"
        const botonGuardarFiltro = document.getElementById('botonGuardar-usuarios-filtro');
        botonGuardarFiltro.addEventListener('click', alternarFiltrarUsuarios);

        // Agregar el evento de clic al botón "Copiar Usuarios"
        const btnCopiarUsuarios = document.getElementById('btn-copiar-usuarios-firebase');
        btnCopiarUsuarios.addEventListener('click', copiarUsuariosFirebase);

        // Agregar el evento de clic al botón "Guardar Usuarios"
        const botonGuardar = document.getElementById('botonGuardar');
        botonGuardar.addEventListener('click', guardarUsuarios);

        // Definir logoutUrlTemplate para cierre de sesión
        const logoutUrlTemplate = 'https://aulanivelacion.unemi.edu.ec/login/logout.php?sesskey=';

        // Llamar a la función para configurar el botón "Comprobar Usuarios"
        configurarBotonComprobarUsuarios();

        let button = document.getElementById("botonBorrarUsuarios");
        let textArea = document.getElementById("textoBorrarUsuarios");

        button.addEventListener("click", async () => {
            if (button.textContent === "Borrar Usuarios") {
                textArea.style.display = "block"; // Muestra el text area
                button.textContent = "Iniciar Borrado"; // Cambia el texto del botón
            } else if (textArea.value.trim() !== "") {
                const usuarios = textArea.value.trim().split("\n");
                await deletedUsers(usuarios); // Llama a la función para eliminar usuarios
                textArea.value = ""; // Limpia el text area
                textArea.style.display = "none"; // Oculta el text area
                button.textContent = "Borrar Usuarios"; // Restablece el texto del botón
            } else {
                alert("Por favor, ingrese al menos un usuario en el text area.");
            }
        });
    }

    async function deletedUsers(usuarios) {
        for (const usuario of usuarios) {
            const trimmedUser = usuario.trim(); // Elimina espacios en blanco
            if (trimmedUser) {
                try {
                    await database.ref(`GestionDeUsuarios/usuarios/${trimmedUser}`).remove();
                    console.log(`✔️ Usuario ${trimmedUser} eliminado exitosamente.`);
                } catch (error) {
                    console.error(`❌ Error al eliminar el usuario ${trimmedUser}:`, error);
                }
            } else {
                console.warn(`⚠️ Usuario vacío o inválido fue ignorado.`);
            }
        }
        alert("El proceso de eliminación ha terminado.");
    }

    // Nueva función para manejar la lógica de copiar usuarios
    async function copiarUsuariosFirebase() {
        // Obtener los valores necesarios
        const pagina = localStorage.getItem('selectedLoginUrl');
        const ciclo = localStorage.getItem('ciclo-usuarios');
        const carreraSelect = document.getElementById('carreraSelect');
        const carrera = carreraSelect ? carreraSelect.value : '';

        // Referencia a la colección en Firebase Realtime Database
        const usuariosRef = firebase.database().ref('GestionDeUsuarios/usuarios');

        try {
            // Obtener todos los documentos de la colección sin filtrar
            const snapshot = await usuariosRef.once('value');
            const usuarios = [];

            snapshot.forEach((childSnapshot) => {
                usuarios.push(childSnapshot.val());
            });

            // Filtrar usuarios localmente
            const usuariosFiltrados = usuarios.filter((usuario) => {
                const cumplePagina = pagina === 'Todas' || usuario.pagina === pagina;
                const cumpleCiclo = ciclo === 'Todos' || usuario.ciclo === ciclo;
                const cumpleCarrera = carrera === 'Todas' || usuario.carrera === carrera;
                return cumplePagina && cumpleCiclo && cumpleCarrera;
            });

            // Crear el encabezado y formato de datos para pegar en Google Sheets en el nuevo orden
            let dataToCopy = "Usuario\tContraseña\tCarrera\tPágina\tEstado\tCiclo\tFecha\n";
            usuariosFiltrados.forEach(usuario => {
                dataToCopy += `${usuario.usuario}\t${usuario.contraseña}\t${usuario.carrera}\t${usuario.pagina}\t${usuario.estado}\t${usuario.ciclo}\t${usuario.fecha}\n`;
            });

            // Copiar datos al portapapeles
            await navigator.clipboard.writeText(dataToCopy);
            console.log("Datos copiados al portapapeles");

            // Cambiar temporalmente el texto del botón
            const btnCopiarUsuarios = document.getElementById('btn-copiar-usuarios-firebase');
            const originalHTML = btnCopiarUsuarios.innerHTML;
            btnCopiarUsuarios.innerHTML = '<i class="fa-solid fa-check" style="margin-right: 5px; font-size: 12px;"></i> ¡Copiado!';

            // Volver al texto original después de 1 segundo
            setTimeout(() => {
                btnCopiarUsuarios.innerHTML = originalHTML;
            }, 2000);

        } catch (error) {
            console.error("Error al copiar usuarios de Firebase:", error);
        }
    }

    // Función para cargar opciones de ciclo desde Firebase y recordar la selección
    function cargarCiclosDesdeFirebase() {
        const dbRefCiclo = firebase.database().ref('ConfigRuta/opciones/UNEMI/unemi-ciclo');
        const loginCicloSelect = document.getElementById('loginCicloSelect');

        // Crear y agregar la opción por defecto
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = "Seleccione una opción";
        loginCicloSelect.appendChild(defaultOption);

        // Cargar ciclos desde Firebase
        dbRefCiclo.on('value', (snapshot) => {
            if (snapshot.exists()) {
                loginCicloSelect.innerHTML = '';
                loginCicloSelect.appendChild(defaultOption);

                const data = snapshot.val();
                console.log("Datos obtenidos de Firebase (unemi-ciclo):", data);

                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const option = document.createElement('option');
                        option.value = key;
                        option.textContent = data[key];
                        loginCicloSelect.appendChild(option);
                    }
                }

                // Aplicar el valor guardado en localStorage, si existe
                const cicloGuardado = localStorage.getItem('ciclo-usuarios');
                if (cicloGuardado) {
                    loginCicloSelect.value = cicloGuardado;
                }
            } else {
                console.error("No se encontraron datos en la referencia de Firebase para ciclos.");
                alert("No se encontraron datos para cargar en el select de ciclo.");
            }
        }, (error) => {
            console.error("Error al obtener datos de Firebase (unemi-ciclo):", error);
            alert("Error al obtener datos de Firebase. Verifica la consola para más detalles.");
        });

        // Guardar la opción seleccionada en localStorage
        loginCicloSelect.addEventListener('change', () => {
            localStorage.setItem('ciclo-usuarios', loginCicloSelect.value);
        });
    }

    // Esperar hasta que el contenedor principal esté en el DOM
    async function esperarContenedorPrincipal() {
        return new Promise((resolve) => {
            const intervalo = setInterval(() => {
                const contenedor = document.querySelector('#container-comprobar-usuarios');
                if (contenedor) {
                    clearInterval(intervalo);
                    resolve(contenedor.parentElement); // Devuelve el contenedor principal
                }
            }, 100); // Verificar cada 100 ms
        });
    }

    // Función para cargar carreras desde Firebase en el select de carrera
    function cargarCarrerasDesdeFirebase() {
        const dbRefCarreras = firebase.database().ref('GestionDeUsuarios/carreras');
        const carreraSelect = document.getElementById('carreraSelect');

        // Crear y agregar la opción por defecto
        const defaultOption = document.createElement('option');
        defaultOption.value = "Todas";
        defaultOption.selected = true;
        defaultOption.textContent = "Todas";
        carreraSelect.appendChild(defaultOption);

        // Cargar carreras desde Firebase
        dbRefCarreras.on('value', (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const option = document.createElement('option');
                        option.value = key;
                        option.textContent = data[key];
                        carreraSelect.appendChild(option);
                    }
                }
            } else {
                console.error("No se encontraron datos en la referencia de Firebase especificada.");
                alert("No se encontraron datos para cargar en el select de carrera.");
            }
        }, (error) => {
            console.error("Error al obtener datos de Firebase (carreras):", error);
            alert("Error al obtener datos de Firebase. Verifica la consola para más detalles.");
        });
    }

    // Función para alternar el botón de Filtrar Usuarios
    function alternarFiltrarUsuarios() {
        const botonGuardarFiltro = document.getElementById('botonGuardar-usuarios-filtro');
        const textoUsuariosFiltro = document.getElementById('textoUsuariosFiltro');

        // Si el cuadro de texto está oculto, se mostrará para pegar datos
        if (textoUsuariosFiltro.style.display === 'none' || textoUsuariosFiltro.style.display === '') {
            textoUsuariosFiltro.style.display = 'block';
            botonGuardarFiltro.textContent = "Guardar Usuarios Filtrados";
        } else {
            // Si ya está visible, guardamos los datos en localStorage
            guardarUsuariosFiltrados();
            textoUsuariosFiltro.style.display = 'none';
            botonGuardarFiltro.textContent = "Filtrar Usuarios";
        }
    }

    // Función para guardar usuarios filtrados en localStorage
    function guardarUsuariosFiltrados() {
        localStorage.removeItem('listaUsuariosFiltrados');

        const textoUsuariosFiltro = document.getElementById('textoUsuariosFiltro');
        const datosUsuarios = textoUsuariosFiltro.value.trim();

        // Obtener el valor del select de carrera
        const carreraSelect = document.getElementById('carreraSelect');
        const carreraSeleccionada = carreraSelect.value; // Usar el value

        if (datosUsuarios) {
            let usuariosFiltrados = datosUsuarios.split('\n').map((linea, index) => {
                // Eliminar encabezado si la primera línea contiene "Usuario" o "Contraseña"
                if (index === 0 && /usuario|contraseña/i.test(linea)) return null;

                const [usuario, contraseña, ...resto] = linea.trim().split(/\s+/);

                // Verificar que usuario y contraseña están presentes
                if (!usuario || !contraseña) return null;

                // El resto del texto se considera como la carrera
                const carrera = resto.join(' ');

                return { usuario, contraseña, carrera };
            }).filter(usuario => usuario !== null); // Filtrar líneas inválidas o el encabezado eliminado

            // Si la carrera seleccionada es distinta de "Todas", filtrar usuarios por carrera
            if (carreraSeleccionada !== "Todas") {
                usuariosFiltrados = usuariosFiltrados.filter(usuario => usuario.carrera === carreraSeleccionada);
            }

            let usuariosGuardados = JSON.parse(localStorage.getItem("listaUsuariosFiltrados")) || [];

            usuariosFiltrados.forEach(usuarioFiltrado => {
                const indexExistente = usuariosGuardados.findIndex(u => u.usuario === usuarioFiltrado.usuario);

                if (indexExistente !== -1) {
                    const usuarioExistente = usuariosGuardados[indexExistente];

                    if (usuarioExistente.contraseña === usuarioFiltrado.contraseña) {
                        // Si usuario y contraseña son iguales, no hacer nada
                    } else {
                        const contraseñas = new Set(usuarioExistente.contraseña.split(', ').concat(usuarioFiltrado.contraseña));
                        usuariosGuardados[indexExistente].contraseña = Array.from(contraseñas).join(', ');
                    }
                } else {
                    usuariosGuardados.push(usuarioFiltrado);
                }
            });

            // Guardar en localStorage
            localStorage.setItem('listaUsuariosFiltrados', JSON.stringify(usuariosGuardados));

            // Limpiar el área de texto
            textoUsuariosFiltro.value = '';
        } else {
            alert("Por favor, ingrese datos de usuarios antes de guardar.");
        }
    }


    function guardarUsuarios() {
        const botonGuardar = document.getElementById('botonGuardar');
        const textoUsuarios = document.getElementById('textoUsuarios');

        if (botonGuardar.textContent === "Usuarios a Comprobar") {
            // Mostrar el cuadro de texto para pegar la información de usuarios
            textoUsuarios.style.display = 'block';
            botonGuardar.textContent = "Guardar Usuarios";
        } else {
            // Eliminar la lista previa de usuarios en localStorage
            localStorage.removeItem('listaUsuarios');

            // Guardar los datos en localStorage
            const datosUsuarios = textoUsuarios.value.trim();
            if (datosUsuarios) {
                const usuariosNuevos = datosUsuarios.split('\n').map(linea => {
                    const [usuario, contraseña, ...carreraArr] = linea.trim().split(/\s+/);
                    const carrera = carreraArr.join(' ');
                    return { usuario, contraseña,estado: "No Verificado", carrera  };
                });

                let usuariosGuardados = [];

                usuariosNuevos.forEach(usuarioNuevo => {
                    const indexExistente = usuariosGuardados.findIndex(u => u.usuario === usuarioNuevo.usuario);

                    if (indexExistente !== -1) {
                        const usuarioExistente = usuariosGuardados[indexExistente];

                        if (usuarioExistente.contraseña === usuarioNuevo.contraseña) {
                            // Si usuario y contraseña son iguales, no hacer nada
                        } else {
                            // Si la contraseña es diferente, añadir la nueva si no está ya presente
                            const contraseñas = new Set(usuarioExistente.contraseña.split(', ').concat(usuarioNuevo.contraseña));
                            usuariosGuardados[indexExistente].contraseña = Array.from(contraseñas).join(', ');
                        }
                    } else {
                        // Si es un usuario nuevo, agregarlo a la lista
                        usuariosGuardados.push(usuarioNuevo);
                    }
                });

                // Guardar la lista actualizada en localStorage
                localStorage.setItem('listaUsuarios', JSON.stringify(usuariosGuardados));

                // Limpiar y ocultar el cuadro de texto
                textoUsuarios.value = '';
                textoUsuarios.style.display = 'none';

                // Restaurar el texto original del botón
                botonGuardar.textContent = "Usuarios a Comprobar";
            } else {
                alert("Por favor, ingrese datos de usuarios antes de guardar.");
            }
        }
    }

    function configurarBotonComprobarUsuarios() {
        const botonComprobar = document.getElementById("botonComprobar");

        // Configurar contenedor de estadísticas y botón de copiar
        configurarEstadisticas();

        botonComprobar.addEventListener("click", async () => {
            const selectedLoginUrl = localStorage.getItem("selectedLoginUrl");
            let listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));

            if (selectedLoginUrl && listaUsuarios) {
                // Inicializar y mostrar estadísticas al iniciar
                document.getElementById("estadisticas").style.display = 'block';
                actualizarEstadisticas({ total: listaUsuarios.length, verificados: 0, noValidos: 0 });

                // Filtrado de Usuarios Verificados y No Válidos en listaUsuarios
                const usuariosVerificadosPrevios = listaUsuarios.filter(usuario => usuario.estado === "Verificado");
                const usuariosNoValidosPrevios = listaUsuarios.filter(usuario => usuario.estado === "No Válido");

                // Contar usuarios que ya estaban verificados o no válidos antes de la verificación en Firebase
                usuariosVerificadosPrevios.forEach(incrementarVerificados);
                usuariosNoValidosPrevios.forEach(incrementarNoValidos);

                // Filtrar usuarios que no estén en los estados "Verificado" o "No Válido"
                const usuariosSinVerificar = listaUsuarios.filter(usuario => usuario.estado !== "Verificado" && usuario.estado !== "No Válido");

                // Consultar en Firebase y actualizar en listaUsuarios si el estado en Firebase es "Verificado"

                // y la fecha en Firebase tiene una diferencia máxima de 1 hora con la hora actual
                for (const usuario of usuariosSinVerificar) {
                    const datosFirebase = await obtenerDatosDesdeFirebase(usuario);

                    if (datosFirebase && datosFirebase.estado === "Verificado") {
                        // Verificar que la diferencia entre la fecha en Firebase y la hora actual sea menor o igual a 1 hora
                        const fechaFirebase = new Date(datosFirebase.fecha); // Asegurarse de que la fecha esté en formato de Date
                        const fechaActual = Date.now();
                        const diferenciaEnMilisegundos = fechaActual - fechaFirebase.getTime();

                        // Comprobar si la diferencia es menor o igual a 1 hora (3600000 milisegundos)
                        if (diferenciaEnMilisegundos <= 3600000) {
                            // Actualizar el usuario en listaUsuarios con los datos de Firebase
                            usuario.estado = datosFirebase.estado;
                            usuario.contraseña = datosFirebase.contraseña;
                            console.log(`Usuario ${usuario.usuario} actualizado desde Firebase con estado "Verificado".`);

                            // Incrementar el contador de verificados inmediatamente
                            incrementarVerificados();
                        } else {
                            console.log(`Usuario ${usuario.usuario} no cumple con el requisito de fecha (diferencia mayor a 1 hora).`);
                        }
                    }
                }


                // Verificar si ya hay una sesión autenticada y cerrar sesión si es necesario
                if (await verificarAutenticacion()) {
                    console.log("Se detectó una sesión autenticada. Cerrando sesión...");
                    await autoLogout();
                }

                // Procesar usuarios "Sin Verificar" uno por uno mediante POST
                for (const usuario of listaUsuarios) {
                    if (usuario.estado === "Verificado") {
                        continue; // Omitir los ya verificados
                    }
                    await processUserSequentially(usuario, listaUsuarios);
                }

                console.log("Proceso de verificación completado. Resultados guardados.");

                // Guardar lista de usuarios en Firebase después de completar el proceso
                await guardarUsuariosEnFirebase(listaUsuarios, selectedLoginUrl);
            } else {
                console.log("No se encontraron los datos en localStorage.");
            }
        });
    }

    // Función para obtener datos del usuario desde Firebase
    async function obtenerDatosDesdeFirebase(usuario) {
        const dbRef = firebase.database().ref(`GestionDeUsuarios/usuarios/${usuario.usuario}`);
        const snapshot = await dbRef.once('value');
        return snapshot.val(); // Devuelve los datos del usuario en Firebase si existen
    }

    // Función para guardar listaUsuarios en Firebase, usando el nombre de usuario como clave
    async function guardarUsuariosEnFirebase(listaUsuarios, selectedLoginUrl) {
        // Verificar si el usuario está autenticado
        const usuarioActual = firebase.auth().currentUser;
        if (!usuarioActual) {
            console.error("Usuario no autenticado. No se pueden guardar los datos en Firebase.");
            return;
        }

        const dbRef = firebase.database().ref('GestionDeUsuarios/usuarios');
        const fechaActual = new Date().toISOString(); // Fecha actual en formato ISO
        const cicloSeleccionado = localStorage.getItem('ciclo-usuarios'); // Obtener el ciclo seleccionado desde localStorage

        try {
            const updates = {}; // Contendrá todas las actualizaciones para una sola operación

            for (const usuario of listaUsuarios) {
                const usuarioPath = usuario.usuario; // Solo el nombre del usuario, ya que dbRef ya apunta a 'GestionDeUsuarios/usuarios'

                // Obtener datos del usuario en Firebase si ya existen
                const snapshot = await dbRef.child(usuario.usuario).once('value');
                const usuarioEnFirebase = snapshot.val();

                if (!usuarioEnFirebase) {
                    // Caso 1: el usuario no existe en Firebase
                    if (usuario.estado === "Verificado") {
                        // Guardar solo si el estado es "Verificado"
                        updates[usuarioPath] = {
                            ...usuario,
                            fecha: fechaActual,
                            pagina: selectedLoginUrl,
                            ciclo: cicloSeleccionado
                        };
                        console.log(`Usuario ${usuario.usuario} agregado en Firebase.`);
                    } else {
                        console.log(`Usuario ${usuario.usuario} no se guardó en Firebase porque su estado no es "Verificado".`);
                    }
                } else {
                    // Caso 2: el usuario ya existe en Firebase, revisar los subcasos

                    // Subcaso 1: estado "No Válido"
                    if (usuario.estado === "No Válido" && usuarioEnFirebase.contraseña === usuario.contraseña) {
                        updates[usuarioPath] = null; // Marcar para eliminar en batch
                        console.log(`Usuario ${usuario.usuario} eliminado de Firebase porque el nuevo estado es "No Válido" y la contraseña coincide.`);
                    }

                    // Subcaso 2: estado "No Verificado"
                    else if (usuario.estado === "No Verificado") {
                        console.log(`Usuario ${usuario.usuario} no se actualizó porque el estado es "No Verificado".`);
                        // No hacer nada si el estado es "No Verificado"
                    }

                    // Subcaso 3: estado "Verificado" en Firebase
                    else if (usuarioEnFirebase.estado === "Verificado") {
                        // Actualizar solo campos necesarios en Firebase
                        updates[usuarioPath] = {
                            ...usuarioEnFirebase, // Mantener campos previos
                            carrera: usuario.carrera,
                            contraseña: usuario.contraseña, // Actualizar contraseña
                            fecha: fechaActual,
                            pagina: selectedLoginUrl,
                            ciclo: cicloSeleccionado
                        };
                        console.log(`Usuario ${usuario.usuario} actualizado en Firebase.`);
                    }
                }
            }

            // Aplicar todas las actualizaciones en una única llamada a update
            await dbRef.update(updates);
            console.log("Actualización en lote completada en Firebase.");

        } catch (error) {
            console.error("Error al guardar los usuarios en Firebase:", error);
        }
    }


    function configurarEstadisticas() {
        const contenedor = document.getElementById("comprobar-usuarios");
        const estadisticasHtml = `
        <div id="estadisticas" style="display: none;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <p style="font-weight: 500; color: black; margin-bottom: 4px; margin-top: 4px;">Usuarios Totales: <span id="usuarios-totales">0</span></p>
                <button id="copiarDatosBtn" style="
                    display: flex;
                    align-items: center;
                    background-color: #333;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 3px 7px;
                    border-radius: 5px;
                    font-size: 13px;
                ">
                    <i class="fa-solid fa-copy" style="margin-right: 5px; font-size: 12px;"></i>
                    Copiar
                </button>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <p style="font-weight: 500; color: green; margin-bottom: 4px; margin-top: 4px;">Usuarios Verificados: <span id="usuarios-verificados">0</span></p>
                <button id="copiarVerificadosBtn" style="
                    display: flex;
                    align-items: center;
                    background-color: #333;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 3px 7px;
                    border-radius: 5px;
                    font-size: 13px;
                ">
                    <i class="fa-solid fa-copy" style="margin-right: 5px; font-size: 12px;"></i>
                    Copiar
                </button>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <p style="font-weight: 500; color: red; margin-bottom: 4px; margin-top: 4px;">Usuarios No Válidos: <span id="usuarios-no-validos">0</span></p>
                <button id="copiarNoValidosBtn" style="
                    display: flex;
                    align-items: center;
                    background-color: #333;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 3px 7px;
                    border-radius: 5px;
                    font-size: 13px;
                ">
                    <i class="fa-solid fa-copy" style="margin-right: 5px; font-size: 12px;"></i>
                    Copiar
                </button>
            </div>
        </div>
    `;

        contenedor.innerHTML = estadisticasHtml;

        // Restaurar estadísticas si hay datos guardados en localStorage
        const estadisticasGuardadas = JSON.parse(localStorage.getItem("estadisticas"));
        if (estadisticasGuardadas) {
            actualizarEstadisticas(estadisticasGuardadas);
        }

        // Configurar funcionalidad de los botones "Copiar"
        document.getElementById("copiarDatosBtn").addEventListener("click", () => copiarDatos(null, "copiarDatosBtn"));
        document.getElementById("copiarVerificadosBtn").addEventListener("click", () => copiarDatos("Verificado", "copiarVerificadosBtn"));
        document.getElementById("copiarNoValidosBtn").addEventListener("click", () => copiarDatos("No Válido", "copiarNoValidosBtn"));
    }

    // Copiar datos en formato compatible con Google Sheets, con opción de filtrar por estado
    function copiarDatos(filtroEstado = null, botonId) {
        const listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios")) || [];

        // Filtrar usuarios por estado si se ha proporcionado uno
        const usuariosFiltrados = filtroEstado ? listaUsuarios.filter(usuario => usuario.estado === filtroEstado) : listaUsuarios;

        // Verificar si al menos un usuario tiene carrera para decidir si incluir el encabezado "Carrera"
        const incluirCarrera = usuariosFiltrados.some(usuario => usuario.carrera && usuario.carrera.trim() !== "");
        const incluirEstado = !filtroEstado; // Solo incluir el estado si no hay un filtro específico (i.e., copiando todos)

        // Encabezados condicionales
        let encabezados = "Usuario\tContraseña";
        if (incluirEstado) encabezados += "\tEstado";
        if (incluirCarrera) encabezados += "\tCarrera";

        // Generar datos de los usuarios
        const datosParaCopiar = usuariosFiltrados.map(usuario => {
            const carrera = incluirCarrera ? (usuario.carrera.replace(/^Verificado\s*/, '') || "") : ""; // Eliminar "Verificado " si está presente al inicio
            const estado = incluirEstado ? usuario.estado : ""; // Solo incluir estado si está habilitado

            return `${usuario.usuario}\t${usuario.contraseña}${incluirEstado ? `\t${estado}` : ""}${incluirCarrera ? `\t${carrera}` : ""}`;
        }).join('\n');

        // Combinar encabezados con datos
        const textoParaCopiar = `${encabezados}\n${datosParaCopiar}`;

        // Copiar al portapapeles y cambiar el texto temporalmente
        navigator.clipboard.writeText(textoParaCopiar).then(() => {
            const boton = document.getElementById(botonId);
            const textoOriginal = boton.innerHTML;

            // Cambiar texto y icono temporalmente
            boton.innerHTML = `<i class="fa-solid fa-check" style="margin-right: 5px; font-size: 12px;"></i> ¡Copiado!`;

            // Restaurar texto e icono originales después de 1 segundo
            setTimeout(() => {
                boton.innerHTML = textoOriginal;
            }, 1000);
        }).catch(err => {
            console.error("Error al copiar los datos: ", err);
        });
    }


    // Actualizar las estadísticas en el DOM y localStorage
    function actualizarEstadisticas({ total, verificados, noValidos }) {
        document.getElementById("usuarios-totales").textContent = total;
        document.getElementById("usuarios-verificados").textContent = verificados;
        document.getElementById("usuarios-no-validos").textContent = noValidos;

        // Guardar estadísticas actualizadas en localStorage
        localStorage.setItem("estadisticas", JSON.stringify({ total, verificados, noValidos }));
    }

    // Procesar un usuario individualmente
    async function processUserSequentially(usuario, listaUsuarios) {
        const contraseñas = usuario.contraseña.split(',').map(c => c.trim());
        let loginExitoso = false;

        for (const contraseña of contraseñas) {
            if (await autoLogin(usuario.usuario, contraseña)) {
                usuario.estado = "Verificado";
                usuario.contraseña = contraseña;
                await autoLogout();
                loginExitoso = true;
                incrementarVerificados();
                break;
            }
        }

        if (!loginExitoso) {
            usuario.estado = "No Válido";
            usuario.contraseña = contraseñas[0];
            incrementarNoValidos(usuario);
        }

        // Guardar el progreso inmediatamente después de verificar cada usuario
        localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));

        // Pausa de 500 ms para reducir la carga en el servidor
        await delay(500);
    }

    // Incrementar el conteo de usuarios verificados y actualizar las estadísticas
    function incrementarVerificados() {
        const estadisticas = JSON.parse(localStorage.getItem("estadisticas")) || {};
        estadisticas.verificados = (estadisticas.verificados || 0) + 1;
        actualizarEstadisticas(estadisticas);
    }

    // Incrementar el conteo de usuarios no válidos y actualizar la lista y las estadísticas
    function incrementarNoValidos(usuario) {
        const estadisticas = JSON.parse(localStorage.getItem("estadisticas")) || {};
        estadisticas.noValidos = (estadisticas.noValidos || 0) + 1;
        actualizarEstadisticas(estadisticas);
    }

    // Función auxiliar para añadir un retraso
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Función para verificar si hay una sesión autenticada
    async function verificarAutenticacion() {
        const loginUrl = localStorage.getItem("selectedLoginUrl");

        try {
            const response = await fetch(loginUrl, {
                method: 'GET',
                credentials: 'include'
            });
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Verificar si existe un elemento de cierre de sesión, indicando que hay una sesión autenticada
            return doc.querySelector('a.dropdown-item[data-identifier="logout,moodle"][title="logout,moodle"]') !== null;
        } catch (error) {
            console.error('Error al verificar autenticación:', error);
            return false;
        }
    }

    async function autoLogin(username, password) {
        const loginUrl = localStorage.getItem("selectedLoginUrl") + "/login/index.php";

        if (!loginUrl) {
            console.error("La URL de inicio de sesion no esta definida. Verifique el almacenamiento local.");
            return false;
        }

        try {
            const response = await fetch(loginUrl, {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                console.error(`Error al acceder a la pagina de inicio de sesion para ${username}. Codigo de estado: ${response.status}`);
                return false;
            }

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const logintokenInput = doc.querySelector('input[name="logintoken"]');
            const logintoken = logintokenInput ? logintokenInput.value : null;

            if (!logintoken) {
                console.error(`No se pudo obtener el token CSRF para el inicio de sesion de ${username}.`);
                return false;
            }

            const formData = new URLSearchParams();
            formData.append('anchor', '');
            formData.append('logintoken', logintoken);
            formData.append('username', username);
            formData.append('password', password);

            const loginResponse = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Referer': loginUrl
                },
                body: formData.toString(),
                credentials: 'include'
            });

            // Verificar si la página cargada contiene elementos específicos de autenticación
            const loginHtml = await loginResponse.text();
            const loginDoc = parser.parseFromString(loginHtml, 'text/html');

            // Verifica si el usuario autenticado es el mismo que se intentó ingresar
            const authenticatedUserElement = loginDoc.querySelector('.dropdown-user-nick');
            const authenticatedUsername = authenticatedUserElement?.childNodes[1]?.textContent.trim();

            if (authenticatedUsername === username) {
                console.log(`Inicio de sesion exitoso para: ${username}`);
                return true;
            } else {
                console.log("El inicio de sesion no mostro al usuario autenticado esperado. Analizando posibles errores...");
                const errorElement = loginDoc.querySelector('.loginerrors') || loginDoc.querySelector('.alert-danger');

                if (errorElement) {
                    console.error(`Error de inicio de sesion para ${username}: ${errorElement.textContent.trim()}`);
                } else {
                    console.warn(`Inicio de sesion posiblemente exitoso para: ${username} (sin coincidencia del usuario autenticado)`);
                }

                return false;
            }
        } catch (error) {
            console.error(`Error en el proceso de inicio de sesion para ${username}:`, error);
            return false;
        }
    }


    async function autoLogout() {
        const url = localStorage.getItem("selectedLoginUrl");

        try {
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            });
            if (!response.ok) {
                console.log('Error al acceder a la página principal para cerrar sesión.');
                return false;
            }
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const sesskeyInput = doc.querySelector('input[name="sesskey"]');
            const sesskey = sesskeyInput ? sesskeyInput.value : null;

            if (!sesskey) {
                console.log('No se pudo obtener el sesskey para el cierre de sesión.');
                return false;
            }

            const logoutUrlTemplate = localStorage.getItem("selectedLoginUrl") + "/login/logout.php?sesskey=";
            const logoutUrl = `${logoutUrlTemplate}${sesskey}`;
            const logoutResponse = await fetch(logoutUrl, {
                method: 'GET',
                credentials: 'include'
            });

            if (logoutResponse.ok) {
                return true;
            } else {
                console.log('Error al cerrar sesión.');
                return false;
            }
        } catch (error) {
            console.error('Error en el proceso de cierre de sesión:', error);
            return false;
        }
    }

    // :::::: Opcion Generar PDF ::::::

    // Función para generar el HTML de la sección "Generar PDF de preguntas"
    function opcionGenerarPDF_html() {
        // Devolver el HTML para la sección de "Generar PDF de preguntas"
        return `
        <div class="body-autoquiz">
            <div id="container-autoquiz" class="container-autoquiz">
                <h3 class="title-optionmenu">Generar PDF de preguntas</h3>

                <!-- Contenedor Principal -->
                <div id="ultima-ruta-configruta" class="estilo-configruta-title no-seleccionado">
                    <!-- Contenedor para Ruta y Ciclo apilados verticalmente -->
                    <div class="ruta-ciclo-container">
                        <!-- Ruta -->
                        <div id="ruta-configruta" class="title-configruta-ruta">
                            <span class="label-configruta">Ruta:</span> Aún no seleccionada
                        </div>
                        <!-- Ciclo -->
                        <div id="ciclo-configruta" class="title-configruta-ciclo">
                            <span class="label-configruta">Ciclo:</span>
                            <select id="select-ciclo" class="select-ciclo">
                                <option value="" disabled selected>Seleccione un ciclo</option>
                                <option value="1S-2023">1S-2023</option>
                                <option value="2S-2023">2S-2023</option>
                                <option value="1S-2024">1S-2024</option>
                                <option value="2S-2024">2S-2024</option>
                                <option value="Todas">Todas</option>
                            </select>
                        </div>
                    </div>
                    <!-- Mensaje Combinado -->
                    <div id="ruta-no-seleccionada" class="title-configruta-no-seleccionado">
                        Ruta no seleccionada
                    </div>
                </div>

                <!-- Botón para generar el PDF -->
                <button id="boton-generar-pdf" class="estilo-configruta-boton generarpdf">
                    Generar PDF
                </button>
            </div>
        </div>
    `;
    }

    function opcionGenerarPDF_js() {
        // Obtener elementos del DOM una vez y almacenarlos en un objeto para fácil acceso
        const elementosDOM = {
            rutaConfigruta: document.getElementById('ruta-configruta'),
            rutaNoSeleccionada: document.getElementById('ruta-no-seleccionada'),
            rutaConfigElement: document.getElementById('ruta-config'),
            botonGenerarPDF: document.getElementById('boton-generar-pdf')
        };

        // Obtener datos de localStorage una vez
        // Verificar el estado del switch o asumir un valor por defecto (falso si no existe)
        const switchAutosave = localStorage.getItem('switch-ruta-dinamica') === 'true';

        let rutaGuardada;

        // Obtener la referencia según el estado del switch
        if (switchAutosave === true) {
            rutaGuardada = sessionStorage.getItem('configRutaDinamic');
        } else {
            // Si switchAutosave no existe o no es true, usar configRuta de localStorage
            rutaGuardada = localStorage.getItem('configRuta');
        }

        // Manejo del caso en que no se encuentre la referencia
        if (!rutaGuardada) {
            console.warn('No se encontró la ruta de configuración en el almacenamiento correspondiente.');
            return;
        }

        // Aquí puedes continuar con la lógica usando `rutaGuardada`
        console.log('Ruta de configuración encontrada:', rutaGuardada);


        // Función para actualizar la UI
        function actualizarRuta() {
            const { rutaConfigruta, rutaNoSeleccionada } = elementosDOM;

            // Función auxiliar para actualizar texto y estado
            const actualizarElemento = (elemento, label, valor) => {
                const presente = Boolean(valor);
                elemento.innerHTML = `<span class="label-configruta">${label}:</span> ${valor || 'Aún no seleccionado'}`;
                return presente;
            };

            // Actualizar la ruta y ciclo, y determinar si están presentes
            const rutaPresente = actualizarElemento(rutaConfigruta, 'Ruta', rutaGuardada);

            // Mostrar u ocultar el mensaje combinado
            rutaNoSeleccionada.style.display = (!rutaPresente) ? 'block' : 'none';
        }

        // Llamar a la función para actualizar la UI al cargar el script
        actualizarRuta();

        // Actualizar el elemento de rutaConfigElement si existe
        if (elementosDOM.rutaConfigElement) {
            elementosDOM.rutaConfigElement.innerText = `Ruta: ${rutaGuardada || 'Ruta no definida'}`;
        }

        // Configurar el evento para el botón de generar PDF utilizando una función separada
        configurarEventoGenerarPDF(elementosDOM.botonGenerarPDF, rutaGuardada);
    }

    function configurarEventoGenerarPDF(boton, rutaGuardada) {
        if (!boton) return;

        boton.addEventListener('click', async () => {
            console.log('Conectando a Firebase para generar la vista previa del PDF...');

            try {
                // Verificar que Firebase esté disponible
                if (typeof firebase === 'undefined') {
                    throw new Error('Firebase no está inicializado.');
                }

                // Usar la instancia de Firebase ya inicializada
                const database = firebase.database();

                // Validar que rutaGuardada exista antes de proceder
                if (!rutaGuardada) {
                    alert('No se ha definido una ruta. Por favor, configura la ruta antes de generar el PDF.');
                    return;
                }

                // Referencia a las preguntas en la ruta especificada
                const preguntasRef = database.ref(rutaGuardada);
                const preguntasSnapshot = await preguntasRef.once('value');
                let contenidoHTML = '';

                let numeroPregunta = 1; // Contador de preguntas

                // Función auxiliar para procesar cada respuesta
                const procesarRespuesta = (respuesta) => {
                    // Regex para identificar elementos <math>...</math>
                    const mathRegex = /<math[^>]*>[\s\S]*?<\/math>/g;

                    // Regex para identificar URLs de imágenes
                    const imageRegex = /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi;

                    // Regex para identificar Data URIs de imágenes (base64)
                    const dataUriRegex = /(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg)\;base64,[a-zA-Z0-9+/=]+)/gi;

                    // Primero, reemplazar las URLs de imágenes con etiquetas <img>
                    let respuestaProcesada = respuesta.replace(imageRegex, (match) => {
                        return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 100px; max-height: 100px;">`;
                    });

                    // Reemplazar las imágenes en formato Data URI con etiquetas <img>
                    respuestaProcesada = respuestaProcesada.replace(dataUriRegex, (match) => {
                        return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 100px; max-height: 100px;">`;
                    });

                    // Luego, envolver solo los elementos MathML en un <span> con font-size: 1.5em
                    respuestaProcesada = respuestaProcesada.replace(mathRegex, (match) => {
                        return `<span style="font-size: 1.5em;">${match}</span>`;
                    });

                    respuestaProcesada = respuestaProcesada.replace(/(\r\n|\n|\r)/g, '<br>');

                    return respuestaProcesada;
                };

                preguntasSnapshot.forEach((pregunta) => {
                    const {
                        html = 'No HTML disponible',
                        respuestas = [],
                        enunciados = [],
                        tipo = '',
                        estado = 'no verificado',
                        feedback = '' // Agregado: extracción de la retroalimentación
                    } = pregunta.val();

                    // Asegurarse de que respuestas es un array, si no lo es, convertirlo
                    const respuestasArray = Array.isArray(respuestas) ? respuestas : [respuestas];

                    // Determinar si se usa "Respuestas" o "Respuesta"
                    const tituloRespuestas = respuestasArray.length > 1 ? '<strong>Respuestas:</strong><br>' : '<strong>Respuesta:</strong><br>';

                    // Generar el título de la pregunta
                    const tituloPregunta = `Pregunta ${numeroPregunta}`;

                    // Generar el HTML de las respuestas procesadas
                    let respuestasHTML = `${tituloRespuestas} `;

                    if (enunciados.length > 0 && enunciados.length === respuestasArray.length) {
                        respuestasHTML += enunciados.map((enunciado, index) => {
                            const respuesta = respuestasArray[index];
                            return `<br>${enunciado} <strong>➔</strong> ${procesarRespuesta(respuesta)}`;
                        }).join('');
                    }

                    else if (enunciados.length === 0 && respuestasArray.length > 1) {
                        if (tipo === 'draganddrop_text' || tipo === 'draganddrop_image') {
                            respuestasHTML += respuestasArray.map((respuesta, index) => {
                                return ` ${index + 1}. ${procesarRespuesta(respuesta)}`;
                            }).join(',');
                        } else {
                            respuestasHTML += respuestasArray.map(respuesta => {
                                return `• ${procesarRespuesta(respuesta)}`;
                            }).join(',');
                        }
                    } else {
                        const respuesta = respuestasArray[0] || '';
                        respuestasHTML += procesarRespuesta(respuesta);
                    }

                    // Determinar la clase o estilos basados en el estado
                    const claseEstado = (estado.toLowerCase() === 'verificado') ? 'verificado' : 'no-verificado';

                    // Construir el contenido HTML de la pregunta y las respuestas
                    contenidoHTML += `
                    <div class="pregunta-contenedor">
                        <h3>${tituloPregunta}</h3>
                        <div class="content">
                            <div class="formulations clearfix">
                                ${html}

                                <div class="feedback ${claseEstado}">

                                    <div class="rightanswer">
                                        ${respuestasHTML}
                                    </div> <!-- Cierre del rightanswer -->

                                    ${feedback.trim() !== '' ? `
                                    <div class="generalfeedback">
                                        <strong>Retroalimentación:</strong><br>
                                        ${feedback}
                                    </div>
                                    ` : ''}

                                </div> <!-- Cierre del feedback -->
                            </div>

                        </div> <!-- Cierre del content -->
                    </div> <!-- Cierre del pregunta-contenedor -->
                `;

                    numeroPregunta++;
                });

                // Abrir una nueva ventana para la vista previa
                const previewWindow = window.open('', '_blank');

                // Obtener el contenido del <head> de la ventana original
                const headContent = document.querySelector('head').innerHTML;

                // Agregar estilos adicionales en el head, incluyendo los nuevos estilos para estados
                const estilosAdicionales = `
                <style>
                .rightanswer strong {
                  font-weight: 500;
                }

                .generalfeedback strong {
                  font-weight: 500;
                }

                    .pregunta-contenedor {
                        margin-bottom: 20px;
                        font-family: 'Poppins', sans-serif;
                    }
                    .formulation.clearfix {
                        background-color: #e9f3f5;
                        padding: 0.5rem;
                        border-radius: 10px;
                        position: relative; /* Para posicionar la marca de agua */
                        overflow: hidden; /* Para ocultar el contenido que se salga del contenedor */
                    }
                    .formulation.clearfix h3 {
                        position: relative; /* Para asegurar que el título esté por encima de la marca de agua */
                        z-index: 1; /* Colocar el título sobre la marca de agua */
                        margin-left: 3px;
                    }

                    .formulations.clearfix {
                        background-color: #e9f3f5;
                        padding: 0.5rem;
                        border-radius: 10px;
                        position: relative; /* Para posicionar la marca de agua */
                        overflow: hidden; /* Para ocultar el contenido que se salga del contenedor */
                    }
                    .formulations.clearfix h3 {
                        position: relative; /* Para asegurar que el título esté por encima de la marca de agua */
                        z-index: 1; /* Colocar el título sobre la marca de agua */
                        margin-left: 3px;
                    }

                    .pregunta-contenedor p strong {
                        font-weight: bold;
                    }
                    .content {
                        margin-top: 10px;
                    }
                    .custom-watermark {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 100%;
                        height: 100%;
                        opacity: 0.1;
                        transform: translate(-50%, -50%);
                        pointer-events: none;
                    }

                    .respuestasPDF{
                        margin-left: 15px;
                        margin-top: 0px;
                    }
                    .no-overflow {
                        overflow: hidden;
                    }
                    .r0  {
                        display: flex;
                        align-items: center;
                    }

                    .r1  {
                        display: flex;
                        align-items: center;
                    }

                    .d-flex.w-auto {
                        display: flex;
                        align-items: center;
                    }

                    .answernumber {
                        margin-right: 5px; /* Espacio entre el número de la opción y el texto */
                    }

                    .flex-fill {
                        margin-left: 10px; /* Ajuste de margen entre el input y el texto */
                    }

                    .content .feedback.verificado {
                        background-color: #EAF4DD;
                        color: #005742;
                    }
                    .content .feedback.no-verificado {
                        background-color: #FFF1D5;
                        color: #212121;
                    }

                    .content .feedback {
                        max-width: 100%;
                        width: max-content;
                        margin-top: 0;
                        padding: 8px 14px 8px 40px;
                        background-size: 24px;
                        background-repeat: no-repeat;
                        background-position: 12px 9px;
                        border-radius: 5px;
                    }

                    .content .feedback {
                        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23005742' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M8.75 4.75H15.25C17.4591 4.75 19.25 6.54086 19.25 8.75V15.25C19.25 17.4591 17.4591 19.25 15.25 19.25H8.75C6.54086 19.25 4.75 17.4591 4.75 15.25V8.75C4.75 6.54086 6.54086 4.75 8.75 4.75Z'/%3E%3Cpath stroke='%23005742' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M7.75 12.75C7.75 12.75 9 15.25 12 15.25C15 15.25 16.25 12.75 16.25 12.75'/%3E%3Ccircle cx='14' cy='10' r='1' fill='%23005742'/%3E%3Ccircle cx='10' cy='10' r='1' fill='%23005742'/%3E%3C/svg%3E");

                   }

                   .draghome {
                    display: inline-block;
                    text-align: center;
                    background: white;
                    border: 1px solid #000;
                    cursor: move;
                }

                .content .answercontainer, .content .validationerror , .content .draghomes{
                    display: none;
                }

                 a.btn {
                    display: none;
                }

                div.droparea .draghome {
                    position: absolute;
                    cursor: move;
                    white-space: nowrap;
                }
                .rightanswer {
                display: block;
                flex-wrap: wrap;
                align-items: center;
                margin-bottom:10px;
                }



                </style>
            `;

                const scriptAdicional = `
<script>
    document.addEventListener('DOMContentLoaded', () => {
        var formulationElements = document.querySelectorAll('.formulation.clearfix');

        formulationElements.forEach(function(element) {
            if (!element.querySelector('.custom-watermark')) {
                var watermark = document.createElement('img');
                watermark.setAttribute('src', 'https://profes.ac/pub/logoap.svg');
                watermark.setAttribute('alt', 'Academia Profes');
                watermark.className = 'custom-watermark';
                watermark.style.width = '35%';
                watermark.style.height = '35%';
                element.appendChild(watermark);
            }
        });

        // Forzar la re-renderización de MathJax después de modificar los elementos
        if (typeof MathJax !== 'undefined') {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }
    });
</script>
`;


                // Escribir el contenido en la nueva ventana, incluyendo los estilos y el script
                previewWindow.document.open();
                previewWindow.document.write(`
                <html>
                    <head>
                        ${headContent}
                        ${estilosAdicionales}
                        ${scriptAdicional}
                    </head>
                    <body>
                        ${contenidoHTML}
                    </body>
                </html>
            `);
                previewWindow.document.close();

                console.log('Vista previa generada en una nueva ventana con estilos aplicados.');
            } catch (error) {
                console.error('Error al generar la vista previa del PDF:', error);
                alert('Ocurrió un error al generar la vista previa del PDF. Revisa la consola para más detalles.');
            }
        });
    }

    // :::::: Opcion AutoFill ::::::

    // Función para generar el HTML de la interfaz de AutoQuiz

    function opcionAutoQuiz_html() {
        return `
         <div class="body-autoquiz">

    <div class="container-autoquiz">

        <div class="users">

            <!-- Columna para mostrar el nombre de usuario actual con icono de usuario -->
            <div class="usuario-actual">
                <i class="fa-solid fa-user"></i>
                <span id="nombre-usuario-actual" class="nombre-usuario"></span>
            </div>

    <select id="siguiente-usuario" class="select-siguiente-usuario" >
    </select>

    <button id="boton-siguiente-usuario" class="boton-siguiente-usuario">
        <i class="fa-solid fa-angles-right"></i>
    </button>

        </div>


        <!-- Contenedor Principal -->
        <div id="ultima-ruta-configruta" class="estilo-configruta-title no-seleccionado">

            <!-- Contenedor para Ruta y Ciclo apilados verticalmente -->
            <div class="ruta-ciclo-container">

                <!-- Ruta -->
                <div id="ruta-configruta" class="title-configruta-ruta">
                    <span class="label-configruta">Ruta:</span>
                </div>

                <!-- Ciclo -->
                <div id="ciclo-configruta" class="title-configruta-ciclo">
                    <span class="label-configruta">Ciclo:</span>
                </div>

            </div>
        </div>

                <!-- Contenedor para Subject Dinamic -->
<div id="container-ruta-dinamica" class="subcontainer-autoquiz-autosavereview" style="display: none;" >


            <div class="header-autoquiz">
                <!-- Título y Switch -->
                <h3 id="titulo-autoquiz-subject-dinamic">Ruta Dinámica</h3>

                <label class="switch-autoquiz">
                    <input type="checkbox" id="switch-ruta-dinamica">
                    <span class="slider round"></span>
                </label>

            </div>

            <div id="body-autoquiz-autosavereview-subject-dinamic" class="body-autoquiz">

 <div id="selects-subject-dinamic" >
</div>

            </div>
        </div>


        <!-- Nuevo contenedor para AutoFill-->
        <div id="container-autofill" class="subcontainer-autoquiz-autofill" style="display: none;">

            <div class="header-autoquiz">
                <h2 id="titulo-autoquiz">AutoFill</h2>

                <label class="switch-autoquiz">
                    <input type="checkbox" id="switch-autofill">
                    <span class="slider round"></span>
                </label>
            </div>

            <!-- Contenido de AutoFill-->
            <div id="body-autoquiz-autofill" class="body-autoquiz" style="display: none;">

                <!-- Contenedor dinámico para las preguntas generadas -->
                <div id="contenedor-preguntas" class="contenedor-preguntas">
                    <!-- Aquí se insertarán dinámicamente los detalles de cada pregunta -->
                </div>

            </div>
        </div>

        <!-- Contenedor para AutoSave -->
        <div id="container-autosave" class="subcontainer-autoquiz-autosave" style="display: none;">

            <div class="header-autoquiz">
                <!-- Título y Switch -->
                <h2 id="titulo-autoquiz">AutoSave</h2>
                <label class="switch-autoquiz">
                    <input type="checkbox" id="switch-autosave">
                    <span class="slider round"></span>
                </label>
            </div>

            <!-- Contenido de AutoSave -->
            <div id="body-autoquiz-autosave" class="body-autoquiz">

                <div class="dato-autoquiz">
                    <div>
                        <span id="respuestasautosave"></span>
                    </div>
                </div>

            </div>
        </div>


        <!-- Contenedor para AutoSaveReview -->
        <div id="container-autosavereview" class="subcontainer-autoquiz-autosavereview" style="display: none;">

            <div class="header-autoquiz">
                <!-- Título y Switch -->
                <h3 id="titulo-autoquiz">AutoSaveReview</h3>
                <label class="switch-autoquiz">
                    <input type="checkbox" id="switch-autosavereview">
                    <span class="slider round"></span>
                </label>
            </div>

            <!-- Contenido de AutoSaveReview -->
            <div id="body-autoquiz-autosavereview" class="body-autoquiz">

                <div class="dato-autoquiz">
                    <div>
                        <span id="respuestasautosavereview"></span>
                    </div>
                </div>

            </div>
        </div>

        <!-- Contenedor Verified -->
        <div id="container-verified" class="subcontainer-autoquiz-verified" style="display: none;">

            <!-- Head Verified -->
            <div class="header-autoquiz">
            <h4 id="titulo-autoquiz">Verificar Preguntas</h4>

            </div>

            <!-- Body Verified -->
            <div id="body-autoquiz-verified" class="body-autoquiz">

            </div>
        </div>

    </div>

</div>
    `;
    }

    // Convertir la función en asíncrona
    async function opcionAutoQuiz_js() {
        const url = window.location.href;

        // Ejecutar extractRevision() solo si el URL contiene 'grade/report/overview/index.php'
        if (url.includes('grade/report/overview/index.php')) {
            extractRevision();
            viewRevisiones();
        }

        // Llamar a contenedorUsers_js en todas las páginas
        contenedorUsers_js();

        // Mostrar contenedor de ruta dinámica si el URL coincide con ciertas páginas
        if (url.includes('mod/quiz') || url.includes('grade/report/overview/index.php' ) || url.includes('login/index.php' ) ) {
            const rutaDinamicaContainer = document.getElementById('container-ruta-dinamica');
            rutaDinamicaContainer.style.display = 'block';
            await contenedorRutaDinamica_js();
        }
        // Verificar si "switch-ruta-dinamica" no existe en localStorage
        if (!localStorage.getItem('switch-ruta-dinamica')) {
            contenedorRuta_js();
        }


        // Mostrar contenedores de autofill y autosave si estamos en 'mod/quiz/attempt.php'
        if (url.includes('mod/quiz/attempt.php') || url.includes('/mod/quiz/view.php')) {
            const autofillContainer = document.getElementById('container-autofill');
            const autosaveContainer = document.getElementById('container-autosave');
            autofillContainer.style.display = 'block';
            autosaveContainer.style.display = 'block';
            contenedorAutoFill_js();
            contenedorAutoSave_js();
        }

        // Mostrar contenedor de autosavereview si estamos en 'mod/quiz/review.php'
        if (url.includes('mod/quiz/review.php')) {
            const autoSaveReviewContainer = document.getElementById('container-autosavereview');
            autoSaveReviewContainer.style.display = 'block';
            contenedorAutoSaveReview_js();
        }

        // Mostrar contenedor de verified si estamos en cualquiera de las páginas especificadas
        if (url.includes('mod/quiz/review.php') || url.includes('grade/report/overview/index.php') || url.includes('course/user.php')) {
            const verifiedContainer = document.getElementById('container-verified');
            verifiedContainer.style.display = 'block';
            await opcionVerified_js();
        }
    }

    // <<<<<<<<<<<<<< Extraer Revisiones >>>>>>>>>>>>>>

// Función para obtener el nickname
function getNickname() {
    const nicknameElement = document.querySelector('span.dropdown-user-nick.w-100');
    return nicknameElement ? nicknameElement.textContent.trim() : "pop-up";
}

// Función para obtener la universidad desde configRuta
function getUniversity() {
    const configRuta = localStorage.getItem('configRuta');
    if (!configRuta) {
        console.error('No se pudo obtener configRuta desde localStorage.');
        return null;
    }
    return configRuta.split('/')[0] || null;
}

// Función para obtener todas las revisiones existentes del usuario desde Firebase
async function fetchUserRevisions(university, nickname) {
    try {
        // Referencias para revisiones normales y pop-up
        const revisionsRef = database.ref(`${university}/revisiones/${nickname}`);
        const popUpRevisionsRef = database.ref(`${university}/revisiones/pop-up/`);

        // Obtener ambas referencias en paralelo
        const [revisionsSnapshot, popUpRevisionsSnapshot] = await Promise.all([
            revisionsRef.once('value'),
            popUpRevisionsRef.once('value')
        ]);

        const revisions = revisionsSnapshot.val() || {};
        const popUpRevisions = popUpRevisionsSnapshot.val() || {};

        return {
            normal: revisions,
            popUp: popUpRevisions
        };
    } catch (error) {
        console.error(`Error al obtener revisiones para ${nickname}:`, error);
        return {
            normal: {},
            popUp: {}
        };
    }
}

// Función para verificar si una revisión ya existe en Firebase
function existsInFirebase(revisionsData, cmid, attempt, type = 'normal') {
    if (!cmid || !attempt) {
        console.error("Datos incompletos para verificar en Firebase.");
        return false;
    }
    return revisionsData[type][cmid] && revisionsData[type][cmid][attempt];
}

// Función principal para procesar las revisiones
async function viewRevisiones() {
    console.log("Iniciando el proceso de revisión...");

    const nickname = getNickname();
    const university = getUniversity();

    if (!nickname || !university) {
        console.error("No se pudo obtener el nickname o la universidad. Verifique su configuración.");
        return;
    }

    // Obtener todas las revisiones existentes del usuario de una sola vez
    const revisionsData = await fetchUserRevisions(university, nickname);

    const trElements = Array.from(document.querySelectorAll('tr[id^="grade-report-overview-"]'));
    console.log(`Se encontraron ${trElements.length} filas (tr) en la tabla.`);

    // Procesar todas las filas en paralelo
    const rowPromises = trElements.map(async (trElement) => {
        const linkElement = trElement.querySelector('a');
        if (!linkElement) {
            console.log(`Fila ${trElement.id} omitida (sin enlace).`);
            return null;
        }

        const gradeUrl = linkElement.href;
        console.log(`Procesando URL principal: ${gradeUrl} para la fila ${trElement.id}`);

        try {
            const gradeResponse = await fetch(gradeUrl);
            if (!gradeResponse.ok) throw new Error(`Error al acceder a ${gradeUrl}`);

            const gradeHtml = await gradeResponse.text();
            const gradeDocument = new DOMParser().parseFromString(gradeHtml, 'text/html');

            const subLinks = Array.from(
                gradeDocument.querySelectorAll(
                    'a[href*="/mod/quiz/grade.php?id="][href*="&itemnumber="][href*="&userid="]'
                )
            );

            console.log(`Enlaces secundarios encontrados en ${gradeUrl}: ${subLinks.length}`);

            let totalPermitidas = 0;
            let totalNoPermitidas = 0;
            let totalPopUp = 0;
            let revisionesPendientes = 0;

            // Procesar todos los subLinks en paralelo
            const subLinkPromises = subLinks.map(async (subLink) => {
                const subUrl = subLink.href;
                try {
                    const subResponse = await fetch(subUrl);
                    if (!subResponse.ok) throw new Error(`Error al acceder a ${subUrl}`);

                    const subHtml = await subResponse.text();
                    const subDocument = new DOMParser().parseFromString(subHtml, 'text/html');

                    // Encontrar revisiones permitidas
                    const availableRevisions = Array.from(
                        subDocument.querySelectorAll(
                            'a[href*="/mod/quiz/review.php?attempt="][href*="cmid="]'
                        )
                    );

                    // Procesar revisiones disponibles en paralelo
                    const availableRevisionPromises = availableRevisions.map(async (availableLink) => {
                        const url = new URL(availableLink.href, window.location.origin);
                        const attempt = url.searchParams.get('attempt');
                        const cmid = url.searchParams.get('cmid');
                        const exists = existsInFirebase(revisionsData, cmid, attempt, 'normal');
                        if (!exists) revisionesPendientes++;
                    });

                    await Promise.all(availableRevisionPromises);

                    totalPermitidas += availableRevisions.length;

                    // Revisiones no permitidas
                    const noPermissionSpans = subDocument.querySelectorAll('span.noreviewmessage');
                    totalNoPermitidas += noPermissionSpans.length;

                    // Revisiones pop-ups
                    const popupForms = Array.from(
                        subDocument.querySelectorAll('form[action*="/mod/quiz/review.php"]')
                    );

                    // Procesar pop-ups en paralelo
                    const popupFormPromises = popupForms.map(async (popupForm) => {
                        const attemptInput = popupForm.querySelector('input[name="attempt"]');
                        const cmidInput = popupForm.querySelector('input[name="cmid"]');
                        const attempt = attemptInput ? attemptInput.value : null;
                        const cmid = cmidInput ? cmidInput.value : null;
                        console.warn(`attempt ${attempt}:`);
                        console.warn(`cmid ${cmid}:`);

                         console.warn('revisionsData:', revisionsData);


                        // Verificar existencia en la ruta de pop-up
                        const exists = existsInFirebase(revisionsData, cmid, attempt, 'popUp');
                          console.warn(`El pop up esta en firebase ${exists}:`);
                        if (!exists) {
                            revisionesPendientes++;
                        }

                        totalPopUp++;
                    });

                    await Promise.all(popupFormPromises);

                } catch (subError) {
                    console.error(`Error procesando URL secundaria ${subUrl}:`, subError);
                }
            });

            await Promise.all(subLinkPromises);

            console.log(`Totales finales para la fila ${trElement.id}: Revisiones Disponibles=${revisionesPendientes}, Permitidas=${totalPermitidas}, No Permitidas=${totalNoPermitidas}, Pop-Up=${totalPopUp}`);

            // Añadir estadísticas dentro del primer <td> de la fila actual
            const statsElementId = `${trElement.id}_stats`;
            if (!trElement.querySelector(`#${statsElementId}`)) {
                const statsElement = document.createElement('div');
                statsElement.id = statsElementId;
                statsElement.style.fontFamily = 'monospace';
                statsElement.style.marginTop = '5px';

                statsElement.innerHTML = `
                    <span style="color: green;">DISPONIBLES: <strong>${revisionesPendientes}</strong></span>
                    <span style="color: blue;"> PERMITIDAS: <strong>${totalPermitidas}</strong></span>
                    <span style="color: red;"> NO PERMITIDAS: <strong>${totalNoPermitidas}</strong></span>
                    <span style="color: darkorange;"> POP-UP: <strong>${totalPopUp}</strong></span>
                `;

                // Agregar las estadísticas al primer <td> de la fila
                const firstTd = trElement.querySelector('td:first-child');
                if (firstTd) {
                    firstTd.appendChild(statsElement);
                    console.log(`Estadísticas añadidas al primer <td> de la fila ${trElement.id}`);
                } else {
                    console.error(`No se encontró la primera celda (td) en la fila ${trElement.id}`);
                }
            } else {
                console.log(`Las estadísticas ya existen para la fila ${trElement.id}`);
            }
        } catch (error) {
            console.error(`Error procesando la URL principal ${gradeUrl}:`, error);
        }
    });

    await Promise.all(rowPromises);

    console.log("Proceso de revisión finalizado.");
}


    function extractRevision() {
        // Función para esperar un tiempo determinado (utilizando Promesas)
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        // Función para obtener la URL base
        function resolveUrl(href, baseUrl) {
            return href.startsWith('http') ? href : new URL(href, baseUrl).href;
        }

        // Función para abrir una URL en una nueva pestaña simulando un clic en un enlace ancla
        function abrirEnNuevaPestana(url) {
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.click();
        }

        // Función para crear el botón de revisión
        function crearBotonRevision(row) {
            const button = document.createElement('button');
            button.innerHTML = 'Revisiones <i class="fa-regular fa-circle-right"></i>';
            button.style.backgroundColor = 'black';
            button.style.color = 'white';
            button.style.border = '2px solid white';
            button.style.padding = '5px 10px';
            button.style.cursor = 'pointer';
            button.style.display = 'block';
            button.style.borderRadius = '5px';

            button.addEventListener('mouseover', function() {
                button.style.backgroundColor = 'white';
                button.style.color = 'black';
                button.style.border = '2px solid black';
            });

            button.addEventListener('mouseout', function() {
                button.style.backgroundColor = 'black';
                button.style.color = 'white';
                button.style.border = '2px solid white';
            });

            return button;
        }

        // Función principal para obtener las revisiones
        async function obtenerRevisiones(urlInicial) {
            const nickname = getNickname();
            const university = getUniversity();
            if (!nickname || !university) return;

            try {
                const response = await fetch(urlInicial);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                const linksGrade = doc.querySelectorAll('a[href*="mod/quiz/grade.php?id="]');
                const uniqueGradeUrls = new Set();

                linksGrade.forEach(link => {
                    let href = link.getAttribute('href');
                    href = resolveUrl(href, urlInicial);
                    if (/mod\/quiz\/grade\.php\?id=\d+&itemnumber=0&userid=\d+/.test(href)) {
                        uniqueGradeUrls.add(href);
                    }
                });

                if (uniqueGradeUrls.size === 0) {
                    alert('No se encontraron enlaces de calificaciones.');
                    return;
                }

                const gradeUrlsArray = Array.from(uniqueGradeUrls);
                const reviewUrlsToOpen = [];

                for (const gradeUrl of gradeUrlsArray) {
                    const reviewUrls = await procesarGradeUrl(gradeUrl, university, nickname);
                    reviewUrlsToOpen.push(...reviewUrls);
                }

                if (reviewUrlsToOpen.length === 0) {
                    alert('No hay nuevas revisiones para abrir.');
                    return;
                }

                for (let i = 0; i < reviewUrlsToOpen.length; i++) {
                    const reviewUrl = reviewUrlsToOpen[i];
                    if (i > 0) {
                        await delay(1000); // Retraso de 1 segundos
                    }
                    abrirEnNuevaPestana(reviewUrl);
                }
            } catch (error) {
                console.error('Error al obtener la página inicial:', error);
            }
        }


        // Función para procesar cada gradeUrl y obtener los reviewUrls que deben abrirse
        async function procesarGradeUrl(gradeUrl, university, nickname) {
            const reviewUrlsToOpen = [];
            try {
                const responseGrade = await fetch(gradeUrl);
                if (!responseGrade.ok) {
                    throw new Error(`HTTP error! status: ${responseGrade.status}`);
                }
                const htmlGrade = await responseGrade.text();
                const parser = new DOMParser();
                const docGrade = parser.parseFromString(htmlGrade, 'text/html');

                // Manejar enlaces <a> con href
                const linksReview = docGrade.querySelectorAll('a[href*="mod/quiz/review.php?attempt="]');
                const uniqueReviewUrls = new Set();

                linksReview.forEach(link => {
                    let href = link.getAttribute('href');
                    href = resolveUrl(href, gradeUrl);
                    if (/mod\/quiz\/review\.php\?attempt=\d+&cmid=\d+/.test(href)) {
                        uniqueReviewUrls.add(href);
                    }
                });

                // Manejar formularios <form> con action="mod/quiz/review.php"
                const formsReview = docGrade.querySelectorAll('form[action*="mod/quiz/review.php"]');
                formsReview.forEach(form => {
                    const action = form.getAttribute('action');
                    const attemptInput = form.querySelector('input[name="attempt"]');
                    const cmidInput = form.querySelector('input[name="cmid"]');

                    if (action && attemptInput && cmidInput) {
                        const attempt = attemptInput.value;
                        const cmid = cmidInput.value;
                        const fullUrl = `${action}?attempt=${attempt}&cmid=${cmid}`;
                        uniqueReviewUrls.add(fullUrl);
                    }
                });

                for (let reviewUrl of uniqueReviewUrls) {
                    const urlObj = new URL(reviewUrl);
                    const attempt = urlObj.searchParams.get('attempt');
                    const cmid = urlObj.searchParams.get('cmid');

                    if (!attempt || !cmid) {
                        console.warn(`No se pudieron obtener 'attempt' o 'cmid' de la URL: ${reviewUrl}`);
                        continue;
                    }

                    const firebasePathOriginal = `${university}/revisiones/${nickname}/${cmid}/${attempt}`;
                    const firebasePathFallback = `${university}/revisiones/pop-up/${cmid}/${attempt}`;

                    // Buscar en la ruta original
                    const snapshotOriginal = await database.ref(firebasePathOriginal).once('value');

                    if (!snapshotOriginal.exists()) {
                        // Si no existe en la ruta original, buscar en la ruta de respaldo
                        const snapshotFallback = await database.ref(firebasePathFallback).once('value');
                        if (!snapshotFallback.exists()) {
                            // Si tampoco existe en la ruta de respaldo, agregar la URL a abrir
                            reviewUrlsToOpen.push(reviewUrl);
                        } else {
                            console.log(`El intento ${attempt} para cmid ${cmid} ya existe en la ruta de respaldo Firebase. No se abrirá la URL.`);
                        }
                    } else {
                        console.log(`El intento ${attempt} para cmid ${cmid} ya existe en la ruta original Firebase. No se abrirá la URL.`);
                    }
                }
            } catch (error) {
                console.error('Error al procesar la página de calificación:', error);
            }
            return reviewUrlsToOpen;
        }


        // Añadir botones de revisión a cada fila
        function agregarBotones() {
            const rows = document.querySelectorAll('tr[id*="grade-report-overview"]');
            rows.forEach(row => {
                const button = crearBotonRevision(row);
                const buttonContainer = document.createElement('td');
                buttonContainer.appendChild(button);
                row.appendChild(buttonContainer);

                button.addEventListener('click', () => {
                    const link = row.querySelector('a[href]');
                    if (link) {
                        const urlInicial = link.href;
                        obtenerRevisiones(urlInicial);
                    } else {
                        console.warn(`No se encontró ningún enlace dentro del <tr> con ID "${row.id}".`);
                    }
                });
            });
        }

        // Inicializar la adición de botones al cargar el contenido
        agregarBotones();
    }

    // <<<<<<<<<<<<<< Usuarios >>>>>>>>>>>>>>

    function contenedorUsers_js() {
        const elementoDesplegableUsuario = document.querySelector('.dropdown-user-nick');
        const elementoUsuarioActual = document.getElementById('nombre-usuario-actual');
        const selectSiguienteUsuario = document.getElementById('siguiente-usuario');
        const botonSiguienteUsuario = document.getElementById('boton-siguiente-usuario');

        let nombreUsuarioActual = null; // Inicializado como null por defecto

        if (!elementoDesplegableUsuario) {
            console.warn("Elemento .dropdown-user-nick no encontrado. Estableciendo 'No login'.");
            nombreUsuarioActual = "No login"; // Asignar 'No login' como usuario actual
        } else {
            nombreUsuarioActual = elementoDesplegableUsuario.childNodes[1]?.textContent.trim();
            if (!nombreUsuarioActual) {
                console.error("No se pudo obtener el nombre del usuario actual.");
                botonSiguienteUsuario.style.display = 'none';
                return;
            }
        }

        elementoUsuarioActual.textContent = nombreUsuarioActual;

        const usuariosGuardados = JSON.parse(localStorage.getItem('listaUsuariosFiltrados'));
        if (!usuariosGuardados) {
            // console.error("No se encontraron usuarios en localStorage.");
            botonSiguienteUsuario.style.display = 'none';
            return;
        }

        // console.log("Usuarios encontrados en localStorage:", usuariosGuardados);
        const listaUsuarios = Object.values(usuariosGuardados);

        selectSiguienteUsuario.innerHTML = ""; // Limpia el select

        // Identifica el índice del usuario actual
        const indiceUsuarioActual = listaUsuarios.findIndex(usuario => usuario.usuario === nombreUsuarioActual);

        let siguienteUsuarioPredeterminado = null;

        // Si es "No login", selecciona el primer usuario como predeterminado
        if (nombreUsuarioActual === "No login") {
            siguienteUsuarioPredeterminado = listaUsuarios[0]?.usuario || null; // Primer usuario o null si la lista está vacía
        } else if (indiceUsuarioActual !== -1 && indiceUsuarioActual < listaUsuarios.length - 1) {
            siguienteUsuarioPredeterminado = listaUsuarios[indiceUsuarioActual + 1].usuario;
        }

        // Crear opciones en el select
        listaUsuarios.forEach((usuario) => {
            const optionElement = document.createElement("option");
            optionElement.value = usuario.usuario;
            optionElement.textContent = usuario.usuario;

            // Marca la opción predeterminada
            if (usuario.usuario === siguienteUsuarioPredeterminado) {
                optionElement.selected = true;
            }

            selectSiguienteUsuario.appendChild(optionElement);
        });

        if (siguienteUsuarioPredeterminado) {
            // console.log("Nombre del usuario siguiente:", siguienteUsuarioPredeterminado);
        } else if (indiceUsuarioActual === listaUsuarios.length - 1) {
            // console.log("El usuario actual es el último en la lista, no hay usuario después.");
        } else {
            // console.log("Usuario no encontrado");
        }

        // Agregar evento click al botón
        botonSiguienteUsuario.addEventListener('click', procesarUsuarioSeleccionado);

        contenedorRuta_js();
    }

    async function procesarUsuarioSeleccionado() {
        try {
            // Obtiene el valor seleccionado en el select
            const select = document.getElementById('siguiente-usuario');
            const selectedUser = select.value;

            if (!selectedUser) {
                console.error("No se selecciono ningun usuario.");
                return;
            }

            // Obtiene la lista de usuarios desde localStorage
            const listaUsuariosFiltrados = JSON.parse(localStorage.getItem('listaUsuariosFiltrados'));
            if (!listaUsuariosFiltrados) {
                console.error("No se encontro 'listaUsuariosFiltrados' en localStorage.");
                return;
            }

            // Busca el usuario en la lista
            const usuario = listaUsuariosFiltrados.find(user => user.usuario === selectedUser);
            if (!usuario) {
                console.error(`El usuario '${selectedUser}' no fue encontrado en 'listaUsuariosFiltrados'.`);
                return;
            }

            const { usuario: username, contraseña: password } = usuario;

            console.log(`Username: ${username}`);
            console.log(`Password: ${password}`);

            // Verifica si hay una sesion activa
            const sesionActiva = await verificarAutenticacion();
            if (sesionActiva) {
                console.log("Hay una sesion activa. Cerrando sesion...");
                const logoutExitoso = await autoLogout();
                if (!logoutExitoso) {
                    console.error("Error al cerrar la sesion.");
                    return;
                }
            }

            // Inicia sesion con el usuario seleccionado
            console.log(`Iniciando sesion para el usuario: ${username}`);
            const loginExitoso = await autoLogin(username, password);

            if (loginExitoso) {
                console.log(`Redirigiendo a la pagina de calificaciones para el usuario: ${username}`);
                const dominioActual = new URL(localStorage.getItem("selectedLoginUrl")).origin; // Obtiene solo el dominio
                window.location.href = `${dominioActual}/grade/report/overview/index.php`; // Redirige
            } else {
                console.error("No se pudo iniciar sesion. Verifique las credenciales.");
            }
        } catch (error) {
            console.error("Ocurrio un error durante el proceso:", error);
        }
    }

    // <<<<<<<<<<<<<< Ruta Dinamica >>>>>>>>>>>>>>

    async function contenedorRutaDinamica_js() {
        const containerAutoQuiz = document.querySelectorAll('.container-autoquiz');
        const configRuta = localStorage.getItem('configRuta');
        const ciclo = localStorage.getItem('ciclo');

        // console.log('Valores obtenidos de localStorage:', { configRuta, ciclo });

        // Verificar si configRuta y ciclo están definidos
        if (!configRuta || !ciclo) {
            // console.log('configRuta o ciclo no están definidos. Ocultando contenedores y mostrando mensaje de advertencia.');

            // Ocultar todos los elementos con la clase 'container-autoquiz'
            containerAutoQuiz.forEach(container => {
                if (container) {
                    container.style.display = 'none';
                    // console.log('Contenedor .container-autoquiz ocultado:', container);
                }
            });

            // Desactivar autofill y autosave
            localStorage.setItem('autofill-autoquizfillapp', 'desactivado');
            localStorage.setItem('autosave-autoquizfillapp', 'desactivado');
            console.log('Autofill y autosave desactivados en localStorage.');

            // Crear y mostrar el mensaje de advertencia en 'contenido-principal'
            const mensaje = document.createElement('div');
            mensaje.textContent = 'No ha seleccionado una ruta o ciclo';
            mensaje.style.color = 'red';
            mensaje.style.fontWeight = '500';
            mensaje.style.fontSize = '0.95em';
            mensaje.style.fontStyle = 'italic';
            mensaje.style.textAlign = 'center';
            mensaje.id = 'mensaje-ruta-invalida';

            const contenidoPrincipal = document.getElementById('contenido-principal');
            if (contenidoPrincipal && !document.getElementById('mensaje-ruta-invalida')) {
                contenidoPrincipal.appendChild(mensaje);
                console.log('Mensaje de advertencia añadido al contenido principal.');
            }
        }
        else {
            const cicloElemento = document.getElementById('ciclo-configruta');
            if (cicloElemento) {
                // Asignar los valores de ciclo en los elementos del DOM
                cicloElemento.innerHTML = `<span class="label-configruta">Ciclo:</span> ${ciclo}`;
            }
        }

        const switchElement = document.getElementById('switch-ruta-dinamica');
        const contenedorSelects = document.getElementById('selects-subject-dinamic');

        // Lee o inicializa el estado del switch desde localStorage
        let switchState = JSON.parse(localStorage.getItem('switch-ruta-dinamica')) ?? false;
        localStorage.setItem('switch-ruta-dinamica', JSON.stringify(switchState)); // Asegura un valor almacenado

        const url = window.location.href;

        // Configura visualmente el estado del switch en el DOM
        if (switchElement) switchElement.checked = switchState;

        // Verifica si el switch está desactivado (!switchState)
        if (!switchState) {
            console.log("El switch está desactivado.");
            return; // Termina la ejecución
        }

        // El switch está activado
        console.log("El switch está activado.");

        // Verifica si la URL actual incluye 'grade/report/overview/index.php'
        if (url.includes('grade/report/overview/index.php')) {
            const rutaElemento = document.getElementById('ruta-configruta');

            if (rutaElemento) {
                console.log("la ruta es", rutaElemento);
                // Asignar los valores de configRuta y ciclo en los elementos del DOM
                rutaElemento.innerHTML = `<span class="label-configruta">Ruta:</span> <span style="font-weight: 500; color: green;">dinamic</span> `;
                console.log("Se ha actualizado el contenido del elemento con ID 'ruta-configruta'.");

            } else {
                console.log("El elemento con ID 'ruta-configruta' no existe en el DOM.");

            }
            return; // Termina la ejecución
        }

        // Ejecuta la lógica principal
        if (contenedorSelects) {
            await actualizaConfigRutaDinamic(contenedorSelects);
        } else {
            console.warn('El elemento "selects-subject-dinamic" no existe.');
        }
    }

    async function actualizaConfigRutaDinamic(contenedorSelects) {
        try {
            // console.log("Iniciando actualizaConfigRutaDinamic...");

            const configRuta = localStorage.getItem('configRuta');
            if (!configRuta) {
                console.error('No se encontró configRuta en localStorage.');
                return null;
            }
            const universidad = configRuta.split('/')[0];
            // console.log(`Universidad obtenida de configRuta: ${universidad}`);

            const breadcrumbItems = document.querySelectorAll('.breadcrumb-item a[href*="/course/view.php"]');
            const quizItems = document.querySelectorAll('.breadcrumb-item a[href*="/mod/quiz/"]');

            // Obtener Materia
            let materiaValor = null;

            if (breadcrumbItems.length > 0) {
                const breadcrumbTitle = breadcrumbItems[0].getAttribute('title');
                console.log(`Título del breadcrumb encontrado: ${breadcrumbTitle}`);

                // Extraer claves entre corchetes del atributo title
                const matches = breadcrumbTitle.match(/\[([A-Za-z]+[^\]]+)\]/g)?.filter(match => /[A-Za-z]/.test(match));
                console.log(`Coincidencias encontradas en el título del breadcrumb: ${matches}`);

                if (matches && matches.length > 0) {
                    const searchKey = matches[0].replace(/[\[\]]/g, '');
                    console.log(`Clave de búsqueda extraída: ${searchKey}`);

                    const materiaRuta = `ConfigRuta/opciones/${universidad}/unemi:codigo-materias-de-nivelacion`;
                    console.log(`Ruta para materias generada: ${materiaRuta}`);

                    const materiaData = await firebase.database().ref(materiaRuta).once('value');
                    const materiaOptions = materiaData.val();
                    console.log(`Datos obtenidos de Firebase:`, materiaOptions);

                    if (materiaOptions) {
                        let found = false; // Bandera para saber si se encuentra alguna coincidencia

                        // Iterar por cada clave en materiaOptions
                        for (const [key, value] of Object.entries(materiaOptions)) {
                            console.log(`Analizando clave: "${key}" con valores contenidos: "${value}"`);

                            const values = value.split(',').map(item => item.trim());
                            console.log(`Valores separados:`, values);

                            for (const val of values) {
                                if (val.includes(':')) {
                                    const [firstPart, secondPart] = val.split(':').map(part => part.trim());
                                    console.log(`Valor con ":", Parte 1: "${firstPart}", Parte 2: "${secondPart}"`);

                                    console.log(`Comparando "${firstPart}" con "${searchKey}"`);
                                    console.log(`Comparando "${breadcrumbTitle}" con "${secondPart}"`);

                                    if (firstPart === searchKey && breadcrumbTitle.includes(secondPart)) {
                                        materiaValor = key;
                                        console.log(`Coincidencia encontrada en clave: "${key}". materiaValor ahora es: "${materiaValor}"`);
                                        found = true;
                                        break;
                                    }
                                } else {
                                    if (val === searchKey) {
                                        materiaValor = key;
                                        console.log(`Coincidencia encontrada en clave: "${key}". materiaValor ahora es: "${materiaValor}"`);
                                        found = true;
                                        break;
                                    }
                                }
                            }

                            if (found) break;
                        }

                        if (!found) {
                            console.warn(`No se encontró ninguna coincidencia para la clave de búsqueda: ${searchKey}`);
                        }

                    } else {
                        console.warn(`No se encontraron opciones para materias en la ruta: ${materiaRuta}`);
                    }
                } else {
                    console.warn('No se encontraron coincidencias en el título del breadcrumb.');
                }
            } else {
                console.warn('No se encontraron elementos breadcrumb en la página.');
            }



            // Obtener Test
let testClave = null;
if (quizItems.length > 0) {
    const quizText = quizItems[0].querySelector('span.text-truncate').textContent.trim();
    const quizNumberMatch = quizText.match(/\d+/); // Buscar números en formato numérico

    let quizNumber = null;

    if (quizNumberMatch) {
        quizNumber = parseInt(quizNumberMatch[0]);
    } else {
        // Si no se encuentran números, buscar números escritos en palabras
        const numWords = {
            'uno': 1,
            'dos': 2,
            'tres': 3,
            'cuatro': 4,
            'cinco': 5,
            'seis': 6,
            'siete': 7,
            'ocho': 8,
            'nueve': 9,
            'diez': 10
            // Puedes agregar más si lo necesitas
        };

        // Convertir texto a minúsculas y buscar la palabra
        const wordMatch = quizText.toLowerCase().match(/\b(uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\b/);
        if (wordMatch) {
            quizNumber = numWords[wordMatch[0].toLowerCase()];
        }
    }

    if (quizNumber !== null) {
        const testRuta = `ConfigRuta/opciones/${universidad}/unemi:niv-test`;

        const testData = await firebase.database().ref(testRuta).once('value');
        const testOptions = testData.val();

        if (testOptions) {
            testClave = Object.keys(testOptions).find(key => testOptions[key].includes(`Test ${quizNumber}`));
        } else {
            console.warn(`No se encontraron opciones para test en la ruta: ${testRuta}`);
        }
    } else {
        console.warn(`No se encontraron números en el texto: ${quizText}`);
    }
}


            // Actualizar ConfigRutaDinamic
            if (materiaValor && testClave) {
                const configRutaParts = configRuta.split('/');
                configRutaParts[configRutaParts.length - 2] = materiaValor;
                configRutaParts[configRutaParts.length - 1] = testClave;

                const updatedConfigRuta = configRutaParts.join('/');
                sessionStorage.setItem('configRutaDinamic', updatedConfigRuta);

                // Actualizar el elemento HTML con la ruta creada
                const rutaElement = document.getElementById('ruta-configruta');
                if (rutaElement) {
                    rutaElement.innerHTML = `<span class="label-configruta">Ruta:</span> <span style="font-weight: 500; color: green;">${updatedConfigRuta}</span>`;
                    // console.log(`Ruta visual actualizada: ${updatedConfigRuta}`);
                }

                return updatedConfigRuta;

            } else if (window.location.href.includes('grade/report/overview/index.php')) {
                const rutaElement = document.getElementById('ruta-configruta');

                if (rutaElement) {
                    rutaElement.innerHTML = `<span class="label-configruta">Ruta:</span> <span style="font-weight: 500; color: green;">dinamic</span>`;
                    // console.log(`Ruta visual actualizada: ${updatedConfigRuta}`);
                }

            }
            else {
                console.warn('No se pudieron determinar materiaValor o testClave. No se actualizó ConfigRutaDinamic.');

                contenedorRuta_js();

                // Crear selects dinámicos si no se encontraron datos
                const configRutaDinamic = sessionStorage.getItem('configRutaDinamic');

                if (!configRutaDinamic) {
                    console.log('configRutaDinamic no existe en sessionStorage. Creando selects dinámicos...');
                    await crearSelectsDinamicos(contenedorSelects);

                } else {
                    const rutaElemento = document.getElementById('ruta-configruta');
                    const configRutaDinamic = sessionStorage.getItem('configRutaDinamic');

                    if (rutaElemento) {
                        console.log("la ruta es", rutaElemento);
                        // Asignar los valores de configRuta y ciclo en los elementos del DOM
                        rutaElemento.innerHTML = `<span class="label-configruta">Ruta:</span> <span style="font-weight: 500; color: green;">${configRutaDinamic}</span> `;
                        console.log("Se ha actualizado el contenido del elemento con ID 'ruta-configruta'.");

                    }
                    else {
                        console.log("El elemento con ID 'ruta-configruta' no existe en el DOM.");

                    }
                }

                return null;
            }

        } catch (error) {
            console.error('Error en actualizaConfigRutaDinamic:', error);
            return null;
        }
    }

    async function crearSelectsDinamicos() {
        const contenedorSelects = document.getElementById('body-autoquiz-autosavereview-subject-dinamic');

        // Asegurarse de limpiar completamente el contenedor
        if (contenedorSelects) {
            console.log('Limpiando todos los elementos existentes en el contenedor.');
            contenedorSelects.innerHTML = ''; // Elimina todo el contenido del contenedor
        } else {
            console.error('No se encontró el contenedor con id="body-autoquiz-autosavereview-subject-dinamic".');
            return;
        }

        // Leer los datos del localStorage
        const estadoSelects = JSON.parse(localStorage.getItem('estadoSelects')) || [];
        console.log('Datos obtenidos de estadoSelects:', estadoSelects);

        // Filtrar solo los selects de nivel 5
        const selectsNivel5 = estadoSelects.filter(select => select.nivel === "5");
        console.log('Selects nivel 5:', selectsNivel5);

        for (const selectInfo of selectsNivel5) {
            try {
                // Obtener datos de Firebase para la ruta especificada
                const optionsData = await firebase.database().ref(selectInfo.ruta).once('value');
                if (!optionsData.exists()) {
                    console.warn(`No se encontraron datos en la ruta: ${selectInfo.ruta}`);
                    continue;
                }

                const options = optionsData.val();
                console.log(`Opciones obtenidas para ${selectInfo.id}:`, options);

                // Crear el select dinámico
                const selectElement = document.createElement('select');
                selectElement.id = selectInfo.id;
                selectElement.classList.add('dynamic-select');
                selectElement.style.display = 'none';

                // Añadir opciones al select
                for (const [key, value] of Object.entries(options)) {
                    const optionElement = document.createElement('option');
                    optionElement.value = key;
                    optionElement.textContent = value;
                    if (key === selectInfo.seleccion) optionElement.selected = true;
                    selectElement.appendChild(optionElement);
                }

                // Agregar el select al contenedor
                contenedorSelects.appendChild(selectElement);
                console.log(`Select creado para: ${selectInfo.id}`);
            } catch (error) {
                console.error(`Error al procesar el select con ID ${selectInfo.id}:`, error);
            }
        }

        // Crear el botón "Guardar ruta" después de todos los select
        const botonGuardarRuta = document.createElement('button');
        botonGuardarRuta.textContent = 'Guardar Ruta';
        botonGuardarRuta.classList.add('estilo-configruta-boton', 'generarpdf');
        botonGuardarRuta.addEventListener('click', guardarRutaDinamica);

        // Agregar el botón al contenedor
        contenedorSelects.appendChild(botonGuardarRuta);
        console.log('Botón "Guardar ruta" agregado.');

        actualizarVisibilidadSelects(true);
    }

    function guardarRutaDinamica() {
        console.log('Guardando ruta...');

        // Obtener todos los select creados dinámicamente
        const dynamicSelects = document.querySelectorAll('.dynamic-select');

        // Obtener los valores seleccionados en cada select
        const selectedValues = Array.from(dynamicSelects).map(select => select.value);
        console.log('Valores seleccionados:', selectedValues);

        // Obtener configRuta desde localStorage
        const configRuta = localStorage.getItem('configRuta');
        if (!configRuta) {
            console.error('No se encontró configRuta en localStorage.');
            return;
        }

        // Dividir la ruta por "/" y eliminar los últimos dos elementos
        const configRutaParts = configRuta.split('/');
        configRutaParts.splice(-2); // Elimina los últimos dos elementos
        console.log('Partes de configRuta después de eliminar los últimos dos elementos:', configRutaParts);

        // Combinar las partes de configRuta con los valores seleccionados
        const newRuta = [...configRutaParts, ...selectedValues].join('/');
        console.log('Nueva ruta construida:', newRuta);

        // Guardar la nueva ruta en sessionStorage
        sessionStorage.setItem('configRutaDinamic', newRuta);
        console.log('Ruta dinámica guardada en sessionStorage:', newRuta);

        const rutaElemento = document.getElementById('ruta-configruta');
        const configRutaDinamic = sessionStorage.getItem('configRutaDinamic');

        if (rutaElemento) {
            console.log("la ruta es", rutaElemento);
            // Asignar los valores de configRuta y ciclo en los elementos del DOM
            rutaElemento.innerHTML = `<span class="label-configruta">Ruta:</span> <span style="font-weight: 500; color: green;">${configRutaDinamic}</span> `;
            console.log("Se ha actualizado el contenido del elemento con ID 'ruta-configruta'.");

        }
        else {
            console.log("El elemento con ID 'ruta-configruta' no existe en el DOM.");

        }

        // Ocultar el contenedor con id "body-autoquiz-autosavereview-subject-dinamic"
        const contenedorSelects = document.getElementById('body-autoquiz-autosavereview-subject-dinamic');
        if (contenedorSelects) {
            contenedorSelects.style.display = 'none';
            console.log('Contenedor "body-autoquiz-autosavereview-subject-dinamic" ocultado.');
        } else {
            console.error('No se encontró el contenedor con id="body-autoquiz-autosavereview-subject-dinamic".');
        }

        AutoSaveReview_LocalStorage();
    }



    function actualizarVisibilidadSelects(isVisible) {
        const selects = document.querySelectorAll('.dynamic-select');
        selects.forEach(select => select.style.display = isVisible ? 'block' : 'none');
        console.log(`Selects ${isVisible ? "mostrados" : "ocultos"}`);
    }

    // <<<<<<<<<<<<<< Ruta >>>>>>>>>>>>>>

    function contenedorRuta_js() {
        const containerAutoQuiz = document.querySelectorAll('.container-autoquiz');
        const configRuta = localStorage.getItem('configRuta');
        const ciclo = localStorage.getItem('ciclo');

        // console.log('Valores obtenidos de localStorage:', { configRuta, ciclo });

        // Verificar si configRuta y ciclo están definidos
        if (!configRuta || !ciclo) {
            // console.log('configRuta o ciclo no están definidos. Ocultando contenedores y mostrando mensaje de advertencia.');

            // Ocultar todos los elementos con la clase 'container-autoquiz'
            containerAutoQuiz.forEach(container => {
                if (container) {
                    container.style.display = 'none';
                    // console.log('Contenedor .container-autoquiz ocultado:', container);
                }
            });

            // Desactivar autofill y autosave
            localStorage.setItem('autofill-autoquizfillapp', 'desactivado');
            localStorage.setItem('autosave-autoquizfillapp', 'desactivado');
            console.log('Autofill y autosave desactivados en localStorage.');

            // Crear y mostrar el mensaje de advertencia en 'contenido-principal'
            const mensaje = document.createElement('div');
            mensaje.textContent = 'No ha seleccionado una ruta o ciclo';
            mensaje.style.color = 'red';
            mensaje.style.fontWeight = '500';
            mensaje.style.fontSize = '0.95em';
            mensaje.style.fontStyle = 'italic';
            mensaje.style.textAlign = 'center';
            mensaje.id = 'mensaje-ruta-invalida';

            const contenidoPrincipal = document.getElementById('contenido-principal');
            if (contenidoPrincipal && !document.getElementById('mensaje-ruta-invalida')) {
                contenidoPrincipal.appendChild(mensaje);
                console.log('Mensaje de advertencia añadido al contenido principal.');
            }
        }

        else {
            // console.log('configRuta y ciclo están definidos. Mostrando contenedores.');

            // Mostrar los contenedores si configRuta y ciclo están definidos
            containerAutoQuiz.forEach(container => {
                if (container) {
                    container.style.display = 'block';
                    // console.log('Contenedor .container-autoquiz mostrado:', container);
                }
            });

            // Eliminar el mensaje si existe
            const mensajeExistente = document.getElementById('mensaje-ruta-invalida');
            if (mensajeExistente) {
                mensajeExistente.remove();
                console.log('Mensaje de advertencia eliminado.');
            }

            // Establecer el valor de 'Ruta' y 'Ciclo' en el HTML correspondiente
            const rutaElemento = document.getElementById('ruta-configruta');
            const cicloElemento = document.getElementById('ciclo-configruta');

            if (rutaElemento && cicloElemento) {
                // Asignar los valores de configRuta y ciclo en los elementos del DOM
                rutaElemento.innerHTML = `<span class="label-configruta">Ruta:</span> ${configRuta}`;
                cicloElemento.innerHTML = `<span class="label-configruta">Ciclo:</span> ${ciclo}`;
                // console.log(`Valores asignados: Ruta = ${configRuta}, Ciclo = ${ciclo}`);
            }
        }
    }

    // <<<<<<<<<<<<<< AutoFill >>>>>>>>>>>>>>

    function contenedorAutoFill_js() {

        const contenedorAutoFill = document.getElementById('container-autofill');
        const interruptorAutoFill = document.getElementById('switch-autofill');

        // Estado del interruptor de AutoFill
        const estadoInterruptorAutoFill = localStorage.getItem('autofill-autoquizfillapp') || 'desactivado';
        interruptorAutoFill.checked = (estadoInterruptorAutoFill === 'activado');

        interruptorAutoFill.addEventListener('change', function() {
            // Verificar si el body-autoquiz-autofill existe
            const bodyAutoFill = document.getElementById('body-autoquiz-autofill');

            if (this.checked){

                localStorage.setItem('autofill-autoquizfillapp', 'activado');

                // Mostrar el body si existe
                if (bodyAutoFill) {
                    bodyAutoFill.style.display = 'flex';
                }

                // Ejecutar AutoFill_LocalStorage solo si la URL incluye /mod/quiz/attempt.php?
                if (window.location.href.includes('/mod/quiz/attempt.php?')) {
                    AutoFill_LocalStorage();
                }
            } else {
                localStorage.setItem('autofill-autoquizfillapp', 'desactivado');

                // Ocultar el body si existe
                if (bodyAutoFill) {
                    bodyAutoFill.style.display = 'none';
                }
            }
        });
    }

    async function AutoFill_LocalStorage() {

        // console.log('Iniciando la función AutoFill_LocalStorage...');

        // Recuperar la variable principal 'questions-AutoFill' de localStorage o inicializarla como un objeto vacío si no existe.
        let questionsAutoFill = JSON.parse(localStorage.getItem('questions-AutoFill')) || {};

        // Obtener todas las preguntas en la página
        const preguntas = document.querySelectorAll('.formulation.clearfix');
        let contadorPreguntas = 0; // Contador de preguntas

        // Obtener la ruta de referencia para Firebase desde localStorage.
        // Verificar el estado del switch o asumir un valor por defecto (falso si no existe)
        const switchAutosave = localStorage.getItem('switch-ruta-dinamica') === 'true';

        let referenciaRuta;

        // Obtener la referencia según el estado del switch
        if (switchAutosave === true) {
            referenciaRuta = sessionStorage.getItem('configRutaDinamic');
        } else {
            // Si switchAutosave no existe o no es true, usar configRuta de localStorage
            referenciaRuta = localStorage.getItem('configRuta');
        }

        // Manejo del caso en que no se encuentre la referencia
        if (!referenciaRuta) {
            console.warn('No se encontró la ruta de configuración en el almacenamiento correspondiente.');
            return;
        }

        // Aquí puedes continuar con la lógica usando `referenciaRuta`
        console.log('Ruta de configuración encontrada:', referenciaRuta);



        const referencia = firebase.database().ref(referenciaRuta);

        // Obtener preguntas desde Firebase una sola vez para evitar múltiples llamadas
        let preguntasFirebase;
        try {
            preguntasFirebase = await obtenerPreguntasDeFirebase(referencia);
        } catch (error) {
            console.error('Error al obtener preguntas de Firebase:', error);
            // Manejar el error según sea necesario, por ejemplo, retornar o continuar con una lógica alternativa
            preguntasFirebase = {};
        }

        // Función auxiliar para determinar el tipo de pregunta
        function determinarTipoPregunta(formulation_clearfix) {
            const hayUnSoloQtext = formulation_clearfix.querySelectorAll('.qtext').length === 1;
            const dropzonesElement = formulation_clearfix.querySelector('.dropzones') !== null;
            const draghomesElement = formulation_clearfix.querySelector('.draghome') !== null;

            const inputTextCount = formulation_clearfix.querySelectorAll('input[type="text"]').length;
            const inputRadioCount = formulation_clearfix.querySelectorAll('input[type="radio"]').length;
            const inputCheckboxCount = formulation_clearfix.querySelectorAll('input[type="checkbox"]').length;
            const selectCount = formulation_clearfix.querySelectorAll('select').length;

            if (hayUnSoloQtext) {
                if (inputRadioCount > 0 && inputCheckboxCount === 0 && selectCount === 0 && !dropzonesElement && !draghomesElement) {
                    return 'inputradio_opcionmultiple_verdaderofalso';
                }
                if (inputCheckboxCount > 0 && inputRadioCount === 0 && selectCount === 0 && !dropzonesElement && !draghomesElement) {
                    return 'inputchecked_opcionmultiple';
                }
                if (selectCount > 0 && inputRadioCount === 0 && inputCheckboxCount === 0 && !dropzonesElement && !draghomesElement) {
                    return 'select_emparejamiento';
                }
                if (inputTextCount === 1 && inputRadioCount === 0 && inputCheckboxCount === 0 && selectCount === 0 && !dropzonesElement && !draghomesElement) {
                    return 'inputtext_respuestacorta';
                }
            }

            if (draghomesElement && !dropzonesElement) {
                return 'draganddrop_text';
            }

            if (draghomesElement && dropzonesElement) {
                return 'draganddrop_image';
            }

            return 'otroscasos';
        }

        // Procesar cada pregunta de manera asíncrona
        const promesasDePreguntas = Array.from(preguntas).map(async (formulation_clearfix, preguntaPage) => {
            // console.log(`Depuración: Procesando la pregunta número ${preguntaPage + 1}`);

            let numeroPregunta = getQuestionNumber(formulation_clearfix) || ++contadorPreguntas; // Incrementar y asignar

            // Determinar el tipo de pregunta
            let tipoPregunta = determinarTipoPregunta(formulation_clearfix);
            console.log(`Tipo: ${tipoPregunta}`);

            try {
                // Normalizar el HTML de la pregunta
                const normalizedPreguntaHTML = await normalizarHTML(formulation_clearfix.outerHTML);
                // console.log('Pregunta con HTML normalizado:', normalizedPreguntaHTML);

                // Iterar sobre las preguntas de Firebase para encontrar coincidencias
                let coincidenciaEncontrada = false;

                // console.log('Depuración: Preguntas obtenidas desde Firebase:', preguntasFirebase);

                for (const [preguntaFirebaseKey, preguntaFirebaseData] of Object.entries(preguntasFirebase)) {
                    const normalizedFirebaseHTML = await normalizarHTML(preguntaFirebaseData.html);

                    // console.log('Comparando:', { PreguntaHTML: normalizedPreguntaHTML, FirebaseHTML: normalizedFirebaseHTML });

                    const similitud = await compararHTML(
                        normalizedPreguntaHTML,
                        normalizedFirebaseHTML,
                        tipoPregunta,
                        preguntaFirebaseData.tipo
                    );

                    // Similitud entre Pregunta7 y question101:

                    console.log(`Similitud: ${similitud * 100}%`);
                    console.log(`Similitud entre Pregunta${numeroPregunta} y ${preguntaFirebaseKey}: ${(similitud * 100).toFixed(2)}%`);

                    // Si la similitud es mayor a 0.99, consideramos que se encontró una coincidencia
                    if (similitud > 0.99) {
                        questionsAutoFill[`Pregunta${numeroPregunta}`] = {
                            similitud: similitud,
                            questionsFirebase: preguntaFirebaseKey
                        };

                        console.log(`Guardando la respuesta de la Pregunta${numeroPregunta}:`, questionsAutoFill[`Pregunta${numeroPregunta}`]);
                        coincidenciaEncontrada = true;
                        break; // Detener la búsqueda si se encuentra una coincidencia
                    }
                }

                if (!coincidenciaEncontrada) {
                    console.log('Depuración: No se encontró ninguna coincidencia, guardando NO DATA.');
                    questionsAutoFill[`Pregunta${numeroPregunta}`] = { similitud: '0' };
                    console.log(`Depuración: Datos guardados como NO DATA en la clave Pregunta${numeroPregunta}:`, questionsAutoFill[`Pregunta${numeroPregunta}`]);
                }

                // Guardar la variable completa en localStorage después de procesar cada pregunta.
                localStorage.setItem('questions-AutoFill', JSON.stringify(questionsAutoFill));
            } catch (error) {
                console.error(`Error procesando la Pregunta${numeroPregunta}:`, error);
                // Opcional: Manejar el error, por ejemplo, guardar un estado de error en localStorage
                questionsAutoFill[`Pregunta${numeroPregunta}`] = { similitud: 'error' };
                localStorage.setItem('questions-AutoFill', JSON.stringify(questionsAutoFill));
            }
        });

        // Esperar a que se completen todas las promesas antes de ejecutar ResponderPreguntas_AutoFill
        await Promise.all(promesasDePreguntas);
        // console.log('Depuración: Todas las preguntas han sido procesadas. Ejecutando ResponderPreguntas_AutoFill.');
        ResponderPreguntas_AutoFill();
    }

    async function ResponderPreguntas_AutoFill() {
        // console.log('Iniciando la función ResponderPreguntas_AutoFill...');

        // Obtén el objeto questions-AutoFill del localStorage
        const questionsData = JSON.parse(localStorage.getItem('questions-AutoFill'));
        console.log('Datos de preguntas a responder:', questionsData);

        // Verifica si questionsData existe
        if (!questionsData) {
            console.warn('No se encontraron datos en questions-AutoFill. Verifica que los datos estén correctamente almacenados.');
            return;
        }


        // Verificar el estado del switch o asumir un valor por defecto (falso si no existe)
        const switchAutosave = localStorage.getItem('switch-ruta-dinamica') === 'true';

        let referenciaRuta;

        // Obtener la referencia según el estado del switch
        if (switchAutosave === true) {
            referenciaRuta = sessionStorage.getItem('configRutaDinamic');
        } else {
            // Si switchAutosave no existe o no es true, usar configRuta de localStorage
            referenciaRuta = localStorage.getItem('configRuta');
        }

        // Manejo del caso en que no se encuentre la referencia
        if (!referenciaRuta) {
            console.warn('No se encontró la ruta de configuración en el almacenamiento correspondiente.');
            return;
        }


        // Itera sobre cada clave en questionsData (Pregunta1, Pregunta2, etc.) en orden numérico
        const clavesOrdenadas = Object.keys(questionsData).sort((a, b) => {
            const numA = parseInt(a.replace('Pregunta', ''), 10);
            const numB = parseInt(b.replace('Pregunta', ''), 10);
            return numA - numB;
        });

        for (const preguntaClave of clavesOrdenadas) {
            console.log(`Respondiendo la ${preguntaClave}`);

            const pregunta = questionsData[preguntaClave];

            const similitud = (parseFloat(pregunta.similitud) * 100).toFixed(0); // Multiplicamos por 100 y lo mostramos como un número entero

            // Elimina el contenido anterior relacionado con la pregunta si existe
            const contenedorPreguntas = document.getElementById('contenedor-preguntas');
            const previousQuestionContainer = contenedorPreguntas.querySelector(`.question-container-autoquiz[data-key="${preguntaClave}"]`);
            if (previousQuestionContainer) {
                previousQuestionContainer.remove();
            }

            // Crear un contenedor para mostrar los detalles de la pregunta
            const questionContainer = document.createElement('div');
            questionContainer.classList.add('question-container-autoquiz');
            questionContainer.setAttribute('data-key', preguntaClave); // Añadido para identificar el contenedor

            // Construir el HTML básico para la pregunta
            let questionHTML = `
            <strong class="question-title-autoquiz">${preguntaClave}</strong>
        `;

            // Verificar si la similitud es 0 o no y mostrar el contenido adecuado
            if (similitud === "0") {
                // Añadir el mensaje NO DATA para preguntas con similitud 0
                questionHTML += `<div class="question-no-data-autoquiz" style="background-color: red; color: white; font-size: 11px; padding: 0 5px; border-radius: 3px;">NO DATA</div>`;


                console.log(`No hay datos para la ${preguntaClave}.`);

                // Añadir el HTML completo al contenedor
                questionContainer.innerHTML = questionHTML;
                contenedorPreguntas.appendChild(questionContainer);
            } else {
                // Obtener la clave de Firebase de la pregunta
                const questionFirebaseKey = pregunta.questionsFirebase;

                // Crear una referencia a Firebase usando la ruta y la clave de la pregunta
                const referencia = firebase.database().ref(`${referenciaRuta}/${questionFirebaseKey}`);

                // Obtener los datos de Firebase para la pregunta específica de manera secuencial
                try {
                    const snapshot = await referencia.once('value');
                    const datosPreguntaFirebase = snapshot.val();

                    if (!datosPreguntaFirebase) {
                        console.warn(`No se encontraron datos de Firebase para la pregunta ${preguntaClave}.`);
                        continue; // Saltar a la siguiente pregunta si no hay datos
                    }

                    // console.log(`Datos obtenidos de Firebase para la pregunta ${preguntaClave}:`, datosPreguntaFirebase);

                    // Usar el estado de Firebase si está disponible
                    const estado = datosPreguntaFirebase.estado || pregunta.estado || 'No especificado';
                    // console.log('Estado:', estado); // Log para verificar el estado

                    const enunciados = datosPreguntaFirebase.enunciados || '';
                    // console.log('Enunciados:', enunciados); // Log para verificar los enunciados

                    const respuestas = datosPreguntaFirebase.respuestas || '';
                    // console.log('Respuestas:', respuestas); // Log para verificar las respuestas

                    const tipo = datosPreguntaFirebase.tipo || '';
                    // console.log('Tipo:', tipo); // Log para verificar el tipo de pregunta

                    // Crear el HTML con los datos obtenidos de Firebase agrupando las etiquetas y valores
                    questionHTML += `
    <div class="question-data-group">
        <span class="question-label-autoquiz">Estado:</span>
        <span class="question-value-autoquiz" style="background-color: ${estado.toLowerCase() === 'verificado' ? '#00FF00' : estado.toLowerCase() === 'no verificado' ? 'yellow' : 'transparent'};
                                                  color: black;
                                                  font-size: 12px;
                                                  padding: 0 5px;
                                                  border-radius: 3px;">
            ${estado}
        </span>
    </div>
    <div class="question-data-group">
        <span class="question-label-autoquiz">Similitud:</span>
        <span class="question-value-autoquiz">${similitud}%</span>
    </div>
    <div class="responses-container">
`;

                    // Función auxiliar para procesar cada respuesta
                    const procesarRespuesta = (respuesta) => {
                        // Regex para identificar elementos <math>...</math>
                        const mathRegex = /<math[^>]*>[\s\S]*?<\/math>/g;

                        // Regex para identificar URLs de imágenes
                        const imageRegex = /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi;
                        // Regex para identificar Data URIs de imágenes (base64)
                        const dataUriRegex = /(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg)\;base64,[a-zA-Z0-9+/=]+)/gi;

                        // Primero, reemplazar las URLs de imágenes con etiquetas <img>
                        let respuestaProcesada = respuesta.replace(imageRegex, (match) => {
                            return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 100px; max-height: 100px;">`;
                        });
                        // Reemplazar las imágenes en formato Data URI con etiquetas <img>
                        respuestaProcesada = respuestaProcesada.replace(dataUriRegex, (match) => {
                            return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 100px; max-height: 100px;">`;
                        });

                        // Luego, envolver solo los elementos MathML en un <span> con font-size: 1.5em
                        respuestaProcesada = respuestaProcesada.replace(mathRegex, (match) => {
                            return `<span style="font-size: 1.5em;">${match}</span>`;
                        });

                        respuestaProcesada = respuestaProcesada.replace(/(\r\n|\n|\r)/g, '<br>');

                        return respuestaProcesada;
                    };

                    // Verificar si hay una o más respuestas y construir el HTML apropiado
                    if (Array.isArray(respuestas) && respuestas.length > 1) {
                        console.log('Múltiples respuestas detectadas:', respuestas); // Log para verificar si hay más de una respuesta
                        questionHTML += `<span class="question-label-autoquiz">Respuestas:</span><div class="question-value-autoquiz">`;

                        // Si hay enunciado, se itera para mostrar "enunciado ➔ respuesta", de lo contrario se usan viñetas o enumeración
                        questionHTML += respuestas.map((respuesta, index) => {
                            const textoEnunciado = enunciados && Array.isArray(enunciados) ? enunciados[index] || '' : '';

                            // Procesar la respuesta para manejar MathML e imágenes
                            const formattedRespuesta = procesarRespuesta(respuesta);

                            if (textoEnunciado) {
                                // Si hay enunciado, mostrar "enunciado ➔ respuesta"
                                return `${textoEnunciado} ➔ ${formattedRespuesta}`;
                            } else {
                                // Si no hay enunciado, decidir entre viñetas o enumeración según el tipo
                                if (tipo === 'draganddrop_text' || tipo === 'draganddrop_image') {
                                    // Enumeración: "1. respuesta", "2. respuesta", etc.
                                    return `${index + 1}. ${formattedRespuesta}`;
                                } else {
                                    // Viñetas: "• respuesta"
                                    return `• ${formattedRespuesta}`;
                                }
                            }
                        }).join('<br>');

                        questionHTML += `</div>`; // Cerrar el contenedor de respuestas
                    }
                    else {
                        // Si solo hay una respuesta, se muestra como "Respuesta:"
                        let formattedRespuesta = procesarRespuesta(respuestas);

                        questionHTML += `<span class="question-label-autoquiz">Respuesta:</span><div class="question-value-autoquiz">${formattedRespuesta}</div>`;
                    }


                    questionHTML += `
        </div> <!-- Cierra el contenedor de respuestas -->
    </div> <!-- Cierra la sección de datos de la pregunta -->
`;

                    // console.log('HTML completo construido para la pregunta:', questionHTML); // Log para verificar el HTML completo

                    // Añadir el HTML completo al contenedor
                    questionContainer.innerHTML = questionHTML;
                    contenedorPreguntas.appendChild(questionContainer);
                    // console.log('HTML de la pregunta agregado al contenedor de preguntas'); // Log para confirmar la adición del HTML

                    // Llamar a la función AutoFill con los argumentos adecuados
                    AutoFill(enunciados, respuestas, preguntaClave.replace('Pregunta', ''), tipo);
                    // console.log('Llamada a la función AutoFill realizada con:', enunciados, respuestas, preguntaClave.replace('Pregunta', ''), tipo); // Log para verificar los parámetros pasados a AutoFill

                } catch (error) {
                    console.error(`Error al obtener datos de Firebase para la pregunta ${preguntaClave}:`, error);
                }
            }
        }

        console.log('Finalizando AutoFill.');
    }

    async function AutoFill(enunciado, respuestas, numeroPregunta, tipo) {
        console.log('AutoFill ejecutado con los siguientes datos:', {
            Enunciados: enunciado,
            Respuestas: respuestas,
            NumeroPregunta: numeroPregunta,
            Tipo: tipo
        });


        // Buscar todos los elementos formulation_clearfix
        const formulationClearfixes = document.querySelectorAll('.formulation.clearfix');
        let matchedFormulationClearfix = null;
        let contadorSecuencial = 1; // Contador secuencial para asignar números de pregunta si no se encuentran

        // Iterar sobre cada formulation_clearfix para encontrar el que coincida con numeroPregunta
        for (const formulation_clearfix of formulationClearfixes) {
            let contenedorPadre = formulation_clearfix.closest('.content');
            let numeroPreguntaEncontrada = false;

            if (contenedorPadre) {
                let infoHermanos = contenedorPadre.parentElement.querySelector('.info');
                if (infoHermanos) {
                    let numeroPreguntaSpan = infoHermanos.querySelector('.rui-qno');
                    if (numeroPreguntaSpan) {
                        const numeroEncontrado = numeroPreguntaSpan.textContent.trim();
                        if (numeroEncontrado === numeroPregunta) {
                            matchedFormulationClearfix = formulation_clearfix;
                            numeroPreguntaEncontrada = true;
                            break; // Detener la búsqueda una vez que encontramos la coincidencia
                        }
                    }
                }
            }

            // Asignar número secuencial si no se encuentra el número de pregunta
            if (!numeroPreguntaEncontrada) {
                if (contadorSecuencial.toString() === numeroPregunta) {
                    matchedFormulationClearfix = formulation_clearfix;
                    console.log(`No se encontró el número de pregunta en el HTML. Usando número secuencial: ${contadorSecuencial}`);
                    break; // Salir del bucle una vez que asignamos el número secuencial correspondiente
                }
                contadorSecuencial++;
            }
        }

        if (matchedFormulationClearfix) {

            // Manejar diferentes tipos
            if (tipo === 'inputradio_opcionmultiple_verdaderofalso') {
                console.log('Tipo de pregunta: inputradio_opcionmultiple_verdaderofalso');

                // Función para convertir una imagen a Data URI
                function convertImageToDataUri(src) {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.crossOrigin = 'Anonymous'; // Necesario para evitar problemas de CORS
                        img.src = src;

                        img.onload = function () {
                            const canvas = document.createElement('canvas');
                            const context = canvas.getContext('2d');
                            canvas.width = img.naturalWidth;
                            canvas.height = img.naturalHeight;
                            context.drawImage(img, 0, 0);
                            const dataUri = canvas.toDataURL();
                            resolve(dataUri);
                        };

                        img.onerror = function () {
                            reject('Error en la conversión a Data URI');
                        };
                    });
                }

                // Función asíncrona para extraer contenido en orden
                async function extractContentInOrder(node) {
                    let content = '';

                    for (const child of node.childNodes) {
                        if (child.nodeType === Node.TEXT_NODE) {
                            // Extraer el contenido de texto sin aplicar .trim() para preservar los espacios
                            const text = child.textContent;
                            if (text && text !== '\n') { // Evitar añadir contenido vacío o solo saltos de línea
                                content += text;
                            }
                        } else if (child.nodeType === Node.ELEMENT_NODE) {
                            const tagName = child.tagName.toLowerCase();

                            if (tagName === 'script' && child.getAttribute('type') === 'math/tex') {
                                // Ignorar los scripts de tipo MathJax
                                continue;
                            } else if (child.classList.contains('MathJax')) {
                                // Extraer MathML de los elementos MathJax si existen
                                const mathml = child.getAttribute('data-mathml');
                                if (mathml) {
                                    if (content.length > 0 && !content.endsWith(' ') && !content.endsWith('\u00A0')) {
                                        content += ' ';
                                    }
                                    content += mathml;
                                }
                            } else if (tagName === 'img') {
                                // Extraer el atributo 'src' de las imágenes
                                const src = child.getAttribute('src');
                                if (src) {
                                    if (content.length > 0 && !content.endsWith(' ') && !content.endsWith('\u00A0')) {
                                        content += ' ';
                                    }

                                    if (src.includes('pluginfile.php')) {
                                        try {
                                            // Convertir la imagen a Data URI si contiene 'pluginfile.php'
                                            const dataUri = await convertImageToDataUri(src);
                                            content += dataUri; // Añadir el Data URI en lugar de la URL original
                                        } catch (error) {
                                            console.error('Error en la conversión de la imagen:', error);
                                            content += src; // Si falla la conversión, mantener el src original
                                        }
                                    } else {
                                        content += src; // Si no contiene 'pluginfile.php', mantener el src original
                                    }
                                }
                            } else if (tagName === 'sub' || tagName === 'sup') {
                                // Añadir etiquetas <sub> o <sup> sin espacios adicionales
                                content += child.outerHTML;
                            } else if (tagName === 'p') {
                                // Procesar recursivamente el contenido del <p>
                                const childContent = await extractContentInOrder(child);
                                if (childContent) {
                                    if (content.length > 0 && !content.endsWith('\n')) {
                                        content += '\n'; // Añadir un salto de línea antes del nuevo párrafo
                                    }
                                    content += childContent + '\n'; // Añadir el contenido del párrafo seguido de un salto de línea
                                }
                            } else if (tagName === 'br') {
                                // Añadir un salto de línea por cada <br>
                                content += '\n';
                            } else {
                                // Procesar recursivamente otros elementos hijos
                                const childContent = await extractContentInOrder(child);
                                if (childContent) {
                                    content += childContent;
                                }
                            }
                        }
                    }

                    return content;
                }

                // Función asíncrona para procesar las respuestas
                async function procesarRespuestas() {
                    // Iterar sobre todos los inputs de tipo radio dentro de matchedFormulationClearfix
                    const radioInputs = matchedFormulationClearfix.querySelectorAll('input[type="radio"]');
                    for (const input of radioInputs) {
                        // console.log('Procesando input radio:', input);

                        let labelInput;

                        // Obtener el label asociado al input de radio
                        if (input.closest('label')) {
                            labelInput = input.closest('label'); // Busca el label padre más cercano del input
                            // console.log('Label encontrado usando closest:', labelInput);
                        } else if (input.parentElement) {
                            labelInput = input.parentElement; // Si no tiene label, busca el elemento padre
                            // console.log('Label encontrado usando parentElement:', labelInput);
                        } else {
                            labelInput = input.nextElementSibling; // Como último recurso, usa el siguiente hermano del input
                            // console.log('Label encontrado usando nextElementSibling:', labelInput);
                        }

                        let textoRespuesta = ''; // Inicializa una variable para almacenar el texto de la respuesta

                        if (labelInput) {
                            // console.log('Label asociado encontrado:', labelInput);
                            const flexFillElement = labelInput.querySelector('.flex-fill');

                            if (flexFillElement) {
                                // Extraer contenido de .flex-fill en orden
                                textoRespuesta = await extractContentInOrder(flexFillElement);
                                // console.log('Contenido extraído de .flex-fill:', textoRespuesta);
                            } else {
                                // Extraer contenido directamente del label si no existe .flex-fill
                                textoRespuesta = await extractContentInOrder(labelInput);
                                // console.log('Contenido extraído directamente del label:', textoRespuesta);
                            }

                            // Limpiar literales iniciales solo si no hay MathJax
                            const mathJaxElement = labelInput.querySelector('.MathJax');
                            if (!mathJaxElement) {
                                textoRespuesta = textoRespuesta.replace(/^[a-zA-Z]\.|^[ivxlcdmIVXLCDM]+\./, '').trim();
                                // console.log('Texto respuesta limpiado de prefijos:', textoRespuesta);
                            }

                            // Normalizar el textoRespuesta
                            const textoRespuestaNormalizado = textoRespuesta
                            .replace(/^[a-z]\.\s*/i, '') // Elimina prefijos como 'a. ', 'b. ', etc.
                            .replace(/\s+/g, ' ')        // Reemplaza múltiples espacios por uno solo
                            .trim()                      // Elimina espacios al inicio y al final del texto
                            .toLowerCase();              // Convierte todo el texto a minúsculas para hacer la comparación insensible a mayúsculas/minúsculas

                            //                             console.log('Texto respuesta normalizado:', textoRespuestaNormalizado);

                            // Normalizar la variable 'respuestas'
                            const respuestaNormalizada = respuestas
                            .replace(/\s+/g, ' ')
                            .trim()
                            .toLowerCase();
                            // console.log('Respuesta proporcionada normalizada:', respuestaNormalizada);

                            // Comparar y marcar el input si coincide
                            if (textoRespuestaNormalizado === respuestaNormalizada) {
                                input.checked = true;
                                // console.log(`Respuesta seleccionada: ${textoRespuestaNormalizado}`);
                            } else {
                                // console.log(`Respuesta no coincide: ${textoRespuestaNormalizado}`);
                            }

                        } else {
                            console.log('No se encontró labelInput');
                        }
                    }
                }

                // Verificar y procesar MathJax antes de procesar las respuestas
                if (typeof MathJax !== 'undefined' && MathJax.Hub) {
                    // MathJax v2
                    MathJax.Hub.Queue(
                        ['Typeset', MathJax.Hub], // Asegura que MathJax procese el contenido actual
                        function() {
                            // console.log('MathJax ha terminado de procesar.');
                            procesarRespuestas(); // Ejecuta la función principal después de procesar MathJax
                        }
                    );
                } else if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
                    // MathJax v3
                    MathJax.typesetPromise().then(() => {
                        console.log('MathJax v3 ha terminado de procesar.');
                        procesarRespuestas(); // Ejecuta la función principal después de procesar MathJax
                    }).catch((err) => {
                        console.error('Error procesando MathJax:', err);
                        // Puedes decidir si proceder de todas formas o manejar el error de otra manera
                        procesarRespuestas(); // Ejecuta la función principal incluso si hay un error
                    });
                } else {
                    // Si MathJax no está definido, simplemente procede
                    console.warn('MathJax no está definido. Procediendo sin esperar a MathJax.');
                    procesarRespuestas();
                }
            }

            else if (tipo === 'inputchecked_opcionmultiple') {

                // Recorre todos los checkboxes dentro del contenedor previamente definido
                matchedFormulationClearfix.querySelectorAll('input[type="checkbox"]').forEach((input, index) => {
                    console.log(`Procesando checkbox ${index + 1}:`, input);

                    const labelId = input.getAttribute('aria-labelledby');
                    const labelElement = document.getElementById(labelId);

                    if (labelElement) {
                        // Extrae el texto de la respuesta asociado al checkbox
                        let textoRespuesta = labelElement.textContent.trim();
                        console.log(`Texto de la respuesta antes de limpiar: "${textoRespuesta}"`);

                        // Elimina literales iniciales como "a.", "b.", "I.", etc.
                        textoRespuesta = textoRespuesta.replace(/^[a-zA-Z.]+\s*/, '');
                        console.log(`Texto de la respuesta después de limpiar: "${textoRespuesta}"`);

                        // Verifica si el texto de la respuesta está dentro del array de respuestas
                        if (respuestas.includes(textoRespuesta)) {
                            // Marca el checkbox si la respuesta está en el array
                            input.checked = true;
                            console.log(`Checkbox marcado: "${textoRespuesta}"`);
                        } else {
                            // Desmarca el checkbox si la respuesta no está en el array
                            input.checked = false;
                            console.log(`Checkbox desmarcado: "${textoRespuesta}"`);
                        }
                    } else {
                        console.log(`No se encontró el elemento de etiqueta para el checkbox ${index + 1}`);
                    }
                });
            }

            else if (tipo === 'select_emparejamiento') {
                console.log('Procesando tipo: select_emparejamiento');

                // Recorremos cada fila (<tr>) que contiene un enunciado y su select correspondiente
                matchedFormulationClearfix.querySelectorAll('tr').forEach((trElement, index) => {
                    // Extraemos el texto del enunciado que se encuentra en la columna con la clase 'text'
                    let textoPregunta = trElement.querySelector('.text')?.innerText.trim();

                    // Obtenemos el elemento <select> asociado al enunciado actual
                    let selectElement = trElement.querySelector('select');

                    console.log(`Enunciado encontrado: ${textoPregunta}, Índice en la lista de enunciados: ${index}`);

                    // Buscamos el índice del enunciado actual dentro del array de enunciados proporcionado a la función
                    let indicePregunta = enunciado.indexOf(textoPregunta);
                    console.log(`Índice del enunciado en el array proporcionado: ${indicePregunta}`);

                    // Verificamos si el índice del enunciado es válido y si está dentro del rango del array de respuestas
                    if (indicePregunta !== -1 && indicePregunta < respuestas.length) {
                        // Obtenemos la respuesta correcta utilizando el índice del enunciado encontrado
                        let respuestaCorrecta = respuestas[indicePregunta];
                        console.log(`Respuesta correcta esperada para el select: ${respuestaCorrecta}`);

                        // Recorremos todas las opciones disponibles en el select para encontrar la que coincide con la respuesta correcta
                        Array.from(selectElement.options).forEach((option) => {
                            // Comparamos el texto de cada opción con la respuesta correcta
                            if (option.textContent.trim() === respuestaCorrecta) {
                                // Si hay coincidencia, seleccionamos esa opción en el select
                                selectElement.value = option.value;
                                console.log(`Opción seleccionada en select: ${option.textContent.trim()}`);
                            } else {
                                // Si no coincide, registramos que esta opción no es la correcta
                                console.log(`Opción no coincide en select: ${option.textContent.trim()}`);
                            }
                        });
                    } else {
                        // Si no se encuentra un índice válido para el enunciado o no hay respuesta disponible, se registra un mensaje de error
                        console.log(`No se encontró un enunciado o respuesta para el índice: ${indicePregunta}`);
                    }
                });
            }

            else if (tipo === 'inputtext_respuestacorta') {

                // Asegúrate de obtener el valor de la respuesta, ya sea un array o un string
                const respuestaUnica = Array.isArray(respuestas) ? respuestas[0] : respuestas;

                // Asigna el valor de la respuesta directamente al primer input de texto
                const inputElement = matchedFormulationClearfix.querySelector('input[type="text"]');
                if (inputElement) {
                    inputElement.value = respuestaUnica; // Establece el valor del input de texto
                    console.log(`Valor establecido para input de texto: ${respuestaUnica}`);
                }
            }

            else if (tipo === 'draganddrop_text') {
                console.log('Iniciando automatización de drag and drop para tipo:', tipo);

                // Seleccionar todos los elementos con la clase 'formulation clearfix'
                const formulations = document.querySelectorAll('.formulation.clearfix');
                formulations.forEach(formulation => {
                    // Encontrar el primer 'place' para obtener el groupClass
                    const firstPlace = formulation.querySelector('[class*="place"][class*="drop"][class*="group"]');
                    if (!firstPlace) {
                        console.error('No se pudo encontrar un "place" en esta formulación.');
                        return;
                    }

                    // Extraer la clase de grupo (group1, group2, etc.)
                    const groupClass = Array.from(firstPlace.classList).find(cls => cls.startsWith('group'));
                    if (!groupClass) {
                        console.error('No se pudo determinar el número del grupo.');
                        return;
                    }

                    console.log(`Procesando grupo: ${groupClass}`);

                    // Recorremos cada respuesta con un retraso para permitir que Moodle procese cada acción
                    respuestas.forEach((respuesta, index) => {
                        setTimeout(async () => {
                            // Seleccionar el "place" correspondiente al índice (index + 1 porque los "places" empiezan desde 1)
                            const place = formulation.querySelector(`.place${index + 1}.drop.${groupClass}`);
                            if (!place) {
                                console.log(`No se encontró el lugar para la respuesta "${respuesta}" en el grupo ${groupClass}`);
                                return;
                            }

                            // Verificar si ya hay una respuesta colocada en este lugar
                            const existingPlaced = place.nextElementSibling &&
                                  place.nextElementSibling.classList.contains('draghome') &&
                                  place.nextElementSibling.classList.contains('placed');
                            if (existingPlaced) {
                                console.log(`El lugar ${index + 1} ya tiene una respuesta colocada.`);
                                return;
                            }

                            // Seleccionar la opción de respuesta correspondiente por texto
                            const choice = Array.from(document.querySelectorAll(`.draghome.user-select-none.${groupClass}`))
                            .find(el => el.innerText.trim() === respuesta);

                            if (!choice) {
                                console.log(`No se encontró la respuesta "${respuesta}" en el grupo ${groupClass}`);
                                return;
                            }

                            console.log(`Colocando respuesta "${respuesta}" en el lugar ${index + 1} del grupo ${groupClass}`);

                            // Simular drag and drop usando eventos de mouse y drag
                            await simulateDragAndDropMouse(choice, place);

                            // Actualizar el valor del campo oculto asociado al "place"
                            const hiddenInput = formulation.querySelector(`input.place${index + 1}.${groupClass}`);
                            if (hiddenInput) {
                                const value = getValueForRespuesta(choice);
                                hiddenInput.value = value;
                                // Desencadenar eventos para que Moodle detecte el cambio
                                if (window.jQuery) {
                                    // Si jQuery está disponible, usarlo para disparar los eventos
                                    window.jQuery(hiddenInput).trigger('change');
                                    window.jQuery(hiddenInput).trigger('input');
                                } else {
                                    // Si no, usar dispatchEvent
                                    hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
                                    hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                                console.log(`Actualizado el valor oculto para place${index + 1}: "${respuesta}" con valor "${value}"`);
                            } else {
                                console.error(`No se encontró el input oculto para place${index + 1} en el grupo ${groupClass}`);
                                return;
                            }

                            // Actualizar el contenido visual de la zona de suelta como hermano inmediato
                            const placedElementHTML = `<span class="draghome user-select-none choice${getValueForRespuesta(choice)} ${groupClass} placed inplace${index + 1}" tabindex="0">${respuesta}</span>`;
                            place.insertAdjacentHTML('afterend', placedElementHTML);

                            // Remover la clase "unplaced" de la respuesta arrastrada para simular que ya ha sido colocada
                            choice.classList.remove('unplaced');

                            // Ocultar la respuesta original si Moodle lo requiere
                            choice.style.display = 'none';

                            console.log(`Respuesta "${respuesta}" colocada en el lugar ${index + 1} del grupo ${groupClass}`);
                        }, index * 1500); // Retraso de 2000ms entre cada respuesta para mayor estabilidad
                    });

                    console.log(`Finalizado el procesamiento del grupo: ${groupClass}`);
                });

                console.log('Automatización de drag and drop finalizada.');

            }

            else if (tipo === 'draganddrop_image') {
                console.log('Iniciando automatización de drag and drop para tipo:', tipo);

                // Seleccionar todos los elementos con la clase 'formulation clearfix'
                const formulations = document.querySelectorAll('.formulation.clearfix');
                formulations.forEach(formulation => {
                    // Encontrar el primer 'dropzone' para obtener la clase de grupo (e.g., group1)
                    const firstDropzone = formulation.querySelector('.dropzone.group1.place1');
                    if (!firstDropzone) {
                        console.error('No se pudo encontrar un "dropzone" en esta formulación.');
                        return;
                    }

                    // Extraer la clase de grupo (group1, group2, etc.)
                    const groupClass = Array.from(firstDropzone.classList).find(cls => cls.startsWith('group'));
                    if (!groupClass) {
                        console.error('No se pudo determinar el número del grupo.');
                        return;
                    }

                    console.log(`Procesando grupo: ${groupClass}`);

                    // Recorremos cada respuesta con un retraso para permitir que Moodle procese cada acción
                    respuestas.forEach((respuesta, index) => {
                        setTimeout(async () => {
                            // Seleccionar el "dropzone" correspondiente al índice (index + 1 porque los "dropzones" empiezan desde 1)
                            const dropzone = formulation.querySelector(`.dropzone.group1.place${index + 1}`);
                            if (!dropzone) {
                                console.log(`No se encontró el dropzone para la respuesta "${respuesta}" en el grupo ${groupClass}`);
                                return;
                            }

                            // Verificar si ya hay una respuesta colocada en este dropzone
                            const existingPlaced = dropzone.querySelector('.draghome.placed');
                            if (existingPlaced) {
                                console.log(`El dropzone ${index + 1} ya tiene una respuesta colocada.`);
                                return;
                            }

                            // Seleccionar la opción de respuesta correspondiente por texto, solo dentro de 'draghomes' para evitar afectar los dropzones
                            const choice = Array.from(formulation.querySelectorAll(`.draghomes .draghome.user-select-none.${groupClass}`))
                            .find(el => el.innerText.trim() === respuesta);

                            if (!choice) {
                                console.log(`No se encontró la respuesta "${respuesta}" en el grupo ${groupClass}`);
                                return;
                            }

                            console.log(`Colocando respuesta "${respuesta}" en el dropzone ${index + 1} del grupo ${groupClass}`);

                            // Simular drag and drop usando eventos de mouse y drag
                            await simulateDragAndDropMouse(choice, dropzone);

                            // Actualizar el valor del campo oculto asociado al "dropzone"
                            const hiddenInput = formulation.querySelector(`input.place${index + 1}.${groupClass}`);
                            if (hiddenInput) {
                                const value = getValueForRespuesta(choice);
                                hiddenInput.value = value;
                                // Desencadenar eventos para que Moodle detecte el cambio
                                if (window.jQuery) {
                                    // Si jQuery está disponible, usarlo para disparar los eventos
                                    window.jQuery(hiddenInput).trigger('change');
                                    window.jQuery(hiddenInput).trigger('input');
                                } else {
                                    // Si no, usar dispatchEvent
                                    hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
                                    hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                                console.log(`Actualizado el valor oculto para place${index + 1}: "${respuesta}" con valor "${value}"`);
                            } else {
                                console.error(`No se encontró el input oculto para place${index + 1} en el grupo ${groupClass}`);
                                return;
                            }

                            // Mostrar la opción colocada dentro del dropzone existente
                            const placedSpan = dropzone.querySelector(`.draghome.choice${getValueForRespuesta(choice)}.${groupClass}.placed`);
                            if (placedSpan) {
                                placedSpan.style.display = 'block';
                            } else {
                                console.error(`No se encontró el span colocado para "${respuesta}" en el dropzone ${index + 1}`);
                            }

                            // Ocultar la respuesta original en la lista de opciones
                            // choice.style.display = 'none';

                            console.log(`Respuesta "${respuesta}" colocada en el dropzone ${index + 1} del grupo ${groupClass}`);
                        }, index * 1000); // Retraso de 2000ms entre cada respuesta para mayor estabilidad
                    });

                    console.log(`Finalizado el procesamiento del grupo: ${groupClass}`);
                });

                console.log('Automatización de drag and drop para imágenes finalizada.');
            }

        }

        // Espera a que MathJax termine de renderizar antes de proceder con AutoSave_LocalStorage
        // Verifica si MathJax está definido y si existe la función MathJax.Hub.Queue
        if (typeof MathJax !== 'undefined' && MathJax.Hub && typeof MathJax.Hub.Queue === 'function') {
            // Espera a que MathJax termine de renderizar antes de proceder con AutoSave_LocalStorage
            MathJax.Hub.Queue(function() {
                // console.log('MathJax ha terminado de renderizar');

                // Procede con la función AutoSave_LocalStorage después de que MathJax esté listo
                AutoSave_LocalStorage();
            });
        } else {
            // Si MathJax no está presente, procede directamente con AutoSave_LocalStorage
            // console.log('MathJax no está presente, procediendo sin esperar');
            AutoSave_LocalStorage();
        }


    }

    function getValueForRespuesta(choiceElement) {
        const classes = Array.from(choiceElement.classList);
        const choiceClass = classes.find(cls => cls.startsWith('choice'));
        if (choiceClass) {
            const choiceNumber = choiceClass.replace('choice', '');
            return choiceNumber;
        }
        return "0"; // Valor por defecto si no se encuentra la clase "choiceX"
    }

    function simulateDragAndDropMouse(draggableElement, dropZoneElement) {
        return new Promise((resolve, reject) => {
            try {
                // Obtener las coordenadas de los elementos
                const draggableRect = draggableElement.getBoundingClientRect();
                const dropZoneRect = dropZoneElement.getBoundingClientRect();

                // Calcular las coordenadas centrales para los eventos
                const draggableCenter = {
                    x: draggableRect.left + draggableRect.width / 2,
                    y: draggableRect.top + draggableRect.height / 2
                };

                const dropZoneCenter = {
                    x: dropZoneRect.left + dropZoneRect.width / 2,
                    y: dropZoneRect.top + dropZoneRect.height / 2
                };

                // Crear DataTransfer
                const dataTransfer = new DataTransfer();

                /**
                 * Función para crear y dispatchar un evento de mouse
                 * @param {string} type - Tipo de evento de mouse (e.g., 'mousemove', 'mousedown')
                 * @param {number} clientX - Coordenada X del mouse
                 * @param {number} clientY - Coordenada Y del mouse
                 * @param {number} buttons - Estado de los botones del mouse
                 */
                function createMouseEvent(type, clientX, clientY, buttons = 1) {
                    return new MouseEvent(type, {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                        clientX: clientX,
                        clientY: clientY,
                        buttons: buttons
                    });
                }

                /**
                 * Función para crear y dispatchar un evento de drag
                 * @param {string} type - Tipo de evento de drag (e.g., 'dragstart', 'drop')
                 * @param {number} clientX - Coordenada X del evento
                 * @param {number} clientY - Coordenada Y del evento
                 */
                function createDragEvent(type, clientX, clientY) {
                    return new DragEvent(type, {
                        bubbles: true,
                        cancelable: true,
                        clientX: clientX,
                        clientY: clientY,
                        dataTransfer: dataTransfer
                    });
                }

                // Secuencia de eventos para simular drag and drop
                // Usamos async/await para asegurar el orden y la espera adecuada entre eventos
                async function dragAndDropSequence() {
                    try {
                        // 1. Mover el cursor al centro del draggable
                        window.dispatchEvent(createMouseEvent('mousemove', draggableCenter.x, draggableCenter.y));

                        // 2. Presionar el botón del mouse en el draggable
                        draggableElement.dispatchEvent(createMouseEvent('mousedown', draggableCenter.x, draggableCenter.y));

                        // 3. Disparar dragstart en el draggable
                        draggableElement.dispatchEvent(createDragEvent('dragstart', draggableCenter.x, draggableCenter.y));

                        // 4. Mover el cursor al centro de la drop zone
                        window.dispatchEvent(createMouseEvent('mousemove', dropZoneCenter.x, dropZoneCenter.y));

                        // 5. Disparar dragenter en la drop zone
                        dropZoneElement.dispatchEvent(createDragEvent('dragenter', dropZoneCenter.x, dropZoneCenter.y));

                        // 6. Disparar dragover en la drop zone
                        dropZoneElement.dispatchEvent(createDragEvent('dragover', dropZoneCenter.x, dropZoneCenter.y));

                        // 7. Disparar drop en la drop zone
                        dropZoneElement.dispatchEvent(createDragEvent('drop', dropZoneCenter.x, dropZoneCenter.y));

                        // 8. Disparar dragleave en la drop zone
                        dropZoneElement.dispatchEvent(createDragEvent('dragleave', dropZoneCenter.x, dropZoneCenter.y));

                        // 9. Disparar dragend en el draggable
                        draggableElement.dispatchEvent(createDragEvent('dragend', dropZoneCenter.x, dropZoneCenter.y));

                        // 10. Soltar el botón del mouse en la drop zone
                        dropZoneElement.dispatchEvent(createMouseEvent('mouseup', dropZoneCenter.x, dropZoneCenter.y, 0));

                        // Esperar un momento para que los eventos sean procesados
                        setTimeout(() => {
                            resolve();
                        }, 1000); // Espera 1 segundo
                    } catch (error) {
                        console.error('Error en la simulación de drag and drop:', error);
                        reject(error);
                    }
                }

                dragAndDropSequence();

            } catch (error) {
                console.error('Error en la simulación de drag and drop:', error);
                reject(error);
            }
        });
    }

    // <<<<<<<<<<<<<< AutoSave >>>>>>>>>>>>>>

    function contenedorAutoSave_js() {

        const contenedorAutoSave = document.getElementById('container-autosave');
        const interruptorAutoSave = document.getElementById('switch-autosave');
        const estadoInterruptorAutoSave = localStorage.getItem('autosave-autoquizfillapp') || 'desactivado';

        // Verificar si la URL actual incluye '/mod/quiz/attempt.php?' o '/mod/quiz/view.php?'
        if (
            window.location.href.includes('/mod/quiz/attempt.php') ||
            window.location.href.includes('/mod/quiz/view.php')
        ) {
            // Mostrar el contenedor solo si estamos en esas páginas
            contenedorAutoSave.style.display = 'block';
        } else {
            // Ocultar el contenedor si no estamos en las páginas relevantes
            contenedorAutoSave.style.display = 'none';
        }

        // Estado del interruptor de AutoSave basado en localStorage
        interruptorAutoSave.checked = (estadoInterruptorAutoSave === 'activado');

        interruptorAutoSave.addEventListener('change', function() {
            // Obtener el elemento body-autoquiz-autosave para mostrar/ocultar
            const bodyAutoSave = document.getElementById('body-autoquiz-autosave');

            if (
                this.checked &&
                (window.location.href.includes('/mod/quiz/attempt.php') || window.location.href.includes('/mod/quiz/view.php?'))
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

    async function AutoSave_LocalStorage() {

        console.log('::::::Iniciando AutoSave_LocalStorage::::::');

        let contadorPreguntas = 0; // Contador de preguntas
        const todasLasPreguntas = {}; // Objeto para almacenar todas las preguntas

        // Obtener los elementos con clase '.formulation.clearfix'
        const originalAllFormulations = document.querySelectorAll('.formulation.clearfix');

        for (const formulation of originalAllFormulations) {
            // Obtener el número de pregunta o incrementar el contador
            const numeroPregunta = getQuestionNumber(formulation) || ++contadorPreguntas;

            const questionsAutoSave = {
                html: '',
                respuestas: [],
                enunciados: [],
                tipo: ''
            };

            // Verifica si solo existe un elemento con la clase '.qtext' en 'clonFormulation'
            const soloUnQtext = formulation.querySelectorAll('.qtext').length === 1;

            // Verifica si hay un radio button seleccionado con un valor distinto de "-1" y si solo hay un '.qtext'
            const inputRadioValido =
                  soloUnQtext &&
                  formulation.querySelector('input[type="radio"]:checked') !== null && // Verifica si hay un radio button seleccionado
                  formulation.querySelector('input[type="radio"]:checked').value !== "-1"; // El valor del radio button no debe ser "-1"

            // Verifica si hay al menos un checkbox seleccionado y si no hay otros tipos de inputs o selects
            const inputsCheckboxValido =
                  soloUnQtext &&
                  formulation.querySelectorAll('input[type="checkbox"]:checked').length > 0 && // Al menos un checkbox está seleccionado
                  !formulation.querySelector('input:not([type="checkbox"]):not([type="hidden"]), select'); // No debe haber otros inputs o selects

            // Verifica si hay algún select con un valor válido seleccionado, y si no hay otros tipos de inputs, botones o selects vacíos
            const selectsValido =
                  soloUnQtext &&
                  !formulation.querySelector('input:not([type="hidden"]), textarea, button, [type="radio"], [type="text"], [type="checkbox"]') && // No debe haber otros elementos
                  Array.from(formulation.querySelectorAll("select")).some(select => { // Recorre todos los elementos select
                      const valor = select.value;
                      const texto = select.options[select.selectedIndex].text.trim().toLowerCase(); // Texto del select seleccionado en minúsculas
                      return valor !== "" && valor !== "0" && texto !== "elegir..." && texto !== "seleccionar..."; // Verifica que el valor no sea vacío o inválido
                  });

            // Verifica si hay exactamente un input de tipo texto con contenido válido y sin otros inputs o selects presentes
            const inputTextValido =
                  !formulation.querySelector('input[type="radio"], input[type="checkbox"], select') && // No debe haber radio, checkbox o selects
                  formulation.querySelectorAll('input[type="text"]').length === 1 && // Debe haber solo un input de tipo texto
                  Array.from(formulation.querySelectorAll('input[type="text"]')).some(input => input.value.trim() !== ""); // El valor del input de texto no debe estar vacío

            // Verifica si hay más de un input de tipo texto con contenido válido y sin otros inputs o selects presentes
            const inputsTextsValido =
                  !formulation.querySelector('input[type="radio"], input[type="checkbox"], select') && // No debe haber radio, checkbox o selects
                  formulation.querySelectorAll('input[type="text"]').length > 1 && // Debe haber más de un input de tipo texto
                  Array.from(formulation.querySelectorAll('input[type="text"]')).some(input => input.value.trim() !== ""); // Al menos un input de texto debe tener valor

            // Verifica si hay varios inputs de texto o selects con valores válidos, sin otros tipos de inputs presentes
            const inputsTextsySelectValido =
                  !formulation.querySelector('input[type="radio"], input[type="checkbox"]') && // No debe haber radio ni checkbox
                  formulation.querySelectorAll('input[type="text"]').length > 1 && // Debe haber más de un input de texto
                  Array.from(formulation.querySelectorAll('input[type="text"]')).some(input => input.value.trim() !== "") || // Al menos un input de texto debe tener valor
                  Array.from(formulation.querySelectorAll("select")).some(select => { // O al menos un select debe tener valor válido
                      const valor = select.value;
                      const texto = select.options[select.selectedIndex].text.trim().toLowerCase(); // Texto del select seleccionado en minúsculas
                      return valor !== "" && valor !== "0" && texto !== "elegir..." && texto !== "seleccionar..."; // Verifica que el valor no sea vacío o inválido
                  });

            const hasDraghome = formulation.querySelector('.draghome') !== null;
            const hasDropzones = formulation.querySelector('.dropzones') !== null;

            let seEjecutaFuncion = false;

            // console.log(`Condición 'inputradio_opcionmultiple_verdaderofalso': ${inputRadioValido}`);
            console.log(`Condición 'inputchecked_opcionmultiple': ${inputsCheckboxValido}`);
            // console.log(`Condición 'select_emparejamiento': ${selectsValido}`);
            // console.log(`Condición 'inputtext_respuestacorta': ${inputTextValido}`);
            // console.log(`Condición 'inputtext_multiple_respuestacorta': ${inputsTextsValido}`);
            // console.log(`Condición 'inputtext_multiple_respuestacorta_select': ${inputsTextsySelectValido}`);

            // Definir una lista de condiciones y sus correspondientes funciones
            const condiciones = [
                {
                    cond: inputRadioValido,
                    func: async () => await inputradio_opcionmultiple_verdaderofalso(formulation, questionsAutoSave)
                },
                {
                    cond: inputsCheckboxValido,
                    func: async () => await inputchecked_opcionmultiple(formulation, questionsAutoSave)
                },
                {
                    cond: selectsValido,
                    func: async () => await select_emparejamiento(formulation, questionsAutoSave)
                },
                {
                    cond: inputTextValido,
                    func: async () => await inputtext_respuestacorta(formulation, questionsAutoSave)
                },
                {
                    cond: hasDraghome && !hasDropzones,
                    func: async () => {
                        await new Promise(resolve => {
                            setTimeout(() => {
                                draganddrop_text(formulation, questionsAutoSave);
                                resolve();
                            }, 1000); // Retraso de 1 segundo
                        });
                    }
                },
                {
                    cond: hasDraghome && hasDropzones,
                    func: async () => {
                        await new Promise(resolve => {
                            setTimeout(() => {
                                draganddrop_image(formulation, questionsAutoSave);
                                resolve();
                            }, 1000); // Retraso de 1 segundo
                        });
                    }
                },
                {
                    cond: inputsTextsValido,
                    func: async () => await inputtext_multiple_respuestacorta(formulation, questionsAutoSave)
                },
                {
                    cond: inputsTextsySelectValido,
                    func: async () => await inputtext_multiple_respuestacorta_select(formulation, questionsAutoSave)
                }
            ];

            // Ejecutar la primera condición que se cumpla
            for (const { cond, func } of condiciones) {
                if (cond) {
                    await func();
                    seEjecutaFuncion = true;
                    break; // Salir del bucle de condiciones una vez que se ejecuta una función
                }
            }

            // Convertir a string si solo hay una respuesta y agregar si hay contenido relevante
            if (seEjecutaFuncion) {
                if (questionsAutoSave.respuestas.length === 1) {
                    questionsAutoSave.respuestas = questionsAutoSave.respuestas[0];
                }

                if (questionsAutoSave.html || questionsAutoSave.respuestas.length > 0 || questionsAutoSave.enunciados.length > 0) {
                    todasLasPreguntas[`Pregunta${numeroPregunta}`] = questionsAutoSave;
                }
            }
        } // Cierre correcto del bucle for

        // Guardar todas las preguntas en localStorage
        try {
            sessionStorage.setItem('questions-AutoSave', JSON.stringify(todasLasPreguntas));
        } catch (error) {
            console.error('Error saving to sessionStorage', error);
        }


        async function feedbackQuestion(originalFormulationClearfix) {
            // console.log('Iniciando feedbackQuestion');

            // Encontrar el hermano de originalFormulationClearfix que tiene clase "outcome clearfix"
            let hermano = originalFormulationClearfix.nextElementSibling;
            // console.log('Buscando hermano con clase "outcome clearfix"');

            while (hermano) {
                // console.log('Revisando elemento:', hermano);
                if (hermano.classList.contains('outcome') && hermano.classList.contains('clearfix')) {
                    // console.log('Hermano encontrado:', hermano);
                    break;
                }
                hermano = hermano.nextElementSibling;
            }
            if (!hermano) {
                // console.error('No se encontró el hermano con clase "outcome clearfix"');
                return '';
            }

            // Dentro del hermano, encontrar el elemento con clase "feedback"
            // console.log('Buscando elemento con clase "feedback" dentro del hermano');
            let feedback = hermano.querySelector('.feedback');
            if (!feedback) {
                console.error('No se encontró el elemento con clase "feedback"');
                return '';
            }

            // Dentro de feedback, encontrar el elemento con clase "generalfeedback"
            // console.log('Buscando elemento con clase "generalfeedback" dentro de feedback');
            let generalFeedback = feedback.querySelector('.generalfeedback');
            if (!generalFeedback) {
                console.error('No se encontró el elemento con clase "generalfeedback"');
                return '';
            }

            // Clonar el elemento generalFeedback para no modificar el original
            // console.log('Clonando el elemento generalFeedback');
            let generalFeedbackClone = generalFeedback.cloneNode(true);

            // Procesar imágenes que contienen 'pluginfile.php' en su URL en el clon
            // console.log('Buscando imágenes en generalFeedbackClone');
            let images = generalFeedbackClone.querySelectorAll('img');
            if (images.length > 0) {
                // console.log('Se encontraron imágenes:', images.length);
                let promises = [];

                images.forEach(img => {
                    // console.log('Procesando imagen:', img.src);
                    if (img.src.includes('pluginfile.php')) {
                        // console.log('La imagen contiene "pluginfile.php" en la URL');
                        let promise = convertImageToDataUri(img.src).then(dataUri => {
                            img.src = dataUri;
                            // console.log('Imagen convertida a Data URI');
                        }).catch(error => {
                            console.error(error);
                        });
                        promises.push(promise);
                    } else {
                        // console.log('La imagen no contiene "pluginfile.php", se omite la conversión');
                    }
                });

                // Esperar a que todas las conversiones terminen
                await Promise.all(promises);
            } else {
                // console.log('No se encontraron imágenes en generalFeedbackClone');
            }

            // Eliminar <p> vacíos o con solo <br>, espacios o <span> sin contenido
            // console.log('Eliminando <p> vacíos de generalFeedbackClone');
            let paragraphs = generalFeedbackClone.querySelectorAll('p');
            paragraphs.forEach(p => {
                if (!p.textContent.trim() && !p.querySelector('img')) {
                    // console.log('Eliminando <p> vacío o sin contenido relevante:', p);
                    p.remove();
                }
            });

            // Extraer el contenido HTML del clon después de procesar las imágenes y eliminar <p> vacíos
            let textoFeedback = generalFeedbackClone.innerHTML;
            // console.log('Contenido del textoFeedback:', textoFeedback);

            // Retornar el texto del feedback
            return textoFeedback;
        }

        function convertImageToDataUri(src) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;

                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    context.drawImage(img, 0, 0);
                    const dataUri = canvas.toDataURL();
                    resolve(dataUri);
                };

                img.onerror = function () {
                    reject('Error en la conversión a Data URI');
                };
            });
        }

        // Manejar respuestas tipo 'input radio'
        async function inputradio_opcionmultiple_verdaderofalso(originalFormulationClearfix, questionsAutoSave) {
            const tipo = 'inputradio_opcionmultiple_verdaderofalso';
            const clonFormulation = originalFormulationClearfix.cloneNode(true);

            // Convierte las imágenes dentro del clon a formato Data URI
            await convertImgToDataUri(clonFormulation);

            // Selecciona todos los elementos de tipo radio dentro del originalFormulationClearfix
            const allInputRadio = originalFormulationClearfix.querySelectorAll('input[type="radio"]');

            for (const inputRadio of allInputRadio) {
                if (inputRadio.checked) {
                    let labelInput = inputRadio.nextElementSibling;
                    let textoRespuesta = '';

                    if (labelInput) {
                        const flexFillElement = labelInput.querySelector('.flex-fill');

                        // Extraer contenido del elemento .flex-fill si existe
                        if (flexFillElement) {
                            textoRespuesta = await extractContentInOrder(flexFillElement);
                        } else {
                            // Si no hay .flex-fill, extraer contenido directamente del label
                            textoRespuesta = await extractContentInOrder(labelInput);
                        }

                        // Limpiar literales iniciales solo si no hay elementos MathJax presentes
                        const mathJaxElement = labelInput.querySelector('.MathJax');
                        if (!mathJaxElement) {
                            // Eliminar literales iniciales como "A." o "i."
                            textoRespuesta = textoRespuesta.replace(/^[a-zA-Z]\.|^[ivxlcdmIVXLCDM]+\./, '');
                            // No aplicamos trim para preservar los espacios y saltos de línea
                        }

                        if (textoRespuesta) {
                            // Guardar la respuesta en el objeto questionsAutoSave
                            questionsAutoSave.respuestas.push(textoRespuesta);
                        }

                        // Guardar el HTML del clon en el objeto questionsAutoSave
                        questionsAutoSave.html = clonFormulation.outerHTML;
                        questionsAutoSave.tipo = tipo;
                        const feedback = await feedbackQuestion(originalFormulationClearfix);
                        questionsAutoSave.feedback = feedback;
                        questionsAutoSave.ciclo = localStorage.getItem("ciclo");
                    }
                }
            }
        }

        async function extractContentInOrder(node) {
            let content = '';

            for (const child of node.childNodes) {
                if (child.nodeType === Node.TEXT_NODE) {
                    // Extraer el contenido de texto sin aplicar .trim() para preservar los espacios
                    const text = child.textContent;
                    if (text && text !== '\n') { // Evitar añadir contenido vacío o solo saltos de línea
                        content += text;
                    }
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    const tagName = child.tagName.toLowerCase();

                    if (tagName === 'script' && child.getAttribute('type') === 'math/tex') {
                        // Ignorar los scripts de tipo MathJax
                        continue;
                    } else if (child.classList.contains('MathJax')) {
                        // Extraer MathML de los elementos MathJax si existen
                        const mathml = child.getAttribute('data-mathml');
                        if (mathml) {
                            if (content.length > 0 && !content.endsWith(' ') && !content.endsWith('\u00A0')) {
                                content += ' ';
                            }
                            content += mathml;
                        }
                    } else if (tagName === 'img') {
                        // Extraer el atributo 'src' de las imágenes
                        const src = child.getAttribute('src');
                        if (src) {
                            if (content.length > 0 && !content.endsWith(' ') && !content.endsWith('\u00A0')) {
                                content += ' ';
                            }

                            if (src.includes('pluginfile.php')) {
                                try {
                                    // Convertir la imagen a Data URI si contiene 'pluginfile.php'
                                    const dataUri = await convertImageToDataUri(src);
                                    content += dataUri; // Añadir el Data URI en lugar de la URL original
                                } catch (error) {
                                    console.error('Error en la conversión de la imagen:', error);
                                    content += src; // Si falla la conversión, mantener el src original
                                }
                            } else {
                                content += src; // Si no contiene 'pluginfile.php', mantener el src original
                            }
                        }
                    } else if (tagName === 'sub' || tagName === 'sup') {
                        // Añadir etiquetas <sub> o <sup> sin espacios adicionales
                        content += child.outerHTML;
                    } else if (tagName === 'p') {
                        // Procesar recursivamente el contenido del <p>
                        const childContent = await extractContentInOrder(child);
                        if (childContent) {
                            if (content.length > 0 && !content.endsWith('\n')) {
                                content += '\n'; // Añadir un salto de línea antes del nuevo párrafo
                            }
                            content += childContent + '\n'; // Añadir el contenido del párrafo seguido de un salto de línea
                        }
                    } else if (tagName === 'br') {
                        // Añadir un salto de línea por cada <br>
                        content += '\n';
                    } else {
                        // Procesar recursivamente otros elementos hijos
                        const childContent = await extractContentInOrder(child);
                        if (childContent) {
                            content += childContent;
                        }
                    }
                }
            }

            return content;
        }

        // Manejar respuestas tipo 'input checkbox'
        async function inputchecked_opcionmultiple(originalFormulationClearfix, questionsAutoSave) {

            const tipo = 'inputchecked_opcionmultiple';
            console.log(tipo);

            const clonFormulation = originalFormulationClearfix.cloneNode(true);

            // Convierte las imágenes dentro del clon a formato Data URI
            await convertImgToDataUri(clonFormulation);

            const respuestas = [];
            const allInputCheckbox = originalFormulationClearfix.querySelectorAll('input[type="checkbox"]');

            allInputCheckbox.forEach((inputCheckbox) => {
                if (inputCheckbox.checked) {
                    const labelId = CSS.escape(inputCheckbox.getAttribute('aria-labelledby'));
                    const labelElement = originalFormulationClearfix.querySelector(`#${labelId}`);

                    let textoRespuesta = '';
                    if (labelElement) {
                        textoRespuesta = Array.from(labelElement.querySelectorAll('div, span'))
                            .map(element => element.innerText.trim())
                            .join(' ');

                        textoRespuesta = textoRespuesta.replace(/^[a-zA-Z]\.|^[ivxlcdmIVXLCDM]+\./, '').trim();
                    }

                    if (textoRespuesta) {
                        respuestas.push(textoRespuesta);
                    }
                }
            });

            if (respuestas.length > 0) {
                questionsAutoSave.respuestas = respuestas;
                questionsAutoSave.html = clonFormulation.outerHTML; // Guardar el HTML del clon
                questionsAutoSave.tipo = tipo;
                const feedback = await feedbackQuestion(originalFormulationClearfix);
                questionsAutoSave.feedback = feedback;
                questionsAutoSave.ciclo = localStorage.getItem("ciclo");
            }
        }

        // Manejar respuestas tipo 'select'
        async function select_emparejamiento(originalFormulationClearfix, questionsAutoSave) {
            const tipo = 'select_emparejamiento'; // Define el tipo de pregunta como "select_emparejamiento"
            questionsAutoSave.respuestas = []; // Inicializa el array respuestas como vacío
            questionsAutoSave.enunciados = []; // Inicializa el array enunciados como vacío

            const clonFormulation = originalFormulationClearfix.cloneNode(true); // Crea un clon de la estructura HTML de la pregunta
            // Convierte las imágenes dentro del clon a formato Data URI para almacenar todo el contenido en texto
            await convertImgToDataUri(clonFormulation);

            const allSelects = originalFormulationClearfix.querySelectorAll('select'); // Obtiene todos los elementos <select> en la pregunta original

            // Itera sobre cada elemento <select> encontrado
            allSelects.forEach(async (selectElement) => {
                let opcionSeleccionada = selectElement.options[selectElement.selectedIndex]; // Obtiene la opción seleccionada

                if (opcionSeleccionada && opcionSeleccionada.value !== "0") { // Verifica que haya una opción seleccionada distinta de "0"
                    let textoRespuesta = opcionSeleccionada.textContent.trim(); // Obtiene el texto de la opción seleccionada sin espacios adicionales
                    if (textoRespuesta) {
                        questionsAutoSave.respuestas.push(textoRespuesta); // Almacena el texto de la respuesta seleccionada
                    }

                    // Extrae el enunciado relacionado de la celda <td> más cercana que contiene el texto o una imagen
                    let textoPregunta;
                    const textoElement = selectElement.closest('tr').querySelector('td.text');
                    if (textoElement) {
                        // Verifica si contiene texto
                        if (textoElement.innerText.trim()) {
                            textoPregunta = textoElement.innerText.trim();
                        } else {
                            // Si no contiene texto, intenta procesar las imágenes
                            const imgElement = textoElement.querySelector('img');
                            if (imgElement) {
                                if (imgElement.src.includes('pluginfile.php')) {
                                    try {
                                        // Convertir a Data URI las imágenes que contienen 'pluginfile.php'
                                        console.log('Convirtiendo imagen (pluginfile.php):', imgElement.src);

                                        await new Promise((resolve, reject) => {
                                            if (imgElement.complete) {
                                                resolve();
                                            } else {
                                                imgElement.onload = resolve;
                                                imgElement.onerror = reject;
                                            }
                                        });

                                        const canvas = document.createElement('canvas');
                                        const context = canvas.getContext('2d');
                                        canvas.width = imgElement.naturalWidth;
                                        canvas.height = imgElement.naturalHeight;

                                        context.drawImage(imgElement, 0, 0);
                                        const dataUri = canvas.toDataURL();
                                        imgElement.src = dataUri; // Actualiza la fuente de la imagen al Data URI
                                        textoPregunta = dataUri; // Usa el Data URI como textoPregunta
                                        console.log('Imagen convertida a Data URI:', imgElement.src);
                                    } catch (error) {
                                        console.error('Error en la conversión de la imagen:', error);
                                    }
                                } else {
                                    textoPregunta = imgElement.src; // Usa la URL de la imagen como textoPregunta
                                    console.log('La imagen no se convierte:', imgElement.src);
                                }
                            }
                        }

                        // Almacena el enunciado en questionsAutoSave.enunciados
                        if (textoPregunta) {
                            questionsAutoSave.enunciados.push(textoPregunta);
                            console.log(`Enunciado almacenado: ${textoPregunta}`);
                        }
                    }
                }
            });

            // Guarda el HTML del clon y el tipo de pregunta después de procesar todas las selecciones
            questionsAutoSave.html = clonFormulation.outerHTML;
            questionsAutoSave.tipo = tipo;

            // Llama a la función feedbackQuestion para obtener retroalimentación de la pregunta y la almacena
            const feedback = await feedbackQuestion(originalFormulationClearfix);
            questionsAutoSave.feedback = feedback;

            // Guarda el valor de "ciclo" de localStorage en el objeto questionsAutoSave
            questionsAutoSave.ciclo = localStorage.getItem("ciclo");
        }

        // Manejar respuestas tipo 'input text' (respuesta corta)
        async function inputtext_respuestacorta(originalFormulationClearfix, questionsAutoSave) {
            const tipo = 'inputtext_respuestacorta';
            const respuestas = questionsAutoSave.respuestas;
            let hayRespuestaLleno = false;

            const clonFormulation = originalFormulationClearfix.cloneNode(true);
            // Convierte las imágenes dentro del clon a formato Data URI
            await convertImgToDataUri(clonFormulation);

            const allInputText = originalFormulationClearfix.querySelectorAll('input[type="text"]');

            allInputText.forEach((inputText) => {
                const valor = inputText.value;
                respuestas.push(valor);

                if (valor) {
                    hayRespuestaLleno = true;
                }
            });

            if (hayRespuestaLleno) {
                questionsAutoSave.html = clonFormulation.outerHTML; // Guardar el HTML del clon
                questionsAutoSave.tipo = tipo;
                const feedback = await feedbackQuestion(originalFormulationClearfix);
                questionsAutoSave.feedback = feedback;
                questionsAutoSave.ciclo = localStorage.getItem("ciclo");
            }
        }

        // Manejar respuestas tipo 'draganddrop' (texto)
        async function draganddrop_text(originalFormulationClearfix, questionsAutoSave) {
            // Agregar un retraso de 1 segundo antes de ejecutar el resto del código
            const tipo = 'draganddrop_text';
            console.log(tipo);

            // Crear una lista para almacenar las respuestas directamente en questionsAutoSave
            const respuestas = questionsAutoSave.respuestas;

            const clonFormulation = originalFormulationClearfix.cloneNode(true);
            // Convierte las imágenes dentro del clon a formato Data URI
            await convertImgToDataUri(clonFormulation);

            // Seleccionar todos los elementos con la clase 'place' dentro de 'qtext' usando un selector más genérico
            const qtextPlaces = originalFormulationClearfix.querySelectorAll('[class*="place"][class*="drop"][class*="group"]');

            // Recorrer cada lugar (place) para verificar si contiene una respuesta o está vacío
            qtextPlaces.forEach((placeElement) => {
                // Comprobar si el lugar está vacío (tiene la clase 'active')
                if (placeElement.classList.contains('active')) {
                    respuestas.push('n/a');
                } else {
                    // Si el lugar no está vacío, buscar el hermano que contiene la respuesta
                    const respuestaElement = placeElement.nextElementSibling;
                    if (respuestaElement && respuestaElement.classList.contains('draghome')) {
                        const texto = respuestaElement.textContent.trim(); // Extraer el texto de la respuesta
                        respuestas.push(texto || 'n/a'); // Agregar el texto o 'n/a' si el texto está vacío
                    }
                }
            });

            // Imprimir el array de respuestas en la consola
            console.log('Respuestas encontradas:', respuestas);

            // Clonar el elemento formulation_clearfix y guardar el HTML en questionsAutoSave
            questionsAutoSave.html = clonFormulation.outerHTML; // Guardar el HTML del clon
            questionsAutoSave.tipo = tipo; // Guardar el tipo en el objeto questionsAutoSave
            const feedback = await feedbackQuestion(originalFormulationClearfix);
            questionsAutoSave.feedback = feedback;
            questionsAutoSave.ciclo = localStorage.getItem("ciclo");
        }

        // Manejar respuestas tipo 'draganddrop' (image)
        async function draganddrop_image(originalFormulationClearfix, questionsAutoSave) {
            const tipo = 'draganddrop_image';
            console.log(tipo);

            // Crear una lista para almacenar las respuestas directamente en questionsAutoSave
            const respuestas = questionsAutoSave.respuestas;

            const clonFormulation = originalFormulationClearfix.cloneNode(true);
            // Convierte las imágenes dentro del clon a formato Data URI
            await convertImgToDataUri(clonFormulation);

            // Seleccionar todos los elementos con la clase 'place' dentro de 'qtext' usando un selector más genérico
            const qtextZones = originalFormulationClearfix.querySelectorAll('[class*="dropzone"][class*="group"][class*="place"]');

            // Recorrer cada lugar (place) para verificar si contiene una respuesta o está vacío
            qtextZones.forEach((zoneElement) => {
                // Comprobar si el lugar está vacío (tiene la clase 'active')
                if (zoneElement.classList.contains('active')) {
                    respuestas.push('n/a');
                } else {
                    // Si el lugar no está vacío, buscar el hermano que contiene la respuesta
                    const respuestaElement = zoneElement.nextElementSibling;
                    if (respuestaElement && respuestaElement.classList.contains('draghome')) {
                        const texto = respuestaElement.textContent.trim(); // Extraer el texto de la respuesta
                        respuestas.push(texto || 'n/a'); // Agregar el texto o 'n/a' si el texto está vacío
                    }
                }
            });

            // Imprimir el array de respuestas en la consola
            console.log('Respuestas encontradas:', respuestas);

            // Clonar el elemento formulation_clearfix y guardar el HTML en questionsAutoSave

            questionsAutoSave.html = clonFormulation.outerHTML; // Guardar el HTML del clon
            questionsAutoSave.tipo = tipo; // Guardar el tipo en el objeto questionsAutoSave
            const feedback = await feedbackQuestion(originalFormulationClearfix);
            questionsAutoSave.feedback = feedback;
            questionsAutoSave.ciclo = localStorage.getItem("ciclo");
        }

        // Pendiente
        function inputtext_multiple_respuestacorta(originalFormulationClearfix, questionsAutoSave) {

        }

        // Pendiente
        function inputtext_multiple_respuestacorta_select(originalFormulationClearfix, questionsAutoSave) {

        }

        // Obtener la URL actual
        const currentUrl = window.location.pathname;

        if (currentUrl.includes('/mod/quiz/review.php')) {
            console.log('Página de revisión detectada. Ejecutando AutoSaveReview_Filter...');
            // Ejecuta AutoSaveReview_Filter y espera a que termine
            await AutoSaveReview_Filter();
        } else if (currentUrl.includes('/mod/quiz/attempt.php')) {
            console.log('Página de intento detectada. Ejecutando mostrarRespuestas_AutoSave...');
            // Ejecuta mostrarRespuestas_AutoSave directamente en modo intento
            mostrarRespuestas_AutoSave();
        } else {
            console.log('URL no coincide con /mod/quiz/review.php ni /mod/quiz/attempt.php. No se ejecuta ninguna acción.');
        }

        console.log('::::::Finalizando AutoSave_LocalStorage::::::');

    }

    function mostrarRespuestas_AutoSave() {
        const elementoRespuestasAutoSave = document.getElementById('respuestasautosave');
        const elementoPreguntaAutoSave = document.getElementById('preguntaautosave');

        if (!elementoRespuestasAutoSave) {
            console.error('El elemento con id "respuestasautosave" no existe en el DOM.');
            return;
        }

        const respuestasGuardadas = sessionStorage.getItem('questions-AutoSave') || 'N/A';

        if (respuestasGuardadas !== 'N/A') {
            const respuestasObj = JSON.parse(respuestasGuardadas);
            let respuestasFormateadas = '';

            for (const [key, value] of Object.entries(respuestasObj)) {
                if (key.startsWith('Pregunta')) {
                    const respuestas = value.respuestas || [];
                    const enunciados = value.enunciados || [];
                    const numeroPregunta = key;
                    const tipoPregunta = value.tipo || '';
                    const respuestasFinales = Array.isArray(respuestas) ? respuestas : [respuestas];

                    let respuestasHTML = '';

                    // Función auxiliar para procesar cada respuesta
                    const procesarRespuesta = (respuesta) => {
                        // Regex para identificar elementos <math>...</math>
                        const mathRegex = /<math[^>]*>[\s\S]*?<\/math>/g;

                        // Regex para identificar URLs de imágenes
                        const imageRegex = /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi;

                        // Regex para identificar Data URIs de imágenes (base64)
                        const dataUriRegex = /(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg)\;base64,[a-zA-Z0-9+/=]+)/gi;

                        // Primero, reemplazar las URLs de imágenes con etiquetas <img>
                        let respuestaProcesada = respuesta.replace(imageRegex, (match) => {
                            return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 200px; max-height: 150px;">`;
                        });

                        // Reemplazar las imágenes en formato Data URI con etiquetas <img>
                        respuestaProcesada = respuestaProcesada.replace(dataUriRegex, (match) => {
                            return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 200px; max-height: 150px;">`;
                        });

                        // Luego, envolver solo los elementos MathML en un <span> con font-size: 1.5em
                        respuestaProcesada = respuestaProcesada.replace(mathRegex, (match) => {
                            return `<span style="font-size: 1.5em;">${match}</span>`;
                        });

                        // Finalmente, reemplazar los saltos de línea con <br>
                        // Primero, asegurarse de que los saltos de línea sean consistentes
                        respuestaProcesada = respuestaProcesada.replace(/(\r\n|\n|\r)/g, '<br>');

                        return respuestaProcesada;
                    };


                    if (enunciados.length > 0 && enunciados.length === respuestasFinales.length) {
                        respuestasHTML = enunciados.map((enunciado, index) => {
                            const respuesta = respuestasFinales[index];

                            // Regex para identificar URLs de imágenes
                            const imageRegex = /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi;

                            // Regex para identificar Data URIs de imágenes (base64)
                            const dataUriRegex = /(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg);base64,[a-zA-Z0-9+/=]+)/gi;

                            // Procesar el enunciado: reemplazar URLs o Data URIs con <img> tags
                            let enunciadoProcesado = enunciado.replace(imageRegex, (match) => {
                                return `<img src="${match}" alt="Imagen de enunciado" style="max-width: 200px; max-height: 150px;">`;
                            });

                            enunciadoProcesado = enunciadoProcesado.replace(dataUriRegex, (match) => {
                                return `<img src="${match}" alt="Imagen de enunciado" style="max-width: 200px; max-height: 150px;">`;
                            });

                            // Procesar la respuesta: reemplazar URLs o Data URIs con <img> tags
                            let respuestaProcesada = respuesta.replace(imageRegex, (match) => {
                                return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 200px; max-height: 150px;">`;
                            });

                            respuestaProcesada = respuestaProcesada.replace(dataUriRegex, (match) => {
                                return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 200px; max-height: 150px;">`;
                            });

                            // Retornar el enunciado y la respuesta procesados en formato HTML
                            return `${enunciadoProcesado} <strong>➔</strong> ${respuestaProcesada}`;
                        }).join('<br>');
                    }
                    else if (enunciados.length === 0 && respuestasFinales.length > 1) {
                        if (tipoPregunta === 'draganddrop_text' || tipoPregunta === 'draganddrop_image') {
                            respuestasHTML = respuestasFinales.map((respuesta, index) => {
                                return `${index + 1}. ${procesarRespuesta(respuesta)}`;
                            }).join('<br>');
                        } else {
                            respuestasHTML = respuestasFinales.map(respuesta => {
                                return `• ${procesarRespuesta(respuesta)}`;
                            }).join('<br>');
                        }
                    } else {
                        const respuesta = respuestasFinales[0] || '';
                        respuestasHTML = procesarRespuesta(respuesta);
                    }

                    respuestasFormateadas += `
                <div class="preguntaautosave">
                    ${numeroPregunta}:
                </div>
                <div class="respuestasautosave">
                    ${respuestasHTML}
                </div>`;
                }
            }

            elementoRespuestasAutoSave.innerHTML = respuestasFormateadas;

        } else {
            elementoRespuestasAutoSave.textContent = respuestasGuardadas;
            console.log('No hay respuestas guardadas, mostrando "N/A".');
        }
    }

    async function AutoSave_Firebase() {
        console.log('::::::Iniciando AutoSave::::::');

        try {
            const preguntasPage = JSON.parse(sessionStorage.getItem('questions-AutoSave'));
            if (!preguntasPage) {
                console.error('No hay preguntas guardadas en localStorage.');
                throw new Error('No hay preguntas guardadas en localStorage.');
            }

            // Verificar el estado del switch o asumir un valor por defecto (falso si no existe)
            const switchAutosave = localStorage.getItem('switch-ruta-dinamica') === 'true';

            let ruta;

            // Obtener la referencia según el estado del switch
            if (switchAutosave === true) {
                ruta = sessionStorage.getItem('configRutaDinamic');
            } else {
                // Si switchAutosave no existe o no es true, usar configRuta de localStorage
                ruta = localStorage.getItem('configRuta');
            }

            // Manejo del caso en que no se encuentre la referencia
            if (!ruta) {
                console.warn('No se encontró la ruta de configuración en el almacenamiento correspondiente.');
                return;
            }

            // Aquí puedes continuar con la lógica usando `ruta`
            console.log('Ruta de configuración encontrada:', ruta);


            if (!ruta) {
                console.error('No se encontró la ruta. No se puede guardar.');
                alert('No se ha podido guardar porque la ruta no es válida.');
                return; // Detener la ejecución de la función
            }

            const referencia = firebase.database().ref(ruta);

            // Función para normalizar las claves existentes en Firebase
            async function normalizarClaves(preguntasFirebaseData) {
                const clavesFirebase = Object.keys(preguntasFirebaseData)
                .filter(key => /^question\d+$/.test(key)) // Filtrar solo claves que empiecen con 'question' seguido de números
                .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));

                const operaciones = [];

                clavesFirebase.forEach((currentKey, index) => {
                    const expectedKey = `question${String(index + 1).padStart(4, '0')}`;
                    if (currentKey !== expectedKey) {
                        const data = preguntasFirebaseData[currentKey];
                        operaciones.push(
                            referencia.child(currentKey).remove(),
                            referencia.child(expectedKey).set(data)
                        );
                        console.log(`Renombrada clave ${currentKey} a ${expectedKey}`);
                    }
                });

                if (operaciones.length > 0) {
                    await Promise.all(operaciones);
                }
            }

            // Función para verificar si es necesaria la normalización de claves
            async function verificarYNormalizarClaves() {
                const snapshot = await referencia.once('value');
                const preguntasFirebaseData = snapshot.val();
                if (!preguntasFirebaseData) return null; // No hay datos en Firebase

                const totalPreguntas = Object.keys(preguntasFirebaseData).length;
                const expectedLastKey = `question${String(totalPreguntas).padStart(4, '0')}`;

                const clavesOrdenadas = Object.keys(preguntasFirebaseData)
                .filter(key => /^question\d+$/.test(key))
                .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));

                const lastKey = clavesOrdenadas.pop();

                if (lastKey !== expectedLastKey) {
                    console.log(`Normalizando claves ya que la última clave "${lastKey}" no coincide con "${expectedLastKey}"`);
                    await normalizarClaves(preguntasFirebaseData);
                    return await referencia.once('value').then(snap => snap.val());
                } else {
                    // console.log('Las claves están correctamente numeradas, no se requiere normalización.');
                    return preguntasFirebaseData;
                }
            }

            // Obtener y normalizar las claves si es necesario
            let preguntasFirebaseData = await verificarYNormalizarClaves();

            // Si no se normalizó, obtener los datos una vez
            if (!preguntasFirebaseData) {
                preguntasFirebaseData = await referencia.once('value').then(snap => snap.val()) || {};
            }

            // Crear un mapa de preguntas Firebase para acceso rápido
            const preguntasFirebaseMap = {};
            Object.entries(preguntasFirebaseData).forEach(([key, value]) => {
                preguntasFirebaseMap[key] = value;
            });

            // Normalizar todas las preguntas de Firebase en paralelo
            const normalizedFirebaseHTMLMap = {};
            await Promise.all(Object.entries(preguntasFirebaseMap).map(async ([key, data]) => {
                normalizedFirebaseHTMLMap[key] = await normalizarHTML(data.html || "");
            }));

            // Preparar las preguntas de la página para procesar
            const preguntasEntries = Object.entries(preguntasPage);
            const preguntasNormalized = await Promise.all(preguntasEntries.map(async ([key, data]) => {
                const normalizedHTML = await normalizarHTML(data.html || "");
                return { key, data, normalizedHTML };
            }));

            // Preparar variables para operaciones de actualización y adición
            const operacionesActualizacion = [];
            const operacionesAdicion = [];
            const nuevasClaves = [];
            const ciclo = localStorage.getItem('ciclo');

            // Obtener el índice actual para nuevas preguntas
            const clavesNumericas = Object.keys(preguntasFirebaseMap)
            .map(key => parseInt(key.match(/\d+/)[0], 10))
            .filter(num => !isNaN(num))
            .sort((a, b) => a - b);

            let nextIndex = clavesNumericas.length > 0 ? clavesNumericas[clavesNumericas.length - 1] + 1 : 1;

            // Crear un mapa para evitar múltiples actualizaciones del mismo objeto
            const preguntasFirebaseArray = Object.entries(preguntasFirebaseMap).map(([key, value]) => ({ key, ...value }));

            // Procesar cada pregunta de la página
            for (const pregunta of preguntasNormalized) {
                const { key: preguntaPageKey, data: preguntaPageData, normalizedHTML: normalizedHtmlPage } = pregunta;
                let similitudAlta = false;

                // Comparar con todas las preguntas de Firebase
                for (const preguntaFirebase of preguntasFirebaseArray) {
                    const { key: preguntaFirebaseKey, html: htmlFirebase = "", tipo: tipoFirebase = "", estado: estadoFirebase, ciclo: cicloFirebase } = preguntaFirebase;
                    const normalizedHtmlFirebase = normalizedFirebaseHTMLMap[preguntaFirebaseKey];

                    const similitud = await compararHTML(
                        normalizedHtmlPage,
                        normalizedHtmlFirebase,
                        preguntaPageData.tipo || "",
                        tipoFirebase || ""
                    );

                    // console.log(`Similitud entre ${preguntaPageKey} y ${preguntaFirebaseKey}: ${(similitud * 100).toFixed(2)}%`);

                    if (similitud >= 0.99) {
                        if (estadoFirebase === 'verificado') {
                            console.log(`La pregunta en Firebase ${preguntaFirebaseKey} está verificada, no se actualizará.`);

                            if (preguntaPageData.feedback && preguntaPageData.feedback.trim() !== "") {
                                operacionesActualizacion.push(
                                    referencia.child(preguntaFirebaseKey).update({
                                        feedback: preguntaPageData.feedback
                                    })
                                );
                            }

                            // Verifica si cicloFirebase existe y asigna un valor por defecto si no está definido
                            const cicloFirebaseValido = cicloFirebase || "0-0";

                            // Extrae el año y el término del valor de ciclo
                            const [anioCiclo, terminoCiclo] = ciclo.split("-").map((valor, index) =>
                                                                                   index === 1 ? parseInt(valor[0]) : parseInt(valor)
                                                                                  );

                            // Extrae el año y el término del valor de cicloFirebase
                            const [anioFirebase, terminoFirebase] = cicloFirebaseValido.split("-").map((valor, index) =>
                                                                                                       index === 1 ? parseInt(valor[0]) : parseInt(valor)
                                                                                                      );

                            // Realiza la comparación
                            const cumpleCondicion = anioCiclo > anioFirebase ||
                                  (anioCiclo === anioFirebase && terminoCiclo >= terminoFirebase);




                            if (cumpleCondicion) {
                                operacionesActualizacion.push(
                                    referencia.child(preguntaFirebaseKey).update({
                                        ciclo: ciclo
                                    })
                                );
                            }

                            const fullpath = `${ruta}/${preguntaFirebaseKey}`;
                            guardarRutaUltimaPregunta(fullpath, preguntaPageKey);
                        } else {
                            const fullpath = `${ruta}/${preguntaFirebaseKey}`;
                            guardarRutaUltimaPregunta(fullpath, preguntaPageKey);

                            operacionesActualizacion.push(
                                referencia.child(preguntaFirebaseKey).update({
                                    html: preguntaPageData.html || "",
                                    feedback: preguntaPageData.feedback || "",
                                    respuestas: preguntaPageData.respuestas || "",
                                    enunciados: preguntaPageData.enunciados || "",
                                    tipo: preguntaPageData.tipo || "",
                                    timestamp: new Date().toISOString(),
                                    estado: 'no verificado',

                                })
                            );

                            // Verifica si cicloFirebase existe y asigna un valor por defecto si no está definido
                            const cicloFirebaseValido = cicloFirebase || "0-0";

                            // Extrae el año y el término del valor de ciclo
                            const [anioCiclo, terminoCiclo] = ciclo.split("-").map((valor, index) =>
                                                                                   index === 1 ? parseInt(valor[0]) : parseInt(valor)
                                                                                  );

                            // Extrae el año y el término del valor de cicloFirebase
                            const [anioFirebase, terminoFirebase] = cicloFirebaseValido.split("-").map((valor, index) =>
                                                                                                       index === 1 ? parseInt(valor[0]) : parseInt(valor)
                                                                                                      );

                            // Realiza la comparación
                            const cumpleCondicion = anioCiclo > anioFirebase ||
                                  (anioCiclo === anioFirebase && terminoCiclo >= terminoFirebase);


                            if (cumpleCondicion) {
                                operacionesActualizacion.push(
                                    referencia.child(preguntaFirebaseKey).update({
                                        ciclo: ciclo
                                    })
                                );
                            }

                            console.log(`Pregunta en Firebase ${preguntaFirebaseKey} actualizada.`);
                        }
                        similitudAlta = true;
                        break; // Salir del bucle una vez encontrada una similitud alta
                    }
                }

                // Si no se encontró una similitud alta, agregar la pregunta a Firebase
                if (!similitudAlta) {
                    const nuevaPreguntaKey = `question${String(nextIndex).padStart(4, '0')}`;
                    const fullpath = `${ruta}/${nuevaPreguntaKey}`;
                    guardarRutaUltimaPregunta(fullpath, preguntaPageKey);
                    nuevasClaves.push(nuevaPreguntaKey);

                    operacionesAdicion.push(
                        referencia.child(nuevaPreguntaKey).set({
                            html: preguntaPageData.html || "",
                            feedback: preguntaPageData.feedback || "",
                            respuestas: preguntaPageData.respuestas || "",
                            enunciados: preguntaPageData.enunciados || "",
                            tipo: preguntaPageData.tipo || "",
                            timestamp: new Date().toISOString(),
                            estado: 'no verificado',
                            ciclo: ciclo
                        })
                    );

                    console.log(`Nueva pregunta agregada a Firebase: ${nuevaPreguntaKey}`);
                    nextIndex += 1;
                }
            }

            // Ejecutar todas las actualizaciones en paralelo
            if (operacionesActualizacion.length > 0) {
                await Promise.all(operacionesActualizacion);
            }

            // Ejecutar todas las adiciones en paralelo
            if (operacionesAdicion.length > 0) {
                await Promise.all(operacionesAdicion);
            }

            console.log('Todas las preguntas han sido procesadas y guardadas correctamente.');

        } catch (error) {
            console.error('Error en AutoSave_Firebase:', error);
            throw error;
        }

        AutoReviewFirebase();

        opcionVerified_js();
    }

    // <<<<<<<<<<<<<< AutoSaveReview >>>>>>>>>>>>>>

    function contenedorAutoSaveReview_js() {

        const contenedorAutoSaveReview = document.getElementById('container-autosavereview');
        const interruptorAutoSaveReview = document.getElementById('switch-autosavereview');
        const estadoInterruptorAutoSave = localStorage.getItem('autosavereview-autoquizfillapp') || 'desactivado';

        // Verificar si la URL actual incluye '/mod/quiz/attempt.php?' o '/mod/quiz/view.php?'
        if (window.location.href.includes('/mod/quiz/review.php')) {
            // Mostrar el contenedor solo si estamos en esas páginas
            contenedorAutoSaveReview.style.display = 'block';
        } else {
            // Ocultar el contenedor si no estamos en las páginas relevantes
            contenedorAutoSaveReview.style.display = 'none';
        }

        // Estado del interruptor de AutoSave basado en localStorage
        interruptorAutoSaveReview.checked = (estadoInterruptorAutoSave === 'activado');

        interruptorAutoSaveReview.addEventListener('change', function() {
            // Obtener el elemento body-autoquiz-autosave para mostrar/ocultar
            const bodyAutoSaveReview = document.getElementById('body-autoquiz-autosavereview');

            if (
                this.checked &&
                (window.location.href.includes('/mod/quiz/review.php') ||
                 window.location.href.includes('/course/user.php'))
            ) {
                localStorage.setItem('autosavereview-autoquizfillapp', 'activado');
                // Mostrar el body cuando AutoSave está activado
                if (bodyAutoSaveReview) {
                    bodyAutoSaveReview.style.display = 'flex';
                }
            } else {
                localStorage.setItem('autosavereview-autoquizfillapp', 'desactivado');
                // Ocultar el body cuando AutoSave está desactivado
                if (bodyAutoSaveReview) {
                    bodyAutoSaveReview.style.display = 'none';
                }
            }
        });
    }

    async function AutoSaveReview_LocalStorage() {

        await contenedorRutaDinamica_js();

        // Seleccionar todos los contenedores con la clase 'formulation clearfix'
        document.querySelectorAll('.formulation.clearfix').forEach(function(formulation) {

            // Habilitar los elementos radio dentro de 'formulation clearfix'
            formulation.querySelectorAll('input[type="radio"]').forEach(function(radio) {
                radio.disabled = false; // Elimina el atributo disabled
            });

            // Habilitar los elementos select dentro de 'formulation clearfix'
            formulation.querySelectorAll('select').forEach(function(select) {
                select.disabled = false; // Elimina el atributo disabled
            });

            // Habilitar los inputs de texto dentro de 'formulation clearfix'
            formulation.querySelectorAll('input[type="text"]').forEach(function(textInput) {
                textInput.readOnly = false; // Elimina el atributo readonly
            });

            // Habilitar los checkboxes dentro de 'formulation clearfix'
            formulation.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
                checkbox.disabled = false; // Elimina el atributo disabled
            });

            // Eliminar las clases 'correct' e 'incorrect' de todos los elementos dentro de 'formulation clearfix'
            formulation.querySelectorAll('.correct, .incorrect').forEach(function(element) {
                element.classList.remove('correct', 'incorrect'); // Elimina ambas clases si están presentes
            });

            // Eliminar los íconos de respuestas incorrectas
            formulation.querySelectorAll('i.icon.fa.fa-remove.text-danger.fa-fw').forEach(function(iconIncorrect) {
                if (iconIncorrect) {
                    iconIncorrect.remove(); // Elimina el ícono de respuesta incorrecta
                }
            });

            // Selecciona todos los elementos con la clase 'specificfeedback' dentro de 'formulation'
            formulation.querySelectorAll('.specificfeedback').forEach(function(div) {
                div.remove(); // Elimina cada <div> con la clase 'specificfeedback'
            });


            // Eliminar los íconos de respuestas correctas
            formulation.querySelectorAll('i.icon.fa.fa-check.text-success.fa-fw').forEach(function(iconCorrect) {
                if (iconCorrect) {
                    iconCorrect.remove(); // Elimina el ícono de respuesta correcta
                }
            });
        });

        // console.log("Todos los elementos habilitados, clases 'correct' e 'incorrect' eliminadas y los íconos de correctas/incorrectas han sido removidos dentro de '.formulation.clearfix'");

        AutoSave_LocalStorage();
    }

    async function AutoSaveReview_Filter() {
        // Recuperar las preguntas desde sessionStorage
        const questionsAutoSave = JSON.parse(sessionStorage.getItem('questions-AutoSave'));
        console.log('questionsAutoSave:', questionsAutoSave);

        // Verificar el estado del switch o asumir un valor por defecto (falso si no existe)
        const switchAutosave = localStorage.getItem('switch-ruta-dinamica') === 'true';
        // console.log('Estado del switchAutosave:', switchAutosave);

        console.log('switchAutosave', switchAutosave);

        let configRuta;

        // Obtener la referencia según el estado del switch
        if (switchAutosave === true) {
            configRuta = sessionStorage.getItem('configRutaDinamic');
            console.log('configRuta', configRuta);
            // console.log('configRutaDinamic desde sessionStorage:', configRuta);
        } else {
            // Si switchAutosave no existe o no es true, usar configRuta de localStorage
            configRuta = localStorage.getItem('configRuta');
            console.log('configRuta desde localStorage:', configRuta);
        }

        // Manejo del caso en que no se encuentre la referencia
        if (!configRuta) {
            console.warn('No se encontró la ruta de configuración en el almacenamiento correspondiente.');
            configRuta = localStorage.getItem('configRuta');
            return;
        }

        // console.log('Ruta de configuración seleccionada:', configRuta);


        const bodyAutoSaveReview = document.getElementById("body-autoquiz-autosavereview");
        const noQuestionsMessage = document.getElementById("no-questions-message");

        if (questionsAutoSave && Object.keys(questionsAutoSave).length > 0 && noQuestionsMessage) {
            noQuestionsMessage.remove();
        }

        if (!questionsAutoSave || Object.keys(questionsAutoSave).length === 0) {
            console.warn("No existen preguntas respondidas en AutoSave.");
            if (!noQuestionsMessage) {
                const emptyMessage = document.createElement("div");
                emptyMessage.id = "no-questions-message";
                emptyMessage.textContent = "No existe preguntas respondidas";
                emptyMessage.style.color = 'red';
                emptyMessage.style.fontWeight = '500';
                emptyMessage.style.textAlign = 'center';

                if (bodyAutoSaveReview) {
                    bodyAutoSaveReview.appendChild(emptyMessage);
                }
            }
            return;
        }

        try {
            const ref = database.ref(configRuta);
            const snapshot = await ref.once('value');
            const firebaseData = snapshot.val();

            // Agrupar, normalizar y contar elementos
            const firebaseGrouped = {};
            const elementCounts = {}; // Guardará los conteos de elementos asociados a los índices
            for (const firebaseKey in firebaseData) {
                const { html, tipo, estado, feedback, ciclo } = firebaseData[firebaseKey];
                const normalizedHTML = await normalizarHTML(html);
                const elementCount = normalizedHTML.length;

                if (!firebaseGrouped[tipo]) {
                    firebaseGrouped[tipo] = [];
                    elementCounts[tipo] = {};
                }

                firebaseGrouped[tipo].push({
                    html: normalizedHTML,
                    estado,
                    firebaseKey,
                    feedback,
                    ciclo,
                });

                // Guardar el índice del elemento por su conteo
                if (!elementCounts[tipo][elementCount]) {
                    elementCounts[tipo][elementCount] = [];
                }
                elementCounts[tipo][elementCount].push(firebaseGrouped[tipo].length - 1); // Índice dentro del tipo
            }

            const keysToDelete = [];

            // Filtrar preguntas AutoSave
            for (const autoSaveKey in questionsAutoSave) {
                const { html: autosaveHTML, tipo: tipoautosave, feedback: feedbackautosave, ciclo: cicloautosave } = questionsAutoSave[autoSaveKey];
                console.log("Procesando autoSaveKey:", autoSaveKey);

                // Normaliza el HTML una sola vez
                const normalizedAutoSaveHTML = await normalizarHTML(autosaveHTML);
                const pageElementsCount = normalizedAutoSaveHTML.length;
                console.log("Cantidad de Elementos:", pageElementsCount);

                // Crear copias de seguridad de firebaseGrouped y elementCounts para evitar mutaciones accidentales
                const firebaseGroupedCopy = JSON.parse(JSON.stringify(firebaseGrouped));
                const elementCountsCopy = JSON.parse(JSON.stringify(elementCounts));

                // Verifica si el tipo y los elementos existen en firebaseGroupedCopy y elementCountsCopy
                const firebaseTypeGroup = firebaseGroupedCopy[tipoautosave];
                const elementTypeCount = elementCountsCopy[tipoautosave];

                if (firebaseTypeGroup && elementTypeCount && elementTypeCount[pageElementsCount]) {
                    const candidateIndices = elementTypeCount[pageElementsCount];
                    console.log("Candidatos encontrados con cantidad de elementos:", candidateIndices);

                    // Verificar similitud solo en los índices relevantes
                    for (const index of candidateIndices) {
                        const { html: firebaseHTML, estado, feedback, ciclo } = firebaseTypeGroup[index];
                        console.log("Procesando índice:", index);

                        // Verifica si FirebaseHTML no está vacío
                        if (!firebaseHTML || firebaseHTML.length === 0) {
                            console.warn(`FirebaseHTML está vacío para tipo "${tipoautosave}" y índice "${index}". Saltando este índice.`);
                            continue; // Salta al siguiente índice
                        }

                        console.log("Estado:", estado);
                        console.log("Feedback de Firebase:", feedback);
                        console.log("Ciclo de Firebase:", ciclo);

                        const similitud = await compararHTML(normalizedAutoSaveHTML, firebaseHTML, tipoautosave, tipoautosave);
                        console.log("Similitud entre autosave y firebase:", similitud);

                        if (similitud >= 0.99) {
                            console.log("Similitud alta, ejecutando agregarNoVerified para autoSaveKey:", autoSaveKey);
                            await agregarNoVerified(autoSaveKey);

                            const feedbackCondition =
                                  (feedback != null && feedback !== "") ||
                                  ((feedback === "" || feedback == null) && (feedbackautosave === "" || feedbackautosave == null));

                            console.log("Condición de feedback válida:", feedbackCondition);

                            let anioCiclo = 0;
                            let terminoCiclo = 0;
                            if (ciclo) {
                                const cicloParts = ciclo.split("-");
                                anioCiclo = parseInt(cicloParts[0]);
                                terminoCiclo = parseInt(cicloParts[1]?.[0] || 0); // Asegura que el segundo valor exista y sea numérico
                            }

                            console.log("Año y término del ciclo de Firebase:", anioCiclo, terminoCiclo);

                            let anioAutosave = 0;
                            let terminoAutosave = 0;
                            if (cicloautosave) {
                                const cicloAutosaveParts = cicloautosave.split("-");
                                anioAutosave = parseInt(cicloAutosaveParts[0]);
                                terminoAutosave = parseInt(cicloAutosaveParts[1]?.[0] || 0);
                            }

                            console.log("Año y término del ciclo del autosave:", anioAutosave, terminoAutosave);

                            const cicloCondition =
                                  !ciclo ||
                                  anioCiclo > anioAutosave ||
                                  (anioCiclo === anioAutosave && terminoCiclo >= terminoAutosave);

                            console.log("Condición de ciclo válida:", cicloCondition);

                            if (similitud >= 0.99 && estado === "verificado") {
                                console.log("Similitud alta y estado 'verificado', ejecutando agregarVerified para autoSaveKey:", autoSaveKey);
                                await agregarVerified(autoSaveKey); // Restaurada aquí

                                if (feedbackCondition && cicloCondition) {
                                    console.log("Condición de feedback y ciclo válida, añadiendo a keysToDelete:", autoSaveKey);
                                    keysToDelete.push(autoSaveKey);
                                    break;// Salir del bucle al encontrar el primer caso que cumpla
                                }
                            }
                        }
                    }
                } else {
                    console.log("No se encontró el tipo en firebaseGrouped o la cantidad de elementos en elementCounts.");
                }


                // Depuración adicional: verificar estado de firebaseGrouped y elementCounts al final de cada iteración
                console.log("Estado de firebaseGrouped al final de la iteración:", JSON.stringify(firebaseGroupedCopy));
                console.log("Estado de elementCounts al final de la iteración:", JSON.stringify(elementCountsCopy));
            }

            await agregarNew();

            // Eliminar preguntas de AutoSave verificadas
            for (const key of keysToDelete) {
                delete questionsAutoSave[key];
            }
            sessionStorage.setItem('questions-AutoSave', JSON.stringify(questionsAutoSave));

            if (Object.keys(questionsAutoSave).length === 0) {
                const successMessage = document.createElement("div");
                successMessage.textContent = "Todas las preguntas están guardadas y verificadas";
                successMessage.style.color = 'green';
                successMessage.style.fontWeight = '500';
                successMessage.style.textAlign = 'center';

                AutoReviewFirebase();

                // window.close();

                if (bodyAutoSaveReview) {
                    // Vaciar el contenido existente
                    bodyAutoSaveReview.innerHTML = ''; // O usa otra de las opciones mencionadas

                    // Agregar el mensaje de éxito
                    bodyAutoSaveReview.appendChild(successMessage);
                }
            }
        } catch (error) {
            console.error("Error al acceder a Firebase:", error);
        }

        mostrarRespuestas_AutoSaveReview();
    }

    function AutoReviewFirebase() {
        // Obtener el valor de 'switch-ruta-dinamica' desde localStorage
        const switchRutaDinamica = localStorage.getItem('switch-ruta-dinamica');

        // Obtener el nickname
        const nicknameElement = document.querySelector('span.dropdown-user-nick.w-100');
        const nickname = nicknameElement ? nicknameElement.textContent.trim() : "pop-up";

        // Obtener la universidad desde configRuta
        const configRuta = localStorage.getItem('configRuta');
        const university = configRuta ? configRuta.split('/')[0] : null;

        // Verificar si los datos necesarios están disponibles
        if ((!nickname || !university) && switchRutaDinamica === 'true') {
            console.error('No se pudo obtener nickname o universidad.');
            return; // Salir de la función si faltan datos
        }

        // Obtener los parámetros 'attempt' y 'cmid' desde la URL
        const urlParams = new URLSearchParams(window.location.search);
        const attempt = urlParams.get('attempt');
        const cmid = urlParams.get('cmid');

        if (!attempt || !cmid) {
            console.error('Faltan los parámetros "attempt" o "cmid" en la URL.');
            return; // Salir de la función si faltan parámetros
        }

        // Crear la ruta para Firebase
        const firebasePath = `${university}/revisiones/${nickname}/${cmid}/${attempt}`;

        // Consultar Firebase
        database.ref(firebasePath).once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                } else {
                    // Guardar la ruta en Firebase
                    database.ref(firebasePath).set(true)
                        .then(() => {

                        })
                        .catch(error => {
                            console.error('Error al guardar la ruta en Firebase:', error);
                        });
                }
            })
            .catch(error => {
                console.error('Error al consultar Firebase:', error);
            });
    }

    async function agregarVerified(valor) {
        if (!/^Pregunta\d+$/.test(valor)) {
            console.error(`El formato del valor "${valor}" no es válido. Use el formato "PreguntaX", "PreguntaXX" o "PreguntaXXX".`);
            return;
        }

        const numero = valor.replace('Pregunta', '');
        const elementos = Array.from(document.querySelectorAll('.rui-qno'));
        const elemento = elementos.find(el => el.textContent.trim() === numero);

        if (elemento) {
            const contenedor = elemento.parentNode;
            const spansRelacionados = contenedor.querySelectorAll('.autosavereview-verified, .autosavereview-contestar, .autosavereview-no-verified, .autosavereview-no-verified-correct');
            spansRelacionados.forEach(span => contenedor.removeChild(span));

            const textoNoContestar = document.createElement('span');
            textoNoContestar.textContent = 'VERIFIED';
            textoNoContestar.classList.add('autosavereview-verified');
            contenedor.appendChild(textoNoContestar);
        } else {
            console.warn(`Elemento con valor "${valor}" no encontrado.`);
        }
    }

    /**
 * Agrega una etiqueta "NO VERIFIED" a una pregunta específica en el DOM.
 *
 * @param {string} valor - El identificador de la pregunta en formato "PreguntaX", "PreguntaXX" o "PreguntaXXX".
 */
function agregarNoVerified(valor) {
    // Validar que el formato del valor sea "Pregunta" seguido de uno o más dígitos
    const formatoValido = /^Pregunta(\d+)$/;
    const matchFormato = formatoValido.exec(valor);
    if (!matchFormato) {
        console.error(`El formato del valor "${valor}" no es válido. Use el formato "PreguntaX", "PreguntaXX" o "PreguntaXXX".`);
        return;
    }

    const numero = matchFormato[1]; // Extraer el número de la pregunta
    // Buscar el elemento con clase '.rui-qno' cuyo contenido de texto coincide con el número
    const elemento = [...document.querySelectorAll('.rui-qno')].find(el => el.textContent.trim() === numero);

    if (!elemento) {
        console.warn(`Elemento con valor "${valor}" no encontrado.`);
        return;
    }

    const contenedor = elemento.parentNode;
    // Definir las clases de spans que se deben eliminar
    const clasesSpan = '.autosavereview-verified, .autosavereview-contestar, .autosavereview-no-verified, .autosavereview-no-verified-correct';
    // Eliminar los spans relacionados
    contenedor.querySelectorAll(clasesSpan).forEach(span => span.remove());

    // Buscar la sección más cercana con la clase '.info'
    const infoSection = elemento.closest('.info');
    if (!infoSection) {
        console.warn(`No se encontró la sección .info para el elemento con valor "${numero}".`);
        return;
    }

    // Inicializar la clase del nuevo span
    let spanClass = 'autosavereview-no-verified';

    // Intentar obtener el texto del elemento '.state'
    const stateText = infoSection.querySelector('.state')?.textContent.trim();

    if (stateText === 'Correcta') {
        // Si el estado es 'Correcta', asignar la clase correspondiente
        spanClass = 'autosavereview-no-verified-correct';
    } else {
        // Si el estado no es 'Correcta', realizar la verificación adicional
        const gradeText = infoSection.querySelector('.grade')?.textContent.trim();
        if (gradeText) {
            // Expresión regular para extraer las puntuaciones "Se puntúa X sobre Y"
            const matchGrade = /Se puntúa (\d+(?:,\d+)?) sobre (\d+(?:,\d+)?)$/.exec(gradeText);
            if (matchGrade) {
                const puntuacionObtenida = parseFloat(matchGrade[1].replace(',', '.'));
                const puntuacionTotal = parseFloat(matchGrade[2].replace(',', '.'));
                if (puntuacionObtenida === puntuacionTotal) {
                    spanClass = 'autosavereview-no-verified-correct';
                }
            } else {
                console.warn(`El texto de la calificación no coincide con el formato esperado para la pregunta "${numero}".`);
            }
        } else {
            console.warn(`No se encontró el elemento '.grade' para la pregunta "${numero}".`);
        }
    }

    // Crear y configurar el nuevo elemento span
    const span = document.createElement('span');
    span.textContent = 'NO VERIFIED';
    span.className = spanClass;

    // Agregar el nuevo span al contenedor
    contenedor.appendChild(span);
}


    async function agregarNew() {
        const secciones = document.querySelectorAll('.info');

        for (const seccion of secciones) {
            const ruiQnoElement = seccion.querySelector('.rui-qno');
            const stateElement = seccion.querySelector('.state');
            const gradeElement = seccion.querySelector('.grade'); // Agregar referencia al elemento de puntuación

            if (!ruiQnoElement || !stateElement || !gradeElement) continue;

            const numeroPregunta = ruiQnoElement.textContent.trim();
            const estado = stateElement.textContent.trim();
            let isCorrect = estado === 'Correcta';

            // Evaluar puntuación para determinar si la respuesta es correcta
            const gradeText = gradeElement.textContent.trim();
            const match = gradeText.match(/Se puntúa (\d+(?:,\d+)?) sobre (\d+(?:,\d+)?)/); // Buscar "Se puntúa X sobre Y"

            if (match) {
                const puntuacionObtenida = parseFloat(match[1].replace(',', '.')); // Cambiar coma por punto
                const puntuacionTotal = parseFloat(match[2].replace(',', '.'));

                // console.log(`Pregunta ${numeroPregunta}: Puntuación obtenida = ${puntuacionObtenida}, Puntuación total = ${puntuacionTotal}.`);

                if (puntuacionObtenida === puntuacionTotal) {
                    isCorrect = true;
                    // console.log(`Pregunta ${numeroPregunta}: Marcada como correcta basándose en la puntuación.`);
                }
            }

            const contenedor = ruiQnoElement.parentNode;
            const spansRelacionados = contenedor.querySelectorAll('.autosavereview-no-verified, .autosavereview-verified, .autosavereview-contestar, .autosavereview-no-verified-correct');

            // Si ya existe un span relacionado, no crear uno nuevo
            if (spansRelacionados.length > 0) {
                continue;
            }

            const textoAccion = document.createElement('span');
            if (isCorrect) {
                textoAccion.textContent = 'NEW';
                textoAccion.classList.add('autosavereview-verified');
            } else {
                textoAccion.textContent = 'NEW';
                textoAccion.classList.add('autosavereview-contestar');
            }

            contenedor.appendChild(textoAccion);
        }
    }

    function compararCiclos(ciclo1, ciclo2) {
        if (!ciclo1 || !ciclo2) return false;

        const [anio1, termino1] = ciclo1.split("-").map(Number);
        const [anio2, termino2] = ciclo2.split("-").map(Number);

        return anio1 > anio2 || (anio1 === anio2 && termino1 >= termino2);
    }

    function mostrarRespuestas_AutoSaveReview() {
        const elementoRespuestasAutoSave = document.getElementById('respuestasautosavereview');
        const elementoPreguntaAutoSave = document.getElementById('preguntaautosavereview');

        if (!elementoRespuestasAutoSave) {
            console.error('El elemento con id "respuestasautosavereview" no existe en el DOM.');
            return;
        }

        const respuestasGuardadas = sessionStorage.getItem('questions-AutoSave') || 'N/A';

        if (respuestasGuardadas !== 'N/A') {
            const respuestasObj = JSON.parse(respuestasGuardadas);
            let respuestasFormateadas = '';

            for (const [key, value] of Object.entries(respuestasObj)) {
                if (key.startsWith('Pregunta')) {
                    const respuestas = value.respuestas || [];
                    const enunciados = value.enunciados || [];
                    const numeroPregunta = key;
                    const tipoPregunta = value.tipo || '';
                    const respuestasFinales = Array.isArray(respuestas) ? respuestas : [respuestas];

                    let respuestasHTML = '';


                    const procesarRespuesta = (respuesta) => {
                        // Regex para identificar elementos <math>...</math>
                        const mathRegex = /<math[^>]*>[\s\S]*?<\/math>/g;

                        // Regex para identificar URLs de imágenes
                        const imageRegex = /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi;

                        // Regex para identificar Data URIs de imágenes (base64)
                        const dataUriRegex = /(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg)\;base64,[a-zA-Z0-9+/=]+)/gi;

                        // Primero, reemplazar las URLs de imágenes con etiquetas <img>
                        let respuestaProcesada = respuesta.replace(imageRegex, (match) => {
                            return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 200px; max-height: 150px;">`;
                        });

                        // Reemplazar las imágenes en formato Data URI con etiquetas <img>
                        respuestaProcesada = respuestaProcesada.replace(dataUriRegex, (match) => {
                            return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 200px; max-height: 150px;">`;
                        });

                        // Luego, envolver solo los elementos MathML en un <span> con font-size: 1.5em
                        respuestaProcesada = respuestaProcesada.replace(mathRegex, (match) => {
                            return `<span style="font-size: 1.5em;">${match}</span>`;
                        });

                        // Finalmente, reemplazar los saltos de línea con <br>
                        // Primero, asegurarse de que los saltos de línea sean consistentes
                        respuestaProcesada = respuestaProcesada.replace(/(\r\n|\n|\r)/g, '<br>');

                        return respuestaProcesada;
                    };

                    if (enunciados.length > 0 && enunciados.length === respuestasFinales.length) {
                        respuestasHTML = enunciados.map((enunciado, index) => {
                            const respuesta = respuestasFinales[index];

                            // Regex para identificar URLs de imágenes
                            const imageRegex = /(https?:\/\/\S+\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/gi;

                            // Regex para identificar Data URIs de imágenes (base64)
                            const dataUriRegex = /(data:image\/(?:png|jpg|jpeg|gif|bmp|webp|svg);base64,[a-zA-Z0-9+/=]+)/gi;

                            // Procesar el enunciado: reemplazar URLs o Data URIs con <img> tags
                            let enunciadoProcesado = enunciado.replace(imageRegex, (match) => {
                                return `<img src="${match}" alt="Imagen de enunciado" style="max-width: 200px; max-height: 150px;">`;
                            });

                            enunciadoProcesado = enunciadoProcesado.replace(dataUriRegex, (match) => {
                                return `<img src="${match}" alt="Imagen de enunciado" style="max-width: 200px; max-height: 150px;">`;
                            });

                            // Procesar la respuesta: reemplazar URLs o Data URIs con <img> tags
                            let respuestaProcesada = respuesta.replace(imageRegex, (match) => {
                                return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 200px; max-height: 150px;">`;
                            });

                            respuestaProcesada = respuestaProcesada.replace(dataUriRegex, (match) => {
                                return `<img src="${match}" alt="Imagen de respuesta" style="max-width: 200px; max-height: 150px;">`;
                            });

                            // Retornar el enunciado y la respuesta procesados en formato HTML
                            return `${enunciadoProcesado} <strong>➔</strong> ${respuestaProcesada}`;
                        }).join('<br>');
                    }
                    else if (enunciados.length === 0 && respuestasFinales.length > 1) {
                        if (tipoPregunta === 'draganddrop_text' || tipoPregunta === 'draganddrop_image') {
                            respuestasHTML = respuestasFinales.map((respuesta, index) => {
                                return `${index + 1}. ${procesarRespuesta(respuesta)}`;
                            }).join('<br>');
                        } else {
                            respuestasHTML = respuestasFinales.map(respuesta => {
                                return `• ${procesarRespuesta(respuesta)}`;
                            }).join('<br>');
                        }
                    } else {
                        const respuesta = respuestasFinales[0] || '';
                        respuestasHTML = procesarRespuesta(respuesta);
                    }

                    respuestasFormateadas += `
            <div class="preguntaautosavereview">
                ${numeroPregunta}:
            </div>
            <div class="respuestasautosavereview">
                ${respuestasHTML}
            </div>`;
                }
            }

            elementoRespuestasAutoSave.innerHTML = respuestasFormateadas;

        } else {
            elementoRespuestasAutoSave.textContent = respuestasGuardadas;
            console.log('No hay respuestas guardadas, mostrando "N/A".');
        }
        // autoSaveRun();
    }

    async function autoSaveRun() {
        // Verifica si el valor de 'switch-ruta-dinamica' en localStorage es 'true'
        const switchRutaDinamica = localStorage.getItem('switch-ruta-dinamica');
        console.log("switch-ruta-dinamica en localStorage:", switchRutaDinamica);

        if (switchRutaDinamica === 'true') {
            console.log("El valor de 'switch-ruta-dinamica' es 'true', procediendo con la extracción.");

            // Extrae el contenido de la clase 'rui-infobox-content--small' dentro de 'rui-infobox rui-infobox--grade'
            const infobox = document.querySelector('.rui-infobox.rui-infobox--grade .rui-infobox-content--small');
            console.log("Contenido extraído:", infobox ? infobox.innerText : "No se encontró el elemento con la clase 'rui-infobox-content--small' dentro de 'rui-infobox rui-infobox--grade'");

            if (infobox) {
                // Extrae el texto de los números dentro de la etiqueta <b>
                const text = infobox.innerText;
                console.log("Texto extraído:", text);

                // Usa una expresión regular para capturar los números (pueden ser decimales o enteros)
                const regex = /(\d+,\d+|\d+)\s*de\s*(\d+,\d+|\d+)/;
                const match = text.match(regex);
                console.log("Resultado de la expresión regular:", match);

                if (match) {
                    // Captura los dos números (nota obtenida y total)
                    const notaObtenida = parseFloat(match[1].replace(',', '.'));
                    const totalNota = parseFloat(match[2].replace(',', '.'));
                    console.log("Nota obtenida:", notaObtenida);
                    console.log("Nota total:", totalNota);

                    const configRutaDinamic = sessionStorage.getItem('configRutaDinamic') || false;

                    const nicknameElement = document.querySelector('span.dropdown-user-nick.w-100');
                    const nickname = nicknameElement ? nicknameElement.textContent.trim() : "pop-up";


                    // Compara los dos números y muestra el mensaje si son iguales
                    if (notaObtenida === totalNota && configRutaDinamic && nickname) {
                        console.log("La nota es máxima");
                        // Obtener el nickname
                        const nicknameElement = document.querySelector('span.dropdown-user-nick.w-100');
                        const nickname = nicknameElement ? nicknameElement.textContent.trim() : "pop-up";

                        // Obtener la universidad desde configRuta
                        const configRuta = localStorage.getItem('configRuta');
                        const university = configRuta ? configRuta.split('/')[0] : null;

                        // Verificar si los datos necesarios están disponibles
                        if (!nickname || !university) {
                            console.warn('No se pudo obtener nickname o universidad.');
                        }
                        else {
                            // Obtener los parámetros 'attempt' y 'cmid' desde la URL
                            const urlParams = new URLSearchParams(window.location.search);
                            const attempt = urlParams.get('attempt');
                            const cmid = urlParams.get('cmid');

                            if (!attempt || !cmid) {
                                console.error('Faltan los parámetros "attempt" o "cmid" en la URL.');
                            } else {
                                // Crear la ruta para Firebase
                                const firebasePath = `${university}/revisiones/${nickname}/${cmid}/${attempt}`;

                                // Consultar Firebase
                                database.ref(firebasePath).once('value').then(snapshot => {
                                    if (snapshot.exists()) {
                                        console.log(`El intento ${attempt} para cmid ${cmid} ya existe en Firebase. No se abrirá la URL.`);
                                    } else {
                                        // Guardar la ruta en Firebase
                                        database.ref(firebasePath).set(true)
                                            .then(() => {
                                            // Cerrar la ventana actual
                                            window.close();
                                        })
                                            .catch(error => {
                                            console.error('Error al guardar la ruta en Firebase:', error);
                                        });
                                    }
                                }).catch(error => {
                                    console.error('Error al consultar Firebase:', error);
                                });
                            }
                        }

                        // Llama a la función asíncrona AutoSave_Firebase
                        await AutoSave_Firebase();

                        const lastQuestions = (() => {
                            const isDynamicRouteSwitch = JSON.parse(localStorage.getItem('switch-ruta-dinamica'));
                            return JSON.parse(isDynamicRouteSwitch
                                              ? sessionStorage.getItem('lastQuestions')
                                              : localStorage.getItem('lastQuestions')
                                             );
                        })();


                        verificarTodas(lastQuestions); // Llama a la función verificarTodas con todos los elementos de lastQuestions
                    } else {
                        console.log("La nota no es máxima");
                    }
                }

                else {
                    console.log("No se encontró una coincidencia con la expresión regular.");
                }
            } else {
                console.log("No se encontró el contenido con la clase 'rui-infobox-content--small' dentro de 'rui-infobox rui-infobox--grade'.");
            }
        } else {
            console.log("El valor de 'switch-ruta-dinamica' no es 'true'.");
        }
    }

    // <<<<<<<<<<<<<< Verified >>>>>>>>>>>>>>

    // Definir una clave para controlar la reejecución en sessionStorage
    async function opcionVerified_js() {
        // console.log('Función opcionVerified_js iniciada.');

        // Verificación de URL y de existencia de lastQuestions en localStorage
        const urlCheck =
              window.location.href.includes('grade/report/overview/index.php') ||
              window.location.href.includes('mod/quiz/review.php') ||
              window.location.href.includes('course/user.php') ;

        const lastQuestions = (() => {
            const isDynamicRouteSwitch = JSON.parse(localStorage.getItem('switch-ruta-dinamica'));
            return JSON.parse(isDynamicRouteSwitch
                              ? sessionStorage.getItem('lastQuestions')
                              : localStorage.getItem('lastQuestions')
                             );
        })();

        // Si urlCheck es true (la URL es específica), ocultamos el contenedor
        const containerVerified = document.getElementById('container-verified');
        if (containerVerified) {
            // Establecer el display dependiendo de urlCheck
            containerVerified.style.display = urlCheck ? 'block' : 'none';
        }


        // Si lastQuestions no existe o está vacío, limpiamos el contenido y mostramos el mensaje de advertencia
        if (!lastQuestions || Object.keys(lastQuestions).length === 0) {
            const bodyAutoQuizVerified = document.getElementById('body-autoquiz-verified');
            if (bodyAutoQuizVerified) {
                // Limpiar el contenido del elemento
                bodyAutoQuizVerified.innerHTML = '';
                // console.log('Contenido de "body-autoquiz-verified" limpiado.');

                // Crear y estilizar el mensaje de advertencia
                const warningMessage = document.createElement('div');
                warningMessage.textContent = 'No existen preguntas para verificar';
                warningMessage.style.color = 'red';
                warningMessage.style.fontWeight = '500';
                warningMessage.style.textAlign = 'center';

                // Añadir el mensaje al elemento
                bodyAutoQuizVerified.appendChild(warningMessage);
            }
            return;
        }



        // Limpiar el contenido de "body-autoquiz-verified" si existe
        const bodyAutoQuizVerified = document.getElementById('body-autoquiz-verified');
        if (bodyAutoQuizVerified) {
            bodyAutoQuizVerified.innerHTML = ''; // Se elimina el contenido del elemento
            // console.log('Contenido de "body-autoquiz-verified" limpiado.');
        }

        // Crear botones y checkboxes, en ese orden, ya que lastQuestions existe y tiene elementos
        const container = document.getElementById('container-verified');
        if (container) {
            const bodyAutoQuizVerified = document.getElementById('body-autoquiz-verified');

            crearBotones(container, lastQuestions); // Llama a la función para crear botones
            crearCheckboxes(container, lastQuestions); // Llama a la función para crear checkboxes
        }
    }

    // Función para crear los botones
    function crearBotones(container, lastQuestions) {
        // Crea un contenedor para los botones de verificación
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container-verificar';

        // Botón "Verificar Todas"
        const btnVerifyAll = document.createElement('button');
        btnVerifyAll.id = 'btn-verificar-todas';
        btnVerifyAll.className = 'boton-verificar';
        btnVerifyAll.textContent = 'Verificar Todas';
        btnVerifyAll.addEventListener('click', () => {
            console.log('Botón "Verificar Todas" presionado.');
            verificarTodas(lastQuestions); // Llama a la función verificarTodas con todos los elementos de lastQuestions
        });

        // Botón "Verificar Seleccionadas"
        const btnVerifySelected = document.createElement('button');
        btnVerifySelected.id = 'btn-verificar-seleccionadas';
        btnVerifySelected.className = 'boton-verificar';
        btnVerifySelected.textContent = 'Verificar Seleccionadas';
        btnVerifySelected.addEventListener('click', async () => {
            console.log('Botón "Verificar Seleccionadas" presionado.');

            // Obtiene los checkboxes seleccionados que no estén deshabilitados
            const checkboxes = container.querySelectorAll('.autoquiz-checkbox:checked:not(:disabled)');
            if (checkboxes.length === 0) {
                console.log('No hay preguntas seleccionadas para verificar.');
                return;
            }

            // Extrae las claves seleccionadas de los checkboxes
            const selectedKeys = Array.from(checkboxes).map((cb) =>
                                                            cb.id.replace(/^checkbox-\w+-/, '')
                                                           );

            // Llama a la función verificarSeleccionadas con las claves seleccionadas
            await verificarSeleccionadas(lastQuestions, selectedKeys);
        });

        // Añadir ambos botones al contenedor de botones
        buttonsContainer.appendChild(btnVerifyAll);
        buttonsContainer.appendChild(btnVerifySelected);
        container.appendChild(buttonsContainer);

        console.log('Botones añadidos al contenedor.');
    }

    // Función para crear los checkboxes
    async function verificarEstadoEnFirebase(ruta) {
        try {
            const docRef = firebase.database().ref(ruta);  // Ruta en Firebase
            const snapshot = await docRef.once('value');  // Obtén una sola vez el valor actual

            if (snapshot.exists()) {
                const data = snapshot.val();
                return data.estado === 'verificado';  // Devuelve true si está verificado, false si no
            }
            return false;
        } catch (error) {
            console.error(`Error al verificar estado en Firebase para la ruta ${ruta}:`, error);
            return false;
        }
    }

    async function crearCheckboxes(container, lastQuestions) {
        // Crea un contenedor para los checkboxes
        const checkboxesContainer = document.createElement('div');
        checkboxesContainer.id = 'checkboxes-container';

        // Verificar si estamos en la página de revisión
        const isReviewPage = window.location.href.includes('mod/quiz/review.php');

        // Obtener los números de pregunta
        let questionNumbers = [];

        const questionSpans = document.querySelectorAll('.rui-qno');

        if (questionSpans.length > 0) {
            // Si existen elementos .rui-qno, obtener los números de ahí
            questionSpans.forEach((questionSpan) => {
                const questionNumber = questionSpan.textContent.trim();
                questionNumbers.push(questionNumber);
            });
        } else {
            // Si no existen, obtener los números de las claves de lastQuestions
            Object.keys(lastQuestions).forEach((key) => {
                const match = key.match(/Pregunta(\d+)/);
                if (match) {
                    const questionNumber = match[1];
                    questionNumbers.push(questionNumber);
                }
            });
        }

        let hasUnverifiedQuestions = false; // Variable para rastrear si hay preguntas no verificadas

        // Iterar sobre los números de pregunta
        for (const questionNumber of questionNumbers) {
            console.log(`Procesando pregunta número: ${questionNumber}`);

            // Genera la clave para buscar en lastQuestions
            const questionKey = `Pregunta${questionNumber}`;
            const ruta = lastQuestions[questionKey];

            // Verificar si la pregunta existe en lastQuestions
            if (!ruta) {
                console.log(`No se encontró la ruta para ${questionKey} en lastQuestions.`);
                continue;
            }

            // Verificación solo si estamos en la página de revisión
            let isCorrect = false;
            if (isReviewPage) {
                // Verificar el estado en Firebase
                const esVerificado = await verificarEstadoEnFirebase(ruta);
                if (esVerificado) {
                    console.log(`La pregunta ${questionKey} ya está verificada en Firebase, no se creará el checkbox.`);
                    // Eliminar la pregunta de lastQuestions
                    delete lastQuestions[questionKey];
                    continue;
                }

                // Obtener el contenedor de la pregunta
                let questionContainer = null;
                for (const questionSpan of questionSpans) {
                    if (questionSpan.textContent.trim() === questionNumber) {
                        questionContainer = questionSpan.closest('.que');
                        break;
                    }
                }

                if (!questionContainer) {
                    console.log(`No se encontró el contenedor .que para la pregunta número: ${questionNumber}`);
                    continue;
                }

                // Verificar si la respuesta es correcta basado en clases CSS o contenido de texto
                const isCorrectClassPresent = questionContainer.classList.contains('correct'); // Clase 'correct'

                // Intentar verificar con la lógica existente
                isCorrect = isCorrectClassPresent || (
                    questionContainer.querySelector('.content .outcome .feedback .specificfeedback')?.textContent.trim() === 'Respuesta correcta'
                );

                // Si no se ha determinado aún que es correcta, intentamos con la nueva lógica
                if (!isCorrect) {
                    // Buscar el elemento con la clase 'grade' dentro de questionContainer
                    const gradeElement = questionContainer.querySelector('.grade');

                    if (gradeElement) {
                        // Extraer y procesar el texto del elemento .grade
                        const gradeText = gradeElement.textContent.trim();
                        const match = gradeText.match(/Se puntúa (\d+(?:,\d+)?) sobre (\d+(?:,\d+)?)/); // Buscar "Se puntúa X sobre Y"

                        if (match) {
                            // Convertir las puntuaciones a números para comparación
                            const puntuacionObtenida = parseFloat(match[1].replace(',', '.')); // Cambiar coma por punto
                            const puntuacionTotal = parseFloat(match[2].replace(',', '.'));

                            // console.log(`Pregunta ${questionNumber}: Puntuación obtenida = ${puntuacionObtenida}, Puntuación total = ${puntuacionTotal}.`);

                            // Si la puntuación obtenida es igual a la total, la respuesta es correcta
                            if (puntuacionObtenida === puntuacionTotal) {
                                isCorrect = true;
                                // console.log(`Pregunta ${questionNumber}: Marcada como correcta basándose en la puntuación.`);
                            }
                        }
                    }
                }

            }

            // Marcar que hay al menos una pregunta no verificada
            hasUnverifiedQuestions = true;

            // Crear contenedor individual para cada checkbox
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'checkbox-item';

            // Crear el checkbox con un ID único
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox-verified autoquiz-checkbox';
            const uniqueId = `checkbox-${Math.random().toString(36).substr(2, 9)}-${questionKey.toLowerCase()}`;
            checkbox.id = uniqueId;
            checkbox.value = ruta;

            // Si estamos en la página de revisión y la respuesta es correcta, marcar el checkbox
            if (isReviewPage && isCorrect) {
                checkbox.checked = true;
                console.log(`Checkbox marcado como correcto para la pregunta número ${questionNumber}`);
            }

            // Crear etiqueta para el checkbox
            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = questionKey;

            // Añadir el checkbox y su etiqueta al contenedor individual
            checkboxItem.appendChild(checkbox);
            checkboxItem.appendChild(label);
            checkboxesContainer.appendChild(checkboxItem);
        }

        if (hasUnverifiedQuestions) {
            // Añadir el contenedor de checkboxes al contenedor principal
            container.appendChild(checkboxesContainer);
            console.log('Checkboxes añadidos al contenedor.');
        } else {
            // Mostrar mensaje de que todas las preguntas están verificadas
            const message = document.createElement('p');
            message.textContent = 'Todas las preguntas ya están verificadas.';
            // Aplicar estilos al mensaje
            message.style.color = 'green';
            message.style.fontWeight = '500';
            message.style.textAlign = 'center';
            container.appendChild(message);
            console.log('Todas las preguntas ya están verificadas.');

            // Eliminar lastQuestions de localStorage
            localStorage.removeItem('lastQuestions');
            console.log('lastQuestions eliminado de localStorage.');
        }
    }

    // Función para verificar todas las preguntas
    async function verificarTodas(questions) {
        console.log('Iniciando verificación de todas las preguntas:', questions);

        // Obtiene todas las rutas de preguntas
        const rutas = Object.values(questions);

        // Crea y ejecuta las promesas de actualización
        const updatePromises = rutas.map(async (ruta) => {
            try {
                await database.ref(ruta).update({ estado: 'verificado' });
                console.log(`Estado actualizado a 'verificado' para la ruta: ${ruta}`);
            } catch (error) {
                console.log(`Error al actualizar el estado para la ruta "${ruta}":`, error);
            }
        });

        // Espera que todas las promesas se completen
        await Promise.all(updatePromises);
        console.log('Todas las preguntas han sido verificadas.');

        // Limpia lastQuestions
        localStorage.removeItem('lastQuestions');
        console.log('Elemento "lastQuestions" eliminado de LocalStorage.');

        // Muestra mensaje de verificación exitosa en el contenedor
        mostrarMensajeVerificacion();
    }

    // Función para verificar solo las preguntas seleccionadas
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async function verificarSeleccionadas(questions, selectedKeys) {
        console.log('Iniciando verificación de preguntas seleccionadas:', selectedKeys);

        // Transformar claves seleccionadas a la estructura correcta
        const transformedSelectedKeys = selectedKeys.map(key => capitalizeFirstLetter(key));
        const rutasSeleccionadas = transformedSelectedKeys.map(key => questions[key]).filter(ruta => ruta !== undefined);

        // Crea y ejecuta las promesas de actualización
        const updatePromises = rutasSeleccionadas.map(async (ruta) => {
            try {
                const ref = database.ref(ruta);
                await ref.update({ estado: 'verificado' });
                console.log(`Estado actualizado a 'verificado' para la ruta: ${ruta}`);
            } catch (error) {
                console.log(`Error al actualizar el estado para la ruta "${ruta}":`, error);
            }
        });

        // Espera que todas las promesas se completen
        await Promise.all(updatePromises);

        // Limpia lastQuestions
        localStorage.removeItem('lastQuestions');
        console.log('Elemento "lastQuestions" eliminado de LocalStorage.');

        // Muestra mensaje de verificación exitosa en el contenedor
        mostrarMensajeVerificacion();
    }

    // Función para mostrar el mensaje de verificación exitosa en el contenedor
    function mostrarMensajeVerificacion() {
        const container = document.getElementById('container-verified');
        if (container) {
            // Limpia el contenedor
            container.innerHTML = '';

            // Crear mensaje centrado
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Verificación exitosa ✓';
            successMessage.style.color = 'green';
            successMessage.style.fontWeight = '500';
            successMessage.style.textAlign = 'center';

            // Añadir mensaje al contenedor
            container.appendChild(successMessage);
        }

        const bodyAutoSaveReview = document.getElementById('body-autoquiz-autosavereview');
        bodyAutoSaveReview.style.display = 'none';
        console.log('Verificación exitosa');
    }

    function opcionAutoQuiz_css() {
        const estilosAutoQuiz = `


/* Estilo para los elementos select */
.dynamic-select {
    width: 100%; /* Ocupar todo el ancho del contenedor */
    padding: 0.5rem 1rem; /* Espaciado interno */
    font-size: 1rem; /* Tamaño de fuente */
    color: #333; /* Texto en gris oscuro */
    background-color: #fff; /* Fondo blanco */
    border: 1px solid #ccc; /* Borde tenue */
    border-radius: 4px; /* Bordes redondeados */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra ligera */
    transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Transición en foco */
}

/* Estilo al pasar el mouse por encima */
.dynamic-select:hover {
    border-color: #888; /* Borde más visible */
}

/* Estilo al enfocar el select */
.dynamic-select:focus {
    border-color: #007bff; /* Azul para el foco */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Sombra azul */
    outline: none; /* Quitar borde predeterminado */
}

/* Estilo para las opciones dentro del select */
.dynamic-select option {
    font-size: 1rem; /* Tamaño de fuente uniforme */
    color: #333; /* Color del texto */
    padding: 0.5rem; /* Espaciado interno */
}

/* Estilo específico para pantallas pequeñas */
@media (max-width: 600px) {
    .dynamic-select {
        font-size: 0.9rem; /* Ajustar tamaño de fuente */
    }
}




                .autosavereview-verified {
            display: inline-block;
            background-color: LimeGreen;
            color: white;
            padding: 5px 10px;
            margin-left: 10px;
            border-radius: 5px;
            font-weight: 600;
    font-size: 14px;
        }

                .autosavereview-no-verified-correct {
            display: inline-block;
            background-color: LimeGreen;
            color: white;
            padding: 5px 10px;
            margin-left: 10px;
            border-radius: 5px;
            font-weight: 600;
    font-size: 14px;
        }

                        .autosavereview-no-verified {
            display: inline-block;
            background-color: Red;
            color: white;
            padding: 5px 10px;
            margin-left: 10px;
            border-radius: 5px;
            font-weight: 600;
    font-size: 14px;
        }

.autosavereview-contestar {
            display: inline-block;
            background-color: red;
            color: white;
            padding: 5px 10px;
            margin-left: 10px;
            border-radius: 5px;
            font-weight: 600;
    font-size: 14px;
        }

.select-siguiente-usuario {
    font-size: 14px;              /* Tamaño de fuente para el texto seleccionado */
    font-weight: 600;             /* Grosor de la fuente para el texto seleccionado */
    color: #34495e;               /* Color del texto seleccionado */
    border: none;                 /* Elimina el borde del select */
    background-color: transparent;/* Fondo transparente */
    outline: none;                /* Elimina el borde de enfoque */
    appearance: none;             /* Quita el estilo predeterminado del navegador */
    cursor: pointer;              /* Cambia el cursor a pointer */
    text-align: right;            /* Alinea el texto seleccionado a la derecha */
    padding-right: 0px;           /* Espacio entre el texto y el borde derecho */
    direction: rtl;               /* Alinea el desplegable hacia la derecha */
}

/* Estilo de las opciones dentro del select */
.select-siguiente-usuario option {
    font-size: 12px;              /* Tamaño de fuente más pequeño para las opciones desplegables */
    padding: 10px;            /* Espacio alrededor del texto en cada opción */
    text-align: right;           /* Centra el texto dentro de las opciones */
    direction: ltr;               /* Restablece la dirección del texto para que se lea correctamente */
}

/* Limita la altura del desplegable para mostrar un número reducido de opciones */
.select-siguiente-usuario {
    max-height: 30px;             /* Reduce la altura visible del select */
    overflow-y: auto;             /* Habilita la barra de desplazamiento vertical */
}

/* Personalización de la barra de desplazamiento */
.select-siguiente-usuario::-webkit-scrollbar {
    width: 2px;                   /* Reduce la anchura de la barra de desplazamiento */
}

.select-siguiente-usuario::-webkit-scrollbar-thumb {
    background-color: rgba(52, 73, 94, 0.2); /* Barra de desplazamiento más transparente */
    border-radius: 10px;          /* Bordes redondeados para la barra */
}

.select-siguiente-usuario::-webkit-scrollbar-track {
    background-color: transparent;/* Fondo transparente para la pista de la barra */
}

/* Destacar la opción seleccionada incluso al pasar el mouse */
/* Nota: Debido a limitaciones, esto solo funciona en algunos navegadores */
.select-siguiente-usuario option:checked {
    background-color: #dcdde1;    /* Fondo diferente para la opción seleccionada */
    font-weight: bold;            /* Fuente en negrita para la opción seleccionada */
}

/* Evitar que el hover cambie el estilo de la opción seleccionada */
.select-siguiente-usuario option:hover {
    background-color: #f1f2f6;    /* Fondo al pasar el mouse */
}

/* Mantener el estilo de la opción seleccionada al hacer hover */
.select-siguiente-usuario option:hover:checked {
    background-color: #dcdde1;    /* Mantiene el fondo de la opción seleccionada */
}



/* Estilos para los checkboxes de AutoQuiz */
.autoquiz-checkbox {
    accent-color: #0072c5; /* Color por defecto para checkboxes habilitados */
    width: 20px; /* Tamaño opcional */
    height: 20px; /* Tamaño opcional */
}

/* Cambiar el color del checkbox cuando está deshabilitado */
.autoquiz-checkbox:disabled {
    accent-color: green; /* Cambia a verde cuando está deshabilitado */
    cursor: not-allowed; /* Cambiar el cursor para indicar que está deshabilitado */
}

/* Opcional: Mejorar la apariencia general de los checkboxes */
.checkbox-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px; /* Espaciado entre los items */
}

.checkbox-verified {
    margin-right: 8px; /* Espaciado entre el checkbox y el label */
}


.boton-siguiente-usuario {
    margin-top: 0;
    margin-bottom: 0;           /* Establece el margen superior a 0 */
    font-weight: 600;       /* Hace el texto del botón más negrito (600) */
    border: none;           /* Elimina cualquier borde */
    background-color: transparent; /* Fondo transparente */
    cursor: pointer;        /* Cambia el cursor a pointer para indicar que es interactivo */
    padding: 0px 3px;      /* Espaciado interno opcional */
}

.boton-siguiente-usuario i {
    font-size: 0.90em;       /* Ajusta el tamaño del ícono dentro del botón */
    color: #34495e;         /* Color del ícono */
}

              /* Estilos básicos para los checkboxes */
        .checkbox-item {
            display: flex;
            align-items: center;
            margin-top: 5px;
        }
        .checkbox-item label {
            margin-left: 8px;
            margin-bottom: 0px;
            margin-top: 0px;
        }


      .boton-verificar {
        width: 100%;
        padding: 12px;
        background-color: #0072c5;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    /* Efecto hover en los botones */
    .boton-verificar:hover {
        background-color: #002c67;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }
.buttons-container-verificar {
    display: flex;
    flex-direction: column;
    gap: 5px; /* Espacio entre los botones */
    margin-bottom: 10px; /* Espacio debajo de los botones */
}



        /* Estilos para el contenedor de Verificar */
        .subcontainer-autoquiz-verificar {
            margin-top: 10px; /* Espaciado superior para separar del contenido anterior */
            margin-bottom: 10px; /* Espaciado inferior */
            background-color: #f4f4f4; /* Color de fondo suave */
            padding: 10px 15px; /* Relleno interno */
            border-radius: 8px; /* Bordes redondeados */
            border: 1px solid #dcdcdc; /* Borde suave */
            overflow-y: auto; /* Habilitar desplazamiento si es necesario */
            max-height: 100px; /* Limitar la altura máxima a 100px */
        }

        /* Estilos para el botón "Verificar Preguntas" */
        .boton-verified {
            width: 100%; /* Asegurarse de que ocupe todo el ancho disponible */
            padding: 12px;
            background-color: #0072c5; /* Color de fondo */
            color: white; /* Color del texto */
            border: none; /* Sin bordes */
            border-radius: 5px; /* Bordes redondeados */
            font-size: 16px; /* Tamaño de la fuente */
            cursor: pointer; /* Cambiar el cursor al pasar sobre el botón */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra suave */
            transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Transiciones suaves */
              margin-top: -4px; /* Margen inferior */
              margin-bottom: 6px; /* Margen inferior */
        }

        /* Efecto hover en el botón "Verificar Preguntas" */
        .boton-verified:hover {
            background-color: #002c67; /* Cambio de color de fondo al pasar el cursor */
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada al pasar el cursor */
        }

        /* Estilos para el contenedor de cada pregunta */
        .question-container-autoquiz {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 0;
            color: #34495e;
            flex-wrap: wrap;
            width: 100%;
            word-wrap: break-word;
            word-break: break-word;
            margin-bottom: 7px; /* Espacio entre preguntas */
        }

        /* Estilos para el título de la pregunta */
        .question-title-autoquiz {
            color: #333;
            font-size: 13px;
            font-weight: 500;
            margin-bottom: -1px; /* Espacio después del título */
        }

        /* Contenedor para agrupar cada par de etiqueta-valor (Estado y Similitud) */
        .question-data-group {
            display: flex; /* Asegura que los elementos se alineen horizontalmente */
            flex-direction: row; /* Coloca la etiqueta y el valor en una sola línea */
            justify-content: flex-start;
            align-items: center; /* Alinea verticalmente el contenido al centro */
            margin: 0 0 -4px 0px; /* Eliminar margen adicional */
            padding: 0; /* Eliminar padding adicional */
        }

        /* Estilos para los elementos de etiqueta como Estado, Similitud */
        .question-label-autoquiz {
            color: #333;
            font-size: 13px;
            font-weight: 500;
            margin-right: 3px; /* Espacio entre la etiqueta y el valor */
        }

        /* Estilos para los valores correspondientes a Estado y Similitud */
        /* Estilos para los valores correspondientes a Estado, Similitud, Respuestas */
        .question-value-autoquiz {
            color: #333;
            font-size: 12px;
            font-weight: 400;
            font-style: normal;
            line-height: 1.2; /* Ajuste para eliminar el espacio entre líneas */
        }


        /* Estilo para el contenedor específico de las respuestas */
        .responses-container {
            margin: 0px; /* Sin margen adicional */
        }

        .responses-container .question-label-autoquiz {
            display: block; /* Mantiene la etiqueta "Respuestas" en una sola línea */
            margin-bottom: 0px; /* Sin espacio adicional debajo de la etiqueta */
            margin-top: 0px; /* Sin espacio adicional debajo de la etiqueta */
        }

        .responses-container .question-value-autoquiz {
            display: block; /* Asegura que las respuestas aparezcan en una nueva línea */
            margin-top: -2px; /* Sin margen adicional arriba de las respuestas */
            padding-left: 0px; /* Alineación directa debajo de la etiqueta */
        }


           /* Estilos para el contenedor principal que ocupa toda la ventana */
        .container-autoquiz {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 10px;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
            overflow-y: auto; /* Permite el desplazamiento vertical */
            -ms-overflow-style: none; /* Ocultar en Internet Explorer y Edge */
            scrollbar-width: none; /* Ocultar en Firefox */
        }

        /* Ocultar la barra de desplazamiento en Chrome, Safari y Opera */
        .container-autoquiz::-webkit-scrollbar {
            display: none;
        }


            /* Estilo para el contenedor que muestra los usuarios actuales y siguientes */
            .users {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                box-sizing: border-box;
                margin-bottom: 15px ;
            }

            /* Estilo para el nombre de usuario */
            .nombre-usuario, .nombre-siguiente-usuario {
                font-size: 14px;
                font-weight: 600;
                color: #34495e;
                margin: 0 5px;
            }

            /* Sección de usuario actual alineada a la izquierda */
            .usuario-actual {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex: 1;
            }



        /* Botón para el siguiente usuario sin fondo ni bordes */
        .boton-simple-autoquiz {
            background: none;
            border: none;
            color: #34495e;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex; /* Cambiamos a inline-flex para respetar el ancho del texto */
            align-items: center;
            justify-content: flex-start; /* Alinea el texto y el ícono de forma continua */
            width: auto; /* Ajusta el ancho según el contenido */
            white-space: normal; /* Permite el quiebre del texto si el ancho es pequeño */
            padding: 0;
            margin: 0;
        }

        /* Alinear el ícono justo después del texto */
        .boton-simple-autoquiz i {
            margin-left: 5px; /* Añade un pequeño margen para separar el ícono del texto */
            flex-shrink: 0; /* Evita que el ícono se reduzca en tamaños pequeños */
            margin-bottom: 5px;
        }

        /* Efecto al hacer clic o al enfocarse */
        .boton-simple-autoquiz:focus,
        .boton-simple-autoquiz:active {
            outline: none;
            color: #2c3e50;
            background: none;
        }

            /* Estilo para la ruta configurada */
            .ruta-config {
                margin-top: 10px;
                font-size: 10px;
                color: #34495e;
            }

        /* Ajuste para que el contenedor AutoSave ocupe todo el espacio restante */
        .subcontainer-autoquiz-autofill {
                margin-top: 10px;
            margin-bottom: 10px;
            background-color: #f4f4f4;
            padding: 10px 15px;
            border-radius: 8px;
            border: 1px solid #dcdcdc;
            overflow-y: auto; /* Habilitar desplazamiento si es necesario */
            max-height: 300px; /* Limitar la altura máxima a 350px */

        }
        /* Estilos personalizados para la barra de desplazamiento */
        .subcontainer-autoquiz-autofill::-webkit-scrollbar {
            width: 3px; /* Ancho del scrollbar */
        height: 3px; /* Alto del scrollbar horizontal */
        }

        .subcontainer-autoquiz-autofill::-webkit-scrollbar-track {
            background: transparent; /* Fondo del track transparente */
        }

        .subcontainer-autoquiz-autofill::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2); /* Color tenue para el thumb */
            border-radius: 10px; /* Bordes redondeados */
        }

        .subcontainer-autoquiz-autofill::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0, 0, 0, 0.3); /* Color un poco más oscuro al pasar el mouse */
        }

        /* Ajuste para que el contenedor AutoSave ocupe todo el espacio restante */
        .subcontainer-autoquiz-autosave {
            margin-top: 10px;
            margin-bottom: 10px;
            background-color: #f4f4f4;
            padding: 10px 15px;
            border-radius: 8px;
            border: 1px solid #dcdcdc;
            overflow-y: auto; /* Habilitar desplazamiento si es necesario */
            max-height: 300px; /* Limitar la altura máxima a 350px */
        }

        /* Estilos personalizados para la barra de desplazamiento */
        .subcontainer-autoquiz-autosave::-webkit-scrollbar {
            width: 3px; /* Ancho del scrollbar */
            height: 3px; /* Alto del scrollbar horizontal */
        }

        .subcontainer-autoquiz-autosave::-webkit-scrollbar-track {
            background: transparent; /* Fondo del track transparente */
        }

        .subcontainer-autoquiz-autosave::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2); /* Color tenue para el thumb */
            border-radius: 10px; /* Bordes redondeados */
        }

        .subcontainer-autoquiz-autosave::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0, 0, 0, 0.3); /* Color un poco más oscuro al pasar el mouse */
        }

        .subcontainer-autoquiz-verified {
            margin-top: 10px;
            margin-bottom: 10px;
            background-color: #f4f4f4;
            padding: 10px 15px;
            border-radius: 8px;
            border: 1px solid #dcdcdc;
            overflow-y: auto; /* Habilitar desplazamiento si es necesario */
            max-height: 350px; /* Limitar la altura máxima a 350px */
        }

        /* Estilos personalizados para la barra de desplazamiento */
        .subcontainer-autoquiz-verified::-webkit-scrollbar {
            width: 3px; /* Ancho del scrollbar */
            height: 3px; /* Alto del scrollbar horizontal */
        }

        .subcontainer-autoquiz-verified::-webkit-scrollbar-track {
            background: transparent; /* Fondo del track transparente */
        }

        .subcontainer-autoquiz-verified::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2); /* Color tenue para el thumb */
            border-radius: 10px; /* Bordes redondeados */
        }

        .subcontainer-autoquiz-verified::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0, 0, 0, 0.3); /* Color un poco más oscuro al pasar el mouse */
        }

        .subcontainer-autoquiz-autosavereview {
            margin-top: 10px;
            margin-bottom: 10px;
            background-color: #f4f4f4;
            padding: 10px 15px;
            border-radius: 8px;
            border: 1px solid #dcdcdc;
            overflow-y: auto; /* Habilitar desplazamiento si es necesario */
            max-height: 350px; /* Limitar la altura máxima a 350px */
        }

        /* Estilos personalizados para la barra de desplazamiento */
        .subcontainer-autoquiz-autosavereview::-webkit-scrollbar {
            width: 3px; /* Ancho del scrollbar */
            height: 3px; /* Alto del scrollbar horizontal */
        }

        .subcontainer-autoquiz-autosavereview::-webkit-scrollbar-track {
            background: transparent; /* Fondo del track transparente */
        }

        .subcontainer-autoquiz-autosavereview::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.2); /* Color tenue para el thumb */
            border-radius: 10px; /* Bordes redondeados */
        }

        .subcontainer-autoquiz-autosavereview::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0, 0, 0, 0.3); /* Color un poco más oscuro al pasar el mouse */
        }

            /* Estilo común para el header que contiene el título y el switch */
        .header-autoquiz {
            margin-top: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
        }

        /* Estilo para el título */
        .header-autoquiz h2 {
            font-size: 22px;
            font-weight: 600;
            color: #34495e;
            margin: 0;
        }

        .header-autoquiz h3 {
            font-size: 20px;
            font-weight: 600;
            color: #34495e;
            margin: 0;

        }

         .header-autoquiz h4 {
         width: 100%;
         display: flex;
    justify-content: center;
            font-size: 22px;
            font-weight: 600;
            color: #34495e;
            margin: 0;
            text-align: center;
        }

        /* Estilo para el switch */
        .switch-autoquiz {
            position: relative;
            display: inline-block;
            width: 34px;
            height: 20px;
        }

        .switch-autoquiz input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: 0.4s;
            border-radius: 20px;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 12px;
            width: 12px;
            border-radius: 50%;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: 0.4s;
        }

        input:checked + .slider {
            background-color: #3498db;
        }

        input:checked + .slider:before {
            transform: translateX(14px);
        }

        /* Estilo para el contenido dentro de los contenedores de AutoFill y AutoSave */
        .body-autoquiz {
            display: flex;
            flex-direction: column;
            gap: 0px;
            font-size: 16px;
            width: 100%; /* Para que ocupe el 100% del ancho del contenedor padre */
        }

        /* Estilo para cada línea de dato en AutoFill y AutoSave */
        .dato-autoquiz {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0;
            color: #34495e;
            flex-wrap: wrap; /* Permitir que el contenido se ajuste si es muy largo */
            width: 100%; /* Para que ocupe todo el ancho del contenedor */
            word-wrap: break-word; /* Romper palabras si son muy largas */
            word-break: break-word; /* Para manejar palabras largas en el texto */
        }


        /* Si la ruta no es válida, oculta los contenedores */
        #container-autofill[style*="display: none"],
            #container-autosave[style*="display: none"] {
                display: none;
            }

        /* Estilo para el contenedor oculto que se muestra al hacer clic */
        #container-viewquestion {
            margin-top: 0;
            padding: 10px;
            font-size: 14px;
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        /* Estilos para la pregunta */
        .preguntaautosave {
            color: #333; /* Color casi negro */
            font-size: 13px; /* Puedes ajustar el tamaño de la fuente aquí */
            font-weight: 500;
            margin-top: 5px;
            /* Grosor modificable: 100 (fino), 400 (normal), 700 (grueso), etc. */
        }

        /* Estilos para las respuestas */
        .respuestasautosave {
            color: #333; /* Color casi negro, igual que las preguntas */
            font-size: 12px; /* Tamaño de la fuente, ajustable */
            font-weight: 400; /* Eliminar negritas */
            font-style: normal; /* Eliminar la cursiva */
        }

        /* Estilos para la pregunta */
        .preguntaautosavereview {
            color: #333; /* Color casi negro */
            font-size: 13px; /* Puedes ajustar el tamaño de la fuente aquí */
            font-weight: 500;
            margin-top: 5px;
            /* Grosor modificable: 100 (fino), 400 (normal), 700 (grueso), etc. */
        }

        /* Estilos para las respuestas */
        .respuestasautosavereview {
            color: #333; /* Color casi negro, igual que las preguntas */
            font-size: 12px; /* Tamaño de la fuente, ajustable */
            font-weight: 400; /* Eliminar negritas */
            font-style: normal; /* Eliminar la cursiva */
        }
`;

        const hojaEstilosAutoQuiz = document.createElement("style");
        hojaEstilosAutoQuiz.type = "text/css";
        hojaEstilosAutoQuiz.innerText = estilosAutoQuiz;
        document.head.appendChild(hojaEstilosAutoQuiz);
    }

    // :::::: Opción Config  ::::::

    function opcionConfigRuta_html() {
        return `
        <div class="contenido-configruta">
            <h3 class="title-optionmenu">Configuración de Ruta</h3>

  <!-- Contenedor Principal -->
        <div id="ultima-ruta-configruta" class="estilo-configruta-title no-seleccionado">

            <!-- Contenedor para Ruta y Ciclo apilados verticalmente -->
            <div class="ruta-ciclo-container">

                <!-- Ruta -->
                <div id="ruta-configruta" class="title-configruta-ruta">
                    <span class="label-configruta">Ruta:</span>
                </div>

                <!-- Ciclo -->
                <div id="ciclo-configruta" class="title-configruta-ciclo">
                    <span class="label-configruta">Ciclo:</span>
                </div>

            </div>
        </div>

            <!-- Contenedor Selects Dinamicos -->
            <div id="selects-configruta">
                <!-- Aquí puedes agregar más contenido o elementos dinámicos -->
            </div>

            <button id="boton-guardar-configruta" class="estilo-configruta-boton guardar">Guardar Ruta</button>
        </div>
        `;
    }

    function comprobarRutaCiclo_ConfigRuta() {
        const containerAutoQuiz = document.querySelectorAll('.container-autoquiz');
        const configRuta = localStorage.getItem('configRuta');
        const ciclo = localStorage.getItem('ciclo');

        console.log('Valores obtenidos de localStorage:', { configRuta, ciclo });

        // Verificar si configRuta y ciclo están definidos
        if (!configRuta || !ciclo) {
            console.log('configRuta o ciclo no están definidos.');

            // Desactivar autofill y autosave
            localStorage.setItem('autofill-autoquizfillapp', 'desactivado');
            localStorage.setItem('autosave-autoquizfillapp', 'desactivado');
            console.log('Autofill y autosave desactivados en localStorage.');

            // Crear y mostrar el mensaje de advertencia en 'contenido-principal'
            const mensaje = document.createElement('div');
            mensaje.textContent = 'No ha seleccionado una ruta o ciclo';
            mensaje.style.color = 'red';
            mensaje.style.fontWeight = '500';
            mensaje.style.fontSize = '1em';
            mensaje.style.fontStyle = 'italic';
            mensaje.style.textAlign = 'center';
            mensaje.style.marginBottom = '10px';
            mensaje.id = 'mensaje-ruta-invalida';

            const rutaCicloContainer = document.querySelector('.ruta-ciclo-container');
            const contenidoPrincipal = document.getElementById('contenido-principal');

            if (contenidoPrincipal && !document.getElementById('mensaje-ruta-invalida')) {
                contenidoPrincipal.appendChild(mensaje);

                // Verifica si el elemento existe y luego lo oculta
                if (rutaCicloContainer) {
                    rutaCicloContainer.style.display = 'none';
                    console.log('Elemento ruta-ciclo-container ocultado:', rutaCicloContainer);
                }

                console.log('Mensaje de advertencia añadido al contenido principal.');
            }
        } else {
            console.log('configRuta y ciclo están definidos. Mostrando contenedores.');

            const rutaCicloContainer = document.querySelector('.ruta-ciclo-container');

            // Mostrar los contenedores si configRuta y ciclo están definidos
            if (rutaCicloContainer) {
                rutaCicloContainer.style.display = 'block';
                console.log('Elemento ruta-ciclo-container mostrado:', rutaCicloContainer);
            }


            // Eliminar el mensaje si existe
            const mensajeExistente = document.getElementById('mensaje-ruta-invalida');
            if (mensajeExistente) {
                mensajeExistente.remove();
                console.log('Mensaje de advertencia eliminado.');
            }

            // Establecer el valor de 'Ruta' y 'Ciclo' en el HTML correspondiente
            const rutaElemento = document.getElementById('ruta-configruta');
            const cicloElemento = document.getElementById('ciclo-configruta');

            if (rutaElemento && cicloElemento) {
                // Asignar los valores de configRuta y ciclo en los elementos del DOM
                rutaElemento.innerHTML = `<span class="ruta-configruta">Ruta:</span> ${configRuta}`;
                cicloElemento.innerHTML = `<span class="ciclo-configruta">Ciclo:</span> ${ciclo}`;
                console.log(`Valores asignados: Ruta = ${configRuta}, Ciclo = ${ciclo}`);
            }
        }
    }

    // Variable global para llevar el conteo de niveles de select.
    let nivelActual = 1;

    function formatearLabelTexto(key) {
        const partes = key.split('-').slice(1);
        return partes.map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ');
    }

    function guardarEstadoSelects() {
        const contenedorSelects = document.getElementById('selects-configruta');
        const selects = Array.from(contenedorSelects.querySelectorAll('select'));
        const estado = selects.map(select => ({
            nivel: select.getAttribute('data-level'),
            id: select.id,
            ruta: select.getAttribute('data-path'),
            seleccion: select.value  // Guardar el valor seleccionado actual
        }));
        console.log("Guardando estado en localStorage:", estado);
        localStorage.setItem('estadoSelects', JSON.stringify(estado));
    }

    async function SelectUniversidad_ConfigRuta() {
        console.log("Ejecutando SelectUniversidad_ConfigRuta...");

        const rutaFirebase = 'ConfigRuta/universidad';
        const databaseRef = firebase.database().ref(rutaFirebase);
        const contenedorSelects = document.getElementById('selects-configruta');

        if (!contenedorSelects) {
            console.error('No se encontró el contenedor con id "selects-configruta"');
            return;
        }

        contenedorSelects.innerHTML = '';
        console.log("Contenedor 'selects-configruta' limpiado.");
        nivelActual = 1;

        try {
            const snapshot = await databaseRef.once('value');
            const data = snapshot.val();

            if (data) {
                const label = document.createElement('label');
                label.setAttribute('for', 'select-universidad-configruta');
                label.textContent = 'Universidad';
                label.className = 'estilo-configruta-item';

                const selectUniversidad = document.createElement('select');
                selectUniversidad.id = 'select-universidad-configruta';
                selectUniversidad.className = 'estilo-configruta-select';
                selectUniversidad.setAttribute('data-level', nivelActual);
                selectUniversidad.setAttribute('data-path', 'ConfigRuta/universidad');
                selectUniversidad.style.marginBottom = '10px';

                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Seleccione una opción';
                defaultOption.disabled = true;
                defaultOption.selected = true;
                selectUniversidad.appendChild(defaultOption);

                for (const universidadKey in data) {
                    if (data.hasOwnProperty(universidadKey)) {
                        const option = document.createElement('option');
                        option.value = universidadKey;
                        option.textContent = typeof data[universidadKey] === 'string'
                            ? data[universidadKey]
                        : universidadKey;
                        selectUniversidad.appendChild(option);
                    }
                }

                selectUniversidad.addEventListener('change', async (event) => {
                    const selectedUniversity = event.target.value;

                    // Remover la opción por defecto de la lista
                    if (defaultOption.parentNode) {
                        selectUniversidad.removeChild(defaultOption);
                    }

                    await limpiarSelectsDesdeNivel(2);
                    if (selectedUniversity) {
                        await cargarSelectsDinamicos(selectedUniversity, rutaFirebase, 2, selectedUniversity);
                    }
                    guardarEstadoSelects(); // Guardar estado al cambiar selección
                });

                contenedorSelects.appendChild(label);
                contenedorSelects.appendChild(selectUniversidad);

                // Llama a la función para restaurar el estado de los selects si existe en localStorage
                await manejarSeleccionesSecuenciales();
            }
        } catch (error) {
            console.error('Error al obtener datos de Firebase:', error);
            const mensajeError = document.createElement('p');
            mensajeError.textContent = 'Hubo un error al cargar las configuraciones.';
            contenedorSelects.appendChild(mensajeError);
        }
    }

    async function cargarSelectsDinamicos(selectedKey, rutaPadre, nivel, universidadSeleccionada) {
        let rutaActual;
        if (nivel === 2) {
            rutaActual = `${rutaPadre}/${selectedKey}`;
        } else {
            rutaActual = `ConfigRuta/opciones/${universidadSeleccionada}`;
        }

        const databaseRef = firebase.database().ref(rutaActual);

        try {
            const snapshot = await databaseRef.once('value');
            const data = snapshot.val();
            let keysPrincipales = [];

            // Solo buscamos claves si el valor devuelto es un objeto
            if (data && typeof data === 'object') {
                if (nivel === 2) {
                    keysPrincipales = Object.keys(data);
                } else {
                    keysPrincipales = Object.keys(data).filter(key => key.startsWith(selectedKey));
                }
            }

            // Verificar si hay claves principales que generen nuevos selects
            if (keysPrincipales.length > 0) {
                await limpiarSelectsDesdeNivel(nivel + 1);
                for (let keyPrincipal of keysPrincipales) {
                    await cargarOpciones(keyPrincipal, universidadSeleccionada, nivel + 1);
                }
            } else {
                console.log("No se encontraron opciones para generar nuevos selects.");
            }
        } catch (error) {
            console.error(`Error al obtener datos de Firebase para '${rutaActual}':`, error);
        }
    }

    async function cargarOpciones(keyPrincipal, universidadSeleccionada, nivel) {
        const rutaOpciones = `ConfigRuta/opciones/${universidadSeleccionada}/${keyPrincipal}`;
        const databaseRef = firebase.database().ref(rutaOpciones);
        const contenedorSelects = document.getElementById('selects-configruta');

        try {
            const snapshot = await databaseRef.once('value');
            const opciones = snapshot.val();

            if (opciones && typeof opciones === 'object' && Object.keys(opciones).length > 0) {
                const div = document.createElement('div');
                div.className = 'estilo-configruta-item';
                div.setAttribute('data-path', rutaOpciones);

                const label = document.createElement('label');
                label.setAttribute('for', `select-${keyPrincipal}`);
                label.textContent = formatearLabelTexto(keyPrincipal);
                label.className = 'estilo-configruta-item';

                const selectDinamico = document.createElement('select');
                selectDinamico.id = `select-${keyPrincipal}`;
                selectDinamico.className = 'estilo-configruta-select';
                selectDinamico.setAttribute('data-level', nivel);
                selectDinamico.setAttribute('data-path', rutaOpciones);

                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Seleccione una opción';
                defaultOption.disabled = true; // Hace que la opción no sea seleccionable
                defaultOption.selected = true; // Seleccionada por defecto al cargar
                selectDinamico.appendChild(defaultOption);

                for (const opcionKey in opciones) {
                    if (opciones.hasOwnProperty(opcionKey)) {
                        const option = document.createElement('option');
                        option.value = opcionKey;
                        option.textContent = opciones[opcionKey] ? opciones[opcionKey] : opcionKey;
                        selectDinamico.appendChild(option);
                    }
                }

                selectDinamico.addEventListener('change', async (event) => {
                    const selectedOption = event.target.value;

                    // Remover la opción por defecto de la lista una vez seleccionada otra opción
                    if (defaultOption.parentNode) {
                        selectDinamico.removeChild(defaultOption);
                    }

                    await limpiarSelectsDesdeNivel(nivel + 1);
                    if (selectedOption) {
                        await cargarSelectsDinamicos(selectedOption, `ConfigRuta/opciones/${universidadSeleccionada}`, nivel + 1, universidadSeleccionada);
                    }
                    guardarEstadoSelects(); // Guardar estado al cambiar selección
                });

                div.appendChild(label);
                div.appendChild(selectDinamico);
                contenedorSelects.appendChild(div);
            }
        } catch (error) {
            console.error(`Error al obtener opciones de Firebase para '${rutaOpciones}':`, error);
        }
    }

    function esperarYSeleccionarOpcion(selectId, valorSeleccionado) {
        return new Promise((resolve) => {
            const intervalo = setInterval(() => {
                const select = document.getElementById(selectId);
                if (select) {
                    clearInterval(intervalo);
                    const option = Array.from(select.options).find(option => option.value === valorSeleccionado);
                    if (option) {
                        select.value = option.value;
                        console.log(`Opción seleccionada en ${selectId}: ${option.textContent.trim()}`);
                        // Simular el evento 'change' para desencadenar la carga de selects dependientes
                        select.dispatchEvent(new Event('change'));
                    }
                    resolve();
                }
            }, 100); // Reintenta cada 100 ms
        });
    }

    async function manejarSeleccionesSecuenciales() {
        const estadoSelects = JSON.parse(localStorage.getItem('estadoSelects'));
        console.log("Estado de los selects desde localStorage:", estadoSelects);

        if (!estadoSelects || estadoSelects.length === 0) {
            console.log("No hay datos en el estado de los selects.");
            return;
        }

        for (let selectData of estadoSelects) {
            const { id, seleccion } = selectData;
            console.log(`Procesando ${id} con valor: ${seleccion}`);
            await esperarYSeleccionarOpcion(id, seleccion);
        }
    }

    async function limpiarSelectsDesdeNivel(nivelInicio) {
        console.log(`Limpiando selects desde nivel ${nivelInicio} en adelante`);
        const contenedorSelects = document.getElementById('selects-configruta');
        const selects = Array.from(contenedorSelects.querySelectorAll('select'));

        selects.forEach(select => {
            const selectNivel = parseInt(select.getAttribute('data-level'), 10);
            if (selectNivel >= nivelInicio) {
                const parentDiv = select.parentElement;
                if (parentDiv) {
                    const label = parentDiv.querySelector('label');
                    if (label) {
                        label.remove();
                    }
                    select.remove();
                }
            }
        });
        nivelActual = nivelInicio - 1;
    }

    // Función que ejecuta todo el proceso
    async function opcionConfigRuta_js() {
        // Llamar a funciones adicionales según el flujo original
        comprobarRutaCiclo_ConfigRuta();
        console.log("Ejecutando opcionConfigRuta_js...");
        await SelectUniversidad_ConfigRuta();

        // Añadir el evento para el botón dentro de la función
        document.getElementById("boton-guardar-configruta").addEventListener("click", guardarConfigRuta);
    }

    function guardarConfigRuta() {
        guardarEstadoSelects();

        // Obtener el array de objetos desde localStorage
        const estadoSelects = JSON.parse(localStorage.getItem("estadoSelects")) || [];

        // Verificar si alguna selección está vacía
        const algunaSeleccionVacia = estadoSelects.some(item => item.seleccion === "");
        if (algunaSeleccionVacia) {
            alert("No se puede guardar ruta, debido a que una opción no está seleccionada.");
            return; // Detener la función si alguna selección está vacía
        }

        // Inicializar las variables para configRuta y ciclo
        let configRuta = "";
        let ciclo = "";

        // Recorrer cada elemento del array
        estadoSelects.forEach((item) => {
            // Realizar split en el valor de seleccion si contiene ":"
            let seleccion = item.seleccion.includes(":") ? item.seleccion.split(":").slice(1).join(":") : item.seleccion;

            // Si el id contiene la palabra "ciclo", asignar el valor de selección a la variable ciclo
            if (item.id.includes("ciclo")) {
                ciclo = seleccion;
            } else {
                // Para los demás elementos, agregar selección a configRuta con "/"
                configRuta += `${seleccion}/`;
            }
        });

        // Quitar el último "/" de configRuta
        configRuta = configRuta.slice(0, -1);

        // Guardar configRuta y ciclo en localStorage
        localStorage.setItem("configRuta", configRuta);
        localStorage.setItem("ciclo", ciclo);

        console.log("configRuta:", configRuta);
        console.log("ciclo:", ciclo);

        comprobarRutaCiclo_ConfigRuta();
    }

    function opcionConfigRuta_css() {
        const estilosPestanaConfig = `

/* Estilo para el Contenedor Principal */
.estilo-configruta-title {
    margin-bottom: 0;
    margin-top: -10px;
    display: flex;
    flex-direction: column;
    padding: 0; /* Opcional: padding interno */
    font-family: 'Poppins', sans-serif;
}

/* Estilo para Ruta y Ciclo (apilados verticalmente) */
.ruta-ciclo-container {
    display: flex;
    flex-direction: column; /* Cambiado a columna para apilar */
    align-items: flex-start; /* Alinea los elementos al inicio horizontalmente */
    margin-bottom: 0; /* Espacio entre Ciclo y Mensaje Combinado */
    color: #34495e;
}

/* Estilo para Ruta */
.title-configruta-ruta {
    padding: 0; /* Espacio vertical entre Ruta y Ciclo */
    font-size: 14px; /* Tamaño de fuente para Ruta */
    color: #333; /* Color del texto */
    font-family: 'Poppins', sans-serif;
    margin-bottom: -5px;
}

/* Estilo para Ciclo */
.title-configruta-ciclo {
    padding: 5px 0; /* Espacio vertical */
    font-size: 14px; /* Tamaño de fuente para Ciclo */
    font-family: 'Poppins', sans-serif;
}

.label-configruta {
    font-weight: 600;
    color: #34495e; /* Color más oscuro para destacar */
    font-size: 14px; /* Ligero aumento en tamaño */
}

.ciclo-configruta,
.ruta-configruta {
    font-weight: 600;
    color: #34495e; /* Color más oscuro para destacar */
    font-size: 14px; /* Ligero aumento en tamaño */
}



/* Contenedor principal que ocupa todo el alto */
.contenido-configruta {
    height: 100vh; /* Ocupar todo el alto de la ventana */
    display: flex; /* Usar flexbox para la disposición */
    flex-direction: column; /* Disponer el contenido en columnas */
    justify-content: flex-start; /* Alinear contenido hacia arriba */
    padding: 10px 20px; /* Espaciado interno */
    box-sizing: border-box; /* Asegurarse de que el padding no afecte el tamaño del contenedor */
    font-family: 'Poppins', sans-serif; /* Fuente moderna y clara */
    overflow-y: auto; /* Permitir desplazamiento vertical si es necesario */
    -ms-overflow-style: none; /* Ocultar barras de desplazamiento en IE y Edge */
    scrollbar-width: none; /* Ocultar barras de desplazamiento en Firefox */
}

.contenido-configruta::-webkit-scrollbar {
    display: none; /* Ocultar la barra de desplazamiento en Chrome, Safari y Opera */
}

/* Título estilizado */
.title-optionmenu {
    font-size: 22px;
    font-weight: 700;
    color: #34495e;
    margin-bottom: 20px;
    text-align: left;
}

/* Contenedores de elementos */
.estilo-configruta-item {
    margin-bottom: 10px;
    font-family: 'Poppins', sans-serif;
}

/* Estilo para el Mensaje Combinado */
.title-configruta-no-seleccionado {
    display: none; /* Oculto por defecto */
    width: 100%;
    text-align: center;
    margin-top: 10px;
    color: red; /* Color del mensaje */
    font-family: 'Poppins', sans-serif;
    font-size: 10px; /* Tamaño de fuente para el mensaje combinado */
}

/* Opcional: Mostrar el mensaje cuando ambos no están seleccionados */
.no-seleccionado .title-configruta-no-seleccionado {
    display: block;
}

/* Estilos para los selects */
.estilo-configruta-select {
    width: 100%; /* Asegurarse de que ocupe todo el ancho disponible */
    padding: 12px;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    background-color: #ffffff; /* Fondo blanco */
    color: #2c3e50; /* Texto oscuro para mayor legibilidad */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra suave */
    transition: border 0.3s ease, box-shadow 0.3s ease; /* Transición suave */
}

/* Efecto hover y foco en los selects */
.estilo-configruta-select:hover,
.estilo-configruta-select:focus {
    border-color: #0072c5;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    outline: none;
}

/* Botones estilizados */
.estilo-configruta-boton {
    width: 100%;
    padding: 12px;
    background-color: #0072c5;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* Efecto hover en los botones */
.estilo-configruta-boton:hover {
    background-color: #002c67;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}


    `;
        const hojaEstilosConfig = document.createElement("style");
        hojaEstilosConfig.type = "text/css";
        hojaEstilosConfig.innerText = estilosPestanaConfig;
        document.head.appendChild(hojaEstilosConfig);
    }

    // :::::: Funciones Auxiliares  ::::::

    async function convertImgToDataUri(clonFormulation) {
        const images = clonFormulation.querySelectorAll('img');

        for (const img of images) {
            if (img.src === 'https://profes.ac/pub/logoap.svg') {
                img.remove(); // Eliminar la imagen no deseada
                // console.log('Imagen eliminada:', img.src);
            } else if (img.src.includes('pluginfile.php')) { // Convertir solo si la URL contiene 'pluginfile.php'
                try {
                    // Convertir a Data URI las imágenes que contienen 'pluginfile.php'
                    // console.log('Convirtiendo imagen (pluginfile.php):', img.src);

                    await new Promise((resolve, reject) => {
                        if (img.complete) {
                            resolve();
                        } else {
                            img.onload = resolve;
                            img.onerror = reject;
                        }
                    });

                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;

                    context.drawImage(img, 0, 0);
                    const dataUri = canvas.toDataURL();
                    img.src = dataUri;
                    // console.log('Imagen convertida a Data URI:', img.src);

                } catch (error) {
                    console.error('Error en la conversión de la imagen:', error);
                }
            } else {
                // No se convierte si no contiene 'pluginfile.php'
                // console.log('La imagen no se convierte:', img.src);
            }
        }
    } //AutoSave_LocalStorage



    // Función para comparar HTML normalizado
    async function compararHTML(pageHTML, firebaseHTML, tipoPage, tipoFirebase) {
        // Imprime en la consola los arrays que se van a comparar
        console.log('Comparando:', {
            PreguntaHTML: [...pageHTML],
            FirebaseHTML: [...firebaseHTML]
        });

        // Asegura que pageHTML y firebaseHTML sean arrays; si no, los inicializa como arrays vacíos
        pageHTML = Array.isArray(pageHTML) ? pageHTML : [];
        firebaseHTML = Array.isArray(firebaseHTML) ? firebaseHTML : [];

        // Verifica si los tipos de preguntas son diferentes
        if (tipoPage !== tipoFirebase) {
            console.log('Las preguntas son de tipo diferente');
            return 0; // Retorna 0 porque los tipos no coinciden
        }

        // Obtiene el número de elementos en cada array HTML
        const pageElementsCount = pageHTML.length;
        const firebaseElementsCount = firebaseHTML.length;

        // Si hay 9 o menos elementos, los números deben ser exactamente iguales
        if (pageElementsCount <= 9) {
            if (pageElementsCount !== firebaseElementsCount) {
                // La cantidad de elementos no coincide exactamente
                return 0; // Retorna 0 porque la cantidad de elementos no coincide
            }
        } else {
            // Para 9 o más elementos, permite una diferencia porcentual del 10%
            const margin = Math.round(pageElementsCount * 0.1); // Calcula el 10% del número de elementos

            // Verifica si la diferencia de elementos está dentro del margen permitido
            if (Math.abs(pageElementsCount - firebaseElementsCount) > margin) {
                // La cantidad de elementos difiere significativamente
                return 0; // Retorna 0 porque la diferencia es mayor al margen permitido
            }
        }

        // Inicializa un array para almacenar los porcentajes de similitud
        let porcentajesSimilitud = [];

        // Filtra las coincidencias exactas y elimina elementos iguales
        pageHTML = pageHTML.filter((elementoPreguntaPage) => {
            let coincidenciaExacta = firebaseHTML.some((elementoPreguntaData, indexPreguntaData) => {
                if (elementoPreguntaPage === elementoPreguntaData) {
                    // Se encontró una coincidencia exacta
                    porcentajesSimilitud.push(100); // Agrega 100% de similitud
                    firebaseHTML.splice(indexPreguntaData, 1); // Elimina el elemento coincidente de firebaseHTML
                    return true; // Indica que se encontró una coincidencia
                }
                return false; // No se encontró coincidencia en este elemento
            });
            return !coincidenciaExacta; // Mantiene en pageHTML los elementos que no tuvieron coincidencia exacta
        });

        // Solo procede si quedan elementos en pageHTML
        if (pageHTML.length > 0) {
            // Para cada elemento restante en pageHTML
            for (let elementoPreguntaPage of pageHTML) {
                let mejorSimilitud = 0; // Inicializa la mejor similitud encontrada
                let indiceMejor = -1; // Inicializa el índice del mejor elemento coincidente
                let esImagenPage = esImagen(elementoPreguntaPage); // Verifica si el elemento de pageHTML es una imagen

                // Recorre los elementos de firebaseHTML para encontrar el más similar
                for (let i = 0; i < firebaseHTML.length; i++) {
                    let elementoPreguntaData = firebaseHTML[i];
                    let esImagenData = esImagen(elementoPreguntaData); // Verifica si el elemento de firebaseHTML es una imagen

                    if (esImagenPage && esImagenData) {
                        // Ambos son imágenes, comparar imágenes
                        try {
                            // Usa la función compararImagenes para obtener el porcentaje de similitud
                            let similitud = await compararImagenes(elementoPreguntaPage, elementoPreguntaData);
                            if (similitud > mejorSimilitud) {
                                // Si la similitud es mayor que la mejor encontrada hasta ahora
                                mejorSimilitud = similitud; // Actualiza la mejor similitud
                                indiceMejor = i; // Guarda el índice del elemento en firebaseHTML
                            }
                        } catch (error) {
                            console.error('Error comparando imágenes:', error);
                        }
                    } else if (!esImagenPage && !esImagenData) {
                        // Ambos son cadenas de texto, comparar texto
                        if (typeof elementoPreguntaPage === 'string' && typeof elementoPreguntaData === 'string') {
                            // Calcula la similitud entre las dos cadenas
                            let similitud = stringSimilarity.compareTwoStrings(elementoPreguntaPage, elementoPreguntaData) * 100;
                            if (similitud > mejorSimilitud) {
                                // Si la similitud es mayor que la mejor encontrada hasta ahora
                                mejorSimilitud = similitud; // Actualiza la mejor similitud
                                indiceMejor = i; // Guarda el índice del elemento en firebaseHTML
                            }
                        }
                    } else {
                        // Los elementos no son del mismo tipo (uno es imagen y el otro texto), no se comparan
                        continue;
                    }
                }

                // Si se encontró una similitud mayor a cero
                if (indiceMejor >= 0) {
                    // Agrega el porcentaje de similitud al array de porcentajes
                    porcentajesSimilitud.push(parseFloat(mejorSimilitud.toFixed(2)));
                    firebaseHTML.splice(indiceMejor, 1); // Elimina el elemento comparado de firebaseHTML
                } else {
                    // No se encontró un elemento similar, agrega 0% de similitud
                    porcentajesSimilitud.push(0);
                }
            }
        }

        // Calcula el promedio de similitud
        if (porcentajesSimilitud.length > 0) {
            // Suma todos los porcentajes de similitud
            let sumaPorcentajes = porcentajesSimilitud.reduce((acc, val) => acc + val, 0);
            // Calcula el promedio dividiendo entre el número de elementos y convierte a porcentaje (0 a 1)
            let promedioSimilitud = (sumaPorcentajes / porcentajesSimilitud.length) / 100;
            return parseFloat(promedioSimilitud.toFixed(2)); // Retorna el promedio con dos decimales
        } else {
            // Si no hay porcentajes calculados, retorna 0
            return 0;
        }

        // Función auxiliar para determinar si un elemento es una imagen
        function esImagen(url) {
            // Expresión regular para detectar extensiones de imagen comunes y data URI
            return /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(url) || /^data:image\/(png|jpg|jpeg|gif|bmp|svg\+xml);base64,/.test(url);
        }
    }

    // Función para comparar imágenes y obtener el porcentaje de similitud
    function compararImagenes(src1, src2, tolerancia = 0) {
        return new Promise((resolve, reject) => {
            let img1Cargada = false;
            let img2Cargada = false;

            const img1 = new Image();
            const img2 = new Image();

            // Para evitar problemas de CORS al cargar imágenes de diferentes dominios
            img1.crossOrigin = 'Anonymous';
            img2.crossOrigin = 'Anonymous';

            img1.onload = function() {
                img1Cargada = true;
                if (img2Cargada) {
                    procesarImagenes(); // Cuando ambas imágenes están cargadas, procesar
                }
            };
            img2.onload = function() {
                img2Cargada = true;
                if (img1Cargada) {
                    procesarImagenes(); // Cuando ambas imágenes están cargadas, procesar
                }
            };

            // Manejo de errores al cargar imágenes
            img1.onerror = function() {
                reject(new Error('Error al cargar la primera imagen.'));
            };
            img2.onerror = function() {
                reject(new Error('Error al cargar la segunda imagen.'));
            };

            // Asignar la fuente de las imágenes (puede ser URL o data URI)
            img1.src = src1;
            img2.src = src2;

            function procesarImagenes() {
                // Verificar si las dimensiones coinciden
                if (img1.width !== img2.width || img1.height !== img2.height) {
                    resolve(0); // Si las dimensiones son diferentes, 0% de similitud
                    return;
                }

                // Crear lienzos para cada imagen
                const canvas1 = document.createElement('canvas');
                const canvas2 = document.createElement('canvas');

                canvas1.width = img1.width;
                canvas1.height = img1.height;
                canvas2.width = img2.width;
                canvas2.height = img2.height;

                const ctx1 = canvas1.getContext('2d');
                const ctx2 = canvas2.getContext('2d');

                // Dibujar imágenes en los lienzos
                ctx1.drawImage(img1, 0, 0);
                ctx2.drawImage(img2, 0, 0);

                try {
                    // Obtener datos de imagen (array de píxeles)
                    const data1 = ctx1.getImageData(0, 0, img1.width, img1.height).data;
                    const data2 = ctx2.getImageData(0, 0, img2.width, img2.height).data;

                    // Comparar datos de píxeles
                    let pixelesIguales = 0;
                    const totalPixeles = data1.length / 4; // Cada píxel tiene 4 valores (RGBA)

                    for (let i = 0; i < data1.length; i += 4) {
                        const r1 = data1[i];
                        const g1 = data1[i + 1];
                        const b1 = data1[i + 2];
                        const a1 = data1[i + 3];

                        const r2 = data2[i];
                        const g2 = data2[i + 1];
                        const b2 = data2[i + 2];
                        const a2 = data2[i + 3];

                        // Calcula la diferencia absoluta entre los valores RGBA
                        const diferencia = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) + Math.abs(a1 - a2);

                        // Si la diferencia está dentro de la tolerancia, cuenta como píxel igual
                        if (diferencia <= tolerancia * 4) {
                            pixelesIguales++;
                        }
                    }

                    // Calcula el porcentaje de similitud
                    const porcentajeSimilitud = (pixelesIguales / totalPixeles) * 100;

                    resolve(porcentajeSimilitud); // Resuelve la promesa con el porcentaje de similitud
                } catch (e) {
                    // Manejo de errores al procesar las imágenes (posibles problemas de seguridad)
                    reject(new Error('Error al procesar las imágenes. Es posible que haya problemas de seguridad al acceder a las imágenes.'));
                }
            }
        });
    }


    // Expresiones regulares y conjuntos precompilados
    const regexLaTeX = /\\\((.*?)\\\)/g;
    const regexMathML = /^<math.*<\/math>$/;
    const regexPregunta = /^Pregunta\s*\d+/;
    const regexLiteral = /^[a-zA-Z]\.\s*/;
    const regexRespuestaPregunta = /^(Respuesta\s*\d+\s*Pregunta\s*\d+|Respuesta\s*Pregunta\s*\d+|Vacío\s*\d+\s*Pregunta\s*\d+)/;
    const textosIrrelevantesSet = new Set([
        'Respuestas',
        'Respuesta',
        'Enunciado de la pregunta',
        'https://profes.ac/pub/logoap.svg',
        'YWRtaW5AcHJvZmVzLmFj',
        'Quitar mi elección',
        'vacío'
    ]);

    // Función principal para normalizar el HTML
    async function normalizarHTML(html) {
        const tempDiv = document.createElement('div');
        const fragment = document.createRange().createContextualFragment(html);
        tempDiv.appendChild(fragment);

        // Extraer texto visible, URLs de multimedia y expresiones LaTeX
        const visibleTexts = extractVisibleText(tempDiv);
        const mediaUrls = await extractMediaUrls(tempDiv);
        const mathExpressions = extractMathExpressions(tempDiv);

        // Combinar resultados en una sola lista
        let combinedResults = [...visibleTexts, ...mediaUrls, ...mathExpressions];

        // Verificar si el HTML tiene clases .draghome o .dropzones y eliminar duplicados en este caso
        if (tempDiv.querySelector('.draghome') || tempDiv.querySelector('.dropzones')) {
            combinedResults = [...new Set(combinedResults)];
        }

        // Eliminar textos irrelevantes
        return eliminarTextosIrrelevantes(combinedResults);
    }

    // Función para extraer texto visible utilizando iteración en lugar de recursión
    function extractVisibleText(node) {
        const texts = [];
        const stack = [node];

        while (stack.length > 0) {
            const currentNode = stack.pop();

            currentNode.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    const trimmedText = child.textContent.trim();
                    if (trimmedText) {
                        texts.push(trimmedText);
                    }
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    const tag = child.tagName;
                    const type = child.getAttribute('type');
                    const classList = child.classList;

                    if (
                        (tag === 'SCRIPT' && type === 'math/tex') ||
                        (tag === 'SPAN' && classList.contains('MathJax')) ||
                        (tag === 'SPAN' && classList.contains('MathJax_Preview'))
                    ) {
                        return; // Saltar este nodo y sus hijos
                    }

                    stack.push(child); // Agregar el hijo al stack para procesarlo
                }
            });
        }

        return texts;
    }

    // Función para extraer URLs de medios (imágenes, videos, audios) y procesar imágenes en paralelo
    async function extractMediaUrls(node) {
        // console.log('Iniciando la función extractMediaUrls');
        let urls = [];
        const validImageExtensions = /\.(png|jpe?g|gif|bmp|svg)(\?.*)?$/i;

        const mediaPromises = [];
        const stack = [node];

        while (stack.length > 0) {
            const currentNode = stack.pop();

            currentNode.childNodes.forEach(child => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    const tag = child.tagName.toLowerCase();
                    const src = child.getAttribute('src');

                    if (tag === 'img') {
                        // Verificar si la URL es válida y no contiene "pluginfile.php" con un formato de imagen no soportado
                        if (src && !src.includes('pluginfile.php') && validImageExtensions.test(src)) {
                            // console.log('Imagen no contiene pluginfile.php, no se convierte');
                        } else if (src && validImageExtensions.test(src)) {
                            urls.push(src);
                            // console.log('Src añadido al arreglo urls');
                        } else {
                            // console.log(`Ignorando URL inválida`);
                        }
                    } else if (tag === 'video' || tag === 'audio') {
                        if (src) {
                            urls.push(src);
                            console.log(`Src añadido al arreglo urls para <${tag}>`);
                        }
                    }

                    // Agregar los hijos al stack para procesarlos
                    stack.push(child);
                }
            });
        }

        // Procesar todas las promesas de imágenes en paralelo
        const imgResults = await Promise.all(mediaPromises);
        urls.push(...imgResults.filter(url => url !== null));

        // console.log('Arreglo final de URLs:', urls);
        return urls;


    }

    // Función para asegurar que una imagen se ha cargado correctamente
    function ensureImageLoaded(imgElement) {
        return new Promise((resolve, reject) => {
            if (imgElement.complete) {
                if (imgElement.naturalWidth !== 0) {
                    // La imagen está cargada correctamente
                    resolve();
                } else {
                    // La imagen no se pudo cargar (naturalWidth es 0)
                    reject(new Error('La imagen no se pudo cargar (naturalWidth es 0)'));
                }
            } else {
                // Agregar manejadores de eventos para cargar y error
                imgElement.onload = () => resolve();
                imgElement.onerror = () => reject(new Error('Error al cargar la imagen'));
            }
        });
    }

    // Función para convertir una imagen a Data URI
    function convertImageToDataURI(imgElement) {
        return new Promise((resolve, reject) => {
            const imgSrc = imgElement.getAttribute('src');

            GM_xmlhttpRequest({
                method: 'GET',
                url: imgSrc,
                responseType: 'blob',
                onload: function(response) {
                    if (response.status === 200) {
                        const reader = new FileReader();
                        reader.onloadend = function() {
                            resolve(reader.result);
                        };
                        reader.onerror = function() {
                            reject('Error al leer el Blob de la imagen');
                        };
                        reader.readAsDataURL(response.response);
                    } else {
                        reject('Error al cargar la imagen: ' + response.status);
                    }
                },
                onerror: function() {
                    reject('Error al realizar la solicitud HTTP para la imagen');
                }
            });
        });
    }
    // Función para extraer expresiones LaTeX
    function extractMathExpressions(node) {
        let mathExpressions = [];
        // Seleccionar todas las etiquetas <script type="math/tex">
        const mathScriptElements = node.querySelectorAll('script[type="math/tex"]');
        mathScriptElements.forEach(element => {
            const latex = element.textContent.trim();
            if (latex) {
                mathExpressions.push(latex);
            }
        });
        return mathExpressions;
    }

    // Función para eliminar textos irrelevantes utilizando expresiones regulares precompiladas
    function eliminarTextosIrrelevantes(items) {
        return items.map(item => {
            // Eliminar delimitadores LaTeX
            item = item.replace(regexLaTeX, '$1');

            // Eliminar contenido MathML
            if (regexMathML.test(item)) return false;

            // Eliminar patrones irrelevantes
            if (
                regexPregunta.test(item) ||
                regexLiteral.test(item) ||
                regexRespuestaPregunta.test(item)
            ) {
                return false;
            }

            // Eliminar textos específicos
            if (textosIrrelevantesSet.has(item)) return false;

            return item;
        }).filter(item => item !== false);
    }

    function obtenerPreguntasDeFirebase(referencia) {
        return referencia.once('value').then(snapshot => {
            const preguntasFirebaseData = {};
            snapshot.forEach(childSnapshot => {
                const pregunta = childSnapshot.val(); // Extrae todos los datos de la pregunta
                const id = childSnapshot.key; // Agrega el ID de la pregunta
                preguntasFirebaseData[id] = { ...pregunta, id }; // Asigna la pregunta con su clave correspondiente
            });

            return preguntasFirebaseData; // Devuelve el objeto de preguntas
        }).catch(error => {
            console.error('Error al obtener preguntas de Firebase:', error);
            return {}; // Devuelve un objeto vacío en caso de error
        });
    }

    async function BotonAutoSaveFirebase() {
        try {
            const urlActual = window.location.href;
            let botonExistente = null;
            let autoSaveFunction = null;

            if (urlActual.includes('/mod/quiz/attempt.php')) {
                botonExistente = document.getElementById('mod_quiz-next-nav');
                autoSaveFunction = AutoSave_LocalStorage;
            } else if (urlActual.includes('/mod/quiz/review.php')) {
                botonExistente = document.querySelector('.submitbtns .mod_quiz-next-nav');
                autoSaveFunction = AutoSaveReview_LocalStorage;
            }

            if (botonExistente && autoSaveFunction) {
                const nombreBotonExistente = botonExistente.innerText || botonExistente.value || "Siguiente";

                // Crear contenedor para el nuevo botón
                const contenedorBoton = document.createElement('div');
                contenedorBoton.style.display = 'flex';
                contenedorBoton.style.alignItems = 'center'; // Centrado vertical
                contenedorBoton.style.marginLeft = '10px';

                // Crear el nuevo botón
                const nuevoBoton = document.createElement('button');
                nuevoBoton.className = 'btn btn-primary';
                nuevoBoton.id = 'boton-autosave-firebase';
                nuevoBoton.type = 'button'; // Asegura que no actúe como submit
                nuevoBoton.style.display = 'flex';
                nuevoBoton.style.alignItems = 'center'; // Centrado vertical
                nuevoBoton.style.justifyContent = 'flex-start'; // Alinea contenido al inicio
                nuevoBoton.style.padding = '10px 15px'; // Ajusta el padding según necesidad
                nuevoBoton.style.position = 'relative'; // Para posicionar el switch

                // Crear el switch (checkbox)
                const switchInput = document.createElement('input');
                switchInput.type = 'checkbox';
                switchInput.id = 'boton-autosave-firebase-switch';
                switchInput.style.transform = 'scale(1.5)'; // Aumenta el tamaño del checkbox
                switchInput.style.marginRight = '10px'; // Espacio entre checkbox y etiqueta
                switchInput.style.cursor = 'pointer';

                // Cargar el estado del switch desde el almacenamiento local
                const switchEstado = localStorage.getItem('botonAutoSaveFirebaseSwitch') === 'true';
                switchInput.checked = switchEstado;

                // Crear etiqueta para el switch
                const switchLabel = document.createElement('label');
                switchLabel.htmlFor = 'boton-autosave-firebase-switch';
                switchLabel.style.cursor = 'pointer';
                switchLabel.style.userSelect = 'none'; // Evita la selección de texto al hacer clic
                switchLabel.style.marginBottom = '0'; // Establece margin-bottom a 0 solo para este label
                switchLabel.innerText = `Guardar y ${nombreBotonExistente}`;

                // Añadir el switch y la etiqueta al botón
                nuevoBoton.appendChild(switchInput);
                nuevoBoton.appendChild(switchLabel);

                // Manejar el clic en el switch para evitar la propagación al botón
                switchInput.addEventListener('click', function(event) {
                    event.stopPropagation(); // Evita que el clic en el switch active el botón
                    // Actualizar el estado en localStorage
                    localStorage.setItem('botonAutoSaveFirebaseSwitch', switchInput.checked ? 'true' : 'false');
                });

                // Manejar el clic en el botón
                nuevoBoton.addEventListener('click', async function (event) {
                    event.preventDefault();
                    try {
                        await autoSaveFunction();
                        await AutoSave_Firebase();

                        if (switchInput.checked) {
                            botonExistente.click();
                        }
                    } catch (error) {
                        console.error("BotonAutoSaveFirebase: Error al guardar y continuar:", error);
                    }
                });

                // Añadir el nuevo botón al contenedor
                contenedorBoton.appendChild(nuevoBoton);

                // Insertar el contenedor antes del botón existente
                botonExistente.parentNode.insertBefore(contenedorBoton, botonExistente.nextSibling);
            } else {
                console.warn("BotonAutoSaveFirebase: Botón existente no encontrado o URL no válida.");
            }
        } catch (error) {
            console.error("BotonAutoSaveFirebase: Error en la ejecución de la función:", error);
        }
    }

    function guardarRutaUltimaPregunta(path, preguntaPage) {
        // Verificar si usamos sessionStorage o localStorage según 'switch-ruta-dinamica'
        const isDynamicRouteSwitch = JSON.parse(localStorage.getItem('switch-ruta-dinamica'));
        const storage = isDynamicRouteSwitch ? sessionStorage : localStorage;

        // Intentar obtener el objeto 'lastQuestions' del storage adecuado
        let lastQuestions = {};

        try {
            const storedLastQuestions = storage.getItem('lastQuestions');
            if (storedLastQuestions) {
                lastQuestions = JSON.parse(storedLastQuestions);
                // Asegurarse de que lastQuestions es un objeto
                if (typeof lastQuestions !== 'object' || lastQuestions === null || Array.isArray(lastQuestions)) {
                    console.warn("'lastQuestions' en storage no es un objeto válido. Se reiniciará.");
                    lastQuestions = {};
                }
            }
        } catch (error) {
            console.error(`Error al parsear 'lastQuestions' desde ${isDynamicRouteSwitch ? 'sessionStorage' : 'localStorage'}:`, error);
            // Reiniciar lastQuestions si hay un error de parseo
            lastQuestions = {};
        }

        // Verificar si la clave 'preguntaPage' no existe o si el 'path' es diferente al almacenado
        if (!lastQuestions.hasOwnProperty(preguntaPage) || lastQuestions[preguntaPage] !== path) {
            // Asignar o actualizar 'path' como valor de la clave 'preguntaPage'
            lastQuestions[preguntaPage] = path;

            try {
                // Guardar el objeto actualizado de vuelta en el storage adecuado
                storage.setItem('lastQuestions', JSON.stringify(lastQuestions));
                console.log(`Ruta para '${preguntaPage}' guardada/actualizada correctamente en ${isDynamicRouteSwitch ? 'sessionStorage' : 'localStorage'}.`);
            } catch (error) {
                console.error(`Error al guardar 'lastQuestions' en ${isDynamicRouteSwitch ? 'sessionStorage' : 'localStorage'}:`, error);
            }
        } else {
            console.log(`La ruta para '${preguntaPage}' ya está actualizada. No se realizaron cambios.`);
        }
    }


    function getQuestionNumber(formulation_clearfix) {
        let contenedorPadre = formulation_clearfix.closest('.content');
        if (contenedorPadre) {
            let infoHermanos = contenedorPadre.parentElement.querySelector('.info');
            if (infoHermanos) {
                let numeroPreguntaSpan = infoHermanos.querySelector('.rui-qno');
                return numeroPreguntaSpan ? numeroPreguntaSpan.textContent.trim() : null; // Retornar número
            }
        }
        return null; // Sin número
    } //AutoSave_LocalStorage

    // =====================
    // Inicialización
    // =====================

    // 0. Inserta el CSS necesario para el funcionamiento de AutoQuizFillApp en la página
    cssAutoQuizFillApp();

    const barraLateral = barraLateral_AutoQuizFillApp();

    // 1. Crea y almacena la barra lateral de la aplicación AutoQuizFillApp
    panel_AutoFillQuizApp(barraLateral);

    const menu = menu_AutoFillQuizApp();
    document.body.appendChild(menu);

    login_AutoFillQuizApp(barraLateral);

    BotonAutoSaveFirebase();

    window.addEventListener('beforeunload', function () {
        localStorage.removeItem('questions-AutoFill');

    });

    document.addEventListener('change', function(event) {
        // Recuperar los estados de autosave desde localStorage
        const autoSaveStatus = localStorage.getItem('autosave-autoquizfillapp');
        const autoSaveReviewStatus = localStorage.getItem('autosavereview-autoquizfillapp');


        // Verificar si estamos en la página de attempt.php y si el auto guardado está activado
        if (autoSaveStatus === 'activado' && window.location.href.includes('/mod/quiz/attempt.php')) {
            // Verificar el tipo de input que ha cambiado y que esté dentro de .formulation.clearfix
            const inputTypes = ['input[type="radio"]', 'select', 'input[type="checkbox"]', 'input[type="text"]'];

            if (
                inputTypes.some(selector => event.target.matches(selector)) &&
                event.target.closest('.formulation.clearfix')
            ) {
                ejecutarAutoSaveConMathJax(AutoSave_LocalStorage);
            }
        }

        // Verificar si estamos en la página de review.php y si el auto guardado de revisión está activado
        else if (autoSaveReviewStatus === 'activado' && window.location.href.includes('/mod/quiz/review.php')) {
            // Verificar el tipo de input que ha cambiado y que esté dentro de .formulation.clearfix
            const inputTypes = ['input[type="radio"]', 'select', 'input[type="checkbox"]', 'input[type="text"]'];

            if (
                inputTypes.some(selector => event.target.matches(selector)) &&
                event.target.closest('.formulation.clearfix')
            ) {
                ejecutarAutoSaveConMathJax(AutoSaveReview_LocalStorage);
            }
        }
    });


    // Función para ejecutar la función de auto guardado con o sin MathJax
    function ejecutarAutoSaveConMathJax(autoSaveFunction) {
        if (typeof MathJax !== 'undefined' && MathJax.Hub && typeof MathJax.Hub.Queue === 'function') {
            // Esperar a que MathJax termine de renderizar antes de ejecutar la función de auto guardado
            MathJax.Hub.Queue(function() {
                autoSaveFunction();
            });
        } else {
            // Si MathJax no está presente, ejecutar directamente la función de auto guardado
            autoSaveFunction();
        }
    }

    // Integración de la funcionalidad de arrastre (drag and drop)
    interact('.draghome').draggable({
        inertia: true,
        onend: function(event) {

            console.log('Evento de arrastre finalizado:', event);

            // Obtener el elemento arrastrado
            const draggedElement = event.target;
            console.log('Elemento arrastrado:', draggedElement);
            console.log('Clases del elemento arrastrado:', draggedElement.classList);

            // Verificar si el elemento arrastrado se soltó dentro de un dropzone válido
            const dropzone = event.relatedTarget; // Esto contiene el área donde se suelta el elemento, si es que se movió a una nueva posición
            const autoSaveStatus = localStorage.getItem('autosave-autoquizfillapp');

            // Dependiendo de la página, ejecuta la función de autosave adecuada
            if (window.location.href.includes('/mod/quiz/attempt.php') && autoSaveStatus === 'activado') {
                if (dropzone && (dropzone.closest('.dropbackground.img-fluid.w-100') || dropzone.closest('.qtext'))) {
                    console.log('El elemento fue soltado dentro de una área válida:', dropzone);
                    ejecutarAutoSaveConMathJax(AutoSave_LocalStorage);
                } else {
                    console.log('El elemento no fue soltado dentro de una área válida.');
                    ejecutarAutoSaveConMathJax(AutoSave_LocalStorage);
                }
            } else if (window.location.href.includes('/mod/quiz/review.php') && autoSaveReviewStatus === 'activado') {
                if (dropzone && (dropzone.closest('.dropbackground.img-fluid.w-100') || dropzone.closest('.qtext'))) {
                    console.log('El elemento fue soltado dentro de una área válida:', dropzone);
                    ejecutarAutoSaveConMathJax(AutoSaveReview_LocalStorage);
                } else {
                    console.log('El elemento no fue soltado dentro de una área válida.');
                    ejecutarAutoSaveConMathJax(AutoSaveReview_LocalStorage);
                }
            } else {
                console.log('El auto guardado no está activado o no estamos en una página válida.');
            }
        }
    });

    // Hacer que las zonas de destino sean dropzones activas para detectar el drop
    interact('.dropbackground, .qtext').dropzone({
        accept: '.draghome',
        overlap: 0.75,
        ondrop: function(event) {
            console.log('Elemento soltado en una dropzone:', event.target);
        }
    });

    // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

    // Agregar un listener para detectar cambios en el estado del switch de AutoSave en attempt
    const switchAutoSave = document.getElementById('switch-autosave');
    switchAutoSave.addEventListener('change', function() {
        // Verificar el estado del switch
        if (switchAutoSave.checked) {
            // Almacenar el estado 'activado' en localStorage
            localStorage.setItem('autosave-autoquizfillapp', 'activado');

            // Verificar si MathJax está definido y si estamos en la página de intento
            if (typeof MathJax !== 'undefined' && MathJax.Hub && typeof MathJax.Hub.Queue === 'function' && window.location.href.includes('/mod/quiz/attempt.php')) {
                // Espera a que MathJax termine de renderizar antes de proceder con AutoSave_LocalStorage
                MathJax.Hub.Queue(function() {
                    AutoSave_LocalStorage();
                });
            } else {
                // Procede directamente si MathJax no está presente
                AutoSave_LocalStorage();
            }

            // Mostrar el botón "guardar y siguiente"
            document.getElementById('boton-autosave-firebase').style.display = 'inline-block';
        } else {
            // Eliminar las respuestas guardadas en localStorage
            sessionStorage.removeItem('questions-AutoSave');

            // Almacenar el estado 'desactivado' en localStorage
            localStorage.setItem('autosave-autoquizfillapp', 'desactivado');

            // Ocultar el botón "guardar y siguiente" y el contenedor de autoquiz
            document.getElementById('boton-autosave-firebase').style.display = 'none';
            document.getElementById('body-autoquiz-autosave').style.display = 'none';
        }
    });

    // Agregar un listener para detectar cambios en el estado del switch de AutoSaveReview en review
    const switchAutoSaveReview = document.getElementById('switch-autosavereview');
    switchAutoSaveReview.addEventListener('change', function() {
        if (switchAutoSaveReview.checked) {  // Corregido: referirse a switchAutoSaveReview en lugar de switchAutoSave
            // Almacenar el estado 'activado' en localStorage
            localStorage.setItem('autosavereview-autoquizfillapp', 'activado');

            // Verificar si MathJax está definido y si estamos en la página de review
            if (typeof MathJax !== 'undefined' && MathJax.Hub && typeof MathJax.Hub.Queue === 'function' && window.location.href.includes('/mod/quiz/review.php')) {
                // Espera a que MathJax termine de renderizar antes de proceder con AutoSaveReview_LocalStorage
                MathJax.Hub.Queue(function() {
                    AutoSaveReview_LocalStorage();
                });
            } else {
                // Procede directamente si MathJax no está presente
                AutoSaveReview_LocalStorage();
            }

            // Mostrar el botón "guardar y siguiente"
            document.getElementById('boton-autosave-firebase').style.display = 'inline-block';
        } else {
            // Eliminar las respuestas guardadas en localStorage para review
            sessionStorage.removeItem('questions-AutoSave');

            // Almacenar el estado 'desactivado' en localStorage
            localStorage.setItem('autosavereview-autoquizfillapp', 'desactivado');

            // Ocultar el botón "guardar y siguiente" y el contenedor de autoquiz
            document.getElementById('boton-autosave-firebase').style.display = 'none';
            document.getElementById('body-autoquiz-autosavereview').style.display = 'none';
        }
    });


    function verificarAutoSaveAlCargar() {
        // Obtener los estados de 'autosave-autoquizfillapp' y 'autosavereview-autoquizfillapp' desde localStorage
        const autoSaveStatus = localStorage.getItem('autosave-autoquizfillapp');
        const autoSaveReviewStatus = localStorage.getItem('autosavereview-autoquizfillapp');

        const bodyAutoSave = document.getElementById('body-autoquiz-autosave');
        const bodyAutoSaveReview = document.getElementById('body-autoquiz-autosavereview');
        const botonAutoSaveFirebase = document.getElementById('boton-autosave-firebase');

        // Verificar el estado actual de autosave-autoquizfillapp en la página de intento
        if (autoSaveStatus === 'activado' && window.location.href.includes('/mod/quiz/attempt.php?')) {
            if (botonAutoSaveFirebase) {
                // Mostrar el botón 'boton-autosave-firebase'
                botonAutoSaveFirebase.style.display = 'inline-block';
            }

            if (bodyAutoSave) {
                // Mostrar el contenedor de autoquiz
                bodyAutoSave.style.display = 'flex';
            }

            // Llamar a la función AutoSave_LocalStorage tras verificar MathJax
            if (typeof MathJax !== 'undefined' && MathJax.Hub && typeof MathJax.Hub.Queue === 'function') {
                MathJax.Hub.Queue(() => AutoSave_LocalStorage());
            } else {
                AutoSave_LocalStorage();
            }
        }
        // Verificar si el autosave review está activado en la página de revisión
        else if (autoSaveReviewStatus === 'activado' && window.location.href.includes('/mod/quiz/review.php')) {

            if (botonAutoSaveFirebase) {
                // Mostrar el botón 'boton-autosave-firebase'
                botonAutoSaveFirebase.style.display = 'inline-block';
            }

            if (bodyAutoSaveReview) {
                // Mostrar el contenedor de autoquiz review
                bodyAutoSaveReview.style.display = 'flex';
            }

            // Llamar a la función AutoSaveReview_LocalStorage tras verificar MathJax
            if (typeof MathJax !== 'undefined' && MathJax.Hub && typeof MathJax.Hub.Queue === 'function') {
                MathJax.Hub.Queue(() => AutoSaveReview_LocalStorage());
            } else {
                AutoSaveReview_LocalStorage();
            }
        }
        // Si autosave está desactivado o no definido, eliminar respuestas guardadas
        else {
            sessionStorage.removeItem('questions-AutoSave');

            if (botonAutoSaveFirebase) {
                // Ocultar el botón 'boton-autosave-firebase'
                botonAutoSaveFirebase.style.display = 'none';
            }

            if (bodyAutoSave) {
                // Ocultar el contenedor de autoquiz
                bodyAutoSave.style.display = 'none';
            }

            if (bodyAutoSaveReview) {
                // Ocultar el contenedor de autoquiz review
                bodyAutoSaveReview.style.display = 'none';
            }
        }
    }


    verificarAutoSaveAlCargar();




    function verificarAutoFillAlCargar() {
        // Obtener el valor de 'autosave-autoquizfillapp' desde localStorage
        const autoFillStatus = localStorage.getItem('autofill-autoquizfillapp');

        // Verificar el estado actual de autosave-autoquizfillapp y si el enlace contiene '/mod/quiz/attempt.php?'
        if (autoFillStatus === 'activado' && window.location.href.includes('/mod/quiz/attempt.php?')) {
            // Llamar a la función AutoFill_LocalStorage para habilitar el llenado automático
            AutoFill_LocalStorage();
        } else {
            document.getElementById('body-autoquiz-autofill').style.display = 'none';
        }
    }

    // Llamar a la función para verificar el estado al cargar
    verificarAutoFillAlCargar();
    // Definición de la función VerificarPreguntas como una función normal

    // Verificar sesión del usuario
    autenticacion.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
        verificarSesionUsuario();

    })
        .catch((error) => {
        console.error("Error en la persistencia de sesión:", error);
    });

    // Verifica la conexión a Internet y elimina la variable de localStorage si existe
    if (navigator.onLine) {
        if (localStorage.getItem('firebase:previous_websocket_failure') !== null) {
            localStorage.removeItem('firebase:previous_websocket_failure');
            // console.log("Variable 'firebase:previous_websocket_failure' eliminada de localStorage.");
        }
    } else {
        console.log("Sin conexión a Internet. La variable no se eliminará.");
    }

    // Agrega un evento para eliminar la variable cuando se recupere la conexión
    window.addEventListener('online', () => {
        if (localStorage.getItem('firebase:previous_websocket_failure') !== null) {
            localStorage.removeItem('firebase:previous_websocket_failure');
            console.log("Conexión restablecida. Variable 'firebase:previous_websocket_failure' eliminada de localStorage.");
        }
    });

    // Crear un MutationObserver para observar cambios en el DOM
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            // Revisar si se ha añadido un nuevo nodo al DOM
            if (mutation.addedNodes.length > 0) {
                // Intentar agregar el evento al botón y al enlace de revisión
                agregarEventoBoton();
                agregarEventoRevision();
            }
        });
    });

    // Verificar si la URL actual incluye '/mod/quiz/view.php?' o '/mod/quiz/attempt.php?'
    if (
        window.location.href.includes('/mod/quiz/view.php')
    ) {
        // Configurar el MutationObserver para observar todo el cuerpo del documento
        observer.observe(document.body, { childList: true, subtree: true });

        // Llamar a las funciones inicialmente por si los elementos ya están presentes
        document.addEventListener('DOMContentLoaded', () => {
            agregarEventoBoton();
            agregarEventoRevision();
        });
    }

    // Función para manejar el evento del botón "Realizar cuestionario"
    function agregarEventoBoton() {
        const quizStartButton = document.querySelector('button[id^="single_button"]');

        // Verificar si el botón existe
        if (quizStartButton && window.location.href.includes('/mod/quiz/view.php?')) {
            // Verificar si el evento ya ha sido agregado
            if (!quizStartButton.dataset.eventAdded) {
                // Agregar un evento de clic al botón
                quizStartButton.addEventListener('click', function () {
                    // Eliminar la variable 'lastQuestions' de localStorage
                    localStorage.removeItem('lastQuestions');
                    console.log('La variable lastQuestions ha sido eliminada del localStorage al iniciar el cuestionario.');
                });
                // Marcar que el evento ha sido agregado
                quizStartButton.dataset.eventAdded = 'true';
            }
        }
    }

    // Función para manejar el evento del enlace "Revisión"
    function agregarEventoRevision() {
        // Seleccionar todos los enlaces que contienen 'review.php?attempt=' en su href
        const revisionLinks = document.querySelectorAll('a[href*="/mod/quiz/review.php?attempt="]');

        revisionLinks.forEach((link) => {
            // Verificar si el evento ya ha sido agregado
            if (!link.dataset.eventAdded) {
                // Agregar un evento de clic al enlace
                link.addEventListener('click', function () {
                    // Eliminar la variable 'lastQuestions' de localStorage
                    localStorage.removeItem('lastQuestions');
                    console.log('La variable lastQuestions ha sido eliminada del localStorage al hacer clic en Revisión.');
                });
                // Marcar que el evento ha sido agregado
                link.dataset.eventAdded = 'true';
            }
        });
    }

    const switchElement = document.getElementById('switch-ruta-dinamica');
    const bodyDinamic = document.getElementById('body-autoquiz-autosavereview-subject-dinamic');

    switchElement.addEventListener('change', async () => {
        try {
            const isChecked = switchElement.checked;
            localStorage.setItem('switch-ruta-dinamica', JSON.stringify(isChecked));
            bodyDinamic.style.display = isChecked ? 'block' : 'none';
            actualizarVisibilidadSelects(isChecked);
            console.log(`Switch cambiado a: ${isChecked ? "Activado" : "Desactivado"}`);

            if (isChecked) {
                console.log("Ejecutando contenedorRutaDinamica_js() porque el switch está activado.");
                await contenedorRutaDinamica_js();
            } else {
                console.log("Ejecutando contenedorRuta_js() porque el switch está desactivado.");
                contenedorRuta_js();
            }
        } catch (error) {
            console.error("Ocurrió un error:", error);
        }
    });






