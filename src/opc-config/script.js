// configuracion.js

// Importa el CSS (PostCSS lo inyectará en el bundle)
import './style.css'; // Asegúrate de que la ruta es correcta

import { ref, get } from 'firebase/database';
import { database } from '../config-firebase/script.js';

/**
 * Retorna el HTML de la configuración con un contenedor para el select dinámico.
 */
export function opcionConfig_html() {
    return `
        <div class="contenido-config">
            <h3 id="titulo-config">Configuración</h3>

            <!-- Contenedor Select Dinámico -->
            <div id="selects-plataforma" class="estilo-config-item">
                <!-- Aquí se inyectará el select dinámicamente -->
            </div>

            <!-- Switch -->
<div id="dynamic-route-switch" class="opc-config-switch-container" style="display: none">
  <span class="opc-config-switch-label">Ruta Dinámica</span>
  <label class="opc-config-switch">
    <input type="checkbox" id="dynamic-route-switch-checkbox" class="opc-config-switch-checkbox">
    <span class="opc-config-slider round"></span>
  </label>
</div>

<div id="users-autofill-switch" class="opc-config-switch-container" style="display: none">
  <span class="opc-config-switch-label">Users AutoFill</span>
  <label class="opc-config-switch">
    <input type="checkbox" id="users-autofill-switch-checkbox" class="opc-config-switch-checkbox">
    <span class="opc-config-slider round"></span>
  </label>
</div>


        </div>

    `;
}

/**
 * Genera un select dinámico basado en las claves de 'Config/Plataforma' en Firebase.
 * Establece el valor seleccionado según 'localStorage' o por defecto a 'Moodle'.
 */
export async function opcionConfig_js() {
    try {

        if (!localStorage.getItem('ConfigPlataforma')) {
            localStorage.setItem('ConfigPlataforma', "Moodle");
        }


        // Referencia a la ruta 'Config/Plataforma' en Firebase
        const plataformaRef = ref(database, 'Config/Plataforma');
        const snapshot = await get(plataformaRef);


        if (snapshot.exists()) {
            const plataformas = snapshot.val();
            const plataformaKeys = Object.keys(plataformas);

            // Obtener el contenedor donde se insertará el select
            const selectsContainer = document.getElementById('selects-plataforma');

            if (!selectsContainer) {
                console.error('El contenedor con ID "selects-plataforma" no existe en el DOM.');
                return;
            }

            // Limpiar el contenedor antes de agregar el select
            selectsContainer.innerHTML = '';

            // Crear la etiqueta para el select
            const label = document.createElement('label');
            label.setAttribute('for', 'select-plataforma');
            label.textContent = 'Plataforma: ';
            label.classList.add('estilo-config-item'); // Aplica estilos al label si es necesario

            // Crear el elemento select
            const select = document.createElement('select');
            select.id = 'select-plataforma';
            select.name = 'select-plataforma';
            select.classList.add('estilo-config-select'); // Aplica estilos al select

            // Agregar opciones dinámicamente
            plataformaKeys.forEach(opcion => {
                const optionElement = document.createElement('option');
                optionElement.value = opcion;
                optionElement.textContent = opcion;
                select.appendChild(optionElement);
            });


            // Establecer el valor seleccionado desde localStorage o por defecto a 'Moodle'
            const seleccionGuardada = localStorage.getItem('ConfigPlataforma');
            if (seleccionGuardada && plataformaKeys.includes(seleccionGuardada)) {
                select.value = seleccionGuardada;
            } else {

                if (!localStorage.getItem('ConfigPlataforma')) {
                    // Si 'Moodle' está entre las opciones, establecerlo como seleccionado
                    if (plataformaKeys.includes('Moodle')) {
                        select.value = 'Moodle';
                    }
                } else if (plataformaKeys.length > 0) {
                    // Opcional: Establecer la primera opción como seleccionada si "Moodle" no está disponible
                    select.value = plataformaKeys[0];
                }
            }

            //  Agregar un listener para guardar la selección en localStorage cuando cambie
            select.addEventListener('change', (event) => {
                const seleccion = event.target.value;
                if (seleccion) {
                    localStorage.setItem('ConfigPlataforma', seleccion);
                   // mostrarMensaje('Configuración guardada exitosamente.', 'success');mostrarMensaje('Configuración guardada exitosamente.', 'success');
                    initOpcConfigSwitch();
                    initOpcConfigSwitch2();
                }
            });

            // Agregar la etiqueta y el select al contenedor
            selectsContainer.appendChild(label);
            selectsContainer.appendChild(select);
        } else {
            console.log('No se encontraron plataformas en Firebase.');
        }

        initOpcConfigSwitch();
        initOpcConfigSwitch2();


    } catch (error) {
        console.error('Error al obtener las plataformas de Firebase:', error);
    }


}

