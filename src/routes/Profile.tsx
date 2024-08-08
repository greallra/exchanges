import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, cancelLoading } from '@/features/loading/loadingSlice'

import { userFormFields } from '@/common/formsFields'
import { validateForm } from '@/services/formValidation'
import { updateFormFieldsWithDefaultData, updateFormFieldsWithSavedData, formatPostData } from '@/common/formHelpers'
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import useLanguages from '@/hooks/useLanguages';
import Form from '@/components/Forms/Form'
import { updateDoc, getOneDoc, deleteMultipleDocs } from '@/services/apiCalls'

interface alertProps {
    show: boolean,
    text: string
}

export default function Profile() {
  const {user, login } = useAuth()
  const [error, setError] = useState('');
  const [acceptedWarning, setAcceptedWarning] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [fields, setFields] = useState(userFormFields);
  const [busy, setBusy] = useState(true);
  const { languages } = useLanguages();
  const [opened, { open, close }] = useDisclosure(false);

  const dispatch = useDispatch()

  async function handleSubmit(e, stateOfForm) {
    console.log(stateOfForm);
    if (!acceptedWarning) {
      return openWarningModal()
    }
    try {
        // dispatch(setLoading())
        delete stateOfForm.password
        await deleteMultipleDocs ('exchanges', 'organizerId', user.id)
        const { error: updateError, response } = await updateDoc('users', user.id, formatPostData(stateOfForm))
        const { error: getOneDocErr, docSnap } = await getOneDoc('users', user.id)
        login({...docSnap.data(), id: docSnap.id})
        dispatch(cancelLoading())
        notifications.show({ color: 'green', title: 'Success', message: 'Information saved', })
        console.log('response, response');
      } catch (error) {
        console.log(error);
        dispatch(cancelLoading())
        notifications.show({ color: 'red', title: 'Error', message: 'Error creating user', })
      }
  }
  function openWarningModal(params:type) {
    return open()
  }

  async function handleValidateForm(form) { 
    // yup validation
    const validationResponse = await validateForm('editUser', form)
    console.log(validationResponse);
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
          validateForm={handleValidateForm} 
          error={error} 
          formValid={formValid}
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