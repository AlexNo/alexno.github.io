import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'city-weather',
    styleUrls: ['app/components/city-weather/city-weather.styl'],
    templateUrl: 'app/components/city-weather/city-weather.html'
})
export class CityWeatherComponent implements OnInit {

    private cityName: string = 'Atolina';
    private city: string;

    constructor() { }

    ngOnInit(): void {
        console.log('CityWeatherComponent initialized!');
    }

    findCityWeather(): void {
        this.cityName = this.city;
    }
}