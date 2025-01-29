import { ref, get } from 'firebase/database';
import { database } from '../../config-firebase/script.js';

// <<<<<<<<<<<<<< Ruta Dinamica >>>>>>>>>>>>>>

export async function contenedorRutaDinamica_js() {
    // Obtiene los valores 'configRuta' y 'ciclo' del almacenamiento local
    const configRuta = localStorage.getItem('configRuta');
    const ciclo = localStorage.getItem('ciclo');

    // Verifica si 'configRuta' y 'ciclo' están definidos en el almacenamiento local
    if (!configRuta || !ciclo) {
        // Si alguno de los valores no está definido, llama a la función 'contenedorRuta_js' y termina la ejecución
        contenedorRuta_js();
        return;
    } else {
        // Obtiene el elemento con el ID 'ciclo-configruta' del DOM
        const cicloElemento = document.getElementById('ciclo-configruta');
        if (cicloElemento) {
            // Asigna el valor de 'ciclo' al contenido HTML del elemento, mostrando una etiqueta y el valor
            cicloElemento.innerHTML = `<span class="label-configruta">Ciclo:</span> ${ciclo}`;
            await actualizaConfigRutaDinamic();
        }
    }
}


async function actualizaConfigRutaDinamic() {
    const containerCicloContainer = document.querySelector('.ruta-ciclo-container');

    try {
        // ** 1. Recuperar la configuración de ruta desde localStorage **
        const configRuta = localStorage.getItem('configRuta');

        // ** 2. Extraer la universidad de la configuración de ruta **
        const universidad = configRuta.split('/')[0];

        // ** 3. Seleccionar los elementos del breadcrumb relacionados con cursos y quizzes **
        const breadcrumbItems = document.querySelectorAll('.breadcrumb-item a[href*="/course/view.php"]');
        const quizItems = document.querySelectorAll('.breadcrumb-item a[href*="/mod/quiz/"]');

        // ** 4. Obtener Materia **
        let materiaValor = null;

        if (breadcrumbItems.length > 0) {
            // Obtener el atributo 'title' del primer elemento del breadcrumb
            const breadcrumbTitle = breadcrumbItems[0].getAttribute('title');
            //console.log(`[opc-autifill-moodle: ruta] Título encontrado: ${breadcrumbTitle}`);

            // Extraer las claves entre corchetes del título del breadcrumb
            const matches = breadcrumbTitle.match(/\[([A-Za-z]+[^\]]+)\]/g)?.filter(match => /[A-Za-z]/.test(match));

            if (matches && matches.length > 0) {
                // Limpiar los corchetes para obtener la clave de búsqueda
                const searchKey = matches[0].replace(/[\[\]]/g, '');
                //console.log(`[opc-autifill-moodle: ruta] Materia de la página: "${searchKey}"`);

                // Definir la ruta en Firebase para obtener las opciones de materias
                const materiaRuta = `ConfigRuta/opciones/${universidad}/unemi:codigo-materias-de-nivelacion`;

                try {
                    // Obtener los datos de materias desde Firebase
                    const materiaSnapshot = await get(ref(database, materiaRuta));
                    const materiaOptions = materiaSnapshot.val();

                    if (materiaOptions) {
                        let found = false; // Bandera para indicar si se encontró una coincidencia

                        // Iterar sobre cada clave y valor en las opciones de materias
                        for (const [key, value] of Object.entries(materiaOptions)) {
                            // Separar los valores por comas y eliminar espacios
                            const values = value.split(',').map(item => item.trim());

                            for (const val of values) {
                                if (val.includes(':')) {
                                    // Si el valor contiene ":", dividirlo en dos partes
                                    const [firstPart, secondPart] = val.split(':').map(part => part.trim());

                                    // Comparar la primera parte con la clave de búsqueda
                                    // y verificar si el título del breadcrumb contiene la segunda parte
                                    if (firstPart === searchKey && breadcrumbTitle.includes(secondPart)) {
                                        materiaValor = key;
                                        console.log(`[opc-autifill-moodle: ruta] Materia encontrada: "${materiaValor}"`);
                                        found = true;
                                        break; // Salir del bucle interno si se encuentra una coincidencia
                                    }
                                } else {
                                    // Si el valor no contiene ":", comparar directamente con la clave de búsqueda
                                    if (val === searchKey) {
                                        materiaValor = key;
                                        console.log(`[opc-autifill-moodle: ruta] Materia encontrada: "${materiaValor}"`);
                                        found = true;
                                        break; // Salir del bucle interno si se encuentra una coincidencia
                                    }
                                }
                            }

                            if (found) break; // Salir del bucle externo si se encontró una coincidencia
                        }

                        if (!found) {
                            console.warn(`[opc-autifill-moodle: ruta] No se encontró ninguna coincidencia para la clave de búsqueda: ${searchKey}`);
                        }
                    } else {
                        console.warn(`[opc-autifill-moodle: ruta] No se encontraron opciones para materias en la ruta: ${materiaRuta}`);
                    }
                } catch (firebaseError) {
                    console.error(`Error al obtener datos de Firebase en la ruta ${materiaRuta}:`, firebaseError);
                }
            } else {
                console.warn('[opc-autifill-moodle: ruta] No se encontraron coincidencias en el título del breadcrumb.');
            }
        } else {
            console.warn('[opc-autifill-moodle: ruta] No se encontro materia.');
        }

        // ** 5. Obtener Test **
        let testClave = null;

        if (quizItems.length > 0) {
            // Obtener el texto del quiz desde el primer elemento del breadcrumb
            const quizTextElement = quizItems[0].querySelector('span.text-truncate');
            if (quizTextElement) {
                const quizText = quizTextElement.textContent.trim();
                // Buscar números en formato numérico en el texto del quiz
                const quizNumberMatch = quizText.match(/\d+/);

                let quizNumber = null;

                if (quizNumberMatch) {
                    // Convertir el número encontrado a entero
                    quizNumber = parseInt(quizNumberMatch[0], 10);
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

                    // Convertir el texto a minúsculas y buscar una palabra numérica
                    const wordMatch = quizText.toLowerCase().match(/\b(uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\b/);
                    if (wordMatch) {
                        quizNumber = numWords[wordMatch[0]];
                    }
                }

                if (quizNumber !== null) {
                    // Definir la ruta en Firebase para obtener las opciones de tests
                    const testRuta = `ConfigRuta/opciones/${universidad}/unemi:niv-test`;

                    try {
                        // Obtener los datos de tests desde Firebase
                        const testSnapshot = await get(ref(database, testRuta));
                        const testOptions = testSnapshot.val();

                        if (testOptions) {
                            // Buscar la clave que incluye "Test" seguido del número del quiz
                            testClave = Object.keys(testOptions).find(key => testOptions[key].includes(`Test ${quizNumber}`));
                            if (testClave) {
                                console.log(`[opc-autifill-moodle: ruta] Test encontrado: "${testClave}"`);
                            } else {
                                console.warn(`[opc-autifill-moodle: ruta] No se encontró una clave para Test ${quizNumber}`);
                            }
                        } else {
                            console.warn(`No se encontraron opciones para test en la ruta: ${testRuta}`);
                        }
                    } catch (firebaseError) {
                        console.error(`Error al obtener datos de Firebase en la ruta ${testRuta}:`, firebaseError);
                    }
                } else {
                    console.warn(`[opc-autifill-moodle: ruta] No se encontro número del test.`);
                }
            } else {
                console.warn('[opc-autifill-moodle: ruta] No se encontró el elemento de texto del quiz.');
            }
        } else {
            console.warn('[opc-autifill-moodle: ruta] No se encontro test.');
        }

        // ** 6. Verificar y Actualizar ConfigRutaDinamic **
        if (materiaValor && testClave) {
            // Dividir la configuración de ruta en partes
            const configRutaParts = configRuta.split('/');
            // Reemplazar las últimas dos partes con materiaValor y testClave
            configRutaParts[configRutaParts.length - 2] = materiaValor;
            configRutaParts[configRutaParts.length - 1] = testClave;

            // Unir las partes para formar la nueva configuración de ruta
            const updatedConfigRuta = configRutaParts.join('/');
            // Almacenar la configuración actualizada en sessionStorage
            sessionStorage.setItem('configRutaDinamic', updatedConfigRuta);

            // Actualizar el elemento HTML con la nueva ruta
            const rutaElement = document.getElementById('ruta-configruta');
            if (rutaElement) {
                rutaElement.innerHTML = `<span class="label-configruta">Ruta:</span> <span style="font-weight: 500; color: green;">${updatedConfigRuta}</span>`;
                console.log(`[opc-autifill-moodle: ruta] Ruta actualizada: ${updatedConfigRuta}`);
            } else {
                console.error("El elemento con ID 'ruta-configruta' no existe en el DOM.");
            }

            containerCicloContainer.style.display = 'block';

            return updatedConfigRuta;
        }

        else if ((!testClave || !materiaValor) && !window.location.href.includes("mod/quiz/")) {
            sessionStorage.setItem('configRutaDinamic', "dinámica");

            // Actualizar el elemento HTML con la ruta 'dinamica'
            const rutaElement = document.getElementById('ruta-configruta');
            if (rutaElement) {
                rutaElement.innerHTML = `<span class="label-configruta">Ruta:</span> <span style="font-weight: 500; color: green;">dinámica</span>`;
            } else {
                console.warn("El elemento con ID 'ruta-configruta' no existe en el DOM.");
            }

            console.log('[opc-autifill-moodle: ruta] No se pudieron determinar materia ni quiz. Se ha establecido la ruta como "dinámica".');
            containerCicloContainer.style.display = 'block';
            return null;
        }

        else if ((!testClave || !materiaValor) && window.location.href.includes("mod/quiz/")) {
            // Obtener la configuración de ruta dinámica almacenada en sessionStorage
            console.log('[opc-autifill-moodle: ruta] No se pudieron determinar la materia o quiz y el url incluye "mod/quiz/" ');
            await crearSelectsDinamicos();
        }


    } catch (error) {
        // Manejo de errores generales en la función
        console.error('Error en actualizaConfigRutaDinamic:', error);
        return null;
    }
}

