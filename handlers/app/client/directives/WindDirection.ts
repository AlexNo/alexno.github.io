import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[windDirection]',
})
export class WindDirection {

    @Input() set windDirection(direction: number) {
        this.el.nativeElement.style.transform = `rotate(${direction}deg)`;
    }
    constructor(private el: ElementRef) {
    }
}