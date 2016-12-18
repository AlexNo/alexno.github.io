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

import WeatherService from './services/WeatherService';
import LocationService from "./services/LocationService";
import {TemperaturePipe} from "./pipes/TemperaturePipe";
import {CityWeatherPipe, WeatherFormatterPipe} from "./pipes/CityWeatherPipes";

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDSZCmwxQOLWJJGK4pmRSjGuleSKPzHQEI'
        })
    ],
    declarations: [
        AppComponent,
        WeatherGrid,
        WeatherView,
        CityWeatherSearchComponent,
        CityWeatherDetailComponent,
        HeaderComponent,
        FooterComponent,
        PaginationComponent,
        TemperaturePipe,
        CityWeatherPipe,
        WeatherFormatterPipe
    ],
    providers: [
        WeatherService,
        LocationService
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }