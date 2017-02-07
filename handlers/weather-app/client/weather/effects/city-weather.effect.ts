import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import WeatherService from "../../core/services/WeatherService";
import * as CityWeatherActions from '../actions/city-weather.actions';
import {Observable} from "rxjs";


@Injectable()
export class CityWeatherEffect {
  constructor(private actions$: Actions, private cityWeatherService: WeatherService) {
  }

  @Effect() loadCitiesWeather = this.actions$.ofType(CityWeatherActions.ActionTypes.LOAD)
    .map(action => {
      return action.payload;
    })
    .switchMap(() => this.cityWeatherService.getNearbyWeather()
      .map(res => {
        return new CityWeatherActions.LoadSuccessAction(res);
      }))
      .catch(() => Observable.of(new CityWeatherActions.LoadSuccessAction([])));
}

