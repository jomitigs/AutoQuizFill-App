(function() {
    'use strict';
  
    // Definimos una función sencilla
    function logHelloWorld() {
      console.log("¡Hola Mundo desde el módulo!");
    }
  
    // Para poder usar la función en nuestro main, la exponemos en window
    window.HelloWorldModule = {
      logHelloWorld
    };
  })();
  