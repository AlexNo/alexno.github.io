import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'weather-footer',
    // styleUrls: ['./footer.css'],
    templateUrl: './footer.html'
})
export class FooterComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
        console.log('FooterComponent initialized!');
    }
}