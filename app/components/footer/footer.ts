import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'weather-footer',
    styleUrls: ['app/components/footer/footer.styl'],
    templateUrl: 'app/components/footer/footer.html'
})
export class FooterComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {
        console.log('FooterComponent initialized!');
    }
}