import { ref, get } from 'firebase/database';
import { database } from '../../config-firebase/script.js';


export function contenedorRuta_js() {

    const contenidoPrincipal = document.getElementById('contenido-principal');
    const containerOptionSelect = document.querySelector('.containerOption');
    const containerRutaFirebase = document.getElementById('containerRutaFirebase');
    const ruta = localStorage.getItem('configRuta');
    const ciclo = localStorage.getItem('ciclo');

    // Función para crear y mostrar el mensaje de ruta inválida
    const rutaInvalida = () => {
        if (!document.getElementById('mensaje-ruta-invalida')) {
            const mensaje = document.createElement('div');
            mensaje.id = 'ruta-invalida';
            mensaje.textContent = 'No ha seleccionado una ruta o ciclo';
            Object.assign(mensaje.style, {
                color: 'red',
                fontWeight: '500',
                fontSize: '0.95em',
                fontStyle: 'italic',
                textAlign: 'center'
            });
            contenidoPrincipal.appendChild(mensaje);
            console.log('[opc-autofill-autosave-moodle: ruta]  No ha seleccionado una ruta o ciclo');
        }
    };

    if (!ruta || !ciclo) {
        if (containerOptionSelect) containerOptionSelect.style.display = 'none';
        localStorage.setItem('autofill-autoquizfillapp', 'desactivado');
        localStorage.setItem('autosave-autoquizfillapp', 'desactivado');
        rutaInvalida();
        return; // Salir de la función ya que faltan datos
    }

    // Si se tienen ruta y ciclo definidos, actualizamos los contenedores
    if (containerRutaFirebase) {
        // Eliminar mensaje de advertencia si existe
        const mensajeExistente = document.getElementById('ruta-invalida');

        if (mensajeExistente) {
            mensajeExistente.remove();
        }

        containerRutaFirebase.style.display = 'block';
        containerRutaFirebase.innerHTML = `
        <div>
          <span class="title">Ruta:</span> <span class="label">${ruta}</span>
        </div>
        <div>
          <span class="title">Ciclo:</span> <span class="label">${ciclo}</span>
        </div>
      `;

        console.log(`[opc-autofill-autosave-moodle: ruta]  Valor de ruta: ${ruta}, Valor de ciclo:${ciclo}`);
    } else {
        console.error('[opc-autofill-autosave-moodle: ruta] No se encontró el contenedor de la ruta y ciclo.');
    }

}

// <<<<<<<<<<<<<< Ruta Dinamica >>>>>>>>>>>>>>

export async function contenedorRutaDinamica_js() {
    // Obtiene los valores 'configRuta' y 'ciclo' del almacenamiento local
    const ruta = localStorage.getItem('configRuta');
    const ciclo = localStorage.getItem('ciclo');
    const containerRutaFirebase = document.getElementById('containerRutaFirebase');
    const rutaDinamica = sessionStorage.setItem('configRutaDinamic', rutaDinamica);

    // Verifica si 'configRuta' y 'ciclo' están definidos en el almacenamiento local
    if (!ruta || !ciclo) {
        // Si alguno de los valores no está definido, llama a la función 'contenedorRuta_js' y termina la ejecución
        contenedorRuta_js();
        return;
    } 
    
    else if (rutaDinamicaSessionStorage) {
        containerRutaFirebase.style.display = 'block';
        containerRutaFirebase.innerHTML = `
        <div>
          <span class="title">Ruta:</span> <span class="label" style="font-weight: 500; color: green;" >${rutaDinamica}</span>
        </div>
        <div>
          <span class="title">Ciclo:</span> <span class="label">${ciclo}</span>
        </div>
      `;
        
    } 
    
    else {
        containerRutaFirebase.style.display = 'block';

        // Espera a que la función asíncrona obtenga la ruta dinámica
        const rutaDinamica = await obtenerRutaDinamica(ruta);
     
        if (rutaDinamica) {
            console.log("La nueva ruta dinámica es:", rutaDinamica);

            sessionStorage.setItem('configRutaDinamic', rutaDinamica);
            console.log("Se ha almacenado la ruta dinámica en sessionStorage bajo la key 'configRutaDinamic'");

            containerRutaFirebase.innerHTML = `
            <div>
              <span class="title">Ruta:</span> <span class="label" style="font-weight: 500; color: green;" >${rutaDinamica}</span>
            </div>
        
            <div>
              <span class="title">Ciclo:</span> <span class="label">${ciclo}</span>
            </div>
          `;
        }
    }
}


