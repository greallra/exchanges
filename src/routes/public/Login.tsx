import { useStore } from '@/store/store'

import { Button, Input, Text, Space } from '@mantine/core';
import { useState, useEffect } from 'react';
import Alert from '@/components/Alert';

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth();

export default function Login() {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loading = useStore((state) => state.loading)
    const setLoading = useStore((state) => state.setLoading)
    const stopLoading = useStore((state) => state.stopLoading)


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    }

    const handleLogin = () => {
        setLoading()
        setError(false);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in - Listener in Auth Hook will handle setting user and navigate to app
            stopLoading()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            stopLoading()
            setError(errorMessage);
        });
    }

    return <div className="flex-col">
    <h1>Login</h1>
    <h4>Email</h4>
    <Input placeholder="" value={email} onChange={handleEmailChange}/>
    <h4>Password</h4>
    <Input placeholder="" value={password} onChange={(e) => setPassword(e.target.value)}/>
    <Button loading={loading} disabled={false} variant="filled" size="xl" style={{marginTop: '40px'}} onClick={handleLogin}>Login</Button>
    <Space h="xl" />
    <Alert text={error} show={error}/>
    <Space h="xl" />
    </div>
}