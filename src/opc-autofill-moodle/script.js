import './style.css';

export function opcionAutoFillMoodle_html() {
    return `
     <div class="body-autoquiz">

<div class="container-autoquiz">

    <div class="users">

        <!-- Columna para mostrar el nombre de usuario actual con icono de usuario -->
        <div class="usuario-actual">
            <i class="fa-solid fa-user"></i>
            <span id="nombre-usuario-actual" class="nombre-usuario"></span>
        </div>

<select id="siguiente-usuario" class="select-siguiente-usuario" >
</select>

<button id="boton-siguiente-usuario" class="boton-siguiente-usuario">
    <i class="fa-solid fa-angles-right"></i>
</button>

    </div>


    <!-- Contenedor Principal -->
    <div id="ultima-ruta-configruta" class="estilo-configruta-title no-seleccionado">

        <!-- Contenedor para Ruta y Ciclo apilados verticalmente -->
        <div class="ruta-ciclo-container">

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

            <!-- Contenedor para Subject Dinamic -->
<div id="container-ruta-dinamica" class="subcontainer-autoquiz-autosavereview" style="display: none;" >


        <div class="header-autoquiz">
            <!-- Título y Switch -->
            <h3 id="titulo-autoquiz-subject-dinamic">Ruta Dinámica</h3>

            <label class="switch-autoquiz">
                <input type="checkbox" id="switch-ruta-dinamica">
                <span class="slider round"></span>
            </label>

        </div>

        <div id="body-autoquiz-autosavereview-subject-dinamic" class="body-autoquiz">

<div id="selects-subject-dinamic" >
</div>

        </div>
    </div>


    <!-- Nuevo contenedor para AutoFill-->
    <div id="container-autofill" class="subcontainer-autoquiz-autofill" style="display: none;">

        <div class="header-autoquiz">
            <h2 id="titulo-autoquiz">AutoFill</h2>

            <label class="switch-autoquiz">
                <input type="checkbox" id="switch-autofill">
                <span class="slider round"></span>
            </label>
        </div>

        <!-- Contenido de AutoFill-->
        <div id="body-autoquiz-autofill" class="body-autoquiz" style="display: none;">

            <!-- Contenedor dinámico para las preguntas generadas -->
            <div id="contenedor-preguntas" class="contenedor-preguntas">
                <!-- Aquí se insertarán dinámicamente los detalles de cada pregunta -->
            </div>

        </div>
    </div>

    <!-- Contenedor para AutoSave -->
    <div id="container-autosave" class="subcontainer-autoquiz-autosave" style="display: none;">

        <div class="header-autoquiz">
            <!-- Título y Switch -->
            <h2 id="titulo-autoquiz">AutoSave</h2>
            <label class="switch-autoquiz">
                <input type="checkbox" id="switch-autosave">
                <span class="slider round"></span>
            </label>
        </div>

        <!-- Contenido de AutoSave -->
        <div id="body-autoquiz-autosave" class="body-autoquiz">

            <div class="dato-autoquiz">
                <div>
                    <span id="respuestasautosave"></span>
                </div>
            </div>

        </div>
    </div>


    <!-- Contenedor para AutoSaveReview -->
    <div id="container-autosavereview" class="subcontainer-autoquiz-autosavereview" style="display: none;">

        <div class="header-autoquiz">
            <!-- Título y Switch -->
            <h3 id="titulo-autoquiz">AutoSaveReview</h3>
            <label class="switch-autoquiz">
                <input type="checkbox" id="switch-autosavereview">
                <span class="slider round"></span>
            </label>
        </div>

        <!-- Contenido de AutoSaveReview -->
        <div id="body-autoquiz-autosavereview" class="body-autoquiz">

            <div class="dato-autoquiz">
                <div>
                    <span id="respuestasautosavereview"></span>
                </div>
            </div>

        </div>
    </div>

    <!-- Contenedor Verified -->
    <div id="container-verified" class="subcontainer-autoquiz-verified" style="display: none;">

        <!-- Head Verified -->
        <div class="header-autoquiz">
        <h4 id="titulo-autoquiz">Verificar Preguntas</h4>

        </div>

        <!-- Body Verified -->
        <div id="body-autoquiz-verified" class="body-autoquiz">

        </div>
    </div>

</div>

</div>
`;
}