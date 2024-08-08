import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Autocomplete } from '@mantine/core';
import { useEffect } from 'react';

const PlacesAuto = ({ setSelected}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        callbackName: "YOUR_CALLBACK_NAME",
        requestOptions: {
          /* Define search scope here */
        },
        debounce: 300,
      });

      async function handleSelect(address) {
        console.log(address);
        setValue(address);
        clearSuggestions();
        const results = await getGeocode({ address })
         const { lat, lng } = await getLatLng(results[0])
        console.log('results',results);
        const { geometry, address_components, formatted_address } = results[0]
        setSelected({
          geometry: {
            lat, 
            lng,
            // viewport: geometry.viewport
          }, 
          address_components,
          formatted_address
        })
      }
    
    return (
        <div>
             <Autocomplete 
              disabled={!ready}
              data={status === 'OK' && data.map((item) =>({...item, value: item.description}))} 
              value={value} 
              onChange={(value) => setValue(value)} 
              onOptionSubmit={handleSelect}
              label='Location'
              placeholder='Type a location'
            />
        </div>
  
    )
}
export default PlacesAuto;