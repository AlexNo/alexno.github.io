import {OpaqueToken} from "@angular/core";

interface AppConfig {
    mapsAPI: string,
    weatherAPI: string
}

export const ENV_CONFIG: AppConfig = {
    mapsAPI: 'AIzaSyDSZCmwxQOLWJJGK4pmRSjGuleSKPzHQEI',
    weatherAPI: '5d574c9fb3fecaa51a57b854b66a6c48'
};

export const APP_CONFIG = new OpaqueToken('config');
