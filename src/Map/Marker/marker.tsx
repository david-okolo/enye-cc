import React, { FunctionComponent } from 'react';
import { IMapMarker } from './marker.interface';
import { EnvironmentFilled } from '@ant-design/icons';

export const Marker: FunctionComponent<IMapMarker> = (props) => {
    return (
        <div style={{
            fontWeight: 'bolder',
            color: 'white',
            width: '100%'
        }}>
            <EnvironmentFilled 
                onClick={() => {
                    props.handleMarkerIconClick({
                        color: 'green',
                        text: 'destination',
                        location: {
                            lat: props.lat,
                            lng: props.lng
                        }
                    })
                }}
                style={{
                    fontSize: '30px',
                    color: props.color
                }}
            ></EnvironmentFilled>
        </div>
    )
}