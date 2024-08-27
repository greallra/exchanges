import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
// Utils
import { formatUsersData, esDeleteDoc, esGetCollection, esGetDoc } from 'exchanges-shared'
import { db as FIREBASE_DB } from "@/firebaseConfig";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

export default function ProfileView() {
let params = useParams();


  // Get the user
  const { data: user } = useQuery({
    queryKey: ['user', params.userId],
    queryFn: async () => {
        const result = await esGetDoc(FIREBASE_DB, 'users', params.userId)
        console.log(result.docSnap.data());
        
        return result.docSnap.data();
    },
  })
const teachingLanguageId = user?.teachingLanguageId

// Then get the user's language
const {
  status,
  fetchStatus,
  data: teachingLanguage,
} = useQuery({
  queryKey: ['language', teachingLanguageId],
    queryFn: async () => {
        const result = await esGetDoc(FIREBASE_DB, 'languages', teachingLanguageId)
        return result.docSnap.data();
    },
  enabled: !!teachingLanguageId,
})

  return (
    <div>
        <h3>ProfileView</h3>
        <div>{JSON.stringify(user)}</div>
        <div>{JSON.stringify(teachingLanguage)}</div>
    </div>
  )
}