async function obtenerRutaDinamica(ruta) {
    try {
        const universidad = ruta.split('/')[0]; // Universidad

        // Obtener Materia
        const elementosRutaCurso = document.querySelectorAll('.breadcrumb-item a[href*="/course/view.php"]');
        let materiaValor = null;

        if (elementosRutaCurso.length > 0) {
            // Obtener el atributo 'title' del primer elemento de la ruta
            const tituloRuta = elementosRutaCurso[0].getAttribute('title');

            // Extraer las claves entre corchetes del título usando una expresión regular
            const coincidencias = tituloRuta.match(/\[([A-Za-z]+[^\]]+)\]/g)?.filter(match => /[A-Za-z]/.test(match));

            if (coincidencias && coincidencias.length > 0) {
                // Limpiar los corchetes para obtener la clave de búsqueda
                const claveBusqueda = coincidencias[0].replace(/[\[\]]/g, '');
                const rutaMateria = `ConfigRuta/opciones/${universidad}/unemi:codigo-materias-de-nivelacion`;

                try {
                    // Obtener los datos de materias desde Firebase
                    const snapshotMateria = await get(ref(database, rutaMateria));
                    const opcionesMateria = snapshotMateria.val();

                    if (opcionesMateria) {
                        // Buscar la materia utilizando métodos funcionales para evitar bucles anidados
                        const entradaEncontrada = Object.entries(opcionesMateria).find(([key, value]) => {
                            return value.split(',')
                                .map(item => item.trim())
                                .some(val => {
                                    if (val.includes(':')) {
                                        const [parte1, parte2] = val.split(':').map(item => item.trim());
                                        return (parte1 === claveBusqueda && tituloRuta.includes(parte2));
                                    } else {
                                        return val === claveBusqueda;
                                    }
                                });
                        });

                        if (entradaEncontrada) {
                            materiaValor = entradaEncontrada[0];
                            console.log(`[opc-autofill-autosave-moodle: ruta]  Materia encontrada: "${materiaValor}"`);
                        } else {
                            console.warn(`[opc-autofill-autosave-moodle: ruta]  No se encontró ninguna coincidencia para la clave de búsqueda: ${claveBusqueda}`);
                        }
                    } else {
                        console.warn(`[opc-autofill-autosave-moodle: ruta]  No se encontraron opciones para materias en la ruta: ${rutaMateria}`);
                    }
                } catch (errorFirebase) {
                    console.error(`Error al obtener datos de Firebase en la ruta ${rutaMateria}:`, errorFirebase);
                }
            } else {
                console.warn('[opc-autofill-autosave-moodle: ruta]  No se encontraron coincidencias en el título del breadcrumb.');
            }
        } else {
            console.warn('[opc-autofill-autosave-moodle: ruta]  No se encontró materia.');
        }

        // Obtener Test 
        let testClave = null;
        const elementosQuiz = document.querySelectorAll('.breadcrumb-item a[href*="/mod/quiz/"]');

        if (elementosQuiz.length === 0) {
            console.warn('[opc-autofill-autosave-moodle: ruta]  No se encontró test.');
        } else {
            // Función auxiliar para obtener el número del quiz a partir del texto
            const obtenerNumeroQuiz = (texto) => {
                // Buscar número en formato numérico
                const matchNumero = texto.match(/\d+/);
                if (matchNumero) return parseInt(matchNumero[0], 10);

                // Si no se encuentra número, buscar número escrito en palabras
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
                    // Se pueden agregar más si es necesario
                };

                const matchPalabra = texto.toLowerCase().match(/\b(uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\b/);
                return matchPalabra ? numWords[matchPalabra[0]] : null;
            };

            // Obtener el elemento que contiene el texto del quiz
            const quizTextElement = elementosQuiz[0].querySelector('span.text-truncate');
            if (!quizTextElement) {
                console.warn('[opc-autofill-autosave-moodle: ruta]  No se encontró el elemento de texto del quiz.');
            } else {
                const quizText = quizTextElement.textContent.trim();
                const quizNumber = obtenerNumeroQuiz(quizText);

                if (quizNumber === null) {
                    console.warn('[opc-autofill-autosave-moodle: ruta]  No se encontró número del test.');
                } else {
                    const testRuta = `ConfigRuta/opciones/${universidad}/unemi:niv-test`;

                    try {
                        // Obtener los datos de tests desde Firebase
                        const testSnapshot = await get(ref(database, testRuta));
                        const testOptions = testSnapshot.val();

                        if (!testOptions) {
                            console.warn(`No se encontraron opciones para test en la ruta: ${testRuta}`);
                        } else {
                            // Buscar la clave que incluya "Test" seguido del número obtenido
                            testClave = Object.keys(testOptions).find(key => testOptions[key].includes(`Test ${quizNumber}`));

                            if (testClave) {
                                console.log(`[opc-autofill-autosave-moodle: ruta]  Test encontrado: "${testClave}"`);
                            } else {
                                console.warn(`[opc-autofill-autosave-moodle: ruta]  No se encontró una clave para Test ${quizNumber}`);
                            }
                        }
                    } catch (firebaseError) {
                        console.error(`Error al obtener datos de Firebase en la ruta ${testRuta}:`, firebaseError);
                    }
                }
            }
        }

        // Verificar y Actualizar ConfigRutaDinamic
        if (materiaValor && testClave) {
            console.log("Se tienen valores para materiaValor y testClave:", materiaValor, testClave);

            // Dividir la configuración de ruta en partes
            const rutaSplit = ruta.split('/');
            console.log("La ruta se ha dividido en partes:", rutaSplit);

            // Reemplazar las últimas dos partes con materiaValor y testClave
            rutaSplit[rutaSplit.length - 2] = materiaValor;
            console.log("Se ha reemplazado la penúltima parte de la ruta con materiaValor:", rutaSplit);

            rutaSplit[rutaSplit.length - 1] = testClave;
            console.log("Se ha reemplazado la última parte de la ruta con testClave:", rutaSplit);

            // Unir las partes para formar la nueva configuración de ruta
            const rutaDinamica = rutaSplit.join('/');
            return rutaDinamica;
        } else if ((!testClave || !materiaValor) && !window.location.href.includes("mod/quiz/")) {
            return "dinámica";
        } else if ((!testClave || !materiaValor) && window.location.href.includes("mod/quiz/")) {
            // Obtener la configuración de ruta dinámica almacenada en sessionStorage
            console.log('[opc-autofill-autosave-moodle: ruta]  No se pudieron determinar la materia o quiz y el url incluye "mod/quiz/"');
            await crearSelectsDinamicos(materiaValor, testClave);
            return null;
        }

    } catch (error) {
        // Manejo de errores generales en la función
        console.error('Error en actualizaConfigRutaDinamic:', error);
        return null;
    }
}

