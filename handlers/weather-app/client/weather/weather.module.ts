import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';

import { WeatherGrid }  from './components/weather-grid';
import { WeatherView }  from './components/weather-view';
import { CityWeatherSearchComponent }  from './components/city-weather-search';
import { CityWeatherDetailComponent }  from './components/city-weather-detail';

import { PaginationComponent }  from './components/pagination';
import { WindDetails } from "./components/wind-details/wind-details";

import { WindDirection }  from './directives/WindDirection';
import { HeatMap } from "./directives/HeatMap";

import { TemperaturePipe } from './pipes/TemperaturePipe';
import { CityWeatherPipe } from './pipes/CityWeatherPipes';

@NgModule({
    imports:      [
        CommonModule,
        SharedModule
    ],
    declarations: [
        WeatherGrid,
        WeatherView,
        WindDetails,
        CityWeatherSearchComponent,
        CityWeatherDetailComponent,
        PaginationComponent,
        TemperaturePipe,
        CityWeatherPipe,
        WindDirection,
        HeatMap
    ],
    exports:      [
        WeatherView
    ],
    providers:    [
    ]
})
export class WeatherModule {}