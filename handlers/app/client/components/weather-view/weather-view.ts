import {Component, OnInit} from '@angular/core';
import WeatherService from "../../services/WeatherService";
import LocationService from "../../services/LocationService";
import Geoposition from "../../models/Geoposition";
import Coordinates from "../../models/Coordinates";
import City from "../../models/City";

@Component({
    selector: 'weather-view',
    // styleUrls: ['./weather-view.css'],
    templateUrl: './weather-view.html'
})
export class WeatherView implements OnInit {

    lat: number;
    lng: number;
    zoom: number = 4;

    cities: Array<City>;

    constructor(private locationSrv: LocationService, private weather: WeatherService) {
    }

    ngOnInit() {
        this.locationSrv.getPosition().then((position: Geoposition) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
        });

        this.weather.getWeather().then(data => {
            this.cities = data;
        });
    }

    selectCity(city: City) {
        this.cities = this.cities.map(elem => {
            if (elem.isFavorite) {
                elem.isFavorite = false;
            }
            if (elem.id === city.id) {
                elem.isFavorite = true;
            }
            return elem;
        });

        this.lat = city.coord.lat;
        this.lng = city.coord.lon;
    }

    deleteCity(cityId: number) {
        this.cities = this.cities.filter(city => city.id !== cityId);
    }
}