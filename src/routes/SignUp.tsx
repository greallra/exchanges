import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { notifications } from '@mantine/notifications';
import { Button, Input, Text, Space } from '@mantine/core';
import { userFormFields } from '../common/forms'
import { db } from "../firebaseConfig";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
import { validateForm } from '../common/formValidation'
import Form from '../components/Forms/Form'
import _ from 'lodash';


const containerMain = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

const SignUp = ():React.JSX.Element => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [fields, setFields] = useState(userFormFields)

    async function handleSubmit(e, stateOfChild) {
        e.preventDefault()
        const data = formatPostData(stateOfChild)
        console.log(data);
        
        try {
            // to do externalise all api calls to FB
            const colRef = collection(db, 'users')
            const docRef = await addDoc(colRef, data)
            console.log('docRef', docRef);
            notifications.show({ color: 'green', title: 'Success', message: 'User created', })
          } catch (error) {
            console.log(error);
            notifications.show({ color: 'red', title: 'Error', message: 'Error creating user', })
          }
    
    }
    function formatPostData (data) {
        return {
            ...data,
            learningLanguage: data.learningLanguage.id,
            teachingLanguage: data.teachingLanguage.id
        }
    }
    async function handleValidateForm(form) {
        // yup validation
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

    return <div style={containerMain}>
        <h2>Sign Up</h2>
        <Form 
            fields={fields} 
            onSubmit={(e, stateOfChild) => handleSubmit(e, stateOfChild)} 
            validateForm={handleValidateForm} 
            error={error} 
            formValid={formValid}
        />
        <Space h="xl" />
        <Space h="xl" />
        <Text fz="md" lh="md"><Link to="/login">Already have an account? Log in</Link></Text>
    </div>
}
export default SignUp;