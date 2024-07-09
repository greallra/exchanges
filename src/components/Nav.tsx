import { useNavigate, useLocation } from "react-router-dom";
import { Button, Image } from '@mantine/core';
import { useAuth } from "../hooks/useAuth";

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
                src="/src/assets/logo.png"
            />
            </div>
            {user && <Button.Group>
                <Button onClick={() => navigate('/exchanges')} variant={ useLocation().pathname === '/exchanges' ? "filled" : "default"}>Exchanges</Button>
                <Button onClick={() => navigate('/createexchange')} variant={ useLocation().pathname === '/createexchange' ? "filled" : "default"}>Create an Exchange</Button>
                <Button onClick={() => navigate('/profile')} variant={ useLocation().pathname === '/profile' ? "filled" : "default"}>Profile</Button>
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