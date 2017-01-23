import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import City from "../../../models/City";

@Component({
    selector: 'city-weather-detail',
    // styles: [require('./city-weather-detail.css')],
    template: require('./city-weather-detail.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityWeatherDetailComponent implements OnInit {

    @Input('city') city: City;

    constructor() { }

    ngOnInit(): void {
        console.log('CityWeatherDetailComponent initialized!');
    }
}
