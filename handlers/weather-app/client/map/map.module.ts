import { NgModule }            from '@angular/core';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { CommonModule } from '@angular/common';

import WeatherMapComponent from './map.component';

import {ENV_CONFIG, APP_CONFIG} from './config';

@NgModule({
    imports: [
        CommonModule,
        AgmCoreModule.forRoot({
            apiKey: ENV_CONFIG.mapsAPI
        }),
    ],
    declarations: [
        WeatherMapComponent
    ],
    providers: [
        {provide: APP_CONFIG, useValue: ENV_CONFIG}
    ],
    exports: [
        WeatherMapComponent
    ],
})
export class WeatherMapModule { }