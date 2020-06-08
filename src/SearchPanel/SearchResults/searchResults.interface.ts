import { LatLngLiteral } from "@googlemaps/google-maps-services-js";
import { MarkerOptions } from "../../Map/map.interface";

export interface ISearchResultsProps {
    hospitalsData: Array<any>
    handlePageChange: (page: number, pageSize: number | undefined) => void | undefined,
    currentPage: number
    handleMarkerIconClick: (location: MarkerOptions) => void
    center: LatLngLiteral
    pageSize: number
    pagination: boolean
}