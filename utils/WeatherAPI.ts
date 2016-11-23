import Request from '../models/api/Request';
import Geoposition from '../models/Geoposition'
import config from '../config';

class WeatherAPI {

    private apiURL: string = config.weatherAPI;

    private buildRequest(params: Request) {
        var url = this.apiURL.concat('?');

        Object.keys(params).forEach(key => url = url.concat(`${key}=${params[key]}&`));
        return url;
    }
    
    private getPosition() {
        return new Promise((resolve: any, reject: any) => {
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
            console.log(this.buildRequest(params));
            return fetch(this.buildRequest(params));
        });
    }
}

export default WeatherAPI;