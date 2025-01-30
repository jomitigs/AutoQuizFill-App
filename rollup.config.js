// rollup.config.js
import html from '@rollup/plugin-html';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { string } from 'rollup-plugin-string';
import obfuscator from 'rollup-plugin-obfuscator';
import cssnano from 'cssnano'; 

// Determina si es una compilación de producción
const isProduction = process.env.BUILD_PROD === 'true';

export default {
  input: 'src/main-app.js', // Punto de entrada único
  output: {
    file: 'dist/main-app.bundle.js', // Archivo de salida único
    format: 'iife',
    name: 'AutoQuizFillApp', // Nombre global (opcional)
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    string({
      include: '**/*.html', // Importa archivos HTML como cadenas si es necesario
    }),
    postcss({
      extensions: ['.css'],
      inject: true,
      minimize: isProduction, // Minimiza solo en producción
      plugins: [
        cssnano({
          preset: ['default', {
            discardComments: {
              removeAll: true, // Elimina todos los comentarios
            },
          }],
        }),
      ],
    }),
    // Incluir terser solo en producción
    isProduction && terser({
      format: {
        comments: false, // Elimina todos los comentarios
      },
      compress: {
        drop_console: true, // Elimina los mensajes de consola
      },
    }),
    // Incluir obfuscator solo en producción
    isProduction && obfuscator({
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.80,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.6,
      debugProtection: false,
      debugProtectionInterval: false,
      disableConsoleOutput: true, // Elimina cualquier mensaje de consola que sobreviva
      identifierNamesGenerator: 'hexadecimal', // Genera nombres de identificadores en hexadecimal
      renameGlobals: true, // Renombra variables globales
      renameProperties: true, // Renombra propiedades de objetos
      selfDefending: true,
      splitStrings: true,
      stringArray: true,
      stringArrayEncoding: ['base64'], // Codifica el array de strings en base64
      stringArrayThreshold: 0.90,
      transformObjectKeys: true,
      unicodeEscapeSequence: false,
      stringArrayWrappersType: 'none', // Otros tipos incluyen 'function', 'random', etc.
      stringArrayWrappersChainedCalls: false,
      stringArrayWrappersParametersMaxCount: 2,
      stringArrayWrappersType: 'none',
      stringArrayCallsTransform: true,
      stringArrayCallsTransformThreshold: 0.75,
      // Opciones adicionales para maximizar la ofuscación
      rotateStringArray: true,
      shuffleStringArray: true,
      stringArrayRotateTwice: true,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 3,
      stringArrayThreshold: 0.8,
    }),
    html({
      include: '**/*.html',
    }),
  ].filter(Boolean), // Filtra los plugins que sean false (cuando isProduction es false)
};
