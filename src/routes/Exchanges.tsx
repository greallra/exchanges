import ExchangeItem from '@/components/ExchangeItem'
import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { isFirebaseId, formatExchange } from '@/utils'
import useFetch from '@/hooks/useFetch';
import useLanguages from '@/hooks/useLanguages';

const exchangeContStyle = {
    width: '600px',
    margin: 'auto'
}

const exchanges = () => {
    const [loading, setLoading] = useState(true)
    const { languages } = useLanguages();
    const { data: users } = useFetch('users')
    let { data: exchanges } = useFetch('exchanges')

   useEffect(() => {
    if (exchanges.length > 0 && languages.length > 0) {
        exchanges = exchanges.map(exchange => formatExchange(exchange, languages))
        setLoading(false)
    }
   }, [languages, exchanges])



    exchanges = exchanges.map(exchange => formatExchange(exchange, languages))
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
                    learningLanguage={exchange.learningLanguage}
                    teachingLanguage={exchange.teachingLanguage}
                    participantIds={exchange.participantIds}
                    users={users}
                    />
            })}
        </div>
    )
}
export default exchanges;