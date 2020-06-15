import { SliderValue, SliderMarks } from "antd/lib/slider";

export interface ISearchBarProps {
    handleSearchInputChange: (value: string) => void
    handleSearchRadiusChange: (value: SliderValue) => void
    marks: SliderMarks
    searchRadius: number
    query: string
    options: any[]
    onSearch: (value: string) => void
    onSelect: (value:string, option: any) => void
}

