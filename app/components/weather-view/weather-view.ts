import {Component, OnInit} from '@angular/core';
import WeatherService from "../../services/WeatherService";
import LocationService from "../../services/LocationService";
import Geoposition from "../../../models/Geoposition";
import Coordinates from "../../../models/Coordinates";

@Component({
    selector: 'weather-view',
    styleUrls: ['app/components/weather-view/weather-view.styl'],
    templateUrl: 'app/components/weather-view/weather-view.html'
})
export class WeatherView implements OnInit {

    lat: number;
    lng: number;
    zoom: number = 4;

    constructor(private locationSrv: LocationService) {
    }

    ngOnInit() {
        this.locationSrv.getPosition().then((position: Geoposition) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
        })
    }

    changeMarkerPosition(coords: Coordinates) {
        this.lat = coords.lat;
        this.lng = coords.lon;
    }
}