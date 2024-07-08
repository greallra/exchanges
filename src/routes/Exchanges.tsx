import exchangesImport from '../mockData/exchanges';
import ExchangeItem from '../components/ExchangeItem'
import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { isFirebaseId, formatExchange } from '../utils'
import { db } from "../firebaseConfig";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";

const exchangeContStyle = {
    width: '600px',
    margin: 'auto'
}




const exchanges = () => {
    const [loading, setLoading] = useState(true)
    const [exchanges, setExchanges] = useState([])
    const [users, setUsers] = useState([])
    const [languages, setLanguages] = useState([])

   useEffect(() => {
        async function fetchData() {
            const collectionRefLanguages = collection(db, 'languages')
            const collectionRefExchanges = collection(db, 'exchanges')
            const collectionRefUsers = collection(db, 'users')
            let users = []
            let exchanges = []
            let languages = []
            const snapshotsLanguages = await getDocs(collectionRefLanguages)
            snapshotsLanguages.docs.forEach((doc) => {
                let data = {id: doc.id, ...doc.data()}
                languages.push(data)
                setLanguages(languages);
            })
            const snapshotsUsers = await getDocs(collectionRefUsers)
            snapshotsUsers.docs.forEach((doc) => {
                let data = {id: doc.id, ...doc.data()}
                users.push(data)
                setUsers(users);
            })
            const snapshotsExchanges = await getDocs(collectionRefExchanges)
            snapshotsExchanges.docs.forEach((doc) => {
                let data = {id: doc.id, ...doc.data()}
                const formattedExchange = formatExchange(data, languages)
                exchanges.push(formattedExchange)
                setExchanges(exchanges);
            })
            setLoading(false);
        }
        fetchData();
   }, [])
    return (
        <div style={exchangeContStyle}>
            <h2>Today</h2>
            {loading && <Loader color="blue" />}
            {exchanges.length === 0 && !loading && 'No Exchanges'}
            {exchanges.length > 0 && exchanges.map((exchange) => {
                return <ExchangeItem 
                    key={exchange.id} 
                    exchangeId={exchange.id} 
                    location={exchange.name} 
                    capacity={exchange.capacity} 
                    organizer={exchange.organizer} 
                    participants={exchange.participants} 
                    time={exchange.time}
                    languageOne={exchange.languageOne}
                    languageTwo={exchange.languageTwo}
                    participantsLanguageOne={exchange.participantsLanguageOne}
                    participantsLanguageTwo={exchange.participantsLanguageTwo}
                    participantIds={exchange.participantIds}
                    users={users}
                    />
            })}
        </div>
    )
}
export default exchanges;