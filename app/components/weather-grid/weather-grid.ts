import {
    Component,
    OnInit,
    OnChanges,
    Input,
    Output,
    EventEmitter,
    SimpleChange,
    ChangeDetectionStrategy
} from '@angular/core';

import City from "../../../models/City";

import WeatherService from '../../services/WeatherService';
import Page from "../../../models/paging/Page";

@Component({
    selector: 'weather-grid',
    styleUrls: ['app/components/weather-grid/weather-grid.styl'],
    templateUrl: 'app/components/weather-grid/weather-grid.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherGrid implements OnInit, OnChanges {

    private sourceMeasurement: string = 'K';
    private displayMeasurement: string = 'K';
    private temperatureMeasurements: Array<string> = ['K', 'C', 'F'];

    private page: Page = new Page();
    private sortDirection: string = 'up';

    @Input('cities') cities: Array<City>;
    @Output('onSelect') onSelect = new EventEmitter<City>();
    @Output('onDelete') onDelete = new EventEmitter<number>();

    constructor(private weather: WeatherService) { }

    ngOnInit() {
        console.log('WeatherGrid initialized!');
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
        let keys = Object.keys(changes);
        
        for(let propName of keys) {
            if (this.cities && propName === 'cities') {
                this.page.totalPages =
                    Math.ceil(this.cities.length / this.page.pageSize);
                this.sort();
                this.render();
            }
        }

    }

    toPage(page: number): void {
        this.page.currentPage = page;
        this.render();
    }

    selectCity(city: City) {
        this.onSelect.emit(city);
    }

    remove(city: City) {
        this.onDelete.emit(city.id);
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