import { Injectable }    from '@angular/core';
import Geoposition from "../../models/Geoposition";

@Injectable()
export default class LocationService {

    private cache: Geoposition;

    constructor () {};

    getPosition(): Promise<Geoposition> {
        return new Promise<Geoposition>((resolve, reject) => {
            if (!this.cache) {
                navigator.geolocation.getCurrentPosition((pos: Geoposition) => {
                    this.cache = pos;
                    resolve(pos);
                });
            } else {
                resolve(this.cache);
            }
        })
    }
}
