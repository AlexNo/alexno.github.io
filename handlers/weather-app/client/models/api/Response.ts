import City from '../City';

class WeatherResponse {
    message: string;
    cod: string;
    count: number;
    list: Array<City>;
}

export default WeatherResponse;
