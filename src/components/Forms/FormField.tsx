import { TextInput, Select, Image, Text, PasswordInput, rem, Radio, Group } from '@mantine/core';
import { LanguagePicker } from '../LanguagePicker';
import { DateTimePicker, DateInput } from '@mantine/dates';
import { IconAt, IconCalendarMonth } from '@tabler/icons-react';
import MapAutoComplete from "@/components/Maps/MapAutoComplete";

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
        if (event.target.type === 'text' || 'password') {
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

    const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
    const iconCal = <IconCalendarMonth style={{ width: rem(16), height: rem(16) }} />;

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
        {(p.type === 'text'  || p.type === 'email') && <TextInput
            mt="md"
            label={p.label}
            placeholder={p.placeholder}
            onChange={handleChange}
            rightSection={p.type === 'email' && icon}
            error={p.error}
            value={p.value}
        />}
        {p.type === 'password' && <PasswordInput
            mt="md"
            label={p.label}
            placeholder={p.placeholder}
            onChange={handleTextChange}
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
        {p.type === 'radio' &&  
          <Radio.Group
            value={p.value}
            onChange={(e) => handleDirectChange(Number(e))}
            name={p.name}
            label={p.label}
            description={p.description}
            withAsterisk
            mt="sm"
            >
                {p.options.map((option, i) => {
                    return <Radio label={option.label} value={option.index} mb="xs"/>
                })}
            
            {/* <Radio label="Female" value="Female" />
            <Radio label="s" value={p.value? 'yrs': 'no'} /> */}
            {/* {p.options} */}
        </Radio.Group>
        }
        {p.type === 'date' &&  
         <DateInput allowDeselect 
            value={p.value}
            label={p.label} 
            placeholder={p.placeholder} 
            onChange={handleDirectChange} 
            rightSection={iconCal}
            maxDate={p.maxDate}
            mt="sm"
            clearable/>
        }
        {p.type === 'datetime' && 
         <DateTimePicker 
          value={p.value}
          onChange={handleDirectChange}
          label={p.label}
          placeholder={p.placeholder}
          valueFormat={p.format} 
          minDate={new Date()}
          maxDate={datePlus11}/>
        }
        {p.type === 'location_picker' && 
           <MapAutoComplete 
                selected={p.value} 
                setSelected={handleDirectChange} 
            />
        }
    </div>
    )
}

export default FormField;