import 'zone.js';
import 'reflect-metadata';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

platformBrowserDynamic().bootstrapModule(AppModule);