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
    format: 'esm', // Usa ESM (módulos ECMAScript) para múltiples entradas
    entryFileNames: '[name].bundle.js', // Nombra los archivos generados
  },
  plugins: [
    html({
      include: '**/*.html',
    }),
    postcss({
      extensions: ['.css'],
      inject: true,
    }),
    terser(),
  ],
};


