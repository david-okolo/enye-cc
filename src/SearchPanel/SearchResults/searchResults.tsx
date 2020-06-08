import React, { FunctionComponent } from 'react'
import { List } from "antd"
import { EnvironmentFilled } from '@ant-design/icons'
import { getDistance } from 'geolib'
import { ISearchResultsProps } from './searchResults.interface'

export const SearchResults: FunctionComponent<ISearchResultsProps> = (props) => {
    const { 
        currentPage,
        handlePageChange,
        hospitalsData,
        handleMarkerIconClick,
        center,
        pageSize,
        pagination
    } = props;


    return (
        <List
            size='small'
            pagination={pagination && {
                current: currentPage,
                onChange: handlePageChange,
                pageSize: pageSize,
            }}
            dataSource={hospitalsData}
            renderItem={item => (
                <List.Item
                    actions={[
                        <EnvironmentFilled 
                            key='view-on-map'
                            onClick={() => handleMarkerIconClick({
                                location: item.geometry.location,
                                color: 'green',
                                text: 'destination'
                            })}
                            />
                    ]}
                >
                    <List.Item.Meta
                        title={item.name}
                        description={item.formatted_address}
                    />
                    <div>{
                        (getDistance(item.geometry.location, center) / 1000).toFixed(1)
                    }km</div>
                </List.Item>
                )
            }
        >
            
        </List>
    )
}