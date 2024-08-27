import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from 'react'
import { useStore } from '@/store/store'

import { formatPostDataUser, validateForm, updateFormFieldsWithDefaultData, updateFormFieldsWithSavedData,
  esUpdateDoc, esGetDoc, esDeleteDocs, getFormFields
} from 'exchanges-shared'
import { db as FIREBASE_DB } from "@/firebaseConfig";
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import useLanguages from '@/hooks/useLanguages';
import Form from '@/components/Forms/Form'

interface alertProps {
    show: boolean,
    text: string
}

export default function Profile() {
  const {user, login } = useAuth()
  const [error, setError] = useState('');
  const [acceptedWarning, setAcceptedWarning] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [fields, setFields] = useState(getFormFields('user', 'WEB'));
  const [busy, setBusy] = useState(true);
  const { languages } = useLanguages();
  const [opened, { open, close }] = useDisclosure(false);

  const loading = useStore((state) => state.loading)
  const setLoading = useStore((state) => state.setLoading)
  const stopLoading = useStore((state) => state.stopLoading)

  async function handleSubmit(e, stateOfForm) {
    setLoading()
    console.log(stateOfForm);        
    setError('')
    if (!acceptedWarning) {
      return openWarningModal()
    }
    try {
        delete stateOfForm.password
        // const constructForm = {...stateOfForm, organizerId: user.id || user.uid, participantIds: [user.id || user.uid] }
        const formFormatted = formatPostDataUser(stateOfForm)
        const validationResponse = await validateForm('editUser', formFormatted)
        if (typeof validationResponse === 'string') {
          notifications.show({ color: 'red', title: 'Error', message: 'Erors in form', })
          stopLoading()
          setError(validationResponse);
          setFormValid(false);
          return
        }
  
        await esDeleteDocs(FIREBASE_DB, 'exchanges', 'organizerId', user.id)
        const { error: updateError, response } = await esUpdateDoc(FIREBASE_DB, 'users', user.id || user.uid, formatPostDataUser(stateOfForm))
        const { error: getOneDocErr, docSnap } = await esGetDoc(FIREBASE_DB, 'users', user.id || user.uid)
        login({...docSnap.data(), id: docSnap.id})
        stopLoading()
        notifications.show({ color: 'green', title: 'Success', message: 'Information saved', })
        console.log('response, response');
      } catch (error) {
        console.log(error);
        stopLoading()
        notifications.show({ color: 'red', title: 'Error', message: 'Error creating user', })
      }
  }
  function openWarningModal(params:type) {
    return open()
  }

  useEffect(() => {
    if (languages.length > 0) {
        // saved data
        const dataUpdatedWithSaved = updateFormFieldsWithSavedData(fields, user)
        // not really default data, its based on user data, maaybe change in future
        const defaultData = {
            teachingLanguage: languages.find( lang => lang.id === user.teachingLanguageId),
            learningLanguage: languages.find( lang => lang.id === user.learningLanguageId),
        }
        let updatedFields = updateFormFieldsWithDefaultData(fields, {...dataUpdatedWithSaved, ...defaultData})
        updatedFields = updatedFields.map( field => !['password', 'email'].includes(field.property) ? field : {...field, hideField: true} )
        setFields(updatedFields);
        setBusy(false)
    }
    
  }, [languages])

  return (
    <div className="content-wrapper">
      <h2>Profile</h2>
      {!busy &&<Form 
          fields={fields} 
          onSubmit={(e, stateOfForm) => handleSubmit(e, stateOfForm)} 
          validateForm={() => {}} 
          error={error} 
          formValid={formValid}
          loading={loading}
        />}
        <Modal opened={opened} onClose={close} title="Warning">
            <Alert variant="light" color="red" icon={<IconInfoCircle />}>
            If you have changed languages. Any exchanges you have created will be delete.
          </Alert>
          <Button mt="md" variant="light" onClick={close}>Cancel</Button>
          <Button mt="md" ml="xs" onClick={() => { setAcceptedWarning(true); close(); }}>Ok</Button>
        </Modal>
    </div>
  );
}