import { Action } from '@ngrx/store';
import City from "../../models/City";

export const ActionTypes = {
    SELECT: '[CityWeather] Select',
    LOAD: '[CityWeather] Load',
    SEARCH: '[CityWeather] Search',
};

export class SelectAction implements Action {
    type = ActionTypes.SELECT;

    constructor (public payload: City) {}
}

export class LoadAction implements Action {
    type = ActionTypes.LOAD;

    constructor (public payload: City[]) {}
}

export class SearchAction implements Action {
    type = ActionTypes.SEARCH;

    constructor (public payload: City) {}
}

export type Actions
    = SearchAction
    | LoadAction
    | SelectAction;