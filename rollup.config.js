import html from 'rollup-plugin-html';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/add-head/script.js',
    output: {
      file: 'dist/add-head.bundle.js',
      format: 'iife',
      name: 'AddHead',
    },
    plugins: [
      html({
        include: '**/*.html', // Permite importar archivos HTML
      }),
      postcss({
        extensions: ['.css'], // Procesa archivos CSS
        inject: true,         // Inserta CSS en línea
      }),
      terser(),
    ],
  },
  {
    input: 'src/barralateral/script.js',
    output: {
      file: 'dist/barralateral.bundle.js',
      format: 'iife',
      name: 'BarraLateral',
    },
    plugins: [
      html({
        include: '**/*.html', // Permite importar archivos HTML
      }),
      postcss({
        extensions: ['.css'], // Procesa archivos CSS
        inject: true,         // Inserta CSS en línea
      }),
      terser(),
    ],
  },
];
