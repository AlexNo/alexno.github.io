import Request from '../models/api/Request';
import Geoposition from '../models/Geoposition'
import config from '../config';

class WeatherAPI {

    private apiURL: string = config.weatherAPI;

    private buildRequest(params: Request): string {
        let url = `${this.apiURL}?`;

        url = Object.keys(params).reduce((url, key) => {
            return `${url}${key}=${params[key]}&`;
        }, url);
        return url;
    }

    private getPosition(): Promise<Geoposition> {
        return new Promise<Geoposition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((pos: Geoposition) => {
                resolve(pos);
            });
        })
    }

    fetch() {
        let params = new Request();

        params.APPID = config.weatherAPIKey;
        params.cnt = config.countCities;

        return this.getPosition().then((position: Geoposition) => {
            params.lat = position.coords.latitude;
            params.lon = position.coords.longitude;
            return fetch(this.buildRequest(params));
        }).then(response => {
            return response.json();
        });
    }
}

export default WeatherAPI;