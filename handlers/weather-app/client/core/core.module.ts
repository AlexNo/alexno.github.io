import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { RoutingModule } from "../router";

import { HeaderComponent }  from './components/header';
import { FooterComponent }  from './components/footer';
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found";

import WeatherService from './services/WeatherService';
import LocationService from './services/LocationService';

@NgModule({
    imports:      [
        CommonModule,
        SharedModule,
        RoutingModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        PageNotFoundComponent
    ],
    exports:      [
        HeaderComponent,
        FooterComponent,
        PageNotFoundComponent,
        RoutingModule
    ],
    providers:    [
        WeatherService,
        LocationService
    ]
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: []
        };
    }
}