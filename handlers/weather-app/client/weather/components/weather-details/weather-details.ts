import {Component, OnInit, Input} from '@angular/core';
import City from "../../../models/City";

import * as fromRoot from '../../reducers';
import * as fromCityWeather from '../../reducers/city-weather.reducer';
import * as CityWeatherAction from "../../actions/city-weather.actions";

import { Router, ActivatedRoute, Params } from '@angular/router';
import {Store} from "@ngrx/store";

@Component({
    selector: 'weather-details',
    // styles: [require('./city-weather-detail.css')],
    template: require('./weather-details.html')
})
export class WeatherDetailComponent implements OnInit {

    private id: number;
    private city: City;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit(): void {

        this.store.select((s: fromRoot.State) => s.cityWeather)
            .subscribe((citiesState: fromCityWeather.State): void => {
                this.city = citiesState.current;
            });

        this.route.params
            .map((params: Params) => +params['id'])
            .subscribe((id: number) => this.loadDetails(id));
    }

    loadDetails(id: number) {
        this.store.dispatch(new CityWeatherAction.LoadByIdAction(id));
    }
}
