import './style.css';
import { opcionConfigRuta_html, opcionConfigRuta_js } from '../opc-config-ruta/script.js';


export function menu_AutoFillQuizApp() {
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