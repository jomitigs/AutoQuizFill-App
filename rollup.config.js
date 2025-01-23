// rollup.config.js
import html from '@rollup/plugin-html';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { string } from 'rollup-plugin-string';

/**
 * Función para generar configuraciones de Rollup
 * @param {Object} options - Opciones específicas para cada build
 * @param {string} options.input - Archivo de entrada
 * @param {string} options.file - Archivo de salida
 * @param {string} options.name - Nombre global (opcional)
 * @param {Array<string>} [options.external] - Dependencias externas (opcional)
 * @param {Object} [options.globals] - Nombres globales para dependencias externas (opcional)
 * @returns {Object} Configuración de Rollup
 */
function createConfig({ input, file, name, external = [], globals = {} }) {
  return {
    input,
    output: {
      file,
      format: 'iife',
      name,
      globals,
    },
    external, // Si deseas marcar otras dependencias como externas
    plugins: [
      resolve(),
      commonjs(),
      string({
        include: '**/*.html', // Permite importar archivos HTML como cadenas de texto
      }),
      postcss({
        extensions: ['.css'],
        inject: true,
      }),
      terser(),
      html({
        include: '**/*.html',
      }),
    ],
    
  };
}

export default [
  // Configuración para agregar head
  createConfig({
    input: 'src/add-head/script.js',
    file: 'dist/add-head.bundle.js',
    name: 'AddHeadBundle',
  }),
  // Configuración para la barra lateral
  createConfig({
    input: 'src/barra-lateral/script.js',
    file: 'dist/barra-lateral.bundle.js',
    name: 'BarraLateralBundle',
  }),
  // Configuración para Firebase (Incluido en el bundle)
  createConfig({
    input: 'src/config-firebase/script.js',
    file: 'dist/config-firebase.bundle.js',
    name: 'FirebaseConfig',
    // No marcar Firebase como externo para incluirlo en el bundle
    // external: ['firebase/app', 'firebase/auth', 'firebase/database'], // ELIMINAR
    // globals: { ... }, // ELIMINAR
  }),
];
