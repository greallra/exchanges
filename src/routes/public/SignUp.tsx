import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useLanguages from '@/hooks/useLanguages';
import { notifications } from '@mantine/notifications';
// import { Button, Input, Text, Space } from '@mantine/core';
import { userFormFields } from '@/common/formsFields'
import { updateFormFieldsWithDefaultData, formatPostData } from '@/common/formHelpers'
import { getOneDoc, postDoc } from '@/common/apiCalls'
import { validateForm } from '@/common/formValidation'
import Form from '@/components/Forms/Form'
import { useAuth } from "@/hooks/useAuth";

const SignUp = ():React.JSX.Element => {
    const navigate = useNavigate();
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [formFields, setFormFields] = useState(false);
    const { languages } = useLanguages();
    const { login } = useAuth();

    async function handleSubmit(e, stateOfChild) {
        e.preventDefault()
        const data = formatPostData(stateOfChild)
        try {
            const { error: postError, docRef: usersPostRef } = await postDoc('users', data)
            notifications.show({ color: 'green', title: 'Success', message: 'User created', })
            const { error: getOneDocErr, docSnap } = await getOneDoc('users', usersPostRef.id)
            login({...docSnap.data(), id: docSnap.id})
            // navigate('/exchanges')
          } catch (error) {
            console.log(error);
            notifications.show({ color: 'red', title: 'Error', message: 'Error creating user', })
          }
    
    }
    async function handleValidateForm(form) {
        // yup validation
        console.log('form', form);
        
        const validationResponse = await validateForm('newUser', form)
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
    useEffect(() => {
        if (languages.length > 0) {
            const defaultData = {
                teachingLanguage: languages[Math.floor(Math.random() * languages.length)],
                learningLanguage: languages[Math.floor(Math.random() * languages.length)],
            }
            const updatedFields = updateFormFieldsWithDefaultData(userFormFields, defaultData)
            setFormFields(updatedFields);
            setBusy(false)
        }
        
      }, [languages])

    return <div className="content-wrapper">
        <h2>Sign Up</h2>
        {!busy && <Form 
            fields={formFields} 
            onSubmit={(e, stateOfChild) => handleSubmit(e, stateOfChild)} 
            validateForm={handleValidateForm} 
            error={error} 
            formValid={formValid}
        />}

    </div>
}
export default SignUp;