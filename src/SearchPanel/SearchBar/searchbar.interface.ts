import { SliderValue, SliderMarks } from "antd/lib/slider";
import { ChangeEvent } from "react";

export interface ISearchBarProps {
    handleSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleSearchRadiusChange: (value: SliderValue) => void
    marks: SliderMarks
    searchRadius: number
    query: string
}

