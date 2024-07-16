import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, Image, Text, Badge, Button, Box, Group, Divider } from '@mantine/core';
import { IconMapPin, IconClock, IconUsers, IconPencil, IconUserCheck, IconChecks, IconAlertCircle } from '@tabler/icons-react';
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

    const iconUsers = <IconUsers style={{ width: '15px', height: '15px' }} stroke={2.5} color="black" />;
    const iconMapPin = <IconMapPin style={{ width: '15px', height: '15px' }} className='mr-1' stroke={2.5} color="black" />
    const iconClock = <IconClock style={{ width: '15px', height: '15px' }}  stroke={2.5} color="black" />
    const isLanguagesMatch = [props.teachingLanguageId, props.learningLanguageId].includes(user.teachingLanguageId) &&
                [props.teachingLanguageId, props.learningLanguageId].includes(user.learningLanguageId)

    return (<Link to={`/exchanges/${props.id}`} className='exchange-item'>  
        <div style={cardCol}>
            <div className='flex-al'>
                {iconClock}
                <Text tt="uppercase" size="md" c="dimmed" className='ml-1'>{ props.time }</Text>
            </div>
            <div className='flex-al'>
                <div>{props.teachingLanguageUnfolded && <UserFlag src={props.teachingLanguageUnfolded.smallFlag}/>}</div>
                {/* <div>-</div> */}
                <div>
                    {props.learningLanguageUnfolded && <UserFlag src={props.learningLanguageUnfolded.smallFlag}/>}
                </div>  
                {isLanguagesMatch && <div>
                    <IconChecks style={{ width: '20px', height: '30px', marginRight: '5px' }} className='mt-1 ml-1' stroke={1.5} color="green" />
                </div>}
                {!isLanguagesMatch && <div>
                    <IconAlertCircle style={{ width: '20px', height: '30px', marginRight: '5px' }} className='mt-1 ml-1' stroke={1.5} color="orange" />
                </div>}
            </div>
            <div className='flex-al'>{iconUsers} <Text size="md" c="dimmed" className='ml-1'>{props.capacity}</Text></div>
        </div>
        {/* Second Column */}
      
        {/* <Badge color="black" leftSection={iconMapPin} className='full'> 
            <Text
            size="md"
            fw={900}
            variant="gradient"
            gradient={{ from: 'red', to: 'cyan', deg: 90 }}
            >
            Exchange Full
            </Text>
        </Badge> */}
        <Box shadow="sm" padding="lg" radius="md" withBorder  className={`cardWrapper ${isAttending ? 'attending' : ''}`}>
            <Box className='card-section'>
                <div className='flex-al'>{iconMapPin}<Text tt="" size="md" c="dimmed">{ props.location }</Text></div>
                <Image
                    src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_1920,c_limit/GoogleMapTA.jpg"
                    height={50}
                    alt="Norway"
                /> 
            </Box>
            {/* <Box justify="space-between" mt="md" mb="xs">
                <Badge color="pink" leftSection={iconMapPin}> { props.location }</Badge> 
                <Badge color="pink" leftSection={iconUsers}>Total { props.capacity } Participants</Badge>
                <Badge color="pink" leftSection={iconClock}>{ props.time }</Badge>
            </Box> */}
            {/* <Divider my="xs" label="Who's Going?" labelPosition="center" /> */}
            <Box className='card-section'>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ display: 'flex', alignItems: 'center'}}> 
                    <Image
                    src={images[props.teachingLanguageUnfolded.name && props.teachingLanguageUnfolded.name.toLowerCase()]}
                    h={20}
                    w="auto"
                    alt="Norway"/>
                    <div style={{ marginLeft: '5px'}} className='mr-1'>{props.teachingLanguageUnfolded.name} speakers </div>
                    <Text size="sm" c="dimmed">{participantsTeachingLanguage.length} / {props.capacity / 2}</Text>  
                </div>
                <div style={{ display: 'flex', alignItems: 'center'}}> 
                    <Image
                    src={images[props.learningLanguageUnfolded.name && props.learningLanguageUnfolded.name.toLowerCase()]}
                    h={20}
                    w="auto"
                    alt="Norway"/>
                    <div style={{ marginLeft: '5px'}} className='mr-1'>{props.learningLanguageUnfolded.name} speakers </div>
                    <Text size="sm" c="dimmed">{participantsLearningLanguage.length} / {props.capacity / 2}</Text>     
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <AvatarGroup users={participantsTeachingLanguage} spacesAvailable={(props.capacity / 2) - participantsTeachingLanguage.length} />
                {props.participantIds.includes(user.id) && <div className='flex-al'>
                    <IconUserCheck style={{ width: '20px', height: '30px', marginRight: '5px' }} stroke={1.5} color="green" />
                    <Text tt="" size="xs" c="dimmed" className='mt-1'>You are attending</Text>
                </div>} 
                <AvatarGroup users={participantsLearningLanguage} spacesAvailable={(props.capacity / 2) - participantsLearningLanguage.length} />  
            </div>
            </Box>
            {/* <Button color="blue" fullWidth mt="md" radius="md">
            see more
            </Button> */}
        </Box>
        {/* Right Column */}
        <div>
           
            <Link 
                to={`/exchanges/edit/${props.id}`} className='ml-1'>
                {props.organizerId === user.id && <IconPencil style={{ width: '30px', height: '50px' }} stroke={1.5} color="var(--mantine-color-blue-filled)" />}
            </Link>
        </div>
      
    </Link>);
}
export default ExchangeItem