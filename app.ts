import City from './models/City';
import WeatherAPI from './utils/WeatherAPI';

import 'materialize-css/dist/css/materialize.min.css';

const city : City = new City("Minsk");

let api = new WeatherAPI();

console.log(city);

api.fetch();


function hello(name: string) {
    return 'Hello '+ name;
}

export {hello};