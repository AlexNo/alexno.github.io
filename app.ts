import WeatherAPI from './libs/WeatherAPI';
import WeatherGrid from './libs/WeatherGrid';

import 'materialize-css/dist/css/materialize.min.css';
import './style.css';

let api = new WeatherAPI();

api.fetch().then(data => {
    new WeatherGrid(data.list);
});


let map = document.getElementById("map");

let options = {
    center: {
        lat: 53.9,
        lng: 27.57
    },
    scrollwheel: false,
    zoom: 8
};

let gMap = new google.maps.Map(map);