import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useLanguages from '@/hooks/useLanguages';
import { notifications } from '@mantine/notifications';
import { Button, Input, Text, Space } from '@mantine/core';
// import { exchangeFormFields } from '@/common/formsFields'
import {  getFormFields, formatPostDataExchange, esGetDoc, updateFormFieldsWithDefaultData, 
  updateFormFieldsWithSavedData, esUpdateDoc, esDeleteDoc, validateForm } from 'exchanges-shared'
// import { formatPostData, updateFormFieldsWithDefaultData, updateFormFieldsWithSavedData } from '@/common/formHelpers'
import { db as FIREBASE_DB } from "@/firebaseConfig";
import { useStore } from '@/store/store'
import { useAuth } from "@/hooks/useAuth";
import Form from '@/components/Forms/Form'

export default function ExchangeEdit (props) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [fields, setFields] = useState(getFormFields('exchange', 'WEB'))
  const { user } = useAuth()
  const { languages } = useLanguages();
  let params = useParams();
  const loading = useStore((state) => state.loading)
  const setLoading = useStore((state) => state.setLoading)
  const stopLoading = useStore((state) => state.stopLoading)
    
  async function handleSubmit(e:any, stateOfChild: object) {
    e.preventDefault()
    setLoading()
    try {
        const data = formatPostDataExchange({...stateOfChild, organizerId: user.id || user.uid, participantIds: [user.id || user.uid], id: params.exchangeId })

        const validationResponse = await validateForm('editExchange', data)
        const colRef = await esUpdateDoc(FIREBASE_DB, 'exchanges', params.exchangeId, data)
        stopLoading()
        notifications.show({ color: 'green', title: 'Success', message: 'Exchange updated', })
        navigate('/exchanges')
      } catch (error) {
        console.log(error);
        stopLoading()
        notifications.show({ color: 'red', title: 'Error', message: 'Error updating Exchange', })
      }
  }
    async function handleValidateForm(form) { 
    }

    async function deleteDoc(){
      try {
        const colRef = await esDeleteDoc(FIREBASE_DB, 'exchanges', params.exchangeId)
        notifications.show({ color: 'green', title: 'Success', message: 'Exchange Deleted', })
        navigate('/exchanges')
      } catch (error) {
        console.log(error);
        notifications.show({ color: 'red', title: 'Error', message: 'Error deleting Exchange', })
      }
    }

    useEffect(() => {
      if (languages.length > 0) {
          // saved data
          esGetDoc(FIREBASE_DB, "exchanges", params.exchangeId)
          .then(({ docSnap }) => {
            console.log(docSnap);
            const mergeData = {...docSnap.data(), id: docSnap.id}
            // delete mergeData.time
            mergeData.time = new Date(mergeData.time.seconds * 1000)
            const dataUpdatedWithSaved = updateFormFieldsWithSavedData(fields, mergeData)
            console.log('dataUpdatedWithSaved', dataUpdatedWithSaved);
            // not really default data, its based on user data, maaybe change in future
            const defaultData = {
                teachingLanguage: languages.find( lang => lang.id === user.teachingLanguageId),
                learningLanguage: languages.find( lang => lang.id === user.learningLanguageId),
            }
   
            const updatedFields = updateFormFieldsWithDefaultData(fields, {...dataUpdatedWithSaved, ...defaultData})
            setFields(updatedFields);
            setBusy(false)
          })
          .catch((err) => notifications.show({ color: 'red', title: 'Error', message: err.message }))
      }
      
    }, [languages])

    return (<div className='flex-col'>
            <h2>Edit an Exchange</h2>
              {!busy && <Form 
                  fields={fields}
                  user={user} 
                  onSubmit={(e, stateOfChild) => handleSubmit(e, stateOfChild)} 
                  validateForm={handleValidateForm} 
                  error={error} 
                  formValid={formValid}
                  loading={loading}
              />}
              <Button onClick={deleteDoc}>Delete</Button>
              <Space h="xl" />
              <Space h="xl" />
  
         </div>)
}