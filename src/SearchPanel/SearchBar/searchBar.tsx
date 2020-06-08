import React, { FunctionComponent } from 'react';
import { Slider, Input } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { ISearchBarProps } from './searchbar.interface';

const { Search } = Input;

export const SearchBar: FunctionComponent<ISearchBarProps> = (props) => {
    return (
        <>
            <Search
                enterButton
                placeholder=' search by name...'
                prefix={<EnvironmentOutlined/>} 
                size='large' 
                onChange={props.handleSearchInputChange} 
                value={props.query}
                style={{
                    marginBottom: '10px',
                }}
            />
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