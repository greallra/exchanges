import { db } from "../firebaseConfig";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";

export async function postDoc (collectionName: string, data){
    return new Promise(async (resolve, reject) => {
        try {
            const colRef = collection(db, collectionName)
            const docRef = await addDoc(colRef, data)
            resolve({
                error: false,
                docRef
            });
      
          } catch (error) {
            reject({
                error: true,
                message: error.message
            })
          }
    })
}