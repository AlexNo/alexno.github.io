import {Injectable}    from '@angular/core';
import {Http, URLSearchParams, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import City from "../../models/City";
import Geoposition from "../../models/Geoposition";

import {CITIES} from '../../fixtures/mock'
import LocationService from "./LocationService";
import {Observable} from "rxjs";

@Injectable()
export default class WeatherService {

    private weatherApiUrl: string = 'http://api.openweathermap.org/data/2.5/find';
    private weatherApiCityUrl: string = 'http://api.openweathermap.org/data/2.5/weather';
    private weatherAPIKey: string = '5d574c9fb3fecaa51a57b854b66a6c48';
    private countCities: number = 50;

    constructor(private http: Http, private locationSrv: LocationService) {
    };

    getWeather(): Promise<City[]> {
        console.log('Load weather data');
        let weatherPromise = this.paramsForCollectionOfCities();

        // if (NODE_ENV !== 'dev') {
        //     weatherPromise.then((params:URLSearchParams) => {
        //         console.log('Request params', params);
        //         console.log('weatherApiUrl', this.weatherApiUrl);
        //         return this.http.get(this.weatherApiUrl, {
        //             search: params
        //         }).toPromise()
        //     })
        //         .then((response:Response) => {
        //             console.log('Response', response.json());
        //             return response.json().data as City[];
        //         })
        // }

        return weatherPromise.then(() => CITIES)
            .catch(err => console.error('Error', err));
    }

    getCityWeather(cityName: string): Promise<City> {

        // this.http.get('http://api.openweathermap.org/data/2.5/weather?APPID=5d574c9fb3fecaa51a57b854b66a6c48&q=Atolina').map((res: Response) => {
        //     res.json();
        // });
        return fetch(`${this.weatherApiCityUrl}?APPID=${this.weatherAPIKey}&q=${cityName}`)
            .then(r => {
                let data = r.json();
                return data;
            });
        // return this.http.get(this.weatherApiCityUrl, {
        //     search: this.paramsForCity(cityName)
        // }).toPromise().then(r => {
        //     return r.json();
        // });
    }

    private paramsForCollectionOfCities(): Promise<URLSearchParams> {
        let params = new URLSearchParams();

        this.addAuthID(params);
        params.set('cnt', String(this.countCities));

        return this.locationSrv.getPosition().then((position: Geoposition) => {
            params.set('lat', String(position.coords.latitude));
            params.set('lon', String(position.coords.longitude));

            return params;
        });
    }

    private paramsForCity(city: string): URLSearchParams {
        let params = new URLSearchParams();
        this.addAuthID(params);

        params.set('q', city);

        return params;
    }

    private addAuthID(params: URLSearchParams): URLSearchParams {
        params.set('APPID', this.weatherAPIKey);

        return params;
    }
}