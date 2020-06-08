import { Dispatch, SetStateAction } from "react";

export interface LatLng {
    lat: number,
    lng: number
}

export interface MarkerOptions {
    location: LatLng
    color: string
    text: string
}

export interface IMapContainer {
    zoom: number
    center: LatLng
    setCenter: Dispatch<SetStateAction<LatLng>>
    markerLocations: Array<MarkerOptions>
    handleMarkerIconClick: (location: MarkerOptions) => void
}