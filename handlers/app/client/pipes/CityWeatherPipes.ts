import {Pipe, PipeTransform} from '@angular/core';
import City from "../models/City";
import WeatherService from "../services/WeatherService";
import {Observable} from "rxjs";


/**
 * Pipe convert
 */
@Pipe({
    name: 'cityWeather'
})
export class CityWeatherPipe implements PipeTransform {

    private cityMap: Map<string, City> = new Map<string, City>();

    constructor(private weatherSrv: WeatherService) {
    }

    transform(value: string): Observable<City> {
        return this.findCityWeather(value);
    }

    private findCityWeather(cityName: string): Observable<City> {
        if (this.cityMap.has(cityName)) {
            return Observable.of(this.cityMap.get(cityName));
        } else {
            return this.weatherSrv.getCityWeather(cityName)
        }
    }
}
