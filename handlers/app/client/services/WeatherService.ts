import {Injectable}    from '@angular/core';
import {Http, URLSearchParams, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/flatMap';
import 'rxjs/add/operator/map';

import City from "../models/City";
import Geoposition from "../models/Geoposition";

import LocationService from "./LocationService";
import {Observable} from "rxjs";
import WeatherResponse from "../models/api/Response";

@Injectable()
export default class WeatherService {

    private weatherApi: string = 'http://localhost:3000/api/weather';
    private cityApi: string = 'http://localhost:3000/api/city';

    constructor(private http: Http, private locationSrv: LocationService) {
    };

    getNearbyWeather(): Observable<City[]> {
        let weatherPromise = this.paramsForCollectionOfCities();

        return Observable.from(weatherPromise)
            .flatMap(data => {
                return this.getWeather(data)
            })
    }

    private getWeather(params:URLSearchParams): Observable<City[]> {
        return this.http.get(this.weatherApi, {
            search: params
        })
            .map(this.extractData);
    }

    getCityWeather(cityName: string): Observable<City> {

        return this.http.get(this.cityApi, {
            search: this.paramsForCity(cityName)
        }).map((r: Response): City => {
            let city: City = r.json() as City;
            return city;
        });
    }

    private extractData(res: Response): City[] {
        let body = res.json() as WeatherResponse;
        if (body && body.list) {
            return body.list;
        }
        return [];
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