async function crearSelectsDinamicos(materiaValor, testClave) {

    const containerRutaFirebase = document.getElementById('containerRutaFirebase');
    containerRutaFirebase.style.display = 'block';

    containerRutaFirebase.innerHTML = `
    <div>
      <span class="title">Ruta:</span> <span class="label" style="font-weight: 500; color: green;" >dinámica</span>
    </div>

    <div>
      <span class="title">Ciclo:</span> <span class="label">${ciclo}</span>
    </div>`;

    const containerRutaDinamicaFirebase = document.getElementById('containerRutaDinamicaFirebase');

    // Asegurarse de limpiar completamente el contenedor
    if (containerRutaDinamicaFirebase) {
        //console.log('Limpiando todos los elementos existentes en el contenedor.');
        containerRutaDinamicaFirebase.innerHTML = ''; // Elimina todo el contenido del contenedor
    } else {
        console.error('No se encontró el contenedor con id="containerRutaDinamicaFirebase".');
        return;
    }

    const rutaLista = (localStorage.getItem('configRuta') || '').split('/');

    // Asumiendo que estás dentro de una función async o que manejas las promesas adecuadamente
    if (rutaLista.includes('UNEMI')) {

        if (rutaLista.includes('niv')) {

            // Determinar las rutas dinámicas basadas en las condiciones
            let rutasSelectDinamics = [
                "ConfigRuta/opciones/UNEMI/unemi:niv-materias-de-nivelacion",
                "ConfigRuta/opciones/UNEMI/unemi:niv-test"
            ];

            console.log('[opc-autofill-autosave-moodle: ruta]  Generando select dinamico para Materia y Test');

            try {
                // Iterar sobre cada ruta dinámica seleccionada
                for (const path of rutasSelectDinamics) {
                    // Obtener datos de Firebase para la ruta actual
                    const optionsSnapshot = await get(ref(database, path));
                    if (!optionsSnapshot.exists()) {
                        console.warn(`No se encontraron datos en la ruta: ${path}`);
                        continue; // Saltar a la siguiente ruta si no hay datos
                    }

                    const options = optionsSnapshot.val();
                    //console.log(`Opciones obtenidas para la ruta ${path}:`, options);

                    // Crear el elemento select
                    const selectElement = document.createElement('select');
                    selectElement.classList.add('dynamic-select');
                    selectElement.style.display = 'block'; // Asegura que el select sea visible

                    // Añadir una opción por defecto
                    const defaultOption = document.createElement('option');
                    defaultOption.value = "";

                    let isMateriaSelect = path === "ConfigRuta/opciones/UNEMI/unemi:niv-materias-de-nivelacion";
                    let isTestSelect = path === "ConfigRuta/opciones/UNEMI/unemi:niv-test";

                    if (isMateriaSelect) {
                        defaultOption.textContent = "Seleccionar Materia";
                    } else if (isTestSelect) {
                        defaultOption.textContent = "Seleccionar Test";
                    }

                    defaultOption.disabled = true;
                    defaultOption.selected = true;
                    selectElement.appendChild(defaultOption);

                    // Añadir opciones al select
                    for (const [key, value] of Object.entries(options)) {
                        const optionElement = document.createElement('option');
                        optionElement.value = key;
                        optionElement.textContent = value;

                        // Si es un select de materias y materiaValor coincide con la opción, seleccionarla
                        if (isMateriaSelect && materiaValor !== null && key === materiaValor) {
                            optionElement.selected = true;
                        }

                        // Si es un select de test y testClave coincide con la opción, seleccionarla
                        if (isTestSelect && testClave !== null && key === testClave) {
                            optionElement.selected = true;
                        }

                        selectElement.appendChild(optionElement);
                    }

                    // Añadir el select al contenedor principal
                    contenedorSelects.appendChild(selectElement);
                    //console.log(`Select creado y agregado para la ruta: ${path}`);
                }


                // Crear el botón "Guardar Ruta" después de todos los selects
                const botonGuardarRuta = document.createElement('button');
                botonGuardarRuta.textContent = 'Guardar Ruta';
                botonGuardarRuta.classList.add('estilo-configruta-boton', 'generarpdf');
                botonGuardarRuta.addEventListener('click', guardarRutaDinamica);

                // Agregar el botón al contenedor
                contenedorSelects.appendChild(botonGuardarRuta);
                //console.log('Botón "Guardar ruta" agregado.');

                // Actualizar la visibilidad de los selects si es necesario
                actualizarVisibilidadSelects(true);

            } catch (error) {
                console.error(`Error al procesar los selects dinámicos:`, error);
            }

        } else if (rutaLista.includes('adm')) {
            console.log(`[opc-autofill-autosave-moodle: ruta]  Ruta Dinámica no disponible para ${localStorage.getItem('configRuta')}`);
            contenedorRuta_js();

        } else {
            // Si 'UNEMI' está presente pero no incluye 'niv' ni 'adm'
            console.log(`[opc-autofill-autosave-moodle: ruta]  Ruta Dinámica no disponible para ${localStorage.getItem('configRuta')}`);
            contenedorRuta_js();
        }

    } else {
        // Si 'UNEMI' no está presente en rutaLista
        console.log(`[opc-autofill-autosave-moodle: ruta]  Ruta no incluye UNEMI`);
        contenedorRuta_js();
    }



}


