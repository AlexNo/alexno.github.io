import * as CityWeatherActions from '../actions/city-weather.actions';
import City from "../../models/City";
// import {IState, IReducer} from "./reducer";
import {Action} from "@ngrx/store";


export interface State {
  ids: number[],
  entities: {[id: number]: City},
  selectedCity: number | null
}


const initialState: State = {
  ids: [],
  entities: {},
  selectedCity: null
};

export function reducer(state = initialState, action: CityWeatherActions.Actions): State {
  switch (action.type) {
    case CityWeatherActions.ActionTypes.SELECT: {
      const payload: City = <City>action.payload;

      return Object.assign({}, state, {selectedCity: payload.id});
    }
    case CityWeatherActions.ActionTypes.LOAD: {
      const cities: City[] = <City[]>action.payload;
      const citiesIds = cities.map(city => city.id);

      return {
        ids: citiesIds,
        entities: cities,
        selectedCity: state.selectedCity
      };
    }
    default: {
      return state;
    }
  }
}

// export class CityWeatherReducer implements IReducer {
//
//   reducer(state: CityWeatherState, action: CityWeatherActions.Actions): CityWeatherState {
//     switch (action.type) {
//       case CityWeatherActions.ActionTypes.SELECT: {
//         const payload: City = <City>action.payload;
//
//         return Object.assign({}, state, {selectedCity: payload.id});
//       }
//       case CityWeatherActions.ActionTypes.LOAD: {
//         const cities: City[] = <City[]>action.payload;
//         const citiesIds = cities.map(city => city.id);
//
//         return {
//           ids: citiesIds,
//           entities: cities,
//           selectedCity: state.selectedCity
//         };
//       }
//       default: {
//         return state;
//       }
//     }
//   }
// }