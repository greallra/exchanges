import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useHover } from '@mantine/hooks';
import { Card, Image, Text, Badge, Button, Box, Group, Divider, Alert, Tooltip } from '@mantine/core';
import { IconMapPin, IconClock, IconUsers, IconPencil, IconUserCheck, IconChecks, IconAlertCircle, IconFlagFilled, IconFlag, 
    IconBattery, IconBattery1, IconBattery2, IconBattery3, IconBattery4, IconPointer, IconBrain } from '@tabler/icons-react';

import UserFlag from '@/components/UserFlag'
import AvatarGroup from '../components/AvatarGroup'
import images from '../assets/images';

interface ExchangeItemProps {
    id: string,
    location: string,
    capacity: number,
    organizerId: string,
    organizerUnfolded: object,
    time: string,
    participantIds: Array,
    teachingLanguageId: string,
    learningLanguageId: string,
    learningLanguageUnfolded: object,
    teachingLanguageUnfolded: object,
    smallFlag: string,
    users: Array,
}

const cardCol = {
    marginRight: '20px', 
    whiteSpace: 'nowrap', 
    minWidth: '70px'
}

const ExchangeItem = (props: ExchangeItemProps) => {
    const [allParticipants, setAllParticipants] = useState([])
    const [participantsTeachingLanguage, setParticipantsTeachingLanguage] = useState([])
    const [participantsLearningLanguage, setParticipantsLearningLanguage] = useState([])
    const { user } = useAuth()
    const { hovered, ref } = useHover();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (props.participantIds.length > 0 && props.users.length) {
            const allParticipants = props.users.filter( user => props.participantIds.includes(user.id));
            setAllParticipants(allParticipants)
        }
      }, [props.participantIds]);
    useEffect(() => {
        setParticipantsTeachingLanguage(allParticipants.filter( p => p.teachingLanguageId === props.teachingLanguageId))
        setParticipantsLearningLanguage(allParticipants.filter( p => p.teachingLanguageId === props.learningLanguageId))
      }, [allParticipants]);
      
    const isAttending = props.participantIds.includes(user.id);
    const isHost = props.organizerId === user.id;

    const iconUsers = <IconUsers style={{ width: '15px', height: '15px' }} stroke={2.5} color="black" />;
    const iconMapPin = <IconMapPin style={{ width: '15px', height: '15px' }} className='mr-1' stroke={2.5} color="black" />
    const iconClock = <IconClock style={{ width: '15px', height: '15px' }}  stroke={2.5} color="black" />
    const isLanguagesMatch = [props.teachingLanguageId, props.learningLanguageId].includes(user.teachingLanguageId) &&
                [props.teachingLanguageId, props.learningLanguageId].includes(user.learningLanguageId)

    function getIconBattery() {
        const calc = props.participantIds.length / props.capacity;
        if (calc === 0) {
            return <IconBattery style={{ width: '15px', height: '15px' }} stroke={1.0} />;
        }
        if (calc > 0 && calc < 0.25) {
            return <IconBattery1 style={{ width: '15px', height: '15px' }} stroke={1.0} />;
        }   
        if (calc >= 0.25 && calc < 0.50) {
            return <IconBattery2 style={{ width: '15px', height: '15px' }} stroke={1.0} />;
        }   
        if (calc >= 0.50 && calc < 0.75) {
            return <IconBattery3 style={{ width: '15px', height: '15px' }} stroke={1.0} />;
        }   
        if (calc === 1) {
            return <IconBattery4 style={{ width: '15px', height: '15px' }} stroke={1.0} />;
        }   
    }

    return (
    <Link to={`/exchanges/${props.id}`} className='exchange-item' ref={ref}>  
      <Card padding="xs" radius="md" withBorder className={`${isLanguagesMatch && 'attendinggggg'}`}>
        <Card.Section component="a" href="https://mantine.dev/">
            <Image
            src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_1920,c_limit/GoogleMapTA.jpg"
            height={60}
            alt="Norway"
            />
        </Card.Section>
        <Box className='flex-sb'>
            <Box className='flex-al' mt="xs">
                <IconClock style={{ width: '15px', height: '15px' }} stroke={1.0} />
                <Text ml="xs"  size="sm" c="dimmed">{props.time}</Text>
            </Box>
            <Box className='flex-al' mt="xs">
                <Text ml="xs" size="sm" c="dimmed"><span className={`fi fi-${props.teachingLanguageUnfolded.iso_alpha2}`} /></Text> 
                <Text ml="xs" size="sm" c="dimmed"><span className={`fi fi-${props.learningLanguageUnfolded.iso_alpha2}`} /></Text>  
            </Box>
        </Box>
        <Box className='flex-sb'>
            <Box className='flex-al' mt="xs">
                <IconMapPin style={{ width: '15px', height: '15px' }} stroke={1.0} />
                <Text ml="xs"  size="sm" c="dimmed">{typeof props.location === 'string' ? props.location : props.location.short_name}</Text>
            </Box>
            <Box className='flex-al' mt="xs">
                {getIconBattery()}
                <Text ml="xs"  size="sm" c="dimmed">{props.capacity}</Text>
            </Box>
        </Box>
        <Box className='flex-sb' mt="xs">
            <Box className='flex-al'>
                <div>{props.teachingLanguageUnfolded && <UserFlag src={props.teachingLanguageUnfolded.smallFlag}/>}</div>
                <AvatarGroup users={participantsTeachingLanguage} spacesAvailable={(props.capacity / 2) - participantsTeachingLanguage.length} />
            </Box>
            <Box className='flex-al'>
                <IconUsers style={{ width: '15px', height: '15px' }} stroke={1.0} />
                <Text size="sm" ml="xs" c="dimmed">{participantsTeachingLanguage.length} / {props.capacity / 2}</Text>
            </Box>
        </Box>
        <Box className='flex-sb' mt="xs" mb="xxs">
            <Box className='flex-al'>
                <div>{props.learningLanguageUnfolded && <UserFlag src={props.learningLanguageUnfolded.smallFlag}/>}</div>
                <AvatarGroup users={participantsLearningLanguage} spacesAvailable={(props.capacity / 2) - participantsLearningLanguage.length} />
            </Box>
            <Box className='flex-al'>
                <IconUsers style={{ width: '15px', height: '15px' }} stroke={1.0} />
                <Text size="sm" ml="xs" c="dimmed">{participantsLearningLanguage.length} / {props.capacity / 2}</Text>
            </Box>
        </Box>
        <Box className='flex-al'   style={{position: 'absolute', top: '5px', right: '5px'}}>
            <IconMapPin style={{ width: '15px', height: '15px' }} stroke={1.0} color='black'/>
            <Text ml="xs"  size="sm" fw={700}>{typeof props.location === 'string' ? props.location : props.location.short_name}</Text>
        </Box>
        {isLanguagesMatch &&  <Tooltip label="This exchange matches your languages"><Box className='flex-al'   style={{position: 'absolute', top: '5px', left: '5px'}}>
            <IconChecks style={{ width: '15px', height: '15px' }} stroke={4.0} color='green'/>
            {/* <Text ml="xs"  size="sm" fw={700}>Language Match</Text> */}
        </Box></Tooltip>}
        <Box className='flex-al' mb="xxs">
            <IconBrain style={{ width: '15px', height: '15px' }} stroke={1.0} />
            <Text size="sm" ml="xs" c="dimmed">Host: {props.organizerUnfolded.username}</Text>
        </Box>
       
        {!hovered && props.participantIds.includes(user.id) && <Alert variant="light" color="green" title="Attending" p="0" icon={<IconChecks style={{ width: '15px', height: '15px' }} stroke={1.0} />} />}
        {!hovered && props.participantIds.length == props.capacity && <Alert variant="light" color="red" title="Full" p="0" icon={<IconBattery4 style={{ width: '15px', height: '15px' }} stroke={1.0} />} />}
        {hovered && <Alert variant="light" color="blue" title="View exchange" p="0" icon={<IconPointer style={{ width: '15px', height: '15px' }} stroke={1.0} />} />}
        {isHost && <Alert onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/exchanges/edit/${props.id}`); } } variant="light" color="blue" title="Edit exchange" p="0" icon={<IconPointer style={{ width: '15px', height: '15px' }} stroke={1.0} />} />}
     
     </Card>
    </Link>);
}
export default ExchangeItem