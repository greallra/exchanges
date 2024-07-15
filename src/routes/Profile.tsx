import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from 'react'
import { userFormFields } from '@/common/formsFields'
import { validateForm } from '@/common/formValidation'
import { updateFormFieldsWithDefaultData, updateFormFieldsWithSavedData, formatPostData } from '@/common/formHelpers'
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import useLanguages from '@/hooks/useLanguages';
import Form from '@/components/Forms/Form'
import { updateDoc, getOneDoc } from '@/common/apiCalls'

interface alertProps {
    show: boolean,
    text: string
}

export default function Profile() {
  const {user, login } = useAuth()
  const [error, setError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [fields, setFields] = useState(userFormFields);
  const [busy, setBusy] = useState(true);
  const { languages } = useLanguages();
  const [opened, { open, close }] = useDisclosure(false);

  async function handleSubmit(e, stateOfForm) {
    console.log(stateOfForm);
    try {
        const { error: updateError, response } = await updateDoc('users', user.id, formatPostData(stateOfForm))
        const { error: getOneDocErr, docSnap } = await getOneDoc('users', user.id)
        open()
        login({...docSnap.data(), id: docSnap.id})
        notifications.show({ color: 'green', title: 'Success', message: 'Information saved', })
        console.log('response, response');
      } catch (error) {
        console.log(error);
        notifications.show({ color: 'red', title: 'Error', message: 'Error creating user', })
      }
  }

  async function handleValidateForm(form) { 
    // yup validation
    const validationResponse = await validateForm('newUser', form)
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
        const updatedFields = updateFormFieldsWithDefaultData(fields, {...dataUpdatedWithSaved, ...defaultData})
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
        <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>
    </div>
  );
}