import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, cancelLoading } from '@/features/loading/loadingSlice'

import { Button, Input, Text, Space } from '@mantine/core';
import { useState, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import { useAuth } from "@/hooks/useAuth";
import Alert from '@/components/Alert';

export default function Login() {
    const [error, setError] = useState(false)
    const [userName, setUserName] = useState([])
    const { login } = useAuth();
    const { data: users } = useFetch('users')

    const dispatch = useDispatch()

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserName(e.target.value);
    }

    const handleLogin = () => {
        dispatch(setLoading())
        setError(false);
        console.log(users);  
        const user = users.find((user) => user.username === userName);
        if (user) {
            login(user);
            dispatch(cancelLoading())
        } else {
            dispatch(cancelLoading())
            setError(true);
        }
    }

    return <div className="flex-col">
    <h1>Login</h1>
    <h2>Username</h2>
    <Input placeholder="" value={userName} onChange={handleUserNameChange}/>
    <Button  disabled={false} variant="filled" size="xl" style={{marginTop: '40px'}} onClick={handleLogin}>Login</Button>
    <Space h="xl" />
    <Alert text="Username not found" show={error}/>
    <Space h="xl" />
    </div>
}