import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import WeatherService from "../../core/services/WeatherService";
import * as CityWeatherActions from '../actions/city-weather.actions';
import {Observable} from "rxjs";
import Geoposition from "../../models/Geoposition";


@Injectable()
export class CityWeatherEffect {
  constructor(private actions$: Actions, private cityWeatherService: WeatherService) {
  }

  /**
   *
   */
  @Effect()
  loadNearbyCitiesWeather$ = this.actions$.ofType(CityWeatherActions.ActionTypes.LOAD_NEARBY)
    .map(action => action.payload)
    .switchMap((position: Geoposition) => this.cityWeatherService.weatherForNearbyCities(position)
      .map(res => {
        return new CityWeatherActions.LoadNearbySuccessAction(res);
      }))
      .catch(() => Observable.of(new CityWeatherActions.LoadNearbySuccessAction([])));


  @Effect()
  loadCityWeather$ = this.actions$.ofType(CityWeatherActions.ActionTypes.LOAD_CITY_WEATHER)
    .map(action => action.payload)
    .switchMap((cityName: string) => this.cityWeatherService.weatherForCity(cityName)
      .map(res => {
        return new CityWeatherActions.LoadSuccessAction(res, 'searchResult');
      }))
    .catch(() => Observable.of(new CityWeatherActions.LoadSuccessAction(null, null)));

    @Effect()
    loadCityWeatherById$ = this.actions$.ofType(CityWeatherActions.ActionTypes.LOAD_CITY_WEATHER_BY_ID)
        .map(action => action.payload)
        .switchMap((id: number) => this.cityWeatherService.weatherForCityById(id)
            .map(res => {
                return new CityWeatherActions.LoadSuccessAction(res, 'current');
            }))
        .catch(() => Observable.of(new CityWeatherActions.LoadSuccessAction(null, null)));
}

