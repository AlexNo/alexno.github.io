import {Action} from '@ngrx/store';
import City from "../../models/City";
import Geoposition from "../../models/Geoposition";

export const ActionTypes = {
  SELECT: '[CityWeather] Select',
  LOAD_CITY_WEATHER: '[CityWeather] Load',
  LOAD_CITY_WEATHER_BY_ID: '[CityWeather] Load by ID',
  LOAD_CITY_SUCCESS: '[CityWeather] LoadSuccess',
  LOAD_NEARBY: '[CityWeather] LoadNearbyCities',
  LOAD_NEARBY_SUCCESS: '[CityWeather] LoadNearbySuccess',
  SEARCH: '[CityWeather] Search',
};

export class SelectAction implements Action {
  type = ActionTypes.SELECT;

  constructor(public payload: City) {
  }
}

export class LoadAction implements Action {
  type = ActionTypes.LOAD_CITY_WEATHER;

  constructor(public payload: string) {
  }
}

export class LoadByIdAction implements Action {
  type = ActionTypes.LOAD_CITY_WEATHER_BY_ID;

  constructor(public payload: number) {
  }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_CITY_SUCCESS;

  constructor(public payload: City, public result: string) {
  }
}

export class LoadNearbyAction implements Action {
  type = ActionTypes.LOAD_NEARBY;

  constructor(public payload: Geoposition) {
  }
}

export class LoadNearbySuccessAction implements Action {
  type = ActionTypes.LOAD_NEARBY_SUCCESS;

  constructor(public payload: City[]) {
  }
}

export class SearchAction implements Action {
  type = ActionTypes.SEARCH;

  constructor(public payload: City) {
  }
}

export type Actions
  = SearchAction
  | LoadNearbyAction
  | LoadNearbySuccessAction
  | LoadAction
  | LoadByIdAction
  | LoadSuccessAction
  | SelectAction;