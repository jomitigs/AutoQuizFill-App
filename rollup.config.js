import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import terser from '@rollup/plugin-terser';
import { string } from 'rollup-plugin-string';
import obfuscator from 'rollup-plugin-obfuscator';
import cssnano from 'cssnano';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import polyfillNode from 'rollup-plugin-polyfill-node';
import alias from '@rollup/plugin-alias';

// Verifica si es producción
const isProduction = process.env.BUILD_PROD === 'true';

export default {
  input: 'src/main-app.js',
  output: {
    file: 'dist/main-app.bundle.js',
    format: 'iife',
    name: 'AutoQuizFillApp',
    globals: {
      // Si usas polyfillNode, puedes asignar globals para esos módulos.
      // O bien, si los sustituyes por shims vacíos, puedes asignarlos a 'null' o a un objeto vacío.
      'worker_threads': 'null',
      'os': 'null',
      'child_process': 'null',
      'mathjax-full': 'MathJax',
      'mathjax-full/js/output/mathml.js': 'MathJax'
    }
  },
  // Opcional: Si no quieres que se intente incluir estos módulos, puedes marcarlos como externos.
  // Pero si usas alias para reemplazarlos, es mejor quitarlos de "external".
  // external: ['worker_threads', 'os', 'child_process'],
  plugins: [
    // Alias para reemplazar módulos de Node que no existen en el navegador.
    alias({
      entries: [
        { find: 'worker_threads', replacement: './src/empty.js' },
        { find: 'os', replacement: './src/empty.js' },
        { find: 'child_process', replacement: './src/empty.js' }
      ]
    }),
    // Incluir polyfillNode para otros built-ins de Node
    polyfillNode(),
    resolve({ browser: true }),
    nodeResolve(),
    commonjs(),
    string({ include: '**/*.html' }),
    postcss({
      extensions: ['.css'],
      inject: true,
      minimize: isProduction,
      plugins: isProduction
        ? [cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })]
        : [],
    }),
    isProduction && terser({ format: { comments: false }, compress: { drop_console: true } }),
    isProduction && obfuscator({
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.75,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.4,
      disableConsoleOutput: true,
      identifierNamesGenerator: 'hexadecimal',
      renameGlobals: false,
      rotateStringArray: true,
      stringArray: true,
      stringArrayEncoding: ['base64'],
      stringArrayThreshold: 0.75,
      transformObjectKeys: true,
      unicodeEscapeSequence: false
    }),
    html({ include: '**/*.html' }),
  ].filter(Boolean),
};
