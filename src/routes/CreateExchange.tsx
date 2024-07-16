import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useLanguages from '@/hooks/useLanguages';
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, cancelLoading } from '@/features/loading/loadingSlice'

import { notifications } from '@mantine/notifications';
import { Button, Input, Text, Space } from '@mantine/core';
import { exchangeFormFields } from '@/common/formsFields'
import { formatPostData, updateFormFieldsWithDefaultData } from '@/common/formHelpers'
import { postDoc } from '@/common/apiCalls'
import { validateForm } from '@/common/formValidation'
import { useAuth } from "@/hooks/useAuth";
import Form from '@/components/Forms/Form'

export default function CreateExchange (props) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [fields, setFields] = useState(exchangeFormFields)
  const { user } = useAuth()
  const { languages } = useLanguages();

  const dispatch = useDispatch()

  async function handleSubmit(e:any, stateOfChild: object) {
    try {
        dispatch(setLoading())
        e.preventDefault()
        const data = formatPostData({...stateOfChild, organizerId: user.id, participantIds: [user.id] })
        console.log(data);
        const colRef = await postDoc('exchanges', data)
        dispatch(cancelLoading())
        console.log('colRef', colRef);
        notifications.show({ color: 'green', title: 'Success', message: 'Exchange created', })
        navigate('/exchanges')
      } catch (error) {
        dispatch(cancelLoading())
        console.log(error);
        notifications.show({ color: 'red', title: 'Error', message: 'Error creating Exchange', })
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

    useEffect(() => {
      if (languages.length > 0) {
          // not really default data, its based on user data, maaybe change in future
          const defaultData = {
              teachingLanguage: languages.find( lang => lang.id === user.teachingLanguageId),
              learningLanguage: languages.find( lang => lang.id === user.learningLanguageId),
          }
          const updatedFields = updateFormFieldsWithDefaultData(fields, defaultData)
          setFields(updatedFields);
          setBusy(false)
      }
      
    }, [languages])

    return (<div className='flex-col'>
            <h2>Create an Exchange</h2>
              {!busy && 
                <Form 
                    fields={fields}
                    user={user} 
                    onSubmit={(e, stateOfChild) => handleSubmit(e, stateOfChild)} 
                    validateForm={handleValidateForm} 
                    error={error} 
                    formValid={formValid}
                />
              }
              <Space h="xl" />
              <Space h="xl" />
         </div>)
}