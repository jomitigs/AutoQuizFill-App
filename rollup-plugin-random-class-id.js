import { createFilter } from '@rollup/pluginutils';

export default function randomClassId() {
  const filter = createFilter(['**/*.html', '**/*.js']);
  const classRegex = /class=["']([^"']+)["']/g;
  const idRegex = /id=["']([^"']+)["']/g;

  return {
    name: 'random-class-id',
    transform(code, id) {
      if (!filter(id)) return null;

      const rename = {};
      const generateRandomName = () => '_' + Math.random().toString(36).substr(2, 6);

      // Renombrar clases
      code = code.replace(classRegex, (_, classes) => {
        const newClasses = classes.split(' ').map(cls => rename[cls] || (rename[cls] = generateRandomName())).join(' ');
        return `class="${newClasses}"`;
      });

      // Renombrar IDs
      code = code.replace(idRegex, (_, id) => {
        const newId = rename[id] || (rename[id] = generateRandomName());
        return `id="${newId}"`;
      });

      return { code, map: null };
    }
  };
}
