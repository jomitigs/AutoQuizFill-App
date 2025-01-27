export function contenedorUsers_js() {
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