
// import { getCollection } from "exchanges.shared"
import { db as FIREBASE_DB } from "@/firebaseConfig";
import { useEffect, useState } from 'react';
import {
    // collection,
    onSnapshot,
    doc
  } from "firebase/firestore";

const useFetchOne = (collectionName: string, docId: string) => {
    const [data, setData] = useState(null)
    console.log('useFetchOne ran');
    useEffect(() => {
        const unsub = onSnapshot(doc(FIREBASE_DB, collectionName, docId), (doc) => {
            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            setData(doc.data())
          });
    }, [])

    return {
        data
    }
}

export default useFetchOne;