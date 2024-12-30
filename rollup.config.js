import terser from '@rollup/plugin-terser';

export default {
  input: 'src/barralateral.js',
  output: {
    file: 'dist/barralateral.js',
    format: 'iife', // Formato inmediatamente ejecutable
    name: 'AutoQuizFillApp', // Nombre del módulo global
  },
  plugins: [terser()]
};
