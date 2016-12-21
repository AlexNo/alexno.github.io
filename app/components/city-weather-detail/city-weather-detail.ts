import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import City from "../../../models/City";

@Component({
    selector: 'city-weather-detail',
    styleUrls: ['app/components/city-weather-detail/city-weather-detail.styl'],
    templateUrl: 'app/components/city-weather-detail/city-weather-detail.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityWeatherDetailComponent implements OnInit {

    @Input('city') city: City;

    constructor() { }

    ngOnInit(): void {
        console.log('CityWeatherDetailComponent initialized!');
    }
}