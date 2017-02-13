import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from "rxjs";
import City from "../../models/City";
import * as fromRoot from '../reducers';
import {Store} from "@ngrx/store";
import * as fromCityWeather from '../reducers/city-weather.reducer';
import * as CityWeatherAction from "../actions/city-weather.actions";

/**
 * Pipe convert
 */
@Pipe({
    name: 'cityWeather'
})
export class CityWeatherPipe implements PipeTransform {

    private cityMap: Map<string, City> = new Map<string, City>();
    private city$: Observable<City>;

    constructor(private store: Store<fromRoot.State>) {
        this.city$ = this.store.select((s: fromRoot.State) => s.cityWeather)
          .map((citiesState: fromCityWeather.State): City => {
            const city: City = citiesState.searchResult;
            if (city) {
                this.cityMap.set(city.name, city);
            }
            return city;
          });
    }

    transform(value: string): Observable<City> {
        return this.findCityWeather(value);
    }

    private findCityWeather(cityName: string): Observable<City> {
        if (this.cityMap.has(cityName)) {
            return Observable.of(this.cityMap.get(cityName));
        } else {
            this.store.dispatch(new CityWeatherAction.LoadAction(cityName));
            return this.city$;
        }
    }
}
