// configuracion.js

// Importa el CSS (PostCSS lo inyectará en el bundle)
import './style.css'; // Importa el archivo de estilos CSS

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

        <button id="boton-guardar-configruta" class="estilo-configruta-boton guardar">Guardar Ruta</button>
    </div>
    `; 
}

/**
 * Genera un select dinámico basado en las claves de 'Config/Plataforma' en Firebase.
 * Establece el valor seleccionado según 'localStorage' o por defecto a 'Moodle'.
 */
export async function opcionConfig_js() {
    try {
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

            // Crear la opción por defecto
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '-- Selecciona una plataforma --';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            select.appendChild(defaultOption);

            // Agregar opciones dinámicamente
            plataformaKeys.forEach(opcion => {
                const optionElement = document.createElement('option');
                optionElement.value = opcion;
                optionElement.textContent = opcion;
                select.appendChild(optionElement);
            });

            // Establecer el valor seleccionado desde localStorage o por defecto a 'Moodle'
            const seleccionGuardada = localStorage.getItem('plataformaSeleccionada');
            if (seleccionGuardada && plataformaKeys.includes(seleccionGuardada)) {
                select.value = seleccionGuardada;
                // Asegurarse de que la opción por defecto no esté seleccionada
                defaultOption.selected = false;
            } else {
                // Si 'Moodle' está entre las opciones, establecerlo como seleccionado
                if (plataformaKeys.includes('Moodle')) {
                    select.value = 'Moodle';
                    defaultOption.selected = false;
                }
            }

            // Agregar la etiqueta y el select al contenedor
            selectsContainer.appendChild(label);
            selectsContainer.appendChild(select);
        } else {
            console.log('No se encontraron plataformas en Firebase.');
        }
    } catch (error) {
        console.error('Error al obtener las plataformas de Firebase:', error);
    }
}
