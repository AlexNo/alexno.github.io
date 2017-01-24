import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'weather-app-header',
    // styles: [require('./header.css')],
    template: require('./header.html')
})
export class HeaderComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        console.log('HeaderComponent initialized!');
        console.log('HeaderComponent initialized!');
    }
}