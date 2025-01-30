import { createFilter } from '@rollup/pluginutils';

export default function randomClassId() {
  const filter = createFilter(['**/*.js']); // Asegurarnos de incluir JS
  const regexClass = /class=["']([^"']+)["']/g;
  const regexId = /id=["']([^"']+)["']/g;
  const generateRandomName = () => '_' + Math.random().toString(36).substring(2, 6);

  return {
    name: 'random-class-id',
    transform(code, id) {
      if (!filter(id)) return null;

      let renamed = {};
      
      // Renombrar clases
      code = code.replace(regexClass, (_, classNames) => {
        const newNames = classNames
          .split(/\s+/) // separar múltiples clases
          .map(cls => {
            if (!renamed[cls]) {
              renamed[cls] = generateRandomName();
            }
            return renamed[cls];
          })
          .join(' ');
        return `class="${newNames}"`;
      });

      // Renombrar IDs
      code = code.replace(regexId, (_, oldId) => {
        if (!renamed[oldId]) {
          renamed[oldId] = generateRandomName();
        }
        return `id="${renamed[oldId]}"`;
      });

      return { code, map: null };
    }
  };
}
