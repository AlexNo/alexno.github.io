import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from './core';
import { WeatherMapModule } from './map';
import { WeatherModule } from './weather';

import { AppComponent }  from './app.component';

@NgModule({
    imports:      [
        BrowserModule,
        WeatherMapModule,
        WeatherModule,
        CoreModule.forRoot()
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }