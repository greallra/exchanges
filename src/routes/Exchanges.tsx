import ExchangeItem from '../components/ExchangeItem'
import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { isFirebaseId, formatExchange } from '../utils'
import useFetch from '../hooks/useFetch';
import useLanguages from '../hooks/useLanguages';

const exchangeContStyle = {
    width: '600px',
    margin: 'auto'
}




const exchanges = () => {
    const [loading, setLoading] = useState(true)
    // const [exchanges, setExchanges] = useState([])
    // const [users, setUsers] = useState([])
    const { languages } = useLanguages();
    const { data: users } = useFetch('users')
    let { data: exchanges } = useFetch('exchanges')

   useEffect(() => {
        async function fetchData() {
           
            setLoading(false);
        }
        fetchData();
   }, [])
   exchanges = exchanges.map(exchange => formatExchange(exchange))
   console.log('exchanges', exchanges);
   
    return (
        <div style={exchangeContStyle}>
            <h2>Today</h2>
            {loading && <Loader color="blue" />}
            {exchanges.length === 0 && !loading && 'No Exchanges'}
            {exchanges.length > 0 && exchanges.map((exchange) => {
                return <ExchangeItem 
                    key={exchange.id} 
                    exchangeId={exchange.id} 
                    location={exchange.name} 
                    capacity={exchange.capacity} 
                    organizer={exchange.organizer} 
                    participants={exchange.participants} 
                    time={exchange.time}
                    languageOne={exchange.languageOne}
                    languageTwo={exchange.languageTwo}
                    participantsLanguageOne={exchange.participantsLanguageOne}
                    participantsLanguageTwo={exchange.participantsLanguageTwo}
                    participantIds={exchange.participantIds}
                    users={users}
                    />
            })}
        </div>
    )
}
export default exchanges;