// rollup.config.js

import html from 'rollup-plugin-html';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/add-head/script.js',
    output: {
      file: 'dist/add-head.bundle.js',
      format: 'iife',
      name: 'AddHeadBundle', // Nombre global (opcional)
    },
    plugins: [
      html({
        include: '**/*.html', // Permite importar archivos HTML
      }),
      postcss({
        extensions: ['.css'], // Procesa archivos CSS
        inject: true,         // Inserta CSS en línea
      }),
      terser(), // Minifica el archivo final
    ],
  },
  {
    input: 'src/barra-lateral/script.js',
    output: {
      file: 'dist/barra-lateral.bundle.js',
      format: 'iife',
      name: 'BarraLateralBundle', // Nombre global (opcional)
    },
    plugins: [
      html({
        include: '**/*.html', // Permite importar archivos HTML
      }),
      postcss({
        extensions: ['.css'], // Procesa archivos CSS
        inject: true,         // Inserta CSS en línea
      }),
      terser(), // Minifica el archivo final
    ],
  },
];
