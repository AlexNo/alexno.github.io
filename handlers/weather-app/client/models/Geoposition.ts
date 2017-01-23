interface Coords {
    latitude: number;
    longitude: number;
}

interface Geoposition {
    timestamp: number;
    coords: Coords
}

export default Geoposition;
