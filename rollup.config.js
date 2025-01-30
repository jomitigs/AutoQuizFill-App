import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import terser from '@rollup/plugin-terser';
import { string } from 'rollup-plugin-string';
import obfuscator from 'rollup-plugin-obfuscator';
import cssnano from 'cssnano';

// Verifica si es producción
const isProduction = process.env.BUILD_PROD === 'true';

export default {
  input: 'src/main-app.js',
  output: {
    file: 'dist/main-app.bundle.js',
    format: 'iife',
    name: 'AutoQuizFillApp',
  },
  plugins: [
    // Resuelve imports en un entorno de navegador
    resolve({ browser: true }),
    // Permite usar CommonJS
    commonjs(),
    // Convierte archivos HTML a strings (si los importas en tu JS)
    string({ include: '**/*.html' }),
    // Procesa CSS
    postcss({
      extensions: ['.css'],
      inject: true,
      minimize: isProduction,
      modules: isProduction
        ? {
            generateScopedName: () => generateRandomName(), // Renombra las clases de CSS solo en prod
          }
        : false,
      plugins: isProduction
        ? [
            cssnano({
              preset: [
                'default',
                {
                  discardComments: { removeAll: true },
                },
              ],
            }),
          ]
        : [],
    }),
    // Solo minifica JS en producción
    isProduction &&
      terser({
        format: { comments: false },
        compress: { drop_console: true },
      }),
    // Ofuscación avanzada en producción
    isProduction &&
      obfuscator({
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.80,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.6,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: true,
        renameProperties: true,
        selfDefending: true,
        splitStrings: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.90,
        transformObjectKeys: true,
        unicodeEscapeSequence: false,
        rotateStringArray: true,
        shuffleStringArray: true,
      }),
    // Genera/inyecta un HTML si lo necesitas
    html({ include: '**/*.html' }),
  ].filter(Boolean), // Filtra cualquier false
};
