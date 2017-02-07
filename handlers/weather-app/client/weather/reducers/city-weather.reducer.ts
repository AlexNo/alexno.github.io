import * as CityWeatherActions from '../actions/city-weather.actions';
import City from "../../models/City";
// import {IState, IReducer} from "./reducer";
import {Action} from "@ngrx/store";


export interface State {
  ids: number[],
  entities: {[id: number]: City},
  searchResult: City,
  selectedCity: number | null
}


const initialState: State = {
  ids: [],
  entities: {},
  searchResult: null,
  selectedCity: null
};

export function reducer(state = initialState, action: CityWeatherActions.Actions): State {
  switch (action.type) {
    case CityWeatherActions.ActionTypes.SELECT: {
      const payload: City = <City>action.payload;

      return Object.assign({}, state, {selectedCity: payload.id});
    }

    case CityWeatherActions.ActionTypes.LOAD_NEARBY_SUCCESS: {
      const entities: City[] = <City[]>action.payload;
      const ids = entities.map(city => city.id);

      return Object.assign({}, state, {ids, entities});
    }

    case CityWeatherActions.ActionTypes.LOAD_CITY_SUCCESS: {
      const searchResult: City = <City>action.payload;

      return Object.assign({}, state, {searchResult});
    }

    case CityWeatherActions.ActionTypes.LOAD_CITY_WEATHER:
    case CityWeatherActions.ActionTypes.LOAD_NEARBY:
    default: {
      return state;
    }
  }
}
