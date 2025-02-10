import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import terser from '@rollup/plugin-terser';
import { string } from 'rollup-plugin-string';
import obfuscator from 'rollup-plugin-obfuscator';
import cssnano from 'cssnano';
import { nodeResolve } from '@rollup/plugin-node-resolve'
import polyfillNode from 'rollup-plugin-polyfill-node';


// Verifica si es producción
const isProduction = process.env.BUILD_PROD === 'true';

export default {
  input: 'src/main-app.js',
  output: {
    file: 'dist/main-app.bundle.js',
    format: 'iife',
    name: 'AutoQuizFillApp',
    globals: {
      'mathjax-full': 'MathJax',
      'mathjax-full/js/output/mathml.js': 'MathJax'
    }
  },
  plugins: [
    resolve({ browser: true }),
    nodeResolve(),  
    commonjs(),
    string({ include: '**/*.html' }),
    postcss({
      extensions: ['.css'],
      inject: true,
      minimize: isProduction,
      plugins: isProduction ? [cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })] : [],
    }),
    isProduction && terser({ format: { comments: false }, compress: { drop_console: true } }),
    isProduction &&
  obfuscator({
    // Ofusca el código de manera compacta
    compact: true,
    // Aplica flattening del flujo de control para dificultar la lectura
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    // Inyecta código muerto para confundir el análisis estático
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    // Deshabilita la salida por consola (opcional)
    disableConsoleOutput: true,
    // Utiliza generador de nombres de identificadores en hexadecimal
    identifierNamesGenerator: 'hexadecimal',
    // No renombra variables globales
    renameGlobals: false,
    // Rota el arreglo de strings para ofuscar el contenido de los mismos
    rotateStringArray: true,
    // Activa el mecanismo de autodefensa del código ofuscado
    selfDefending: true,
    // Utiliza un arreglo de strings para ofuscar literales
    stringArray: true,
    // Codifica los strings del arreglo utilizando base64 (también se puede usar 'rc4')
    stringArrayEncoding: ['base64'],
    // Umbral para incluir strings en el arreglo ofuscado
    stringArrayThreshold: 0.75,
    // Ofusca las claves de los objetos
    transformObjectKeys: true,
    // No utiliza secuencias de escape Unicode en los strings
    unicodeEscapeSequence: false
  }),
    html({ include: '**/*.html' }),
  ].filter(Boolean),
};

