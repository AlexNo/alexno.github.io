import Wind from './Wind';
import Coordinates from './Coordinates';

interface CityShort {
    id: number;
    name: string;
    dt: number;
    wind: Wind;
    temperature: number;
    coord: Coordinates;
    clouds: number;
    isFavorite?: boolean;
}
export default CityShort;