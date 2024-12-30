import html from 'rollup-plugin-html';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

export default {
  input: {
    'add-head': 'src/add-head/script.js',
    'barralateral': 'src/barralateral/script.js',
  },
  output: {
    dir: 'dist', // Directorio de salida
    format: 'iife', // Formato de salida
    entryFileNames: '[name].bundle.js', // Genera archivos como add-head.bundle.js y barralateral.bundle.js
  },
  plugins: [
    html({
      include: '**/*.html', // Incluye todos los archivos HTML si es necesario
    }),
    postcss({
      extensions: ['.css'], // Procesa archivos CSS
      inject: true, // Inserta CSS en línea en el archivo final
    }),
    terser(), // Minifica los archivos finales
  ],
};

