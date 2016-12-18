import {Component, OnInit} from '@angular/core';
import City from "../../../models/City";

@Component({
    selector: 'city-weather-search',
    styleUrls: ['app/components/city-weather-search/city-weather-search.styl'],
    templateUrl: 'app/components/city-weather-search/city-weather-search.html'
})
export class CityWeatherSearchComponent implements OnInit {

    private cityName: string = 'Atolina';
    private city: string;

    constructor() { }

    ngOnInit(): void {
        let count: number = 0;
        setInterval(() => {
            count++;
        }, 300);
        console.log('CityWeatherSearchComponent initialized!');
    }

    findCityWeather(): void {
        this.cityName = this.city;
    }
}