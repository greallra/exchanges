import React, { useState} from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// import PlacesAuto from './AutoComplete'

const containerStyle = {
  width: '100%',
  height: '300px'
};


function MapPosition({center}) {
  const { isLoaded } = useJsApiLoader({
    id: `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`,
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places', 'maps']
  })
  
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    // setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded && center ? (
    <>
      <GoogleMap
        zoom={13}
        defaultZoom={13}
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={center}/>
      </GoogleMap>
    </>
  ) : <></>
}


export default React.memo(MapPosition)