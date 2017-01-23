let path = require('path');
let defer = require('config/defer').deferConfig;

module.exports = {
  app: {
    name: 'Weather App'
  },
  server: {
    port: 3000
  },
  handlers: [
    'static',
    'logger',
    'cors',
    'templates',
    'errors',
    'bodyParser',
    'weather-app',
    'api',
    'webpack'
  ],
  template: {
    // template.root uses config.root
    root: defer(function (cfg) {
      return path.join(cfg.root, 'handlers');
    }),
    basedir: path.join(process.cwd(), 'templates')
  },
  root: process.cwd(),

  weather: {
    baseApiURL: 'http://api.openweathermap.org/data/2.5',
    currentAPI: '/find',
    cityAPI: '/weather',
    apiKey: '5d574c9fb3fecaa51a57b854b66a6c48',
    citiesCount: 50
  }
};