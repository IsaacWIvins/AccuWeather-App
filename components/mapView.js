import React from 'react'
import { MapView } from 'expo'

export default class Map extends React.Component {
  render() {
    const { Latitude, Longitude } = this.props.cordinates;
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: Latitude,
          longitude: Longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}
