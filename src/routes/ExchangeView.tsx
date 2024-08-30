
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useStore } from '@/store/store'
import { useAuth } from "@/hooks/useAuth";
import useFetchOne from '@/hooks/useFetchOne';
import { checkUserIsValidToJoin, formatExchange, esGetDoc, esUpdateDoc, removeMyselfFromExchange, 
  checkUserHasJoined, getPartipantsOfLanguages, addParticipantToExchange, userLanguagesMatchesExchange } from 'exchanges-shared'
import { db as FIREBASE_DB } from "@/firebaseConfig";
// C
import UserFlag from '@/components/UserFlag'
import { IconUsers, IconUser, IconArrowLeft, IconMapPin, IconClock, IconPencil, IconUserCheck, 
  IconCoinEuro, IconHourglassEmpty, IconCalendar, IconFlagFilled, IconFlag } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import AvatarItem from '@/components/AvatarItem'
import useFetch from '@/hooks/useFetch';
import useLanguages from '@/hooks/useLanguages';
import MapPosition from '@/components/Maps/MapPosition'
import AddFriendsPopover from '@/components/AddFriendsPopover'
import { Card, Image, Text, Box, Button, Group, LoadingOverlay } from '@mantine/core';


export default function ExchangeView () {
    const [exchange, setExchange] = React.useState(null);
    const [amValidToJoin, setAmValidToJoin] = React.useState(false);
    const [haveJoined, setHaveJoined] = React.useState(false);
    const [notValidReason, setNotValidReason] = React.useState('');
    const { languages } = useLanguages();
    const { data: users } = useFetch('users')
    const [participantsTeachingLanguage, setParticipantsTeachingLanguage] = React.useState([])
    const [participantsLearningLanguage, setParticipantsLearningLanguage] = React.useState([])
    const {user: me} = useAuth()
    let params = useParams();
    const { data: exchangeListener } = useFetchOne('exchanges', params.exchangeId)


    const isLoading = useStore((state) => state.loading)
    const setLoading = useStore((state) => state.setLoading)
    const stopLoading = useStore((state) => state.stopLoading)

    async function handleAddParticipant(user = null) {
      setLoading()
      const { isValid, message, joiningUser } = checkUserIsValidToJoin(exchange, participantsTeachingLanguage, participantsLearningLanguage, me, user)
      
      if (!isValid) {
        stopLoading()
        notifications.show({ color: 'red', title: 'Error', message })
        return;
      } 
      const { error, response } = await addParticipantToExchange(FIREBASE_DB, exchange, joiningUser)
      if (error) {
        stopLoading()
        return notifications.show({ color: 'red', title: 'Success', message: response, })
      }
      await fetchData(params.exchangeId)
      stopLoading()
    }
    async function handleRemoveMyself() {
      try {
        setLoading()
        const { success, message } = await removeMyselfFromExchange(FIREBASE_DB, me, exchange)
        if (!success) {
          stopLoading()
          notifications.show({ color: 'red', title: 'Error', message })
          return;
        } 
        await fetchData(params.exchangeId)
        stopLoading()
        notifications.show({ color: 'green', title: 'Success', message, })
      } catch (error) {
        stopLoading()
        notifications.show({ color: 'red', title: 'Error', message: error.message, })
      }
    }

    async function fetchData(id:string) {  
      try {
        const { docSnap } = await esGetDoc(FIREBASE_DB, "exchanges", id);
        const formattedExchange = formatExchange({...docSnap.data(), id: docSnap.id}, languages, users)
        console.log('fetch, formattedExchange', formattedExchange);
        
        setExchange(formattedExchange)
      } catch (error) {
        notifications.show({ color: 'red', title: 'Error', message: 'Error gettting exchange', })
      }
    }

    React.useEffect(() => {
      if (languages.length > 0) {
        fetchData(params.exchangeId)
      }
    }, [languages, users]); 

    React.useEffect(() => {
   
      if (exchangeListener && languages.length > 0 && users.length > 0) {
        const formattedExchange = formatExchange({...exchangeListener, id: exchangeListener.id}, languages, users)
        setExchange(formattedExchange)
      }
  
    }, [exchangeListener, params.exchangeId, languages]); 

    React.useEffect(() => {
      if (exchange && users.length > 0) {
        const { participantsTeachingLanguage, participantsLearningLanguage } = getPartipantsOfLanguages(users, exchange)
        setParticipantsTeachingLanguage(participantsTeachingLanguage);
        setParticipantsLearningLanguage(participantsLearningLanguage);
      }
    }, [exchange, users])

    React.useEffect(() => {
      if (exchange && me && participantsTeachingLanguage && participantsLearningLanguage) {
        const { isValid, message } = checkUserIsValidToJoin(exchange, participantsTeachingLanguage, participantsLearningLanguage, me);
        
        setAmValidToJoin(isValid)
        console.log('checkUserHasJoined(me, exchange)', checkUserHasJoined(me, exchange));
        
        setHaveJoined(checkUserHasJoined(me, exchange));
        setNotValidReason(message)
        console.log('isValid, message, joined', isValid, message, checkUserHasJoined(me, exchange));
        
      }
    }, [participantsTeachingLanguage, participantsLearningLanguage])

    const participantsList = (participants, teachingLanguage) => {
      const divContainer = [];
      for (let i = 0; i < exchange.capacity / 2; i++) {
        divContainer.push(<AvatarItem 
          key={i} 
          user={participants[i]} 
          exchange={exchange} 
          amValidToJoin={amValidToJoin}
          teachingLanguage={teachingLanguage} />)
      }
      return <div>{divContainer}</div>;
    }

  return exchange ? (
  <Card shadow="sm" padding="lg" radius="md" withBorder style={{maxWidth: '600px', margin: 'auto'}}>
    <Card.Section>
      <Link to="/exchanges" style={{ position: 'absolute', left: 0, top: 0, margin: '5px', zIndex: 2}} id="RouterNavLink">
        <Button size="compact-md" leftSection={<IconArrowLeft style={{ width: '24px', height: '24px' }} stroke={1.5} color="white" />}>
          Back
        </Button>
      </Link>
      {!exchange.location && <Image
        src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_1920,c_limit/GoogleMapTA.jpg"
        height={160}
        alt="Norway"
      /> }
      {/* {typeof exchange.location === 'object' && 
       <MapPosition center={exchange.location.geometry} />
      } */}
    </Card.Section>
    <Group justify="space-between" mt="md" mb="xs">
        <Text fw={900}>Language Exchange at {typeof exchange.name === 'string' ? exchange.name : exchange.name.short_name}, with a total of {exchange.capacity} people</Text>
        <div className='flex-al'>
            <div>{exchange.teachingLanguageUnfolded && <UserFlag src={exchange.teachingLanguageUnfolded.smallFlag}/>}</div>
            <div>
                {exchange.learningLanguageUnfolded && <UserFlag src={exchange.learningLanguageUnfolded.smallFlag}/>}
            </div>  
        </div>
    </Group>
    <Group justify="space-between" mt="xs">
      <div style={{width: '40%'}}>
          <Box className='flex-al' mb="xs">
            <IconMapPin style={{ width: '15px', height: '15px' }} stroke={1.0} />
            <Text ml="xs"  size="sm" c="dimmed">{typeof exchange.name === 'string' ? exchange.name : exchange.name.short_name}</Text>
          </Box>
          <Box className='flex-al' mb="xs">
          <IconCalendar style={{ width: '14px', height: '14px' }} stroke={1.0}/> 
          <Text ml="xs" size="sm" c="dimmed">{exchange.timeUnix}</Text>
          </Box>
          <Box className='flex-al' mb="xs">
            <IconUsers style={{ width: '14px', height: '14px' }} stroke={1.0}/> 
            <Text ml="xs" mr="xl" size="sm" c="dimmed">{exchange.participantIds.length} / {exchange.capacity}</Text>
          </Box>
          <Box className='flex-al' mb="xs">
            <IconUser style={{ width: '14px', height: '14px' }} stroke={1.0}/> 
            <Text ml="xs" mr="xl" size="sm" c="dimmed">{exchange.organizerUnfolded.username}</Text>
          </Box>
      </div>
      <div style={{width: '40%'}}>
          <Box className='flex-al' mb="xs">
            <IconFlag style={{ width: '14px', height: '14px' }} stroke={1.0}/>
            <IconFlagFilled style={{ width: '14px', height: '14px' }} stroke={1.0}/>
            <Text ml="xs" size="sm" c="dimmed">{exchange.teachingLanguageUnfolded.name}</Text> ,  <Text  size="sm" c="dimmed">{exchange.learningLanguageUnfolded.name}</Text>
          </Box>
           <Box className='flex-al' mb="xs">
          <IconHourglassEmpty style={{ width: '14px', height: '14px' }} stroke={1.0}/>
          <Text ml="xs" size="sm" c="dimmed">{exchange.duration}</Text>
        </Box>
         <Box className='flex-al' mb="xs">
          <IconCoinEuro style={{ width: '14px', height: '14px' }} stroke={1.0}/>
          <Text ml="xs" size="sm" c="dimmed">{!exchange.price ? 'free' : exchange.price}</Text>
        </Box>
      </div>
    </Group>
    <Group justify="space-between" mt="md" mb="xs">
        <Text fw={600}>General Information</Text>
    </Group>
    <Text size="sm" c="dimmed">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus rerum expedita soluta suscipit? Hic quisquam mollitia laborum fugiat, molestiae provident alias architecto nulla cumque accusamus veritatis odit iste officia explicabo!
    </Text>
    <Group justify="space-between" mt="md" mb="xs">
        <Text fw={600}>Participants</Text>
    </Group>

    
    
    <div className='participants-container'>
        <div className='addfriends'><AddFriendsPopover handleAddParticipant={handleAddParticipant} exchange={exchange} /></div>
        <div className='flex'>
            <div style={{padding: '30px'}}>
                {/* https://github.com/lipis/flag-icons */}
                {/* <UserFlag src={exchange.teachingLanguageUnfolded.smallFlag}/> */}
                <div className='flex-ac'><span className={`fi fi-${exchange.teachingLanguageUnfolded.iso_alpha2}`} /></div>
                <Text fw={500} mt="xs">{ exchange.teachingLanguageUnfolded.name }: {participantsTeachingLanguage.length} / {exchange.capacity / 2}</Text>
                <div className='flex-col' style={{paddingTop: '10px'}}>
                  {participantsList(participantsTeachingLanguage, exchange.teachingLanguageId)}
                </div>
            </div>
            <div style={{padding: '30px'}}>
                <div className='flex-ac'><span className={`fi fi-${exchange.learningLanguageUnfolded.iso_alpha2}`} /></div>
                <Text fw={500} mt="xs">{ exchange.learningLanguageUnfolded.name }: {participantsLearningLanguage.length} / {exchange.capacity / 2} </Text>
                <div className='flex-col' style={{paddingTop: '10px'}}>
                    {participantsList(participantsLearningLanguage, exchange.learningLanguageId)}
                </div>
            </div>
        </div>            
    </div>
    {!amValidToJoin && !haveJoined && <Button color="red" fullWidth mt="md" radius="md" disabled>
      {notValidReason}
    </Button> }
    {haveJoined && <Button color="red" fullWidth mt="md" radius="md" onClick={handleRemoveMyself}>
      Remove myself
    </Button> }

    {amValidToJoin && !haveJoined && 
    <Button color="blue" fullWidth mt="md" radius="md" disabled={haveJoined} onClick={ () => handleAddParticipant() } loading={isLoading}>
      Join
    </Button> }

  </Card>) : (<LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />)
}

