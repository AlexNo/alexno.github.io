import { NgModule }            from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import WeatherMapComponent from "../map/map.component";
import {WeatherView} from "../weather/components/weather-container/weather-container";
import {PageNotFoundComponent} from "../core/components/page-not-found/page-not-found";

const routes: Routes = [
    {path: 'map', component: WeatherMapComponent},
    {path: 'weather', component: WeatherView},
    {path: '', redirectTo: '/weather', pathMatch: 'full' },
    {path: '**', component: PageNotFoundComponent}
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class RoutingModule { }