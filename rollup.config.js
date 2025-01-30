import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import terser from '@rollup/plugin-terser';
import { string } from 'rollup-plugin-string';
import obfuscator from 'rollup-plugin-obfuscator';
import cssnano from 'cssnano';
import randomClassId from './rollup-plugin-random-class-id.js';

// Verifica si es producción
const isProduction = process.env.BUILD_PROD === 'true';

// Función para generar nombres aleatorios
const generateRandomName = () => '_' + Math.random().toString(36).substr(2, 6);

export default {
  input: 'src/main-app.js',
  output: {
    file: 'dist/main-app.bundle.js',
    format: 'iife',
    name: 'AutoQuizFillApp',
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    string({ include: '**/*.html' }),
    postcss({
      extensions: ['.css'],
      inject: true,
      minimize: isProduction,
      modules: isProduction
        ? {
            generateScopedName: () => generateRandomName(), // Renombra clases solo en producción
          }
        : false,
      plugins: isProduction
        ? [
            cssnano({
              preset: ['default', {
                discardComments: { removeAll: true },
              }],
            }),
          ]
        : [],
    }),
    isProduction && terser({ format: { comments: false }, compress: { drop_console: true } }),
    isProduction && obfuscator({
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
    isProduction && randomClassId(), // Activa el renombrado de clases e IDs solo en producción
    html({ include: '**/*.html' }),
  ].filter(Boolean),
};
