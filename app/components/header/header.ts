import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'weather-header',
    styleUrls: ['app/components/header/header.styl'],
    templateUrl: 'app/components/header/header.html'
})
export class HeaderComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        console.log('HeaderComponent initialized!');
    }
}