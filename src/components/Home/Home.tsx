// 3rd Party
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Place } from '@googlemaps/google-maps-services-js'
import { Row, Col, Grid, Drawer, List } from 'antd';
import { useLazyQuery } from '@apollo/react-hooks';
import { RightCircleOutlined } from '@ant-design/icons';

// internal
import { MapContainer } from '../Map/map';
import { SearchPanel } from '../SearchPanel/searchPanel';
import { DEFAULT_LAT_LNG, marks, PartialUserMapIcon, DEFAULT_OPTIONS, DEFAULT_MAP_ZOOM, DEFAULT_SEARCH_RADIUS } from '../../utils/constants';
import { MarkerOptions } from '../Map/map.interface';
import { SearchResults } from '../SearchPanel/SearchResults/searchResults';
import { PastSearch } from '../../utils/interface';
import { useAuth0 } from '../../react-auth0-spa';
import { placesQuery } from '../../utils/graphql/schemas';
import { filterOptionsData, radiusToZoom } from '../../utils/helpers';
import { IHomeProps } from './home.interface';

const { useBreakpoint } = Grid;

export const Home: FunctionComponent<IHomeProps> = (props) => {

    // initialize states
    const [ pastClicked, setPastClicked ] = useState(false);
    const [ pastSearches, setPastSearches] = useState<PastSearch[]>([]);
    const [searchRadius, setSearchRadius] = useState(DEFAULT_SEARCH_RADIUS); 
    const [query, setQuery] = useState('');
    const [value, setValue] = useState('');
    const [ hospitalsData, setHospitalsData ] = useState<Partial<Place[]>>([]);
    const [center, setCenter] = useState(DEFAULT_LAT_LNG);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ mapMarkers, setMapMarkers ] = useState<MarkerOptions[]>([])
    const [ mapZoom, setMapZoom ] = useState(DEFAULT_MAP_ZOOM); // sets the zoom level of the map. defaults to zoom 13
    const [ drawerIsOpen, setDrawerIsOpen ] = useState(false); // manages the state of the drawer used to display results on smaller screens
    const [ options, setOptions ] = useState(DEFAULT_OPTIONS); // holds current search bar options

    const { xl } = useBreakpoint();

    const { user } = useAuth0(); // get user from auth0;

    const [ getPlaces, { loading, data }] = useLazyQuery(placesQuery);


    /**
     *  Places data are fetched from this useEffect hook. It watches the change in search radius, query or location to trigger a new search
     */
    useEffect(() => {

        if((center.lat !== DEFAULT_LAT_LNG.lat && center.lng !== DEFAULT_LAT_LNG.lng) && query !== '') {

            // GraphQL api query
            getPlaces({
                variables: {
                    sub: user.sub,
                    query,
                    radius: searchRadius * 1000,
                    latlng: center
                }
            });

            
            if(data) {
                const places = data.places;
                setHospitalsData(places)
        
                // create markers for the map
                const markers = places.map((item: any) => {
                    return {
                        content: item.formatted_address,
                        title: item.name,
                        color: 'white',
                        text: item.id,
                        location: item.geometry.location
                    }
                });
        
                setMapMarkers([...markers, {
                    ...PartialUserMapIcon,
                    location: center
                }]);

                let pastSearchArray = props.pastSearches;

                if( !pastClicked ) {
                    pastSearchArray = [ ...props.pastSearches, {
                        keyword: query,
                        radius: searchRadius * 1000,
                        timestamp:  Date.now()
                    }]
                }

                setPastSearches(pastSearchArray)

                setPastClicked(false)
            }
        }

    }, [searchRadius, query, center, data])

    // get current location once
    useEffect(() => {
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCenter({
                    lat: latitude,
                    lng: longitude
                })
                setMapMarkers([
                    { 
                        ...PartialUserMapIcon,
                        location: {
                            lat: latitude,
                            lng: longitude
                        }
                    }
                ]);
            })
        }
    }, []);


    // Event Handlers
    const handleSearchInputChange = async (value: string) => {
        setValue(value)
        setOptions(filterOptionsData(DEFAULT_OPTIONS, value))
    }

    const handleSearchRadiusChange = (value: number | [number, number]) => {
        setCurrentPage(1); // reset current page because the data has been changed
        setSearchRadius(Array.isArray(value) ? value[0] : value)

        const realValue: number = typeof value === 'number' ? value : value[0];
        const zoom = radiusToZoom(realValue);
        
        setMapZoom(zoom);
    }

    const handlePageChange = (page: number, pageSIze: number | undefined) => {
        setCurrentPage(page)
    }

    const handleMarkerIconClick = (location: MarkerOptions) => {
        setMapMarkers([{
            ...PartialUserMapIcon,
            location: center
        }, location])

        if(xl) {
            setDrawerIsOpen(false);
        } else {
            setQuery(location.title)
            setDrawerIsOpen(true)
        }
    }

    const handleSearch = (value: string) => {
        setCurrentPage(1);  // reset current page because the data has been filtered
    }

    // Handler for selecting an option on the search bar
    const handleOptionSelect = (value: string, option: any) => {
        setQuery(value);
        setDrawerIsOpen(true);
    }

    

    // render
    const columnSpan = xl ? 12 : 24; // if the screen size is xl split into 2 columns if not take full page

    return <Row style={{
        display: 'flex',
        flexFlow: xl ? 'row' : 'column',
        height: '100vh',
        alignItems: 'stretch'
    }}>
        {
            <Drawer
                title="Results"
                placement="left"
                width={xl ? 500 : 300}
                onClose={() => {
                    props.setPastSearchVisible(false)
                }}
                visible={props.pastSearchVisible}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={pastSearches.length > 0 ? pastSearches : props.pastSearches}
                    renderItem={item => (
                    <List.Item
                        actions={[
                            <RightCircleOutlined
                                onClick={() => {
                                    setPastClicked(true)
                                    handleSearchInputChange(item.keyword)
                                    handleSearchRadiusChange(item.radius / 1000)
                                    handleOptionSelect(item.keyword, {})
                                    props.setPastSearchVisible(false);
                                }}
                                style={{
                                    fontSize: '30px'
                                }}
                            ></RightCircleOutlined>
                        ]}
                    >
                        <List.Item.Meta
                            title={
                                <div>
                                    <h3
                                        style={{
                                            fontWeight: "bolder"
                                        }}
                                    >{item.keyword}</h3> 
                                    within {item.radius / 1000}KM
                                </div>
                            }
                            description={new Date(Number(item.timestamp)).toLocaleString()}
                        />
                    </List.Item>
                    )}
                />
            </Drawer>
        }
        <Col span={columnSpan} style={{
            padding: '24px 24px 0 24px',
            backgroundColor: '#ffffff',
            flex: (xl) ? '0 0 100%' :'none'
        }}>
            <SearchPanel
                cropped={!!xl}
                handleMarkerIconClick={handleMarkerIconClick}
                handleSearchInputChange={handleSearchInputChange}
                handleSearchRadiusChange={handleSearchRadiusChange}
                handlePageChange={handlePageChange}
                marks={marks}
                hospitalsData={hospitalsData}
                searchRadius={searchRadius}
                query={value}
                dataIsLoading={loading}
                currentPage={currentPage}
                center={center}
                onSearch={handleSearch}
                onSelect={handleOptionSelect}
                options={options}
            />
        </Col>
        <Col span={columnSpan} style={{
            backgroundColor: '#eeeeee',
            display: 'flex',
            flex: 1,
            overflow: 'auto'
        }}>
            <MapContainer
                handleMarkerIconClick={handleMarkerIconClick}
                center={center}
                setCenter={setCenter}
                zoom={mapZoom}
                markerLocations={mapMarkers}
            ></MapContainer>
        </Col>
        
        { // to display results for smaller screens
            !xl &&
                <Drawer
                    title="Results"
                    placement="bottom"
                    onClose={() => {
                        setDrawerIsOpen(false)
                    }}
                    visible={drawerIsOpen}
                    mask={false}
                >
                    <SearchResults
                        pagination={false}
                        handleMarkerIconClick={handleMarkerIconClick}
                        handlePageChange={handlePageChange}
                        center={center}
                        hospitalsData={hospitalsData}
                        currentPage={currentPage}
                        pageSize={3}
                    ></SearchResults>
                </Drawer>
        }
    </Row>
}