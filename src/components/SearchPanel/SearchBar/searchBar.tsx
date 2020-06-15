import React, { FunctionComponent } from 'react';
import { Slider, Input, AutoComplete } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { ISearchBarProps } from './searchbar.interface';

const { Search } = Input;

export const SearchBar: FunctionComponent<ISearchBarProps> = (props) => {
    return (
        <>
            <AutoComplete
                options={props.options}
                onSearch={props.onSearch}
                onSelect={props.onSelect}
                onChange={props.handleSearchInputChange} 
                value={props.query}
                style={{
                    width: '100%',
                    marginBottom: '10px',
                }}
            >
                <Search
                    placeholder=' search by keyword...'
                    size="large"
                    enterButton
                    prefix={<EnvironmentOutlined/>} 
                ></Search>
            </AutoComplete>
            <Slider 
                min={0} 
                max={50} 
                marks={props.marks} 
                step={5} 
                range={false}
                tipFormatter={null}
                onChange={props.handleSearchRadiusChange} 
                value={props.searchRadius}
            />
        </>
    )
}