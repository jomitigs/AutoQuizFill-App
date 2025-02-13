// configuracion.js

// Importa el CSS (PostCSS lo inyectará en el bundle)
import './style.css';

import { ref, get } from 'firebase/database';
import { database } from '../config-firebase/script.js';

/**
 * Retorna el HTML de la configuración con contenedores específicos para cada plataforma.
 */
export function opcionConfig_html() {
  return `
    <div class="contenido-config">
      <h3 id="titulo-config">Configuración</h3>
      
      <!-- Contenedor Select Dinámico -->
      <div id="selects-plataforma" class="estilo-config-item">
        <!-- Aquí se inyectará el select dinámicamente -->
      </div>

      <!-- Configuración específica para Moodle -->
      <div id="moodle-config" style="display: none">
        <!-- Switch de Ruta Dinámica -->
        <div id="dynamic-route-switch" class="opc-config-switch-container">
          <span class="opc-config-switch-label">Ruta Dinámica</span>
          <label class="opc-config-switch">
            <input type="checkbox" id="dynamic-route-switch-checkbox" class="opc-config-switch-checkbox">
            <span class="opc-config-slider round"></span>
          </label>

        </div>
        <!-- Switch AutoFill Users -->
        <div id="users-autofill-switch" class="opc-config-switch-container">
          <span class="opc-config-switch-label">AutoFill Users</span>
          <label class="opc-config-switch">
            <input type="checkbox" id="users-autofill-switch-checkbox" class="opc-config-switch-checkbox">
            <span class="opc-config-slider round"></span>
          </label>
        </div>

      <span id="subopcion-config" class="estilo-config-item" >AutoSave</span>

      <div id="botonterminaryguardar-autosave-switch" class="opc-config-switch-container" >
        <span class="opc-config-switch-label">Mostrar Botón Guardar y Terminar</span>
        <label class="opc-config-switch">
          <input type="checkbox" id="botonterminaryguardar-autosave-switch-checkbox" class="opc-config-switch-checkbox">
          <span class="opc-config-slider round"></span>
        </label>
      </div>


      </div>

      <!-- Configuración específica para Altissia -->
      <div id="altissia-config" style="display: none">
        <!-- Ejemplo de switch para Altissia -->
        <div id="altissia-switch-option" class="opc-config-switch-container">
          <span class="opc-config-switch-label">Opción Altissia</span>
          <label class="opc-config-switch">
            <input type="checkbox" id="altissia-switch-checkbox" class="opc-config-switch-checkbox">
            <span class="opc-config-slider round"></span>
          </label>
        </div>
      </div>

      <!-- Otros elementos adicionales (opcional) -->
  
    </div>
  `;
}

/**
 * Función que actualiza la visibilidad de las secciones de configuración según la plataforma seleccionada.
 */
function updatePlatformConfigurationUI() {
  const platform = localStorage.getItem('ConfigPlataforma');
  const moodleConfig = document.getElementById('moodle-config');
  const altissiaConfig = document.getElementById('altissia-config');

  if (!moodleConfig || !altissiaConfig) {
    console.error('No se encontraron las secciones de configuración para las plataformas.');
    return;
  }

  if (platform === 'Moodle') {
    moodleConfig.style.display = 'block';
    altissiaConfig.style.display = 'none';
  } else if (platform === 'Altissia') {
    moodleConfig.style.display = 'none';
    altissiaConfig.style.display = 'block';
  } else {
    // Para cualquier otra plataforma, se ocultan ambas secciones
    moodleConfig.style.display = 'none';
    altissiaConfig.style.display = 'none';
  }
}

/**
 * Crea un select junto a su etiqueta y configura el listener para guardar la selección.
 * @param {Object} config - Configuración para crear el select.
 * @param {string} config.labelText - Texto de la etiqueta.
 * @param {string} config.selectId - ID y nombre del select.
 * @param {string} config.storageKey - Clave de localStorage para guardar la selección.
 * @param {Array<string>} config.options - Opciones a incluir en el select.
 * @param {string} config.defaultValue - Valor por defecto si no hay nada en localStorage.
 * @param {Function} config.onChange - Callback a ejecutar cuando cambie la selección.
 * @returns {DocumentFragment} Fragmento con la etiqueta y el select.
 */
function createSelectWithLabel({ labelText, selectId, storageKey, options, defaultValue, onChange }) {
  const label = document.createElement('label');
  label.setAttribute('for', selectId);
  label.textContent = labelText;
  label.classList.add('estilo-config-item');

  const select = document.createElement('select');
  select.id = selectId;
  select.name = selectId;
  select.classList.add('estilo-config-select');

  options.forEach(optionValue => {
    const optionElement = document.createElement('option');
    optionElement.value = optionValue;
    optionElement.textContent = optionValue;
    select.appendChild(optionElement);
  });

  const storedValue = localStorage.getItem(storageKey) || defaultValue;
  select.value = options.includes(storedValue) ? storedValue : options[0];

  select.addEventListener('change', event => {
    const value = event.target.value;
    localStorage.setItem(storageKey, value);
    if (onChange) onChange(value);
  });

  const fragment = document.createDocumentFragment();
  fragment.appendChild(label);
  fragment.appendChild(select);
  return fragment;
}

