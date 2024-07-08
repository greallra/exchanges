import { useState, useEffect } from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { IconChevronDown, IconClock  } from '@tabler/icons-react';
import { format, formatDistance, formatRelative, subDays, formatISO } from 'date-fns'
import AvatarGroup from '../components/AvatarGroup'
import users from '../mockData/users'
import {Link} from 'react-router-dom';
import images from '../assets/images';

interface ExchangeItemProps {
    location: string,
    capacity: number,
    organizer: string,
    time: string,
    participants: string,
    languageOne: string,
    languageTwo: string,
    smallFlag: string,
    users: Array
}

const ExchangeItem = (props: ExchangeItemProps) => {
    const [allParticipants, setAllParticipants] = useState([])
    const [l1Participants, setl1Participants] = useState([])
    const [l2Participants, setl2Participants] = useState([])

    useEffect(() => {
        if (props.participantIds.length > 0 && props.users.length) {
            const allParticipants = props.users.filter( user => props.participantIds.includes(user.id));
            console.log('props.users', props.users);
            console.log('props.participantIds', props.participantIds);
            console.log('allParticipants', allParticipants);
            
            setAllParticipants(allParticipants)
  
        }
      }, [props.participantIds]);
    useEffect(() => {
        console.log('useEffect allParticipants',allParticipants);
        setl1Participants(allParticipants.filter( p => p.teachingLanguage === props.languageOne.id))
        setl2Participants(allParticipants.filter( p => p.teachingLanguage === props.languageTwo.id))
      }, [allParticipants]);
      
    
    return (<Link to={`/exchanges/${props.exchangeId}`} className='exchange-item'>  
        <Card shadow="sm" padding="lg" radius="md" withBorder  style={{width: '100%'}}>
            <Card.Section>
            <Image
                src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_1920,c_limit/GoogleMapTA.jpg"
                height={100}
                alt="Norway"
            />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <Badge color="black"> { props.location }</Badge>
                <Badge color="black">  
                    <IconClock style={{ width: '15px', height: '15px' }} stroke={1.5} color="var(--mantine-color-blue-filled)" />
                    <span>{ props.time }</span>
                </Badge>
                <Badge color="pink">{ props.capacity } Participants Total</Badge>
            </Group>
            <Text size="sm" c="dimmed">
            
            </Text>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', alignItems: 'center'}}> 
                    <Image
                    src={images[props.languageOne.name && props.languageOne.name.toLowerCase()]}
                    h={20}
                    w="auto"
                    alt="Norway"/>
                    <div style={{ marginLeft: '5px'}} className='mr-1'>{props.languageOne.name} speakers </div>
                    <Text size="sm" c="dimmed">{props.participantsLanguageOne} / {props.capacity / 2}</Text>  
                </div>
                <div style={{ display: 'flex', alignItems: 'center'}}> 
                    <Image
                    src={images[props.languageTwo.name && props.languageTwo.name.toLowerCase()]}
                    h={20}
                    w="auto"
                    alt="Norway"/>
                    <div style={{ marginLeft: '5px'}} className='mr-1'>{props.languageTwo.name} speakers </div>
                    <Text size="sm" c="dimmed">{props.participantsLanguageTwo} / {props.capacity / 2}</Text>     
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <AvatarGroup users={l1Participants} spacesAvailable={(props.capacity / 2) - l1Participants.length} />  
                <AvatarGroup users={l2Participants} spacesAvailable={(props.capacity / 2) - l2Participants.length} />  
            </div>
    
            <Button color="blue" fullWidth mt="md" radius="md">
            see more
            </Button>
        </Card>
    </Link>);
}
export default ExchangeItem