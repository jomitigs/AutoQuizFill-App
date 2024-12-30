import terser from '@rollup/plugin-terser';

export default {
  input: 'src/hello-world.js', // Ajusta el path según tu archivo de entrada
  output: {
    file: 'dist/hello-world.bundle.js', // El archivo generado
    format: 'iife', // Formato inmediatamente ejecutable
  },
  plugins: [terser()], // Aplica el plugin terser
};
