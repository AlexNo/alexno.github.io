import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { WeatherGrid }  from './components/weather-grid';
import { WeatherView }  from './components/weather-view';
import { HeaderComponent }  from './components/header';
import { FooterComponent }  from './components/footer';
import { PaginationComponent }  from './components/pagination';

import { AgmCoreModule } from 'angular2-google-maps/core';

import WeatherService from './services/weather';
import LocationService from "./services/LocationService";
import {TemperaturePipe} from "./pipes/temperature";

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDSZCmwxQOLWJJGK4pmRSjGuleSKPzHQEI'
        })
    ],
    declarations: [
        AppComponent,
        WeatherGrid,
        WeatherView,
        HeaderComponent,
        FooterComponent,
        PaginationComponent,
        TemperaturePipe
    ],
    providers: [
        WeatherService,
        LocationService
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }