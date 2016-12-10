import {Component, OnInit, Output, EventEmitter} from '@angular/core';

import City from "../../../models/City";

import WeatherService from '../../services/weather';
import Page from "../../../models/paging/Page";
import Coordinates from "../../../models/Coordinates";

@Component({
    selector: 'weather-grid',
    styleUrls: ['app/components/weather-grid/weather-grid.styl'],
    templateUrl: 'app/components/weather-grid/weather-grid.html'
})
export class WeatherGrid implements OnInit {

    sourceMeasurement: string = 'K';
    displayMeasurement: string = 'K';

    temperatureMeasurements: Array<string> = ['K', 'C', 'F'];

    private cities: Array<City>;
    private page: Page = new Page();
    private sortDirection: string = 'up';

    @Output('onSelect') onSelect = new EventEmitter<Coordinates>();

    constructor(private weather: WeatherService) { }

    ngOnInit() {
        console.log('WeatherGrid initialized!');

        this.weather.getWeather().then(data => {
            this.cities = data;
            this.page.totalPages = Math.ceil(this.cities.length / this.page.pageSize);
            console.log('Init total pages', this.page);
            this.sort();
            this.render();
        });
    }

    toPage(page: number): void {
        this.page.currentPage = page;
        this.render();
    }

    selectCity(city: City) {
        console.log(city);

        this.onSelect.emit(city.coord);
    }

    changeDirection(): void {
        let direction: string = this.sortDirection;
        this.sortDirection = direction === 'up' ? 'down' : 'up';
        this.sort();
    }

    changeTemperatureMeasurement(measurement: string): void {
        this.displayMeasurement = measurement;
    }

    private sort(): void {
        this.cities.sort((city1: City, city2: City) => {
            let cityName1: string = city1.name.toLocaleLowerCase();
            let cityName2: string = city2.name.toLocaleLowerCase();

            if (cityName1 < cityName2) {
                return this.sortDirection === 'up' ? -1 : 1;
            } else if (cityName1 > cityName2) {
                return this.sortDirection === 'up' ? 1 : -1;
            }

            return 0;
        });

        this.page.currentPage = 1;
        this.render();
    }

    private render(): void {
        let start = (this.page.currentPage - 1) * this.page.pageSize;
        let finish = this.page.currentPage * this.page.pageSize;
        this.page.list = this.cities.slice(start, finish);
    }
}