import { LatLng } from "../../Map/map.interface";
import { DEFAULT_SEARCH_RADIUS, DEFAULT_LAT_LNG } from "./constants";

export const fetchHospitals = async (radius: number = DEFAULT_SEARCH_RADIUS, location: LatLng = DEFAULT_LAT_LNG) => {
    const radiusInMetres = radius * 1000;
    const response = await fetch('http://52.87.235.123/places/hospitals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            radius: radiusInMetres,
            latlng: [location.lat, location.lng]
        })
    });

    const parsedData = await response.json();
    return parsedData;
}