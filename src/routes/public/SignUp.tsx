import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useLanguages from '@/hooks/useLanguages';
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, cancelLoading } from '@/features/loading/loadingSlice'

import { notifications } from '@mantine/notifications';
import { Button } from "@mantine/core";
import { userFormFields } from '@/common/formsFields'
import { updateFormFieldsWithDefaultData, formatPostData } from '@/common/formHelpers'
import { getOneDoc, postDoc } from '@/services/apiCalls'
import { validateForm } from '@/services/formValidation'
import Form from '@/components/Forms/Form'
import { useAuth } from "@/hooks/useAuth";
// FB
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "@/firebaseConfig";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";

const SignUp = ():React.JSX.Element => {
    const navigate = useNavigate();
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [formFields, setFormFields] = useState(false);
    const { languages } = useLanguages();
    const { login } = useAuth();

    const dispatch = useDispatch()

    async function handleSubmit(e, stateOfChild) {
        e.preventDefault()
        dispatch(setLoading())
        const data = formatPostData(stateOfChild)
        try {
            console.log('data', data);
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, stateOfChild.email, stateOfChild.password)
            console.log('userCredential', userCredential);
            delete data.password
            await setDoc(doc(db, "users", userCredential.user.uid), { id: userCredential.user.uid, ...data });
            // const { error: postError, docRef: usersPostRef } = await postDoc('users', data)
            notifications.show({ color: 'green', title: 'Success', message: 'User created', })
            // const { error: getOneDocErr, docSnap } = await getOneDoc('users', usersPostRef.id)
            login({id: userCredential.user.uid, uid: userCredential.user.uid, ...userCredential.user, ...data})
            dispatch(cancelLoading())
            // navigate('/exchanges')
          } catch (error) {
            dispatch(cancelLoading())
            console.log(error, typeof error, error.message);
            setError(error.message)
            notifications.show({ color: 'red', title: 'Error', message: 'Error creating user', })
          }
    
    }
    // async function openGooglePopup(params:type) {
    //     const provider = await new GoogleAuthProvider();
    //     const auth = getAuth();
    //     signInWithPopup(auth, provider)
    //     .then((result) => {
    //         // This gives you a Google Access Token. You can use it to access the Google API.
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken;
    //         // The signed-in user info.
    //         const user = result.user;
    //         console.log('user', user);
    //         console.log('result', result);
            
    //         // IdP data available using getAdditionalUserInfo(result)
    //         // ...
    //     }).catch((error) => {
    //         console.log('error', error);
            
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         const email = error.customData.email;
    //         // The AuthCredential type that was used.
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //         // ...
    //     });
    // }
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
        {/* <Button onClick={openGooglePopup}>Sign in with Google</Button> */}
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