import React, { FunctionComponent } from 'react';
import { IMapMarker } from './marker.interface';
import { EnvironmentFilled } from '@ant-design/icons';
import { Popover } from 'antd';

export const Marker: FunctionComponent<IMapMarker> = (props) => {
    return (
        <Popover
            content={props.content}
            title={props.title}
        >
            <div style={{
                fontWeight: 'bolder',
                color: 'white',
                width: '100%'
            }}>
                <EnvironmentFilled 
                    onClick={() => {
                        props.handleMarkerIconClick({
                            title: props.title,
                            content: props.content,
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
        </Popover>
    )
}