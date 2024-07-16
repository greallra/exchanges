
import { Card, Image, Text, Box, Button, Group, LoadingOverlay } from '@mantine/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, cancelLoading } from '@/features/loading/loadingSlice'
import { useParams, Link } from 'react-router-dom';
import { useAuth } from "@/hooks/useAuth";
// C
import UserFlag from '@/components/UserFlag'
import { IconUsers, IconArrowLeft, IconMapPin, IconClock, IconPencil, IconUserCheck, 
  IconCoinEuro, IconHourglassEmpty, IconCalendar, IconFlagFilled, IconFlag } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import AvatarItem from '@/components/AvatarItem'
import { formatExchange } from '@/utils'
import { getOneDoc, updateDoc } from '@/common/apiCalls'
import useFetch from '@/hooks/useFetch';
import useLanguages from '@/hooks/useLanguages';
import MapPosition from '@/components/Maps/MapPosition'

export default function ExchangeView () {
    const [exchange, setExchange] = React.useState(null);
    const { languages } = useLanguages();
    const { data: users } = useFetch('users')
    const [participantsTeachingLanguage, setParticipantsTeachingLanguage] = React.useState([])
    const [participantsLearningLanguage, setParticipantsLearningLanguage] = React.useState([])
    const {user: me} = useAuth()

    let params = useParams();

    const isLoading = useSelector((state) => state.loading.value)
    const dispatch = useDispatch()

    let amValidToJoin = false;
    let haveJoined = false;
    if (exchange && exchange.participantIds) {
      haveJoined = exchange.participantIds.includes(me.id);
    }

    if (exchange && exchange.learningLanguageId && exchange && exchange.teachingLanguageId) {
      const learningLanguageValues = Object.values(exchange.learningLanguageUnfolded);
      const teachingLanguageValues = Object.values(exchange.teachingLanguageUnfolded);
      const combinedValues = [...learningLanguageValues, ...teachingLanguageValues];
      combinedValues.includes(me.learningLanguageId);
      combinedValues.includes(me.teachingLanguageId);
      
      // if i havent already joined
      // if they are both my target languages
      if (
          combinedValues.includes(me.learningLanguageId) && 
          combinedValues.includes(me.teachingLanguageId)) {
          amValidToJoin = true;
      }
    }

    async function handleJoin() {
      dispatch(setLoading())
      try {
        const meTeachingLanguage = me.teachingLanguageId;
        // all participants that have teachingLanguage equal to mine, if its less than the capacity, i can join
        const teachingLanguageCount = [...participantsTeachingLanguage, ...participantsLearningLanguage].filter( item => item.teachingLanguage === meTeachingLanguage).length;
        if (teachingLanguageCount >= exchange.capacity / 2) {
          notifications.show({ color: 'red', title: 'Error', message: 'The Exchange is full', })
          return;
        }
        let participantsMeAdded = [...exchange.participantIds, me.id]
        await updateDoc('exchanges', params.exchangeId, {...exchange, participantIds: participantsMeAdded });
        await fetchData(params.exchangeId)
        dispatch(cancelLoading())
        notifications.show({ color: 'green', title: 'Success', message: 'You Have Joined the exchaged', })
      } catch (error) {
        dispatch(cancelLoading())
        notifications.show({ color: 'red', title: 'Error', message: 'Error joining the Exchange', })
      }
    }

    async function handleRemoveMyself() {
      try {
        dispatch(setLoading())
        let participantsMeRemoved = [...exchange.participantIds]
        participantsMeRemoved.splice(participantsMeRemoved.indexOf(me.id), 1)
        await updateDoc('exchanges', params.exchangeId, {...exchange, participantIds: participantsMeRemoved});
        await fetchData(params.exchangeId)
        dispatch(cancelLoading())
        notifications.show({ color: 'green', title: 'Success', message: 'You Have been removed from the Exchange', })
      } catch (error) {
        dispatch(cancelLoading())
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
        const participantsTeachingLanguage = users.filter((user) => exchange.participantIds.includes(user.id) && user.teachingLanguageId === exchange.teachingLanguageId)
        const participantsLearningLanguage = users.filter((user) => exchange.participantIds.includes(user.id) && user.learningLanguageId === exchange.teachingLanguageId)
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

   console.log('amValidToJoin', amValidToJoin);
   console.log('haveJoined', haveJoined);
   
    return exchange ? (
  <Card shadow="sm" padding="lg" radius="md" withBorder style={{maxWidth: '600px', margin: 'auto'}}>
    <Card.Section>
      <Link to="/exchanges"style={{ position: 'absolute', left: 0, top: 0, margin: '5px'}} >
        <Button size="compact-md" leftSection={<IconArrowLeft style={{ width: '24px', height: '24px' }} stroke={1.5} color="white" />}>
          Back
        </Button>
      </Link>
      {typeof exchange.name === 'string' && <Image
        src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_1920,c_limit/GoogleMapTA.jpg"
        height={160}
        alt="Norway"
      /> }
      {typeof exchange.name === 'object' && 
       <MapPosition center={exchange.name} />
      }
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
        <div className='flex'>
            <div style={{padding: '30px'}}>
                {/* https://github.com/lipis/flag-icons */}
                {/* <UserFlag src={exchange.teachingLanguageUnfolded.smallFlag}/> */}
                <div className='flex-ac'><span class={`fi fi-${exchange.teachingLanguageUnfolded.iso_alpha2}`} /></div>
                <Text fw={500} mt="xs">{ exchange.teachingLanguageUnfolded.name }: {participantsTeachingLanguage.length} / {exchange.capacity / 2}</Text>
                <div className='flex-col' style={{paddingTop: '10px'}}>
                  {participantsList(participantsTeachingLanguage, exchange.teachingLanguageId)}
                </div>
            </div>
            <div style={{padding: '30px'}}>
                <div className='flex-ac'><span class={`fi fi-${exchange.learningLanguageUnfolded.iso_alpha2}`} /></div>
                <Text fw={500} mt="xs">{ exchange.learningLanguageUnfolded.name }: {participantsLearningLanguage.length} / {exchange.capacity / 2} </Text>
                <div className='flex-col' style={{paddingTop: '10px'}}>
                    {participantsList(participantsLearningLanguage, exchange.learningLanguageId)}
                </div>
            </div>
        </div>            
    </div>
    {!amValidToJoin && <Button color="red" fullWidth mt="md" radius="md" disabled>
      Your Languages dont match this Exchange
    </Button> }
    {amValidToJoin && haveJoined && <Button color="red" fullWidth mt="md" radius="md" onClick={handleRemoveMyself}>
      Remove myself
    </Button> }

    {amValidToJoin && !haveJoined && 
    <Button color="blue" fullWidth mt="md" radius="md" disabled={haveJoined} onClick={handleJoin} loading={isLoading}>
      Join
    </Button> }

  </Card>) : (<LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />)
}

