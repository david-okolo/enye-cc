import { ISearchBarProps } from "./SearchBar/searchbar.interface";
import { MarkerOptions, LatLng } from "../Map/map.interface";

export interface ISearchPanelProps extends ISearchBarProps {
    hospitalsData: Array<any>
    dataIsLoading: boolean
    handlePageChange: (page: number, pageSize: number | undefined) => void | undefined,
    currentPage: number
    handleMarkerIconClick: (location: MarkerOptions) => void
    center: LatLng
    cropped: boolean
}