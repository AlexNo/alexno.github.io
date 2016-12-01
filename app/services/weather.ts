import {Injectable}    from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import City from "../../models/City";
import Geoposition from "../../models/Geoposition";

import {CITIES} from '../../fixtures/mock'
import LocationService from "./LocationService";
import Response from "../../models/api/Response";

@Injectable()
export default class WeatherService {

    private weatherApiUrl: string = 'http://api.openweathermap.org/data/2.5/find';
    private weatherAPIKey: string = '5d574c9fb3fecaa51a57b854b66a6c48';
    private countCities: number = 50;

    constructor(private http: Http, private locationSrv: LocationService) {
    };

    getWeather(): Promise<City[]> {
        console.log('Load weather data');
        let weatherPromise = this.buildRequestParams();

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

    private buildRequestParams(): Promise<URLSearchParams> {
        let params = new URLSearchParams();
        params.set('APPID', this.weatherAPIKey);
        params.set('cnt', String(this.countCities));

        return this.locationSrv.getPosition().then((position: Geoposition) => {
            params.set('lat', String(position.coords.latitude));
            params.set('lon', String(position.coords.longitude));

            return params;
        });
    }
}