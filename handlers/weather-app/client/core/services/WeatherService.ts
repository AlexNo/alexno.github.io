import {Injectable}    from '@angular/core';
import {Http, URLSearchParams, Response} from '@angular/http';

import LocationService from "./LocationService";
import {Observable} from "rxjs";
import CityShort from "../../models/CityShort";
import City from "../../models/City";
import WeatherResponse from "../../models/api/Response";
import Geoposition from "../../models/Geoposition";

@Injectable()
export default class WeatherService {

    private weatherApi: string = 'http://localhost:3000/api/weather';
    private cityApi: string = 'http://localhost:3000/api/city';

    constructor(private http: Http, private locationSrv: LocationService) {
    };

    getNearbyWeather(): Observable<City[]> {
        let weatherPromise = this.paramsForCollectionOfCities();
        let self = this;

        return Observable.from(weatherPromise)
            .flatMap(data => {
                return self.getWeather(data)
            })
    }

    getCityWeather(cityName: string): Observable<City> {

        return this.http.get(this.cityApi, {
            search: this.paramsForCity(cityName)
        }).map((r: Response): City => {
            let city: City = r.json() as City;
            return city;
        });
    }

    private getWeather(params:URLSearchParams): Observable<City[]> {
        return this.http.get(this.weatherApi, {
            search: params
        })
            .map(this.extractData)
            .map(this.getList);
            // .map(this.toCityShort);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private getList(data: WeatherResponse): City[] {
        return data.list ? data.list : [];
    }

    private toCityShort(cities: City[]): CityShort[] {
        return cities.map((city: City): CityShort => {
            return {
                id: city.id,
                name: city.name,
                dt: city.dt,
                wind: city.wind,
                temperature: city.main.temp,
                coord: city.coord,
                clouds: city.clouds.all,
                isFavorite: false,
            }
        })
    }

    private paramsForCollectionOfCities(): Promise<URLSearchParams> {
        let params = new URLSearchParams();

        return this.locationSrv.getPosition().then((position: Geoposition) => {
            params.set('lat', String(position.coords.latitude));
            params.set('lon', String(position.coords.longitude));

            return params;
        });
    }

    private paramsForCity(city: string): URLSearchParams {
        let params = new URLSearchParams();

        params.set('city', city);
        return params;
    }
}