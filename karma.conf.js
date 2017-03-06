module.exports = function (config) {
  let webpackConfig = require('./webpack.config.js');

  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    // list of files to exclude
    exclude: [],

    files: [
      { pattern: './bundle.spec.js', watched: false },
      { pattern: './handlers/*/client/**/*.spec.ts', watched: false}
    ],

    preprocessors: { './bundle.spec.js': ['coverage', 'webpack', 'sourcemap'] },

    // Webpack Config at ./webpack.test.js
    webpack: webpackConfig,



    // Webpack please don't spam the console when running in karma!
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i.e.
      noInfo: true,
      // and use stats to turn off verbose output
      stats: {
        // options i.e.
        chunks: false
      }
    },


    reporters: ['mocha', 'coverage'],

    // web server port
    port: 9876,

    colors: true,

    autoWatch: false,

    browsers: [
      'PhantomJS'
    ],

    singleRun: true
  });
};