function initOpcConfigSwitch() {
    const container = document.getElementById("dynamic-route-switch");
    const checkbox = document.getElementById("dynamic-route-switch-checkbox");

    // Mostrar el contenedor si ConfigPlataforma es "Moodle"
    const configPlataforma = localStorage.getItem("ConfigPlataforma");
    if (configPlataforma === "Moodle") {
        container.style.display = "flex";

        const configRutaDinamic = localStorage.getItem("configRutaDinamic");
        checkbox.checked = configRutaDinamic === "true";

    } else {
        localStorage.setItem("configRutaDinamic", "false");
        container.style.display = "none";
    }

    // Establecer el estado inicial del checkbox desde configRutaDinamic


    // Escuchar cambios en el checkbox
    checkbox.addEventListener("change", () => {
        const isChecked = checkbox.checked;
        localStorage.setItem("configRutaDinamic", isChecked.toString());
    });
}

function initOpcConfigSwitch2() {
    const container = document.getElementById("users-autofill-switch");
    const checkbox = document.getElementById("users-autofill-switch-checkbox");

    // Mostrar el contenedor si ConfigPlataforma es "Moodle"
    const configPlataforma = localStorage.getItem("ConfigPlataforma");
    if (configPlataforma === "Moodle") {
        container.style.display = "flex";

        const configRutaDinamic = localStorage.getItem("configUsersAutofill");
        checkbox.checked = configRutaDinamic === "true";

    } else {
        localStorage.setItem("configUsersAutofill", "false");
        container.style.display = "none";
    }

    // Establecer el estado inicial del checkbox desde configRutaDinamic


    // Escuchar cambios en el checkbox
    checkbox.addEventListener("change", () => {
        const isChecked = checkbox.checked;
        localStorage.setItem("configUsersAutofill", isChecked.toString());
    });
}

/**
 * Función para mostrar mensajes al usuario
 * @param {string} mensaje - El mensaje a mostrar
 * @param {string} tipo - El tipo de mensaje ('success', 'warning', 'error')
 */
function mostrarMensaje(mensaje, tipo) {
    // Crear un elemento para el mensaje
    const mensajeElemento = document.createElement('div');
    mensajeElemento.textContent = mensaje;
    mensajeElemento.classList.add('mensaje'); // Clase base para mensajes

    // Añadir clase según el tipo de mensaje
    if (tipo === 'success') {
        mensajeElemento.classList.add('mensaje-exito');
    } else if (tipo === 'warning') {
        mensajeElemento.classList.add('mensaje-advertencia');
    } else if (tipo === 'error') {
        mensajeElemento.classList.add('mensaje-error');
    }

    // Insertar el mensaje en el DOM, por ejemplo, al final del contenedor de configuración
    const contenidoConfig = document.querySelector('.contenido-config');
    if (contenidoConfig) {
        contenidoConfig.appendChild(mensajeElemento);
        // Remover el mensaje después de 3 segundos
        setTimeout(() => {
            mensajeElemento.remove();
        }, 500);
    }
}


