import WeatherAPI from './libs/WeatherAPI';
import WeatherGrid from './libs/WeatherGrid';

import 'materialize-css/dist/css/materialize.min.css';

let api = new WeatherAPI();

api.fetch().then(data => {
    new WeatherGrid(data.list);
});