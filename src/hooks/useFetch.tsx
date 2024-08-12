import { db } from "../firebaseConfig";
import {
    collection,
    getDocs,
  } from "firebase/firestore";
import { useEffect, useState } from 'react';

const useFetch = (collectionName: string) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const collectionRef = collection(db, collectionName)
        getDocs(collectionRef)
        .then((snapshots) => {
            let data = []
            snapshots.docs.forEach((doc) => {
                data.push({...doc.data(), id: doc.id })
                setData(data);
            })
        });
    }, [])
    return {
        data
    }
}

export default useFetch;