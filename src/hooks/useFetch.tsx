import { db } from "../firebaseConfig";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
import { useEffect, useState } from 'react';

const useFetch = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const collectionRef = collection(db, 'users')
        getDocs(collectionRef)
        .then((snapshots) => {
            snapshots.docs.forEach((doc) => {
                console.log('snapshots', typeof doc.data());
                setUsers([doc.data()]);
            })
        });
    }, [])
    return {
        users
    }
}

export default useFetch;