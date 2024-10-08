// React Stuff
import { useEffect, useState } from 'react';
// Hooks
import useFetch from '@/hooks/useFetch';
import { useAuth } from "@/hooks/useAuth";
import useLanguages from '@/hooks/useLanguages';
// Components
import { Loader, Divider, Text, Switch, Box, ScrollArea, Alert, Tooltip } from '@mantine/core';
import UserFlag from '@/components/UserFlag'
import ExchangeItem from '@/components/ExchangeItem'
import { IconInfoCircle, IconChecks } from '@tabler/icons-react';
// Utils
import { formatExchange, nextTenDays, timeFilterExchanges } from 'exchanges-shared'

const exchanges = () => {
    const [loading, setLoading] = useState(true)
    const [exchangesGroupedByDate, setExchangesGroupedByDate] = useState([])
    const { languages } = useLanguages();
    const { data: users } = useFetch('users')
    let { data: exchanges } = useFetch('exchanges')
    const { user } = useAuth()
    const [isMyLanguages, setIsMyLanguages] = useState(false);
    const [isAttending, setIsAttending] = useState(false);

   useEffect(() => {
    if (exchanges.length > 0 && languages.length > 0) {
        exchanges = exchanges.map(exchange => formatExchange(exchange, languages, users))
        const groupedByDateExchanges = nextTenDays.map((day) => {
            return {
            ...day,
            exchanges: timeFilterExchanges(filterExchanges(exchanges), day)
          }
        }) 
        setExchangesGroupedByDate(groupedByDateExchanges)
        setLoading(false)
    }
   }, [languages, exchanges, isMyLanguages, isAttending])

   function filterExchanges (exchanges){
    let filteredExchanges = exchanges
        if (isMyLanguages) {
            filteredExchanges = exchanges.filter( exchange => {
                return [exchange.teachingLanguageId, exchange.learningLanguageId].includes(user.teachingLanguageId) &&
                [exchange.teachingLanguageId, exchange.learningLanguageId].includes(user.learningLanguageId)
            })
        }
        if (isAttending) {
            console.log('isAttending', isAttending);
            
            filteredExchanges = exchanges.filter( exchange => exchange.participantIds.includes(user.id))
        }
        return filteredExchanges
   }

    return (
        <div className='content-wrapper'>
            <div className='filter-switch'>
                <Box className='flex-sb'>
                    <Text tt="italic" size="xs" c="dimmed">Your Native Language is: </Text> {user && user.teachingLanguageUnfolded && <UserFlag src={user.teachingLanguageUnfolded.smallFlag}/>}
                </Box>
                <Box className='flex-sb'>
                    <Text tt="italic" size="xs" c="dimmed">Your Learning Language is: </Text> {user && user.learningLanguageUnfolded && <UserFlag src={user.learningLanguageUnfolded.smallFlag}/>}
                </Box>
                <Switch mt="xs" defaultChecked={false} label="Target my Languages"  checked={isMyLanguages}
                    onChange={(event) => setIsMyLanguages(event.currentTarget.checked)}/>
                <Switch defaultChecked={false} label="Show attending" className='mt-1'  checked={isAttending}
                    onChange={(event) => setIsAttending(event.currentTarget.checked)}/>
            </div>
            <div className='info-corner'>
            <Tooltip label="This means an exchange matches your languages">
                <Box className='flex-al'>
                <IconChecks style={{ width: '15px', height: '15px', marginRight: '5px' }}  stroke={4.0} color='green'/> =
                <Text ml="xs"  size="sm" fw={700}>Language Match</Text>
            </Box></Tooltip>
            </div>
            {exchangesGroupedByDate .length === 0 && <h3 className='flex-ac'>No exchanges in DB :-(</h3>}
            {exchangesGroupedByDate.length > 0 && exchangesGroupedByDate.map((groupedExchange, i) => {
                const areGroupedExchanges = groupedExchange.exchanges.length > 0 
                return (
                    <div key={i}>
                        {areGroupedExchanges && <h3 className='flex-ac'>
                            <div className='mr-1'>{groupedExchange.name}</div> 
                            <Text c="dimmed" size="xs" mt="xxs">({groupedExchange.date})</Text>
                        </h3>}
                        {!areGroupedExchanges && (!isAttending && !isMyLanguages) && <h3 className='flex-ac'>
                            <div className='mr-1'>{groupedExchange.name}
                            </div> <Text c="dimmed" size="xs">({groupedExchange.date})</Text>
                        </h3>}
                                            
                        {/* <ScrollArea type="always"> */}
                        <div className='exchange-items-wrapper'>
                        {areGroupedExchanges && groupedExchange.exchanges.map((exchange) => {
                            return <ExchangeItem 
                            id={exchange.id}
                            key={exchange.id}
                            name={exchange.name} 
                            location={exchange.location} 
                            capacity={exchange.capacity} 
                            organizerId={exchange.organizerId} 
                            organizerUnfolded={exchange.organizerUnfolded} 
                            time={exchange.timeHour}
                            learningLanguageId={exchange.learningLanguageId}
                            teachingLanguageId={exchange.teachingLanguageId}
                            learningLanguageUnfolded={exchange.learningLanguageUnfolded}
                            teachingLanguageUnfolded={exchange.teachingLanguageUnfolded}
                            participantIds={exchange.participantIds}
                            users={users}
                            />
                        })}
                        </div>
                        {/* </ScrollArea> */}
                     
                        {!areGroupedExchanges && (!isAttending && !isMyLanguages)  && <Text tt="italic" size="xs" c="dimmed" align="center">No exchanges on this day</Text>}
                        {!areGroupedExchanges && (!isAttending && !isMyLanguages)  &&<Divider variant="dotted"  style={{marginTop: '42px'}}/>}
                    </div>
                )
            })}
        </div>
    )
}
export default exchanges;