async function crearSelectsDinamicos() {
    const contenedorSelects = document.getElementById('subject-dinamic');

    // Asegurarse de limpiar completamente el contenedor
    if (contenedorSelects) {
        //console.log('Limpiando todos los elementos existentes en el contenedor.');
        contenedorSelects.innerHTML = ''; // Elimina todo el contenido del contenedor
    } else {
        console.error('No se encontró el contenedor con id="subject-dinamic".');
        return;
    }

    const rutaLista = (localStorage.getItem('configRuta') || '').split('/');

    if (rutaLista.includes('UNEMI') && rutaLista.includes('niv')) {

        console.log('Ejecutando porque contiene UNEMI y niv');
    
        // Definir las rutas dinámicas en un arreglo
        const rutasSelectDinamics = [
            {
                path: "ConfigRuta/opciones/UNEMI/unemi:niv-materias-de-nivelacion",
                label: "Materias de Nivelación"
            },
            {
                path: "ConfigRuta/opciones/UNEMI/unemi:niv-test",
                label: "Test de Nivelación"
            }
        ];
    
        try {
            // Iterar sobre cada ruta dinámica
            for (const ruta of rutasSelectDinamics) {
                const { path, label } = ruta;
    
                // Obtener datos de Firebase para la ruta actual
                const optionsSnapshot = await get(ref(database, path));
                if (!optionsSnapshot.exists()) {
                    console.warn(`No se encontraron datos en la ruta: ${path}`);
                    continue; // Saltar a la siguiente ruta si no hay datos
                }
    
                const options = optionsSnapshot.val();
                console.log(`Opciones obtenidas para ${label}:`, options);
    
                // Crear un contenedor para cada select con su etiqueta
                const selectContainer = document.createElement('div');
                selectContainer.classList.add('select-container');
    
                // Crear y añadir una etiqueta para el select
                const selectLabel = document.createElement('label');
                selectLabel.textContent = label;
                selectLabel.setAttribute('for', `select-${label.replace(/\s+/g, '-').toLowerCase()}`);
                selectContainer.appendChild(selectLabel);
    
                // Crear el elemento select
                const selectElement = document.createElement('select');
                selectElement.classList.add('dynamic-select');
                selectElement.id = `select-${label.replace(/\s+/g, '-').toLowerCase()}`;
                selectElement.style.display = 'block'; // Mostrar el select
    
                // Añadir una opción por defecto
                const defaultOption = document.createElement('option');
                defaultOption.value = "";
                defaultOption.textContent = `Seleccione una opción de ${label}`;
                defaultOption.disabled = true;
                defaultOption.selected = true;
                selectElement.appendChild(defaultOption);
    
                // Añadir opciones al select
                for (const [key, value] of Object.entries(options)) {
                    const optionElement = document.createElement('option');
                    optionElement.value = key;
                    optionElement.textContent = value;
                    selectElement.appendChild(optionElement);
                }
    
                // Añadir el select al contenedor del select
                selectContainer.appendChild(selectElement);
    
                // Agregar el contenedor del select al contenedor principal
                contenedorSelects.appendChild(selectContainer);
            }
    
            // Crear el botón "Guardar Ruta" después de todos los selects
            const botonGuardarRuta = document.createElement('button');
            botonGuardarRuta.textContent = 'Guardar Ruta';
            botonGuardarRuta.classList.add('estilo-configruta-boton', 'generarpdf');
            botonGuardarRuta.addEventListener('click', guardarRutaDinamica);
    
            // Agregar el botón al contenedor
            contenedorSelects.appendChild(botonGuardarRuta);
            console.log('Botón "Guardar ruta" agregado.');
    
            // Actualizar la visibilidad de los selects si es necesario
            actualizarVisibilidadSelects(true);
    
        } catch (error) {
            console.error(`Error al procesar los selects dinámicos:`, error);
        }
    
    } else {
        console.log(`[opc-autifill-moodle: ruta] Ruta Dinámica no disponible para ${localStorage.getItem('configRuta')}`);
        contenedorRuta_js();
    }
    
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
        containerCicloContainer.style.display = 'block';
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
    console.log(`Selects ${isVisible ? "mostrados" : "ocultos"}`);
}

