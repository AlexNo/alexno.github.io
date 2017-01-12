import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'weather-header',
    styleUrls: ['./header.css'],
    templateUrl: './header.html'
})
export class HeaderComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        console.log('HeaderComponent initialized!');
    }
}