/**
 * Inicializa un switch basado en el contenedor, checkbox y la clave en localStorage.
 * Solo se muestra si la plataforma actual coincide con 'platformRequired'.
 * @param {string} containerId - ID del contenedor del switch.
 * @param {string} checkboxId - ID del input checkbox.
 * @param {string} storageKey - Clave en localStorage para guardar el estado.
 * @param {string} platformRequired - Plataforma requerida para mostrar el switch.
 */
function initSwitch(containerId, checkboxId, storageKey, platformRequired) {
  const container = document.getElementById(containerId);
  const checkbox = document.getElementById(checkboxId);

  if (!container || !checkbox) {
    console.error(`No se encontró el contenedor o checkbox para ${containerId}`);
    return;
  }

  const configPlataforma = localStorage.getItem("ConfigPlataforma");
  if (configPlataforma === platformRequired) {
    container.style.display = "flex";
    checkbox.checked = localStorage.getItem(storageKey) === "true";
  } else {
    localStorage.setItem(storageKey, "false");
    container.style.display = "none";
  }

  checkbox.addEventListener("change", () => {
    localStorage.setItem(storageKey, checkbox.checked.toString());
  });
}

/**
 * Genera un select dinámico basado en las claves de 'Config/Plataforma' en Firebase.
 * Establece el valor seleccionado según localStorage o por defecto a 'Moodle'.
 */
export async function opcionConfig_js() {
  try {
    // Si no existe la configuración de plataforma, se establece por defecto a "Moodle"
    if (!localStorage.getItem('ConfigPlataforma')) {
      localStorage.setItem('ConfigPlataforma', "Moodle");
    }

    // Obtener las plataformas desde Firebase
    const plataformaRef = ref(database, 'Config/Plataforma');
    const snapshot = await get(plataformaRef);

    if (snapshot.exists()) {
      const plataformas = snapshot.val();
      const plataformaKeys = Object.keys(plataformas);

      const selectsContainer = document.getElementById('selects-plataforma');
      if (!selectsContainer) {
        console.error('El contenedor con ID "selects-plataforma" no existe en el DOM.');
        return;
      }
      selectsContainer.innerHTML = '';

      // Crear el select con su etiqueta
      const selectFragment = createSelectWithLabel({
        labelText: 'Plataforma: ',
        selectId: 'select-plataforma',
        storageKey: 'ConfigPlataforma',
        options: plataformaKeys,
        defaultValue: 'Moodle',
        onChange: () => {
          // Actualiza la UI y reinicializa los switches al cambiar la plataforma
          updatePlatformConfigurationUI();
          initSwitch("dynamic-route-switch", "dynamic-route-switch-checkbox", "switch-ruta-dinamica", "Moodle");
          initSwitch("users-autofill-switch", "users-autofill-switch-checkbox", "configUsersAutofill", "Moodle");
          initSwitch("altissia-switch-option", "altissia-switch-checkbox", "configAltissiaOption", "Altissia");
        }
      });

      selectsContainer.appendChild(selectFragment);
    } else {
      console.log('No se encontraron plataformas en Firebase.');
    }

    // Actualiza la UI según la plataforma seleccionada y se inicializan los switches
    updatePlatformConfigurationUI();
    initSwitch("dynamic-route-switch", "dynamic-route-switch-checkbox", "switch-ruta-dinamica", "Moodle");
    initSwitch("users-autofill-switch", "users-autofill-switch-checkbox", "configUsersAutofill", "Moodle");
    initSwitch("altissia-switch-option", "altissia-switch-checkbox", "configAltissiaOption", "Altissia");

  } catch (error) {
    console.error('Error al obtener las plataformas de Firebase:', error);
  }
}

/**
 * Función para mostrar mensajes al usuario.
 * @param {string} mensaje - El mensaje a mostrar.
 * @param {string} tipo - El tipo de mensaje ('success', 'warning', 'error').
 */
function mostrarMensaje(mensaje, tipo) {
  const mensajeElemento = document.createElement('div');
  mensajeElemento.textContent = mensaje;
  mensajeElemento.classList.add('mensaje');

  if (tipo === 'success') {
    mensajeElemento.classList.add('mensaje-exito');
  } else if (tipo === 'warning') {
    mensajeElemento.classList.add('mensaje-advertencia');
  } else if (tipo === 'error') {
    mensajeElemento.classList.add('mensaje-error');
  }

  const contenidoConfig = document.querySelector('.contenido-config');
  if (contenidoConfig) {
    contenidoConfig.appendChild(mensajeElemento);
    setTimeout(() => {
      mensajeElemento.remove();
    }, 500);
  }
}
