import {Pipe, PipeTransform} from '@angular/core';

/**
 * Pipe convert
 */
@Pipe({
    name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {
    private converter: TemperatureConverter = new TemperatureConverter();

    transform(value: number, from: string = 'K', to: string = 'C'): number {
        if (from === to) {
            return value;
        }

        return this.converter[from].get(to)(value);
    }
}

class TemperatureConverter {
    F: Map<string, (value: number) => number> =
        new Map<string, (value: number) => number>();

    C: Map<string, (value: number) => number> =
        new Map<string, (value: number) => number>();

    K: Map<string, (value: number) => number> =
        new Map<string, (value: number) => number>();

    constructor() {
        this.F.set('F', this.notConvert);
        this.F.set('C', this.fromFtoC);
        this.F.set('K', this.fromFtoK);

        this.C.set('F', this.fromCtoF);
        this.C.set('C', this.notConvert);
        this.C.set('K', this.fromCtoK);

        this.K.set('F', this.fromKtoF);
        this.K.set('C', this.fromKtoC);
        this.K.set('K', this.notConvert);
    }

    private notConvert(value: number): number {
        return value;
    }

    private fromFtoC (value: number): number {
        return (value - 32) * 5 / 9;
    }

    private fromFtoK (value: number): number {
        return (value - 32) * 5 / 9 + 273.15;
    }

    private fromCtoF (value: number): number {
        return (value * 9 / 5) + 32;
    }

    private fromCtoK (value: number): number {
        return value + 273.15;
    }

    private fromKtoF (value: number): number {
        return (value - 273.15) * 9 / 5 + 32;
    }

    private fromKtoC (value: number): number {
        return value - 273.15;
    }
}