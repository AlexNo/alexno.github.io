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

    constructor(private http: Http) {};

    weatherForNearbyCities(position: Geoposition): Observable<City[]> {
        let params = this.paramsForCollectionOfCities(position);

        return this.http.get(this.weatherApi, {
            search: params
        })
          .map(this.extractData)
          .map(this.getList);
        // .map(this.toCityShort);
    }

    weatherForCity(cityName: string): Observable<City> {
        return this.http.get(this.cityApi, {
            search: this.paramsForCity(cityName, 'q')
        }).map((r: Response): City => {
            return r.json() as City;
        });
    }

    weatherForCityById(id: number): Observable<City> {
        return this.http.get(this.cityApi, {
            search: this.paramsForCity(String(id), 'id')
        }).map((r: Response): City => {
            return r.json() as City;
        });
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

    private paramsForCollectionOfCities(position: Geoposition): URLSearchParams {
        let params = new URLSearchParams();

        params.set('lat', String(position.coords.latitude));
        params.set('lon', String(position.coords.longitude));

        return params;
    }

    private paramsForCity(param: string, field: string): URLSearchParams {
        let params = new URLSearchParams();

        params.set(field, param);
        return params;
    }
}