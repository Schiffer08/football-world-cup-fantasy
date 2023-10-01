module.exports = function (config) {
  config.set({
    // Marco de pruebas a utilizar (Jasmine en este caso)
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    // Lista de complementos de Karma
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    // Archivos de pruebas y archivos relacionados
    files: [
      // Agrega aquí tus archivos de prueba, por ejemplo, '**/*.spec.ts'
    ],

    // Configuración de los navegadores en los que se ejecutarán las pruebas
    browsers: ['Chrome'],

    // Configuración de Jasmine
    jasmineHtmlReporter: {
      suppressAll: true, // Evita que se muestren detalles innecesarios en la salida
    },

    // Configuración de captura de navegador
    captureTimeout: 60000, // Tiempo máximo en milisegundos para capturar un navegador
    browserDisconnectTolerance: 3, // Número de intentos antes de considerar que un navegador se desconectó
    browserDisconnectTimeout: 10000, // Tiempo máximo en milisegundos para esperar una reconexión del navegador
    browserNoActivityTimeout: 60000, // Tiempo máximo en milisegundos para esperar actividad en el navegador

    // Configuración de informes
    // reporters: ['progress', 'kjhtml'],

    // Puerto en el que se ejecuta Karma
    port: 9876,

    // Niveles de registro de Karma (configura según tus necesidades)
    logLevel: config.LOG_INFO,

    // Archivos de código fuente y pruebas que deben observarse para cambios
    autoWatch: true,

    // Modo de ejecución de una sola vez o en continuo
    singleRun: false,

    // Configuración adicional de Angular para cargar y compilar archivos
    angularCli: {
      environment: 'dev'
    }
  });
};