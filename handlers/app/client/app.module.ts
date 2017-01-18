import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent }  from './app.component';
import { WeatherGrid }  from './components/weather-grid';
import { WeatherView }  from './components/weather-view';
import { CityWeatherSearchComponent }  from './components/city-weather-search';
import { CityWeatherDetailComponent }  from './components/city-weather-detail';
import { HeaderComponent }  from './components/header';
import { FooterComponent }  from './components/footer';
import { PaginationComponent }  from './components/pagination';
import { WindDetails } from "./components/wind-details/wind-details";

import { WindDirection }  from './directives/WindDirection';

import {ENV_CONFIG, APP_CONFIG} from './config';

import WeatherService from './services/WeatherService';
import LocationService from './services/LocationService';
import {TemperaturePipe} from './pipes/TemperaturePipe';
import {CityWeatherPipe} from './pipes/CityWeatherPipes';

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: ENV_CONFIG.mapsAPI
        })
    ],
    declarations: [
        AppComponent,
        WeatherGrid,
        WeatherView,
        WindDetails,
        CityWeatherSearchComponent,
        CityWeatherDetailComponent,
        HeaderComponent,
        FooterComponent,
        PaginationComponent,
        TemperaturePipe,
        CityWeatherPipe,
        WindDirection
    ],
    providers: [
        WeatherService,
        LocationService,
        {provide: APP_CONFIG, useValue: ENV_CONFIG}
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }