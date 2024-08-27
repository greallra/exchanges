import { useNavigate, useLocation } from "react-router-dom";
import { Button, Image, Avatar, Tooltip, Text } from '@mantine/core';
import { useAuth } from "../hooks/useAuth";
import { getUserInitials } from 'exchanges-shared'
import { getImage } from '@/common/utils'
import UserFlag from '@/components/UserFlag'

const container = {
    display: 'flex',
    justifyContent: 'space-evenly',
}

export default function () {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    return (
        <div style={container} className="nav-cont">
            <div onClick={() => navigate('/')}>
             <Image
                radius="md"
                h={'100%'}
                src={getImage('/assets/logo.png')}
            />
            </div>
            {user && <Button.Group>
                <Button onClick={() => navigate('/exchanges')} variant={ useLocation().pathname === '/exchanges' ? "filled" : "default"}>Exchanges</Button>
                <Button onClick={() => navigate('/createexchange')} variant={ useLocation().pathname === '/createexchange' ? "filled" : "default"}>Create an Exchange</Button>
                <Button onClick={() => navigate('/profile')} variant={ useLocation().pathname === '/profile' ? "filled" : "default"}>
                     <Tooltip label={user.firstname + ' ' + user.lastname} withArrow>
                        <Avatar color="cyan" radius="xl" size={30}>{getUserInitials(user)}</Avatar>
                    </Tooltip>
                    <span style={{margin: '0 5px'}}>Profile </span>
                    {user && <UserFlag src={user.teachingLanguageUnfolded && user.teachingLanguageUnfolded.smallFlag}/>}
                    {user && <UserFlag src={user.learningLanguageUnfolded && user.learningLanguageUnfolded.smallFlag}/>}
                </Button>
                <Button onClick={() => navigate('/settings')} variant={ useLocation().pathname === '/settings' ? "filled" : "default"}>Settings</Button>
            </Button.Group>}
            {!user && <Button.Group>
                <Button onClick={() => navigate('/')} variant={ useLocation().pathname === '/' ? "filled" : "default"}>Home</Button>
                <Button onClick={() => navigate('/about')} variant={ useLocation().pathname === '/about' ? "filled" : "default"}>About</Button>
                <Button onClick={() => navigate('/contact')} variant={ useLocation().pathname === '/contact' ? "filled" : "default"}>Contact</Button>         
            </Button.Group>}
            <div>
            {user &&  <Button onClick={logout} variant="light">Logout</Button>}
            {!user &&  <Button onClick={() => navigate('/login')} variant="light">Login</Button>}
            </div>
        </div>
    )
}