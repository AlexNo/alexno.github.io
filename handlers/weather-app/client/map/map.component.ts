import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'weather-map',
    template: require('./map.component.html')
})
export default class WeatherMapComponent implements OnInit {

    @Input() lat: number = 53;
    @Input() lon: number = 27;

    constructor() { }

    ngOnInit(): void {
        console.log('WeatherMapComponent initialized!');
    }
}