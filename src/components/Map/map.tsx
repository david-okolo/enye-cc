import React, { FunctionComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import { IMapContainer } from './map.interface';
import { Marker } from './Marker/marker';
import { darkMapStyleOptions } from './constants';
import { GOOGLE_API_KEY } from '../../utils/constants';



export const MapContainer: FunctionComponent<IMapContainer> = (props) => {

  const {center, zoom, markerLocations, handleMarkerIconClick } = props

    const initializeMap = (map: any, maps: any) => {
        const styledMap = new maps.StyledMapType(darkMapStyleOptions)

        map.mapTypes.set('styled_map', styledMap);
        map.setMapTypeId('styled_map');
    }

    return (
        <div style={{
            flex: 1,
            width: '100%'
        }}>
            <GoogleMapReact
                zoom={zoom}
                bootstrapURLKeys={{key: GOOGLE_API_KEY}} // didn't bother hiding because the key is restricted
                center={center}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map, maps}) => {initializeMap(map, maps)}}
            >
                {markerLocations.map(({location, color, text, title, content}) => {
                    return (
                        <Marker 
                            title={title}
                            content={content}
                            handleMarkerIconClick={handleMarkerIconClick} 
                            key={text} 
                            lat={location.lat} 
                            lng={location.lng} 
                            color={color} 
                            text={text}
                            />
                        )
                })}
            </GoogleMapReact>
        </div>
    )
};