function guardarRutaDinamica() {
    const containerRutaFirebase = document.getElementById('containerRutaFirebase');
    console.log('Guardando ruta...');

    // Obtener todos los select creados dinámicamente
    const dynamicSelects = document.querySelectorAll('.dynamic-select');

    // Obtener los valores seleccionados en cada select
    const selectedValues = Array.from(dynamicSelects).map(select => select.value);
    console.log('Valores seleccionados:', selectedValues);

    // Obtener configRuta desde localStorage
    const ruta = localStorage.getItem('configRuta');
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
        containerRutaFirebase.style.display = 'block';
    }
    else {
        console.log("El elemento con ID 'ruta-configruta' no existe en el DOM.");

    }

    // Ocultar el contenedor con id "subject-dinamic"
    const contenedorSelects = document.getElementById('subject-dinamic');
    if (contenedorSelects) {
        contenedorSelects.style.display = 'none';
        console.log('Contenedor "subject-dinamic" ocultado.');
    } else {
        console.error('No se encontró el contenedor con id="subject-dinamic".');
    }

    AutoSaveReview_LocalStorage();
}

function actualizarVisibilidadSelects(isVisible) {
    const selects = document.querySelectorAll('.dynamic-select');
    selects.forEach(select => select.style.display = isVisible ? 'block' : 'none');
    //console.log(`Selects ${isVisible ? "mostrados" : "ocultos"}`);
}

// <<<<<<<<<<<<<< Ruta >>>>>>>>>>>>>>

