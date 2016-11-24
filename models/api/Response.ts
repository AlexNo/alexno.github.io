import City from '../City';

class Response {
    message: string;
    cod: string;
    count: number;
    list: Array<City>;
}

export default Response;