
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { IconUsers } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import AvatarItem from '../components/AvatarItem'
import { formatExchange } from '../utils'
import { getOneDoc, updateDoc } from '@/common/apiCalls'
import useFetch from '@/hooks/useFetch';
import useLanguages from '@/hooks/useLanguages';

export default function ExchangeView () {
    const [exchange, setExchange] = React.useState(null);
    const { languages } = useLanguages();
    const { data: users } = useFetch('users')
    const [participantsTeachingLanguage, setParticipantsTeachingLanguage] = React.useState([])
    const [participantsLearningLanguage, setParticipantsLearningLanguage] = React.useState([])
    const {user: me} = useAuth()

    let params = useParams();

    let amValidToJoin = false;
    let haveJoined = false;
    if (exchange && exchange.participantIds) {
      haveJoined = exchange.participantIds.includes(me.id);
    }

    if (exchange && exchange.learningLanguage && exchange && exchange.teachingLanguage) {
      const learningLanguageValues = Object.values(exchange.learningLanguage);
      const teachingLanguageValues = Object.values(exchange.teachingLanguage);
      const combinedValues = [...learningLanguageValues, ...teachingLanguageValues];

      // if i havent already joined
      // if they are both my target languages
      if (
          !exchange.participantIds.includes(me.id) &&
          combinedValues.includes(me.learningLanguage) && combinedValues.includes(me.teachingLanguage)) {
          amValidToJoin = true;
      }
    }

    async function handleJoin() {
      const meTeachingLanguage = me.teachingLanguage;
      // all participants that have teachingLanguage equal to mine, if its less than the capacity, i can join
      const teachingLanguageCount = [...participantsTeachingLanguage, ...participantsLearningLanguage].filter( item => item.teachingLanguage === meTeachingLanguage).length;
      if (teachingLanguageCount >= exchange.capacity / 2) {
        notifications.show({ color: 'red', title: 'Error', message: 'The Exchange is full', })
        return;
      }
      try {
        let participantsMeAdded = [...exchange.participantIds, me.id]
        await updateDoc('exchanges', params.exchangeId, {...exchange, participantIds: participantsMeAdded });
        await fetchData(params.exchangeId)
        notifications.show({ color: 'green', title: 'Success', message: 'You Have Joined the exchaged', })
      } catch (error) {
        notifications.show({ color: 'red', title: 'Error', message: 'Error joining the Exchange', })
      }
    }

    async function handleRemoveMyself() {
      try {
        let participantsMeRemoved = [...exchange.participantIds]
        participantsMeRemoved.splice(participantsMeRemoved.indexOf(me.id), 1)
        await updateDoc('exchanges', params.exchangeId, {...exchange, participantIds: participantsMeRemoved});
        await fetchData(params.exchangeId)
        notifications.show({ color: 'green', title: 'Success', message: 'You Have been removed from the Exchange', })
      } catch (error) {
        notifications.show({ color: 'red', title: 'Error', message: 'Error removing from the Exchange', })
      }
    }

    async function fetchData(id:string) {  
      try {
        const {docSnap} = await getOneDoc("exchanges", id);
        const formattedExchange = formatExchange({...docSnap.data(), id: docSnap.id}, languages)

        setExchange(formattedExchange)
      } catch (error) {
        notifications.show({ color: 'red', title: 'Error', message: 'Error gettting exchange', })
      }
    }

    React.useEffect(() => {
      if (languages.length > 0) {
        fetchData(params.exchangeId)
      }
    }, [languages]); 

    React.useEffect(() => {
      if (exchange && users.length > 0) {
        const participantsTeachingLanguage = users.filter((user) => exchange.participantIds.includes(user.id) && user.teachingLanguage === exchange.teachingLanguage.id)
        const participantsLearningLanguage = users.filter((user) => exchange.participantIds.includes(user.id) && user.learningLanguage === exchange.teachingLanguage.id)
        setParticipantsTeachingLanguage(participantsTeachingLanguage);
        setParticipantsLearningLanguage(participantsLearningLanguage);
      }

    }, [exchange, users])

    const participantsList = (participants, teachingLanguage) => {
      const divContainer = [];
      for (let i = 0; i < exchange.capacity / 2; i++) {
        divContainer.push(<AvatarItem 
          user={participants[i]} 
          exchange={exchange} 
          amValidToJoin={amValidToJoin}
          teachingLanguage={teachingLanguage} />)
      }
      return <div>{divContainer}</div>;
    }

   

    return exchange ? (<Card shadow="sm" padding="lg" radius="md" withBorder>
    <Card.Section>
      <Image
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
        height={160}
        alt="Norway"
      />
    </Card.Section>

    <Group justify="space-between" mt="md" mb="xs">
      <Text fw={900}>Exchange at {exchange.name}</Text>
    </Group>
    <Badge color="pink"><IconUsers  style={{ width: '14px', height: '14px' }} stroke={1.0}/> {exchange.participantIds.length} / {exchange.capacity}</Badge>
    <Group justify="space-between" mt="md" mb="xs">
      <Text fw={400} style={{display: 'flex'}}>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLtrokeLinecapinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-month"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg>
        <div>{exchange.time}</div>
      </Text>
    </Group>
    <Group justify="space-between" mt="md" mb="xs">
      <Text fw={400} style={{display: 'flex'}}>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLtrokeLinecapinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-clock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 7v5l3 3" /></svg>
        <div>{exchange.duration}</div>
      </Text>
    </Group>
    <Group justify="space-between" mt="md" mb="xs">
      <Text fw={400} style={{display: 'flex'}}>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLtrokeLinecapinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-coin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" /><path d="M12 7v10" /></svg>
        <div>{!exchange.price ? 'free' : exchange.price}</div>
      </Text>
    </Group>
    <Text size="sm" c="dimmed">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus rerum expedita soluta suscipit? Hic quisquam mollitia laborum fugiat, molestiae provident alias architecto nulla cumque accusamus veritatis odit iste officia explicabo!
    </Text>
    <Text fw={900}>Who's going?</Text>

    <div className='participants-container'>
        <div className='flex'>
            <div style={{padding: '30px'}}>
                <Text fw={500}>{ exchange.teachingLanguage.name }: {participantsTeachingLanguage.length} / {exchange.capacity / 2} participants</Text>
                <div className='flex-col' style={{paddingTop: '20px'}}>
                  {participantsList(participantsTeachingLanguage, exchange.teachingLanguage.id)}
                </div>
            </div>
            <div style={{padding: '30px'}}>
                <Text fw={500}>{ exchange.learningLanguage.name }: {participantsLearningLanguage.length} / {exchange.capacity / 2} participants</Text>
                <div className='flex-col' style={{paddingTop: '20px'}}>
                    {participantsList(participantsLearningLanguage, exchange.learningLanguage.id)}
                </div>
            </div>
        </div>            
    </div>
    <Text fw={900}>Where?</Text>
    {haveJoined && <Button color="red" fullWidth mt="md" radius="md" onClick={handleRemoveMyself}>
      Remove myself
    </Button> }

    {amValidToJoin && !haveJoined && <Button color="blue" fullWidth mt="md" radius="md" disabled={!amValidToJoin && !haveJoined} onClick={handleJoin}>
      { amValidToJoin ? 'Join' : 'Your Languages dont match this Exchange'}
    </Button> }

  </Card>) : (<div>No Exchange found</div>)
}

