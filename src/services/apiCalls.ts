import { db } from "../firebaseConfig";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";

  export async function getCollection (collectionName: string) {
    return new Promise(async (resolve, reject) => {
        try {
            const colRef = collection(db, collectionName)
            const snapshots = await getDocs(colRef)
            let data: Array<object> = []
            snapshots.docs.forEach((doc) => {
                data.push({...doc.data(), id: doc.id })
            })
            resolve({
                error: false,
                data
            });
      
          } catch (error) {
            reject({
                error: true,
                message: error.message
            })
          }
    })
 
}

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

export async function getOneDoc (collectionName: string, docId: string){
    return new Promise(async (resolve, reject) => {
        try {
            const docRef = doc(db, collectionName, docId);
            const docSnap = await getDoc(docRef);
            resolve({
              error: false,
              docSnap
          });
          
          } catch (error) {
            reject({
                error: true,
                message: error.message
            })
          }
    })
}

export async function updateDoc (collectionName: string, docId: string, data: object){
    return new Promise(async (resolve, reject) => {
        try {
          const ref = doc(db, collectionName, docId);
          const response = await setDoc(ref, data);
          console.log('response', response);
          
          resolve({
              error: false,
              response
          });
          
          } catch (error) {
            reject({
                error: true,
                message: error.message
            })
          }
    })
}

export async function deleteOneDoc (collectionName: string, docId: string){
    return new Promise(async (resolve, reject) => {
        try {
          const ref = doc(db, collectionName, docId);
          const response = await deleteDoc(ref);
          
          resolve({
              error: false,
              response
          });
          
          } catch (error) {
            reject({
                error: true,
                message: error.message
            })
          }
    })
}
export async function deleteMultipleDocs (collectionName: string, collectionPropertyValue: string, targetId: string){
    return new Promise(async (resolve, reject) => {
        try {
        const collectionRef = collection(db, collectionName)
        const snapshots = await getDocs(collectionRef)
        let idsOfDocsToDelete = []
        snapshots.docs.forEach((doc) => { 
            if (doc.data()[collectionPropertyValue] === targetId) {
                idsOfDocsToDelete.push(doc.id)
            }

        })
        console.log('idsOfDocsToDelete', idsOfDocsToDelete);

        const promises = idsOfDocsToDelete.map((id) => deleteOneDoc (collectionName, id))
        const promisesResult = await Promise.all(promises);
        console.log('promisesResult', promisesResult);
          resolve({
              error: false,
              response: promisesResult
          });
          
          } catch (error) {
            reject({
                error: true,
                message: error.message
            })
          }
    })
}