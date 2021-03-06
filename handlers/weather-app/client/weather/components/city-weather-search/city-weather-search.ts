import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'city-weather-search',
    // styles: [require('./city-weather-search.css')],
    template: require('./city-weather-search.html')
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
