import React, { FunctionComponent, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Place } from '@googlemaps/google-maps-services-js'
import { Row, Col, Grid, Drawer, List } from 'antd';
import { MapContainer } from '../Map/map';
import { SearchPanel } from '../SearchPanel/searchPanel';
import { DEFAULT_LAT_LNG, genRegex, radiusToZoom, marks, PartialUserMapIcon, DEFAULT_OPTIONS } from '../lib/utils/constants';
import { MarkerOptions } from '../Map/map.interface';
import { SearchResults } from '../SearchPanel/SearchResults/searchResults';
import { PastSearch } from '../lib/utils/interface';
import { RightCircleOutlined } from '@ant-design/icons';
import { makeRequest, HTTPMethod } from '../lib/utils/request';

const { useBreakpoint } = Grid;

export const Home: FunctionComponent<{
    isLoggedIn: boolean
    pastSearches: PastSearch[] | undefined
    pastSearchVisible: boolean
    setPastSearchVisible: Dispatch<SetStateAction<boolean>>
    setPastSearches: Dispatch<SetStateAction<PastSearch[]>>
}> = (props) => {

    // initialize states
    const [ pastClicked, setPastClicked ] = useState<boolean>(false);
    const [ allHospitalsData, setAllHospitalsData ] = useState<Place[]>([]);
    const [searchRadius, setSearchRadius] = useState(10);
    const [query, setQuery] = useState('');
    const [value, setValue] = useState('');
    const [ hospitalsData, setHospitalsData ] = useState(allHospitalsData);
    const [ dataIsLoading, setDataIsLoading ] = useState(true);
    const [center, setCenter] = useState(DEFAULT_LAT_LNG);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ mapMarkers, setMapMarkers ] = useState<MarkerOptions[]>([])
    const [ mapZoom, setMapZoom ] = useState(13);
    const [ drawerIsOpen, setDrawerIsOpen ] = useState(false);

    const [ options, setOptions ] = useState(DEFAULT_OPTIONS);
    const { xl } = useBreakpoint();

    // Data fetching effect
    useEffect(() => {
        
        if(center.lat !== DEFAULT_LAT_LNG.lat && center.lng !== DEFAULT_LAT_LNG.lng && query !== '')
        {
            const options = {
                path: '/places'+(!props.isLoggedIn || pastClicked ? '/free': ''),
                method: HTTPMethod.POST,
                body: {
                    query: query,
                    radius: searchRadius * 1000,
                    latlng: center
                },
                auth: true
            };

            setDataIsLoading(true);
            makeRequest(options).then(response => {
                const { data }: { data: Place[] } = response.data;
                setAllHospitalsData(data);

                let queryFiltered;

                if (query) {
                    queryFiltered = filterData(data, query)
                }

                setHospitalsData(queryFiltered ? queryFiltered : data)
                setDataIsLoading(false);

                const markers = (queryFiltered ? queryFiltered : data).map((item: any) => {
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
                }])

                const pastSearches = props.pastSearches?.slice() || [];
                !pastClicked && pastSearches.push({
                    keyword: query,
                    radius: searchRadius * 1000,
                    timestamp: Date.now()
                });

                props.setPastSearches(pastSearches);
            })
            setPastClicked(false)
        } else {
            setDataIsLoading(false);
        }
    }, [searchRadius, center, query])

    // get current location
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
    const filterData = (data: any, query: string) => {
        return data.filter(({name}: { name: string}) => {
            return name.match(genRegex(query))
        });
    }

    const filterOptionsData = (data: any, query: string) => {
        return data.filter(({value}: { value: string}) => {
            return value.match(genRegex(query))
        });
    }

    const handleSearchInputChange = async (value: string) => {
        setValue(value)
        setOptions(filterOptionsData(DEFAULT_OPTIONS, value))
        // setCurrentPage(1);  // reset current page because the data has been filtered
        // setHospitalsData(filteredHospitalData(allHospitalsData, query))
        // setDrawerIsOpen(true);

    }

    const handleSearchRadiusChange = (value: number | [number, number]) => {
        setDataIsLoading(true); // set skeleton to loading
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

    const onSearch = (value: string) => {
        setCurrentPage(1);  // reset current page because the data has been filtered
    }

    const onSelect = (value: string, option: any) => {
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
                    dataSource={props.pastSearches}
                    renderItem={item => (
                    <List.Item
                        actions={[
                            <RightCircleOutlined
                                onClick={() => {
                                    setPastClicked(true)
                                    handleSearchInputChange(item.keyword)
                                    handleSearchRadiusChange(item.radius / 1000)
                                    onSelect(item.keyword, {})
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
                            description={new Date(item.timestamp).toLocaleString()}
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
                dataIsLoading={dataIsLoading}
                currentPage={currentPage}
                center={center}
                onSearch={onSearch}
                onSelect={onSelect}
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
        { !xl &&
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