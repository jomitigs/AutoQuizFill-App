// rollup.config.js

import html from 'rollup-plugin-html';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

export default [
  // Configuración para agregar head
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
  // Configuración para la barra lateral
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
  // Configuración para Firebase
  {
    input: 'src/config-firebase/script.js',
    output: {
      file: 'dist/config-firebase.bundle.js',
      format: 'iife',
      name: 'FirebaseConfig', // Nombre global para Firebase
    },
    plugins: [
      html({
        include: '**/*.html', // Permite importar archivos HTML si es necesario
      }),
      postcss({
        extensions: ['.css'], // Procesa archivos CSS si es necesario
        inject: true,         // Inserta CSS en línea si es necesario
      }),
      terser(), // Minifica el archivo final
    ],
  },
];
