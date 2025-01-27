// Importa el CSS (PostCSS lo inyectará en el bundle)
import './style.css'; // Importa el archivo de estilos CSS

// Exporta las funciones que necesitas utilizar en otros módulos
export function opcionConfig_html() {
    return `
    <div class="contenido-config">
        <h3 id="titulo-config">Configuración de Ruta</h3>

        <!-- Contenedor Selects Dinamicos -->
        <div id="selects-config">
            <!-- Aquí puedes agregar más contenido o elementos dinámicos -->
        </div>

        <button id="boton-guardar-configruta" class="estilo-configruta-boton guardar">Guardar Ruta</button>
    </div>
    `;
} 