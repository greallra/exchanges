import { useNavigate, useLocation } from "react-router-dom";
import { Button } from '@mantine/core';
import { useAuth } from "../hooks/useAuth";

const container = {
    display: 'flex',
    justifyContent: 'space-evenly'
}

export default function () {
    const navigate = useNavigate();
    const { logout } = useAuth();
    return (
        <div style={container} className="nav-cont">
            {/* <div onClick={() => navigate('/exchanges')}> Exchanges</div>
            <div onClick={() => navigate('/profile')}>Profile</div>
            <div onClick={() => navigate('/settings')}>Settings</div> */}
            <Button.Group>
                <Button onClick={() => navigate('/exchanges')} variant={ useLocation().pathname === '/exchanges' ? "filled" : "default"}>Exchanges</Button>
                <Button onClick={() => navigate('/createexchange')} variant={ useLocation().pathname === '/createexchange' ? "filled" : "default"}>Create an Exchange</Button>
                <Button onClick={() => navigate('/profile')} variant={ useLocation().pathname === '/profile' ? "filled" : "default"}>Profile</Button>
                <Button onClick={() => navigate('/settings')} variant={ useLocation().pathname === '/settings' ? "filled" : "default"}>Settings</Button>
                <Button onClick={logout} color="red">Logout</Button>
            </Button.Group>
        </div>
    )
}