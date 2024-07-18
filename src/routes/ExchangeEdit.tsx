import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useLanguages from '@/hooks/useLanguages';
import { notifications } from '@mantine/notifications';
import { Button, Input, Text, Space } from '@mantine/core';
import { exchangeFormFields } from '@/common/formsFields'
import { formatPostData, updateFormFieldsWithDefaultData, updateFormFieldsWithSavedData } from '@/common/formHelpers'
import { updateDoc, getOneDoc, deleteOneDoc } from '@/services/apiCalls'
import { validateForm } from '@/services/formValidation'
import { useAuth } from "@/hooks/useAuth";
import Form from '@/components/Forms/Form'

export default function ExchangeEdit (props) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [fields, setFields] = useState(exchangeFormFields)
  const { user } = useAuth()
  const { languages } = useLanguages();
  let params = useParams();
    
  async function handleSubmit(e:any, stateOfChild: object) {
    e.preventDefault()
    const data = formatPostData({...stateOfChild, organizerId: user.id, participantIds: [user.id] })
    console.log(data);
    try {
        const colRef = await updateDoc('exchanges', params.exchangeId, data)
        console.log('colRef', colRef);
        notifications.show({ color: 'green', title: 'Success', message: 'Exchange updated', })
        navigate('/exchanges')
      } catch (error) {
        console.log(error);
        notifications.show({ color: 'red', title: 'Error', message: 'Error updating Exchange', })
      }
  }
    async function handleValidateForm(form) { 
      // yup validation
      const validationResponse = await validateForm('newExchange', form)
      setError('');
      setFormValid(true);
      if (typeof validationResponse === 'string') {
          setError(validationResponse);
          setFormValid(false);
          return
      }
      if (typeof validationResponse !== 'object') { setError('wrong yup repsonse type'); setFormValid(false); return alert('wrong yup repsonse type')}
      // success so make post api call possible
      setError('');
      setFormValid(true);
    }

    async function deleteDoc(){
      try {
        const colRef = await deleteOneDoc('exchanges', params.exchangeId)
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
          getOneDoc("exchanges", params.exchangeId)
          .then(({docSnap}) => {
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
              />}
              <Button onClick={deleteDoc}>Delete</Button>
              <Space h="xl" />
              <Space h="xl" />
  
         </div>)
}