import { Avatar } from '@mantine/core';
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from 'react';
import { exchange, user } from '../common/types';

interface propsAvatarItem {
    user: user,
    exchange: exchange,
    amValidToJoin: boolean
}
// if user return user use return add avatar
export default function AvatarItem({ user, exchange, teachingLanguage, amValidToJoin } : propsAvatarItem ) {
    const {user: me} = useAuth()
    const [activeHoverId, setActiveHoverId] = useState('')
    
    // this is just for the hover state
    function handleMouseEnter(id:string) {
       if (!amValidToJoin) {
            return;
       }
       if (!id) {
         setActiveHoverId('vacant')
       } else {
        setActiveHoverId(user.id)
        console.log('id of user hovered:', id);
       }
    }
    function handleMouseLeave(id:string) {
        if (!id) {
            setActiveHoverId('')
        } else {
            setActiveHoverId('')
            console.log('id of user hovered:', id);
        }
    }

    function joinExchange(params:type) {
        [
            "Bf16L6hm9KOGvb4FPxSE",
            "m53BHc4MFZhnYn3HyGBj",
            "p49GgsvjoTg9YXlojhcJ"
          ]
    }
    
    if (user) {
        return (<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Avatar src="avatar.png" alt="it's me" size="xl" style={{marginTop: '10px', border: user.id === activeHoverId ?  '4px solid red' : ''}}/>
            <div>{user.avatar}</div>
            <div>{user.username}</div>
        </div>)
    }
    return <div onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()} onClick={joinExchange}>
       <Avatar  size="xl" style={{marginTop: '10px', border: activeHoverId == 'vacant' ?  '4px solid green' : ''}}>+</Avatar>
       <div style={{visibility: 'hidden'}}>dfa</div>
       <div style={{visibility: 'hidden'}}>dfsad</div>
    </div>
}