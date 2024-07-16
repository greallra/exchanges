import React, { useState} from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import PlacesAuto from './AutoComplete'

const containerStyle = {
  width: '100%',
  height: '300px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};
function MapAutoComplete({selected, setSelected}) {
  const { isLoaded } = useJsApiLoader({
    id: `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`,
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
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

  return isLoaded ? (
    <>
      <PlacesAuto setSelected={setSelected} />
      {selected && <GoogleMap
        zoom={10}
        defaultZoom={10}
        mapContainerStyle={containerStyle}
        center={selected}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {selected && <Marker position={selected}/>} 
      </GoogleMap> }
    </>
  ) : <></>
}

export default React.memo(MapAutoComplete)