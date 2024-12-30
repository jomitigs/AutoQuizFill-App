import html from 'rollup-plugin-html';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/barralateral/script.js',
  output: {
    file: 'dist/autoquizfill.bundle.js',
    format: 'iife',
    name: 'AutoQuizFillApp',
  },
  plugins: [
    html({
      include: '**/*.html', // Incluye todos los archivos HTML
    }),
    postcss({
      extensions: ['.css'], // Procesa archivos CSS
      inject: true, // Inserta CSS en línea en el archivo final
    }),
    terser(), // Minifica el archivo final
  ],
};
