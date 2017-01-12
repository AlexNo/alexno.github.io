import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import City from "../../models/City";

@Component({
    selector: 'city-weather-detail',
    styleUrls: ['./city-weather-detail.css'],
    templateUrl: './city-weather-detail.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityWeatherDetailComponent implements OnInit {

    @Input('city') city: City;

    constructor() { }

    ngOnInit(): void {
        console.log('CityWeatherDetailComponent initialized!');
    }
}