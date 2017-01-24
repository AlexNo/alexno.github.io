import {Component, OnInit, Input} from '@angular/core';
import Wind from "../../../models/Wind";

@Component({
    selector: 'wind-details',
    template: require('./wind-details.html')
})
export class WindDetails implements OnInit {
    
    @Input() wind: Wind;

    constructor() {
    }

    ngOnInit() {

    }
}