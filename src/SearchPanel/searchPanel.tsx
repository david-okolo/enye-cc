import React, { FunctionComponent } from 'react';
import { List, Divider, Typography, Skeleton, Row, Col } from 'antd';
import { SearchBar } from './SearchBar/searchBar';
import { ISearchPanelProps } from './searchPanel.interface';
import { EnvironmentFilled} from '@ant-design/icons';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { getDistance } from 'geolib'

const { Text } = Typography;

export const SearchPanel: FunctionComponent<ISearchPanelProps> = (props) => {

    const { cropped, center, hospitalsData, dataIsLoading, currentPage, handlePageChange, handleMarkerIconClick, ...searchBarProps } = props;
    const customSearchText = `Showing hospitals ${searchBarProps.query ? `matching '${searchBarProps.query}'` : ''} within ${searchBarProps.searchRadius}KM of you`;

    return (
        <>
            <SearchBar {...searchBarProps}/>
            <Divider></Divider>
            {cropped && <Row justify='space-between'>
                <Col>
                    <Text strong>{customSearchText}</Text>
                </Col>
                <Col>
                    <FaMapMarkedAlt style={{
                        fontSize: '28px',
                        color: '#08979c'
                    }}/>
                </Col>
            </Row>}
            {cropped && <Skeleton 
                loading={dataIsLoading}
                active
            >
                <Divider></Divider>
                <List
                    size='large'
                    pagination={{
                        current: currentPage,
                        onChange: handlePageChange,
                        pageSize: 6,
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
            </Skeleton>}
        </>
    )
}