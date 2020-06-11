import { LatLng } from "../../Map/map.interface";
import { DEFAULT_SEARCH_RADIUS, DEFAULT_LAT_LNG, DEFAULT_QUERY, backendUrl } from "./constants";

export const fetchHospitals = async (
    radius: number = DEFAULT_SEARCH_RADIUS, 
    location: LatLng = DEFAULT_LAT_LNG,
    query: string = DEFAULT_QUERY,
    isLoggedIn: boolean
) => {
    const radiusInMetres = radius * 1000;
    const response = await fetch(backendUrl+'/places'+(!isLoggedIn ? '/free' : ''), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
        body: JSON.stringify({
            query: query,
            radius: radiusInMetres,
            latlng: [location.lat, location.lng]
        })
    });

    const parsedData = await response.json();
    console.log(parsedData)
    return parsedData;
}