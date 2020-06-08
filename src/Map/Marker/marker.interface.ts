import { MarkerOptions } from "../map.interface";

export interface IMapMarker {
    lat: number,
    lng: number,
    text: string,
    color: string
    handleMarkerIconClick: (location: MarkerOptions) => void
}