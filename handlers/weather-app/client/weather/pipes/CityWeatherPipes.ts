import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from "rxjs";
import City from "../../models/City";
import WeatherService from "../../core/services/WeatherService";

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
            return this.weatherSrv.weatherForCity(cityName)
        }
    }
}
