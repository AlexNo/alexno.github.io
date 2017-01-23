import Wind from './Wind';
import Weather from './Weather';
import Temperature from './Temperature';
import System from './System';
import Snow from './Snow';
import Rain from './Rain';
import Coordinates from './Coordinates';
import Clouds from './Clouds';

interface City {
    id: number;
    name: string;
    cod?: number;
    dt: number;
    base?: string;
    wind: Wind;
    weather: Array<Weather>;
    main: Temperature;
    sys: System;
    snow?: Snow;
    rain?: Rain;
    coord: Coordinates;
    clouds: Clouds;
    isFavorite?: boolean;
}

export default City;
