import html from 'rollup-plugin-html';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/barralateral/script.js', // Archivo de entrada principal
  output: {
    file: 'dist/autoquizfill.bundle.js', // Archivo de salida
    format: 'iife', // Formato inmediatamente ejecutable
    name: 'AutoQuizFillApp', // Nombre del módulo global
  },
  plugins: [
    html({
      include: 'src/barralateral/*.html', // Incluye archivos HTML
    }),
    postcss({
      extensions: ['.css'], // Procesa archivos CSS
      inject: true, // Inserta CSS en línea en el archivo final
    }),
    terser(), // Minifica el archivo final
  ],
};