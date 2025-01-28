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

        const rutaCicloContainer = document.querySelector('.ruta-ciclo-container');
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
            console.log('[opc-config-ruta] Mostrando .rutaCicloContainer.');
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
    const rutaFirebase = 'ConfigRuta/universidad';
    const databaseRef = ref(database, rutaFirebase); // Usar la función `ref` importada
    const contenedorSelects = document.getElementById('selects-configruta');

    if (!contenedorSelects) {
        console.error('No se encontró el contenedor con id "selects-configruta"');
        return;
    }

    contenedorSelects.innerHTML = '';
    console.log("[main-panel] Listas limpiadas.");
    nivelActual = 1;

    try {
        const snapshot = await get(databaseRef); // Usar la función `get` importada
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


// src/tu-archivo.js

// Asegúrate de importar o definir estas funciones en tu archivo
// import { limpiarSelectsDesdeNivel, cargarOpciones, guardarEstadoSelects, manejarSeleccionesSecuenciales } from './otras-funciones.js';

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

// Asegúrate de exportar la función si la necesitas en otros módulos
export { cargarSelectsDinamicos };

async function cargarOpciones(keyPrincipal, universidadSeleccionada, nivel) {
    const rutaOpciones = `ConfigRuta/opciones/${universidadSeleccionada}/${keyPrincipal}`;
    const databaseRef = ref(database, rutaOpciones); // Usar la función `ref` importada de Firebase v9
    const contenedorSelects = document.getElementById('selects-configruta');

    try {
        const snapshot = await get(databaseRef); // Usar la función `get` importada de Firebase v9
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

// Asegúrate de exportar la función si la necesitas en otros módulos
export { cargarOpciones };


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
export async function opcionConfigRuta_js() {
    comprobarRutaCiclo_ConfigRuta();
    await SelectUniversidad_ConfigRuta();

    // Añadir el evento para el botón dentro de la función
    const botonGuardar = document.getElementById("boton-guardar-configruta");
    if (botonGuardar) {
        botonGuardar.addEventListener("click", guardarConfigRuta);
    } else {
        console.error('No se encontró el botón con id "boton-guardar-configruta"');
    }
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
