import React, { FunctionComponent, useState, ChangeEvent, useEffect } from 'react';
import { Place } from '@googlemaps/google-maps-services-js'
import { Row, Col, Typography, Grid, Drawer } from 'antd';
import { MapContainer } from './Map/map';
import { SearchPanel } from './SearchPanel/searchPanel';
import { fetchHospitals } from './lib/utils/placesRequest';
import { DEFAULT_LAT_LNG, genRegex, radiusToZoom, marks } from './lib/utils/constants';
import { MarkerOptions } from './Map/map.interface';
import { getDistance } from 'geolib';
import { SearchResults } from './SearchPanel/SearchResults/searchResults';

const { Title } = Typography;
const { useBreakpoint } = Grid;

export const App: FunctionComponent = () => {

    // initialize states
    const [ allHospitalsData, setAllHospitalsData ] = useState<Place[]>([]);
    const [searchRadius, setSearchRadius] = useState(10);
    const [query, setQuery] = useState('');
    const [ hospitalsData, setHospitalsData ] = useState(allHospitalsData);
    const [ dataIsLoading, setDataIsLoading ] = useState(true);
    const [center, setCenter] = useState(DEFAULT_LAT_LNG);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ mapMarkers, setMapMarkers ] = useState<MarkerOptions[]>([])
    const [ mapZoom, setMapZoom ] = useState(13);
    const [ drawerIsOpen, setDrawerIsOpen ] = useState(false);
    const { xl } = useBreakpoint();

    // Data fetching effect
    useEffect(() => {
        
        if(center.lat !== DEFAULT_LAT_LNG.lat && center.lng !== DEFAULT_LAT_LNG.lng)
        {
            fetchHospitals(searchRadius, center).then(response => {
                const { data }: { data: Place[] } = response;
                const filtered = data.filter((item) => {
                    if(item.geometry) {
                        return (getDistance(item.geometry.location, center) / 1000) < searchRadius
                    }
                    return false;
                })
                setAllHospitalsData(filtered);

                let queryFiltered;

                if (query) {
                    queryFiltered = filteredHospitalData(filtered, query)
                }

                setHospitalsData(queryFiltered ? queryFiltered : filtered)
                setDataIsLoading(false);

                const markers = (queryFiltered ? queryFiltered : filtered).map((item: any) => {
                    return {
                        color: 'white',
                        text: item.id,
                        location: item.geometry.location
                    }
                });

                setMapMarkers([...markers, {
                    color: 'red',
                    text: 'you',
                    location: center
                }])
            })
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
                        text: 'you',
                        color: 'white',
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
    const filteredHospitalData = (data: any, query: string) => {
        return data.filter(({name}: { name: string}) => {
            return name.match(genRegex(query))
        });
    }

    const handleSearchInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setQuery(query);
        setCurrentPage(1);  // reset current page because the data has been filtered
        setHospitalsData(filteredHospitalData(allHospitalsData, query))
        setDrawerIsOpen(true);

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
            text: 'you',
            color: 'red',
            location: center
        }, location])
        setDrawerIsOpen(false);
    }

    // render

    const columnSpan = xl ? 12 : 24; // if the screen size is xl split into 2 columns if not take full page
    return <Row style={{
        display: 'flex',
        flexFlow: xl ? 'row' : 'column',
        height: '100vh',
        alignItems: 'stretch'
    }}>
        <Col span={columnSpan} style={{
            padding: '24px 24px 0 24px',
            backgroundColor: '#ffffff',
            flex: (xl) ? '0 0 100%' :'none'
        }}>
            <Title level={xl ? 2 : 4}>nearst</Title>
            <SearchPanel
                cropped={!!xl}
                handleMarkerIconClick={handleMarkerIconClick}
                handleSearchInputChange={handleSearchInputChange}
                handleSearchRadiusChange={handleSearchRadiusChange}
                handlePageChange={handlePageChange}
                marks={marks}
                hospitalsData={hospitalsData}
                searchRadius={searchRadius}
                query={query}
                dataIsLoading={dataIsLoading}
                currentPage={currentPage}
                center={center}
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