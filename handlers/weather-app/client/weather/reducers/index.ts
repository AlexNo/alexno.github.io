import {ActionReducer, combineReducers} from "@ngrx/store";
import {compose} from "@ngrx/core/compose";

import * as cityWeatherReducer from './city-weather.reducer';

export interface State {
  cityWeather: cityWeatherReducer.State
}


const reducers = {
  cityWeather: cityWeatherReducer.reducer
};

const developmentReducer: ActionReducer<State> = compose(combineReducers)(reducers);

export function reducer(state: any, action: any) {
  return developmentReducer(state, action);
}