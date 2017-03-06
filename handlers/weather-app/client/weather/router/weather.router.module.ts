import { NgModule }            from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {WeatherView} from "../components/weather-container/weather-container";
import {WeatherDetailComponent} from "../components/weather-details/weather-details";

const routes: Routes = [
    {path: 'weather', component: WeatherView},
    {path: 'weatherDetails/:id', component: WeatherDetailComponent}
];


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class WeatherRoutingModule { }