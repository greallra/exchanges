import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useLanguages from '@/hooks/useLanguages';
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, cancelLoading } from '@/features/loading/loadingSlice'

import { notifications } from '@mantine/notifications';
import { getFormFields, updateFormFieldsWithDefaultData, formatPostDataUser, validateForm, esAddUser } from 'exchanges-shared'
import Form from '@/components/Forms/Form'
import { useAuth } from "@/hooks/useAuth";
// FB
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db as FIREBASE_DB } from "@/firebaseConfig";

const SignUp = ():React.JSX.Element => {
    const navigate = useNavigate();
    const [busy, setBusy] = useState(true);
    const [error, setError] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [formFields, setFormFields] = useState([]);
    const { languages } = useLanguages();
    const { login } = useAuth();

    const dispatch = useDispatch()

    async function handleSubmit(e, stateOfChild) {
        e.preventDefault()
        setError('');
        dispatch(setLoading())
        try {
            const formattedData = formatPostDataUser(stateOfChild)
            const validationResponse = await validateForm('newUser', formattedData)
            if (typeof validationResponse === 'string') {
                notifications.show({ color: 'red', title: 'Error', message: 'Errors in form', })
                dispatch(cancelLoading())
                setError(validationResponse);
                setFormValid(false);
                return
            }
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, stateOfChild.email, stateOfChild.password)
            delete formattedData.password
            await esAddUser (FIREBASE_DB, userCredential, 'users', formattedData)
            notifications.show({ color: 'green', title: 'Success', message: 'User created', })
            login({id: userCredential.user.uid, uid: userCredential.user.uid, ...userCredential.user, ...formattedData})
            dispatch(cancelLoading())
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

    }
    useEffect(() => {
        if (languages.length > 0) {
            const defaultData = {
                teachingLanguage: languages[Math.floor(Math.random() * languages.length)],
                learningLanguage: languages[Math.floor(Math.random() * languages.length)],
            }
            const updatedFields = updateFormFieldsWithDefaultData(getFormFields('user', 'WEB'), defaultData)
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
            overrideInlineValidationTemporaryProp={true}
        />}

    </div>
}
export default SignUp;