const config = require('config');
const weatherAPI = `${config.weather.baseApiURL}${config.weather.currentAPI}`;
const rp = require('request-promise');

exports.get = async (ctx, next) => {
    console.log('render main page');
    ctx.body = 'Weather API UP!';
};

exports.weather = async (ctx, next) => {
    ctx.body = await rp({
        uri: weatherAPI,
        qs: {
            APPID: config.weather.apiKey,
            cnt: config.weather.citiesCount,
            lat: ctx.query.lat,
            lon: ctx.query.lon
        },
        json: true
    });
};

exports.city = async (ctx, next) => {
    ctx.body = await rp({
        uri: weatherAPI,
        qs: {
            APPID: config.weather.apiKey,
            cnt: config.weather.citiesCount,
            lat: ctx.query.lat,
            lon: ctx.query.lon
        },
        json: true
    });
};