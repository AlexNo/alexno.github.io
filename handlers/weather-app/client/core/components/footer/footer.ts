import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'weather-app-footer',
    // styles: [require('./footer.css')],
    template: require('./footer.html')
})
export class FooterComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
        console.log('FooterComponent initialized!');
    }
}