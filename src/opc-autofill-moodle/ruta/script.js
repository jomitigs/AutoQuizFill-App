    // <<<<<<<<<<<<<< Ruta Dinamica >>>>>>>>>>>>>>

    export async function contenedorRutaDinamica_js() {
        const containerAutoQuiz = document.querySelectorAll('.container-autoquiz');
        const configRuta = localStorage.getItem('configRuta');
        const ciclo = localStorage.getItem('ciclo');

        console.log('Valores obtenidos de localStorage:', { configRuta, ciclo });

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

    export function contenedorRuta_js() {
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