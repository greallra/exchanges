import {useState} from 'react';
import { Formik } from 'formik';
import { Button, Checkbox, Group, TextInput, NumberInput, Select } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { LanguagePicker } from '../components/LanguagePicker';
import useLanguages from '../hooks/useLanguages';
import { collection, addDoc } from "firebase/firestore"
import { useAuth } from "../hooks/useAuth";
import { db } from '../firebaseConfig'

export default function CreateExchange (props) {
    
    const { languages, selectedLanguage, setSelectedLanguage } = useLanguages();
    const {user} = useAuth()
    const [name, setName] = useState<string>('');
    const [capacity, setCapacity] = useState<string>('4');
    const [languageOne, setLanguageOne] = useState<string>('Spanish');
    const [languageTwo, setLanguageTwo] = useState<string>('English');
    const [time, setTime] = useState<object>(new Date())
    const [duration, setDuration] = useState<number>(30);
    const [errors, setErrors] = useState<object>({});
    // console.log('props CE', languages, selectedLanguage, setSelectedLanguage);
    // console.log('user', user);
    

    function handleChange(e:any) {
      console.log(typeof e, e);
      
    }
    async function handleSubmit(e:any) {
      e.preventDefault();
       const data = {
          name,
          capacity,
          duration,
          languageOne,
          languageTwo,
          participants: 1,
          participantsLanguageOne: 1,
          participantsLanguageTwo: 0,
          time,
          organizer: user.id,
          participantIds: [user.id]
       }
        try {
          const colRef = collection(db, 'exchanges')
          const docRef = await addDoc(colRef, data)
          alert('Document was created with ID:', docRef.id) 
        } catch (error) {
          console.log(error);
          
        }

    }

    return (<div className='flex'><form onSubmit={handleSubmit}>
            <TextInput
                withAsterisk
                label="Location Name"
                name="name"
                placeholder="Enter a location"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
             { errors.name }
            {/* <NumberInput
              label="Capacity"
              name="capacity"
              description="Input Capacity"
              placeholder="Input Capacity"
              value={capacity}
              isAllowed={((values: NumberFormatValues) => false)}
              onChange={(e) => handleSetCapacity(e)}
              max={10}
            /> */}
             <Select
              label="Capacity"
              placeholder="Pick value"
              value={capacity}
              onChange={(e) => handleSetCapacity(e)}
              data={['2', '4', '6', '8', '10', '12']}
            />
            {errors.capacity }
            <DateTimePicker 
              value={time}
              onChange={(e) => setTime(e)}
              label="Pick date and time" 
              placeholder="Pick date and time" 
              valueFormat="DD MMM YYYY hh:mm A" />
              { errors.time }
            <NumberInput
              label="Duration"
              name="duration"
              description="duration"
              placeholder="duration"
              value={duration}
              onChange={(e) => setDuration(e)}
              max={120}
            />
            {errors.duration }
            {/* <h2>Language 1</h2>
            <LanguagePicker languages={languages} selected={selectedLanguage} setSelected={setSelectedLanguage} languageOne={true}/>
            <h2>Language 2</h2>
            <LanguagePicker languages={languages} selected={selectedLanguage} setSelected={setSelectedLanguage} languageOne={false}/> */}
           <button type="submit">
             Submit
           </button>
         </form>
         </div>)
}