import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';

import City from "../../models/City";

import WeatherService from '../../services/WeatherService';
import Page from "../../models/paging/Page";
import {CITIES} from "../../../../../fixtures/mock";

class DataGridProvider {
    cities: City[] = CITIES;

    private MAX_DEVIATION: number = 360 / 10;

    constructor() {
        let self = this;
        setInterval(() => {
            self.cities = self.cities.map(city => {
                let deg = city.wind.deg;
                city.wind.deg = self.calculateDeviationOfWind(deg);
                return city
            });
        }, 1000);
    }

    private randomDeviation(): number {
        return Math.round(Math.random() * this.MAX_DEVIATION);
    }

    private calculateDeviationOfWind(deg: number): number {
        let deviation: number = this.randomDeviation();
        deg = deviation % 2 === 0 ? deg + deviation : deg - deviation;
        if (deg < 0) {
            deg += 360;
        } else if (deg > 360) {
            deg -= 360;
        }
        return deg;
    }
}

@Component({
    selector: 'weather-grid',
    styleUrls: ['./weather-grid.css'],
    templateUrl: './weather-grid.html',
    providers: [DataGridProvider],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherGrid implements OnInit {

    private sourceMeasurement: string = 'K';
    private displayMeasurement: string = 'K';
    private temperatureMeasurements: Array<string> = ['K', 'C', 'F'];

    private page: Page = new Page();
    private sortDirection: string = 'up';

    @Output('onSelect') onSelect = new EventEmitter<City>();
    @Output('onDelete') onDelete = new EventEmitter<number>();

    constructor(private weather: WeatherService,
                private ref: ChangeDetectorRef,
                private dataProvider: DataGridProvider) {
    }

    ngOnInit() {
        console.log('WeatherGrid initialized!');
        let self = this;
        self.ref.detach();
        this.page.totalPages =
            Math.ceil(this.dataProvider.cities.length / this.page.pageSize);
        this.sort();
        this.render();

        setInterval(() => {
            self.ref.reattach();
        }, 5000);
    }

    toPage(page: number): void {
        this.page.currentPage = page;
        this.render();
    }

    selectCity(city: City) {
        // this.onSelect.emit(city);

        this.dataProvider.cities = this.dataProvider.cities.map(elem => {
            if (elem.isFavorite) {
                elem.isFavorite = false;
            }
            if (elem.id === city.id) {
                elem.isFavorite = true;
            }
            return elem;
        });
    }

    remove(city: City) {
        // this.onDelete.emit(city.id);
        this.dataProvider.cities = this.dataProvider.cities.filter(c => c.id !== city.id);
        this.render();
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
        this.dataProvider.cities.sort((city1: City, city2: City) => {
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
        this.page.list = this.dataProvider.cities.slice(start, finish);
    }
}