// <<<<<<<<<<<<<< Ruta >>>>>>>>>>>>>>

export function contenedorRuta_js() {
    // Selecciona todos los elementos con la clase 'container-autoquiz'

    const containerAutoQuiz = document.querySelector('.container-autoquiz');
    // Selecciona el único elemento con la clase 'ruta-ciclo-container'
    const containerCicloContainer = document.querySelector('.ruta-ciclo-container');

    const configRuta = localStorage.getItem('configRuta');
    const ciclo = localStorage.getItem('ciclo');

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
        console.log(`[opc-autofill-moodle: ruta] Valor de configRuta: ${configRuta}, Valor de ciclo: ${ciclo}`);


        // Verifica si el elemento existe antes de modificar su estilo
        if (containerCicloContainer) {
            containerCicloContainer.style.display = 'block';
        } else {
            console.error('No se encontró ningún elemento con la clase "ruta-ciclo-container".');
        }

        if (containerAutoQuiz) {
            containerAutoQuiz.style.display = 'block';
        } else {
            console.error('No se encontró ningún elemento con la clase "ruta-ciclo-container".');
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
        console.log(`[opc-autofill-moodle: ruta] Mostrando "rutaCicloContainer".`)

        if (rutaElemento && cicloElemento) {
            // Asignar los valores de configRuta y ciclo en los elementos del DOM
            rutaElemento.innerHTML = `<span class="label-configruta">Ruta:</span> ${configRuta}`;
            cicloElemento.innerHTML = `<span class="label-configruta">Ciclo:</span> ${ciclo}`;
            // console.log(`Valores asignados: Ruta = ${configRuta}, Ciclo = ${ciclo}`);
        }
    }
}