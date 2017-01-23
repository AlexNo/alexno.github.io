import { Injectable }    from '@angular/core';
import Geoposition from "../../models/Geoposition";

@Injectable()
export default class LocationService {

    constructor () {};

    getPosition(): Promise<Geoposition> {
        return new Promise<Geoposition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((pos: Geoposition) => {
                resolve(pos);
            });
        })
    }
}
