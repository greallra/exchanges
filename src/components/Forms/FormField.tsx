import { TextInput, Select, Image, Text } from '@mantine/core';
import { LanguagePicker } from '../LanguagePicker';
import { DateTimePicker } from '@mantine/dates';

import { useNavigate } from "react-router-dom";

var datePlus11 = new Date();
datePlus11.setDate(datePlus11.getDate() + 11);

interface FormFieldProps {
    type: "text" | "checkbox",
    name: string,
    placeholder: string,
    property: string,
    value: string | boolean | number,
}

interface outputProps {
    onChange: <T>(property: string, value: T) => void
}

const FormField = (p: FormFieldProps, outputProps) => {
    const navigate = useNavigate();

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === 'text') {
            console.log('handleTextChange', p.property, event.target.value);
            p.onChange(p.property, event.target.value)
        }
    }
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === 'checkbox') {
            p.onChange(p.property, event.target.value)
        }
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement> | string | number) => {  
       console.log(event, typeof event,);
       handleTextChange(event)
       handleCheckboxChange(event)
    }
    const handleDirectChange = (language: object) => {  
       p.onChange(p.property, language)
    }
    return (
    <div>
        {/* <label htmlFor={p.label}>{p.name}</label>
        <input 
            type={p.type} 
            name={p.property}
            placeholder={p.placeholder}
            id={p.id}
            value={p.value}
            onChange={handleChange}
        /> */}
        {p.type === 'text' && <TextInput
            mt="md"
            label={p.label}
            placeholder={p.placeholder}
            onChange={handleChange}
            error={p.error}
            value={p.value}
        />}
        {p.type === 'select' &&  <Select
            label={p.label}
            placeholder={p.placeholder}
            onChange={handleDirectChange}
            error={p.error}
            value={p.value}
            data={p.availableValues}
            max={p.max || null}
        />}
        {p.type === 'language_picker' && 
        <>
            <h4>{p.label}</h4>
            <LanguagePicker selected={p.value} setSelected={handleDirectChange}/>
        </>
        }
        {p.type === 'language_shower' && 
        <>
            <h4>{p.label}</h4>
            <div className='flex'>
                <Image
                    radius="md"
                    h={'20px'}
                    src={p.value.smallFlag}
                />
                <div>{p.value.label}</div>
            </div>
            {p.property === 'learningLanguage' && <Text c="blue" className='pointer'  size="xs" onClick={() => navigate('/profile')}>Change Language</Text>}
        </>
        }
        {p.type === 'datetime_picker' && 
         <DateTimePicker 
          value={p.value}
          onChange={handleDirectChange}
          label={p.label}
          placeholder={p.placeholder}
          valueFormat={p.format} 
          minDate={new Date()}
          maxDate={datePlus11}/>
        }
    </div>
    )
}

export default FormField;