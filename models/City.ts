import Wind from './Wind';
import Weather from './Weather';
import Temperature from './Temperature';
import System from './System';
import Snow from './Snow';
import Rain from './Rain';
import Coordinates from './Coordinates';
import Clouds from './Clouds';

class City {
    id: number;
    name: string;
    cod: number;
    dt: Date;
    base: string;
    wind: Wind;
    weather: Weather;
    main: Temperature;
    sys: System;
    snow: Snow;
    rain: Rain;
    coord: Coordinates;
    clouds: Clouds;

    constructor(name : string) {
        this.name = name;
    }
}

export default City;