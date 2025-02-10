import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import terser from '@rollup/plugin-terser';
import { string } from 'rollup-plugin-string';
import obfuscator from 'rollup-plugin-obfuscator';
import cssnano from 'cssnano';
import workerLoader from 'rollup-plugin-web-worker-loader';

// Verifica si es producción
const isProduction = process.env.BUILD_PROD === 'true';

export default {
  input: 'src/main-app.js',
  output: {
    file: 'dist/main-app.bundle.js',
    format: 'iife',
    name: 'AutoQuizFillApp',
    globals: {
      'rollup-plugin-web-worker-loader!./worker.js': 'WorkerConstructor',
      'mathjax-full': 'MathJax',
      'mathjax-full/js/output/mathml.js': 'MathJax'
    }
  },
  plugins: [
    workerLoader(),
    resolve({ browser: true }),
    commonjs(),
    string({ include: '**/*.html' }),
    postcss({
      extensions: ['.css'],
      inject: true,
      minimize: isProduction,
      plugins: isProduction ? [cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })] : [],
    }),
    isProduction && terser({ format: { comments: false }, compress: { drop_console: true } }),
    isProduction && obfuscator({ /* opciones de obfuscación */ }),
    html({ include: '**/*.html' }),
  ].filter(Boolean),
};
