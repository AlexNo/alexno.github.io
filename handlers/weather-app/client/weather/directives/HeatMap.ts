import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[heatMap]',
})
export class HeatMap {

    private hotLimit: number = 303;
    private coldLimit: number = 243;
    private hotColor: number = 0;
    private coldColor: number = 240;

    @Input() set heatMap(temperature: number) {
        this.el.nativeElement.style.backgroundColor =
            `hsl(${this.heatMapColor(temperature)}, 100%, 50%)`;
    }
    constructor(private el: ElementRef) {
    }

    private heatMapColor (temperature: number): number {
        let heap: number;
        if (temperature < this.coldLimit) {
            heap = this.coldColor;
        } else if (temperature > this.hotLimit) {
            heap = this.hotColor;
        } else {
            heap = (temperature - this.coldLimit) / (this.hotLimit - this.coldLimit) * 240;
        }
        return heap;
}
}
