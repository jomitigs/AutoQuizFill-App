// src/opc-config-ruta/script.js

// Importa el CSS (PostCSS lo inyectará en el bundle)
import './style.css'; // Importa el archivo de estilos CSS

import { ref, get } from 'firebase/database';
import { database } from '../config-firebase/script.js';

// Exporta las funciones que necesitas utilizar en otros módulos
export function opcionConfigRuta_html() {
    return `
    <div class="contenido-configruta">
        <h3 id="titulo-configruta">Configuración de Ruta</h3>

    <!-- Contenedor Principal -->
        <div id="ultima-ruta-configruta" class="estilo-configruta-title no-seleccionado">

            <!-- Contenedor para Ruta y Ciclo apilados verticalmente -->
            <div class="ruta-ciclo-container" style="display: none">

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

// Función principal que ejecuta todo el proceso
export async function opcionConfigRuta_js() {
    comprobarRutaCiclo_ConfigRuta(); // Verifica y muestra la ruta y ciclo actuales
    await SelectUniversidad_ConfigRuta(); // Inicializa el select de Universidad

    // Añadir el evento para el botón guardar dentro de la función
    const botonGuardar = document.getElementById("boton-guardar-configruta");
    if (botonGuardar) {
        botonGuardar.addEventListener("click", guardarConfigRuta); // Asigna el manejador de evento
    } else {
        console.error('No se encontró el botón con id "boton-guardar-configruta"');
    }
}

// Verifica si la ruta y ciclo están configurados en localStorage
function comprobarRutaCiclo_ConfigRuta() {
    const configRuta = localStorage.getItem('configRuta');
    const ciclo = localStorage.getItem('ciclo');

    console.log(`[opc-config-ruta] Valor de configRuta: ${configRuta}, Valor de ciclo: ${ciclo}`);

    // Verificar si configRuta y ciclo están definidos
    if (!configRuta || !ciclo) {
        console.log('[opc-config-ruta] configRuta o ciclo no están definidos.');

        // Desactivar autofill y autosave
        localStorage.setItem('autofill-autoquizfillapp', 'desactivado');
        localStorage.setItem('autosave-autoquizfillapp', 'desactivado');
        // Autofill y autosave desactivados en localStorage

        // Crear y mostrar el mensaje de advertencia en 'contenido-principal'
        const mensaje = document.createElement('div');
        mensaje.textContent = 'No ha seleccionado una ruta o ciclo';
        mensaje.style.color = 'red';
        mensaje.style.fontWeight = '500';
        mensaje.style.fontSize = '0.9em';
        mensaje.style.textAlign = 'left';
        mensaje.style.marginBottom = '10px';
        mensaje.id = 'mensaje-ruta-invalida';

        const ultimaRutaConfigruta = document.getElementById('ultima-ruta-configruta');

        if (ultimaRutaConfigruta && !document.getElementById('mensaje-ruta-invalida')) {
            ultimaRutaConfigruta.appendChild(mensaje);
            console.log('[opc-config-ruta] No ha seleccionado una ruta o ciclo.');
        }
    } else {
        const rutaCicloContainer = document.querySelector('.ruta-ciclo-container');

        // Mostrar los contenedores si configRuta y ciclo están definidos
        if (rutaCicloContainer) {
            rutaCicloContainer.style.display = 'block';
            console.log('[opc-config-ruta] Mostrando "rutaCicloContainer".');
        }

        // Eliminar el mensaje si existe
        const mensajeExistente = document.getElementById('mensaje-ruta-invalida');
        if (mensajeExistente) {
            mensajeExistente.remove();
        }

        // Establecer el valor de 'Ruta' y 'Ciclo' en el HTML correspondiente
        const rutaElemento = document.getElementById('ruta-configruta');
        const cicloElemento = document.getElementById('ciclo-configruta');

        if (rutaElemento && cicloElemento) {
            // Asignar los valores de configRuta y ciclo en los elementos del DOM
            rutaElemento.innerHTML = `<span class="ruta-configruta">Ruta:</span> ${configRuta}`;
            cicloElemento.innerHTML = `<span class="ciclo-configruta">Ciclo:</span> ${ciclo}`;
        }
    }
}

// Inicializa el select de Universidad y maneja su cambio
async function SelectUniversidad_ConfigRuta() {
    const rutaFirebase = 'ConfigRuta/universidad';
    const databaseRef = ref(database, rutaFirebase); // Referencia a la ruta de Firebase
    const contenedorSelects = document.getElementById('selects-configruta');

    if (!contenedorSelects) {
        console.error('No se encontró el contenedor con id "selects-configruta"');
        return;
    }

    contenedorSelects.innerHTML = ''; // Limpia el contenedor

    try {
        const snapshot = await get(databaseRef); // Obtiene los datos de Firebase
        const data = snapshot.val();

        if (data) {
            // Crear etiqueta y select para Universidad
            const label = document.createElement('label');
            label.setAttribute('for', 'select-universidad-configruta');
            label.textContent = 'Universidad';
            label.className = 'estilo-configruta-item';

            const selectUniversidad = document.createElement('select');
            selectUniversidad.id = 'select-universidad-configruta';
            selectUniversidad.className = 'estilo-configruta-select';
            selectUniversidad.setAttribute('data-level', '1'); // Asigna nivel 1
            selectUniversidad.setAttribute('data-path', 'ConfigRuta/universidad');
            selectUniversidad.style.marginBottom = '10px';

            // Opción por defecto
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Seleccione una opción';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            selectUniversidad.appendChild(defaultOption);

            // Agregar opciones de Universidad
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

            // Evento al cambiar la selección de Universidad
            selectUniversidad.addEventListener('change', async (event) => {
                const selectedUniversity = event.target.value;

                // Remover la opción por defecto de la lista
                if (defaultOption.parentNode) {
                    selectUniversidad.removeChild(defaultOption);
                }

                const currentLevel = parseInt(selectUniversidad.getAttribute('data-level'), 10);
                const nextLevel = currentLevel + 1;

                await limpiarSelectsDesdeNivel(nextLevel); // Limpia selects de niveles superiores
                if (selectedUniversity) {
                    await cargarSelectsDinamicos(selectedUniversity, rutaFirebase, nextLevel, selectedUniversity); // Carga selects dinámicos
                }
                guardarEstadoSelects(); // Guarda el estado actual de los selects
            });

            contenedorSelects.appendChild(label); // Añade la etiqueta al contenedor
            contenedorSelects.appendChild(selectUniversidad); // Añade el select al contenedor

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

// Carga selects dinámicos basados en la selección anterior
async function cargarSelectsDinamicos(selectedKey, rutaPadre, nivel, universidadSeleccionada) {
    let rutaActual;
    if (nivel === 2) {
        rutaActual = `${rutaPadre}/${selectedKey}`;
    } else {
        rutaActual = `ConfigRuta/opciones/${universidadSeleccionada}`;
    }

    const databaseRef = ref(database, rutaActual);

    try {
        const snapshot = await get(databaseRef);
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

// Carga opciones para un select dinámico específico
async function cargarOpciones(keyPrincipal, universidadSeleccionada, nivel) {
    const rutaOpciones = `ConfigRuta/opciones/${universidadSeleccionada}/${keyPrincipal}`;
    const databaseRef = ref(database, rutaOpciones);
    const contenedorSelects = document.getElementById('selects-configruta');

    try {
        const snapshot = await get(databaseRef);
        const opciones = snapshot.val();

        if (opciones && typeof opciones === 'object' && Object.keys(opciones).length > 0) {
            const div = document.createElement('div');
            div.className = 'estilo-configruta-item';
            div.setAttribute('data-path', rutaOpciones);

            // Crear etiqueta para el select dinámico
            const label = document.createElement('label');
            label.setAttribute('for', `select-${keyPrincipal}`);
            label.textContent = formatearLabelTexto(keyPrincipal);
            label.className = 'estilo-configruta-item';

            // Crear el select dinámico
            const selectDinamico = document.createElement('select');
            selectDinamico.id = `select-${keyPrincipal}`;
            selectDinamico.className = 'estilo-configruta-select';
            selectDinamico.setAttribute('data-level', nivel); // Asigna el nivel actual
            selectDinamico.setAttribute('data-path', rutaOpciones);

            // Opción por defecto
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Seleccione una opción';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            selectDinamico.appendChild(defaultOption);

            // Agregar opciones al select dinámico
            for (const opcionKey in opciones) {
                if (opciones.hasOwnProperty(opcionKey)) {
                    const option = document.createElement('option');
                    option.value = opcionKey;
                    option.textContent = opciones[opcionKey] ? opciones[opcionKey] : opcionKey;
                    selectDinamico.appendChild(option);
                }
            }

            // Evento al cambiar la selección del select dinámico
            selectDinamico.addEventListener('change', async (event) => {
                const selectedOption = event.target.value;

                // Remover la opción por defecto de la lista una vez seleccionada otra opción
                if (defaultOption.parentNode) {
                    selectDinamico.removeChild(defaultOption);
                }

                const currentLevel = parseInt(selectDinamico.getAttribute('data-level'), 10);
                const nextLevel = currentLevel + 1;

                await limpiarSelectsDesdeNivel(nextLevel); // Limpia selects de niveles superiores
                if (selectedOption) {
                    await cargarSelectsDinamicos(selectedOption, `ConfigRuta/opciones/${universidadSeleccionada}`, nextLevel, universidadSeleccionada); // Carga más selects si es necesario
                }
                guardarEstadoSelects(); // Guarda el estado actual de los selects
            });

            div.appendChild(label); // Añade la etiqueta al div
            div.appendChild(selectDinamico); // Añade el select al div
            contenedorSelects.appendChild(div); // Añade el div al contenedor principal
        }
    } catch (error) {
        console.error(`Error al obtener opciones de Firebase para '${rutaOpciones}':`, error);
    }
}

// Formatea el texto de la etiqueta a partir de la clave
function formatearLabelTexto(key) {
    const partes = key.split('-').slice(1);
    return partes.map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ');
}

// Guarda el estado actual de los selects en localStorage
function guardarEstadoSelects() {
    const contenedorSelects = document.getElementById('selects-configruta');
    const selects = Array.from(contenedorSelects.querySelectorAll('select'));
    const estado = selects.map(select => ({
        nivel: select.getAttribute('data-level'),
        id: select.id,
        ruta: select.getAttribute('data-path'),
        seleccion: select.value  // Guarda el valor seleccionado actual
    }));
    // console.log("Guardando estado en localStorage:", estado);
    localStorage.setItem('estadoSelects', JSON.stringify(estado));
}

// Maneja la selección secuencial de opciones basadas en el estado guardado
async function manejarSeleccionesSecuenciales() {
    // Obtiene el estado de los selects desde localStorage y lo parsea de JSON a objeto
    const estadoSelects = JSON.parse(localStorage.getItem('estadoSelects'));

    // Si no hay datos o el arreglo está vacío, registra un mensaje y termina la función
    if (!estadoSelects || estadoSelects.length === 0) {
        console.log("[opc-config-ruta] No existen datos para las listas desplegables para \"opc-config-ruta\"");
        return;
    }

    // Ordenar los selects por nivel para asegurar que se procesen en orden
    estadoSelects.sort((a, b) => parseInt(a.nivel) - parseInt(b.nivel));

    // Itera sobre cada objeto selectData en el arreglo estadoSelects
    for (let selectData of estadoSelects) {
        const { id, seleccion, nivel } = selectData; // Desestructura el ID y la selección del objeto
        // console.log(`Procesando ${id} con valor: ${seleccion} en nivel ${nivel}`); // Registra el proceso actual
        // Espera a que se seleccione la opción correspondiente en el <select>
        await esperarYSeleccionarOpcion(id, seleccion);
    }
}

// Espera hasta que un select específico esté disponible en el DOM y selecciona una opción
function esperarYSeleccionarOpcion(selectId, valorSeleccionado) {
    return new Promise((resolve) => {
        // Configura un intervalo que se ejecuta cada 100 ms
        const intervalo = setInterval(() => {
            // Intenta obtener el elemento <select> por su ID
            const select = document.getElementById(selectId);
            if (select) { // Si el <select> existe en el DOM
                clearInterval(intervalo); // Detiene el intervalo
                // Busca la opción dentro del <select> que coincide con el valor proporcionado
                const option = Array.from(select.options).find(option => option.value === valorSeleccionado);
                if (option) { // Si se encuentra la opción
                    select.value = option.value; // Establece el valor seleccionado del <select>
                    //console.log(`Opción seleccionada en ${selectId}: ${option.textContent.trim()}`); // Registra en la consola
                    // Simula el evento 'change' para que cualquier listener asociado responda a la selección
                    select.dispatchEvent(new Event('change'));
                }
                resolve(); // Resuelve la promesa una vez completada la selección
            }
        }, 100); // Intervalo de 100 milisegundos para reintentar la búsqueda del <select>
    });
}

// Limpia (elimina) los selects a partir de un nivel especificado
async function limpiarSelectsDesdeNivel(nivelInicio) {
    console.log(`Limpiando selects desde nivel ${nivelInicio} en adelante`); // Registra la acción de limpieza
    // Obtiene el contenedor que contiene todos los elementos <select> relacionados con la configuración de ruta
    const contenedorSelects = document.getElementById('selects-configruta');
    // Obtiene una lista de todos los elementos <select> dentro del contenedor
    const selects = Array.from(contenedorSelects.querySelectorAll('select'));

    // Itera sobre cada <select> encontrado
    selects.forEach(select => {
        // Obtiene el nivel del <select> a partir del atributo 'data-level' y lo convierte a entero
        const selectNivel = parseInt(select.getAttribute('data-level'), 10);
        // Si el nivel del <select> es mayor o igual al nivel de inicio para limpiar
        if (selectNivel >= nivelInicio) {
            const parentDiv = select.parentElement; // Obtiene el elemento padre del <select>
            if (parentDiv) { // Si existe el elemento padre
                const label = parentDiv.querySelector('label'); // Busca una etiqueta <label> dentro del padre
                if (label) { // Si se encuentra la etiqueta <label>
                    label.remove(); // Elimina la etiqueta <label> del DOM
                }
                select.remove(); // Elimina el <select> del DOM
            }
        }
    });
}

// Guarda la configuración de ruta y ciclo en localStorage
function guardarConfigRuta() {
    guardarEstadoSelects(); // Guarda el estado actual de los selects

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

    comprobarRutaCiclo_ConfigRuta(); // Verifica y muestra la nueva ruta y ciclo
}
