// rollup-plugin-random-class-id.js
import { createFilter } from '@rollup/pluginutils';

// Expresión regular para encontrar class="..." o class='...'
const classRegex = /class=["']([^"']+)["']/g;
// Expresión regular para encontrar id="..." o id='...'
const idRegex = /id=["']([^"']+)["']/g;

export default function randomClassId() {
  // Filtra sólo los archivos .js (o .ts si usas TypeScript)
  const filter = createFilter(['**/*.js', '**/*.ts']);

  return {
    name: 'random-class-id',
    transform(code, id) {
      // Si no es un archivo JS/TS que cumpla el filtro, no lo modifica
      if (!filter(id)) return null;

      // Mapeo de nombres originales → nuevos nombres
      const renameMap = {};
      // Generar un nombre aleatorio
      const generateName = () => '_' + Math.random().toString(36).substr(2, 6);

      // Renombrar clases
      code = code.replace(classRegex, (_, classList) => {
        // Dividir por espacios para manejar múltiples clases
        const newClasses = classList
          .split(/\s+/)
          .map(cls => {
            // Si no está en el mapa, crearlo
            if (!renameMap[cls]) {
              renameMap[cls] = generateName();
            }
            return renameMap[cls];
          })
          .join(' ');

        return `class="${newClasses}"`;
      });

      // Renombrar IDs
      code = code.replace(idRegex, (_, oldId) => {
        if (!renameMap[oldId]) {
          renameMap[oldId] = generateName();
        }
        return `id="${renameMap[oldId]}"`;
      });

      return { code, map: null };
    },
  };
}
