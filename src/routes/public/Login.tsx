// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, cancelLoading } from '@/features/loading/loadingSlice'

import { Button, Input, Text, Space } from '@mantine/core';
import { useState, useEffect } from 'react';
import Alert from '@/components/Alert';

import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export default function Login() {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    }

    const handleLogin = () => {
        dispatch(setLoading())
        setError(false);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in - Listener in Auth Hook will handle setting user and navigate to app
            dispatch(cancelLoading())  
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch(cancelLoading())
            setError(errorMessage);
        });
    }

    return <div className="flex-col">
    <h1>Login</h1>
    <h4>Email</h4>
    <Input placeholder="" value={email} onChange={handleEmailChange}/>
    <h4>Password</h4>
    <Input placeholder="" value={password} onChange={(e) => setPassword(e.target.value)}/>
    <Button  disabled={false} variant="filled" size="xl" style={{marginTop: '40px'}} onClick={handleLogin}>Login</Button>
    <Space h="xl" />
    <Alert text="Username not found" show={error}/>
    <Space h="xl" />
    </div>
}