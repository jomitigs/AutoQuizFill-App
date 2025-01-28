import html from '@rollup/plugin-html';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { string } from 'rollup-plugin-string';
import obfuscator from 'rollup-plugin-obfuscator';

export default {
  input: 'src/main-app.js', // Único punto de entrada
  output: {
    file: 'dist/main-app.bundle.js', // Un solo archivo de salida
    format: 'iife',
    name: 'AutoQuizFillApp', // Nombre global (opcional)
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
    terser({
      format: {
        comments: false, // Elimina todos los comentarios
      },
      compress: {
        drop_console: true, // Elimina los mensajes de consola
      },
    }),
    obfuscator({
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.80,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.6,
      debugProtection: false,
      debugProtectionInterval: false,
      disableConsoleOutput: true, // Elimina cualquier mensaje de consola que sobreviva
      identifierNamesGenerator: 'hexadecimal',
      renameGlobals: false,
      selfDefending: true,
      splitStrings: true,
      stringArray: true,
      stringArrayEncoding: ['base64'], // Opcional: base64 o rc4
      stringArrayThreshold: 0.75,
      transformObjectKeys: true,
      unicodeEscapeSequence: false,
    }),
    html({
      include: '**/*.html',
    }),
  ],
};
