import { useState, useEffect } from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { IconChevronDown, IconClock  } from '@tabler/icons-react';
import AvatarGroup from '../components/AvatarGroup'
import {Link} from 'react-router-dom';
import images from '../assets/images';

interface ExchangeItemProps {
    location: string,
    capacity: number,
    organizer: string,
    time: string,
    participants: string,
    teachingLanguage: object,
    learningLanguage: object,
    smallFlag: string,
    users: Array
}

const ExchangeItem = (props: ExchangeItemProps) => {
    const [allParticipants, setAllParticipants] = useState([])
    const [participantsTeachingLanguage, setParticipantsTeachingLanguage] = useState([])
    const [participantsLearningLanguage, setParticipantsLearningLanguage] = useState([])

    useEffect(() => {
        if (props.participantIds.length > 0 && props.users.length) {
            const allParticipants = props.users.filter( user => props.participantIds.includes(user.id));
            setAllParticipants(allParticipants)
        }
      }, [props.participantIds]);
    useEffect(() => {
        console.log('useEffect allParticipants',allParticipants);
        setParticipantsTeachingLanguage(allParticipants.filter( p => p.teachingLanguage === props.teachingLanguage.id))
        setParticipantsLearningLanguage(allParticipants.filter( p => p.teachingLanguage === props.learningLanguage.id))
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
                    src={images[props.teachingLanguage.name && props.teachingLanguage.name.toLowerCase()]}
                    h={20}
                    w="auto"
                    alt="Norway"/>
                    <div style={{ marginLeft: '5px'}} className='mr-1'>{props.teachingLanguage.name} speakers </div>
                    <Text size="sm" c="dimmed">{participantsTeachingLanguage.length} / {props.capacity / 2}</Text>  
                </div>
                <div style={{ display: 'flex', alignItems: 'center'}}> 
                    <Image
                    src={images[props.learningLanguage.name && props.learningLanguage.name.toLowerCase()]}
                    h={20}
                    w="auto"
                    alt="Norway"/>
                    <div style={{ marginLeft: '5px'}} className='mr-1'>{props.learningLanguage.name} speakers </div>
                    <Text size="sm" c="dimmed">{participantsLearningLanguage.length} / {props.capacity / 2}</Text>     
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <AvatarGroup users={participantsTeachingLanguage} spacesAvailable={(props.capacity / 2) - participantsTeachingLanguage.length} />  
                <AvatarGroup users={participantsLearningLanguage} spacesAvailable={(props.capacity / 2) - participantsLearningLanguage.length} />  
            </div>
    
            <Button color="blue" fullWidth mt="md" radius="md">
            see more
            </Button>
        </Card>
    </Link>);
}
export default ExchangeItem