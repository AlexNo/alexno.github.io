const config = require('config');
const weatherAPI = `${config.weather.baseApiURL}${config.weather.currentAPI}`;
const cityAPI = `${config.weather.baseApiURL}${config.weather.cityAPI}`;
const rp = require('request-promise');

let weatherStore = {};

exports.get = async (ctx, next) => {
    console.log('render main page');
    ctx.body = 'Weather API UP!';
};

exports.weather = async (ctx, next) => {
    let data;
    let lat = ctx.query.lat;
    let lon = ctx.query.lon;
    let key = `${lat}/${lon}`;
    if (weatherStore[key]) {
        console.log('returns cached data');
        data = weatherStore[key];
    } else {
        console.log('api request');
        data = await rp({
            uri: weatherAPI,
            qs: {
                APPID: config.weather.apiKey,
                cnt: config.weather.citiesCount,
                lat: ctx.query.lat,
                lon: ctx.query.lon
            },
            json: true
        });
        weatherStore[key] = data;
    }

    ctx.body = data;
};

exports.city = async (ctx, next) => {
    ctx.body = await rp({
        uri: cityAPI,
        qs: {
            APPID: config.weather.apiKey,
            q: ctx.query.city
        },
        json: true
    });
};