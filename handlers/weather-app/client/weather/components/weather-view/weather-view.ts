import {Component, OnInit} from '@angular/core';
import CityShort from "../../../models/CityShort";
import LocationService from "../../../core/services/LocationService";
import WeatherService from "../../../core/services/WeatherService";
import Geoposition from "../../../models/Geoposition";
import City from "../../../models/City";
import * as fromRoot from '../../reducers';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import * as from from '../../reducers/city-weather.reducer';
import * as CityWeatherAction from "../../actions/city-weather.actions";

@Component({
    selector: 'weather-view',
    // styles: [require('./weather-view.css')],
    template: require('./weather-view.html')
})
export class WeatherView implements OnInit {

    private citiesWeather: Subscription;
    lat: number;
    lng: number;
    zoom: number = 4;

    cities: Array<City>;

    constructor(private locationSrv: LocationService,
                private weather: WeatherService, private store: Store<fromRoot.State>) {
    }

    ngOnInit() {
        this.locationSrv.getPosition().then((position: Geoposition) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
        });

        this.citiesWeather = this.store.select((s: fromRoot.State) => s.cityWeather)
          .subscribe((citiesState: from.State): void => {
            this.cities = Object.values(citiesState.entities);
          });


        this.weather.getNearbyWeather().subscribe(data => {
            this.cities = data;
        });
    }

    selectCity(city: City) {
        // this.cities = this.cities.map(elem => {
        //     if (elem.isFavorite) {
        //         elem.isFavorite = false;
        //     }
        //     if (elem.id === city.id) {
        //         elem.isFavorite = true;
        //     }
        //     return elem;
        // });
        //
        // this.lat = city.coord.lat;
        // this.lng = city.coord.lon;
        this.store.dispatch(new CityWeatherAction.LoadAction(null));

    }

    deleteCity(cityId: number) {
        this.cities = this.cities.filter(city => city.id !== cityId);
    }
}