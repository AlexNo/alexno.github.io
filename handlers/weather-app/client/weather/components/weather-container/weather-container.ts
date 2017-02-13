import {Component, OnInit} from '@angular/core';
import CityShort from "../../../models/CityShort";
import LocationService from "../../../core/services/LocationService";
import Geoposition from "../../../models/Geoposition";
import City from "../../../models/City";
import * as fromRoot from '../../reducers';
import {Store} from "@ngrx/store";
import {Subscription, Observable} from "rxjs";
import * as fromCityWeather from '../../reducers/city-weather.reducer';
import * as CityWeatherAction from "../../actions/city-weather.actions";

@Component({
  selector: 'weather-view',
  // styles: [require('./weather-container.css')],
  template: require('./weather-container.html')
})
export class WeatherView implements OnInit {

  private citiesWeather: Subscription;
  private cities$: Observable<City[]>;
  lat: number;
  lng: number;
  zoom: number = 4;

  nearbyCities: Array<City>;

  constructor(private locationSrv: LocationService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.cities$ = this.store.select((s: fromRoot.State) => s.cityWeather)
      .map((citiesState: fromCityWeather.State): City[] => Object.values(citiesState.entities));
    this.citiesWeather = this.store.select((s: fromRoot.State) => s.cityWeather)
      .subscribe((citiesState: fromCityWeather.State): void => {
        this.nearbyCities = Object.values(citiesState.entities);
      });

    this.locationSrv.getPosition().then((position: Geoposition) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

      this.loadNearbyCities(position);
    });

  }

  selectCity(city: City) {
    // this.nearbyCities = this.nearbyCities.map(elem => {
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

  }

  deleteCity(cityId: number) {
    this.nearbyCities = this.nearbyCities.filter(city => city.id !== cityId);
  }

  private loadNearbyCities(position: Geoposition) {
    this.store.dispatch(new CityWeatherAction.LoadNearbyAction(position));
  }
}