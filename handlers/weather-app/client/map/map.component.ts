import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'weather-map',
    template: require('./map.component.html')
})
export default class WeatherMapComponent implements OnInit {

    @Input() lat: number;
    @Input() lon: number;

    constructor() { }

    ngOnInit(): void {
        console.log('WeatherMapComponent initialized!');
    }
}