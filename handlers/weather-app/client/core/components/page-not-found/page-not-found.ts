import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'page-not-found',
    // styles: [require('./header.css')],
    template: require('./page-not-found.html')
})
export class PageNotFoundComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        console.log('PageNotFoundComponent initialized!');
    }
}