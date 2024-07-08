import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
import { Button, Input, Text, Space } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useAuth } from "../hooks/useAuth";
import Alert from '../components/Alert';

export default function Login() {
    const [error, setError] = useState(false)
    const [users, setUsers] = useState([])
    const [userName, setUserName] = useState([])
    const { login } = useAuth();

    useEffect(() => {
        const collectionRef = collection(db, 'users')
        getDocs(collectionRef)
        .then((snapshots) => {
            let users = []
            snapshots.docs.forEach((doc) => {
                console.log('snapshots', doc.data());
                users.push({id: doc.id, ...doc.data()})
                setUsers(users);
            })
        });
    }, [])

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserName(e.target.value);
    }

    const handleLogin = () => {
        setError(false);
        console.log(users);  
        const user = users.find((user) => user.username === userName);
        if (user) {
            login(user);
        } else {
            setError(true);
        }
        console.log(findUser);     
    }

    return <div className="flex-col">
    <h1>Login</h1>
    <h2>Username</h2>
    <Input placeholder="" value={userName} onChange={handleUserNameChange}/>
    <Button  disabled={false} variant="filled" size="xl" style={{marginTop: '40px'}} onClick={handleLogin}>Login</Button>
    <Space h="xl" />
    <Alert text="Username not found" show={error}/>
    <Space h="xl" />
    <div><span style={{marginRight: '10px'}}>Don't have an account?</span>
    <Link to="/signup">Sign Up</Link>
    </div> 
    </div>
}