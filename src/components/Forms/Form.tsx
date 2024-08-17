import { Button, Alert, Space } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import FormField from './FormField'

interface FormProps {
    fields: Array<FormFieldProps>,
    onSubmit: <T>(data: T) => void,
    validateForm: <T>(data: T) => void,
    error: string,
    formValid: boolean,
    user: object,
    overrideInlineValidationTemporaryProp: boolean
}

const Form = (p: FormProps) => {
    // const { languages } = useLanguages();
    const getInitialState = () => {
        let initialState = {};
        p.fields.forEach((field) => {
            initialState[field.property] = field.value
        })
        return initialState
    }
    const [state, setState] = useState(getInitialState())
    const handleChange = (property: string, value: string | boolean | number) => {
        setState((s) => {
            p.validateForm({...s, [property]: value})
            return {...s, [property]: value}
        })
        
    }
    return <form onSubmit={(e) => { e.preventDefault(); p.onSubmit(e, state); }} style={{width: '300px', margin: 'auto'}}>
        {p.fields.map((field, i) => {
              return field.hideField ? <></> : <FormField 
                key={i} 
                {...field} 
                onChange={(property: string, value: string | boolean | number) => handleChange(property, value)} 
                value={state[field.property]}/>
        })}
        <Space h="md" />
        {p.error &&  <Alert variant="light" color="red" title="You have errors" icon={<IconInfoCircle />}>{p.error}</Alert>}
        <Space h="md" />
        <Button variant="filled" type='submit' disabled={!p.formValid && !p.overrideInlineValidationTemporaryProp}>Submit</Button>
    
    </form>
}

export default Form;