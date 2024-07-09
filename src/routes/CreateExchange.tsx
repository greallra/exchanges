import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { notifications } from '@mantine/notifications';
import { Button, Input, Text, Space } from '@mantine/core';
import { exchangeFormFields } from '../common/forms'
import { formatPostData } from '../common/formHelpers'
import { postDoc } from '../common/apiCalls'
import { validateForm } from '../common/formValidation'
import { useAuth } from "../hooks/useAuth";
import Form from '../components/Forms/Form'

export default function CreateExchange (props) {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formValid, setFormValid] = useState(false);
  // const [fields, setFields] = useState(exchangeFormFields)
  const { user } = useAuth()
    
    async function handleSubmit(e:any, stateOfChild: object) {
      e.preventDefault()
      const data = formatPostData({...stateOfChild, organizer: user.id, participantIds: [user.id] })
      console.log(data);
      try {
          // to do externalise all api calls to FB
          const colRef = await postDoc('exchanges', data)
          console.log('colRef', colRef);
          notifications.show({ color: 'green', title: 'Success', message: 'User created', })
        } catch (error) {
          console.log(error);
          notifications.show({ color: 'red', title: 'Error', message: 'Error creating user', })
        }
  
      // e.preventDefault();
      //  const data = {
      //     name,
      //     capacity,
      //     duration,
      //     languageOne,
      //     languageTwo,
      //     participants: 1,
      //     participantsLanguageOne: 1,
      //     participantsLanguageTwo: 0,
      //     time,
      //     organizer: user.id,
      //     participantIds: [user.id]
      //  }
      //   try {
      //     const colRef = collection(db, 'exchanges')
      //     const docRef = await addDoc(colRef, data)
      //     alert('Document was created with ID:', docRef.id) 
      //   } catch (error) {
      //     console.log(error);
          
    }
      async function handleValidateForm(form) { 
        // yup validation
        const validationResponse = await validateForm('newExchange', form)
        console.log(validationResponse);
        setError('');
        setFormValid(true);
        if (typeof validationResponse === 'string') {
            setError(validationResponse);
            setFormValid(false);
            return
        }
        if (typeof validationResponse !== 'object') {
            setError('wrong yup repsonse type');
            setFormValid(false);
            return alert('wrong yup repsonse type')
        }
        // success so make post api call possible
        setError('');
        setFormValid(true);
      }

    return (<div className='flex-col'>
            <h2>Create an Exchange</h2>
              <Form 
                  fields={exchangeFormFields} 
                  onSubmit={(e, stateOfChild) => handleSubmit(e, stateOfChild)} 
                  validateForm={handleValidateForm} 
                  error={error} 
                  formValid={formValid}
              />
              <Space h="xl" />
              <Space h="xl" />
         </div>)
}