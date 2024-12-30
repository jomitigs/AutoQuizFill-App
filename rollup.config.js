import terser from '@rollup/plugin-terser';

export default {
  input: 'src/autoquizfill.js',
  output: {
    file: 'dist/autoquizfill.bundle.js',
    format: 'iife', // Formato inmediatamente ejecutable
    name: 'AutoQuizFillApp', // Nombre del módulo global
  },
  plugins: [terser()]
};
