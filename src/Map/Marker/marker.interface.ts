import { MarkerOptions } from "../map.interface";

export interface IMapMarker {
    title: string
    content: string
    lat: number,
    lng: number,
    text: string,
    color: string
    handleMarkerIconClick: (location: MarkerOptions) => void
}