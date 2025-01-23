// rollup.config.js
import html from '@rollup/plugin-html';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { string } from 'rollup-plugin-string';


export default {
  input: 'src/main-app.js',            // Único punto de entrada
  output: {
    file: 'dist/main-app.bundle.js',        // Un solo archivo de salida
    format: 'iife',
    name: 'MyBundle',              // Nombre global (opcional)
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    string({
      include: '**/*.html', // Si necesitas importar archivos HTML como strings
    }),
    postcss({
      extensions: ['.css'],
      inject: true,
    }),
    // terser(),
    html({
      include: '**/*.html',
    }),
  ],
};
