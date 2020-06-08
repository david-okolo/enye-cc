import React, { FunctionComponent } from 'react';
import { Divider, Typography, Skeleton, Row, Col } from 'antd';
import { SearchBar } from './SearchBar/searchBar';
import { ISearchPanelProps } from './searchPanel.interface';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { SearchResults } from './SearchResults/searchResults';

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
                <SearchResults
                    pagination={true}
                    handleMarkerIconClick={handleMarkerIconClick}
                    center={center}
                    handlePageChange={handlePageChange}
                    pageSize={6}
                    hospitalsData={hospitalsData}
                    currentPage={currentPage}
                />
            </Skeleton>}
        </>
    )
}