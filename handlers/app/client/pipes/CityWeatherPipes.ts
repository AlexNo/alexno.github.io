import {Pipe, PipeTransform, EventEmitter} from '@angular/core';
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
                .subscribe((city: City) => {
                    this.cityMap.set(cityName, city);
                    return city;
                })
        }
    }
}

@Pipe({
    name: 'weatherFormatter',
    pure: false
})
export class WeatherFormatterPipe implements PipeTransform {

    constructor() {}

    transform(city: City): string {
        return `<ul class="collection">
                    <li class="collection-item">City - ${city ? city.name : ''}</li>
                    <li class="collection-item">Coordinates: lat - ${city && city.coord ? city.coord.lat : ''}, lon - ${city ? city.coord.lon : ''}</li>
                    <li class="collection-item">Clouds, % - ${city && city.clouds ? city.clouds.all : ''}</li>
                    <li class="collection-item">Wind - ${city && city.wind ? city.wind.speed : ''}</li>
                </ul>`;
    }
}
