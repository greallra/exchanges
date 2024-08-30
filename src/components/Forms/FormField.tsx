import { TextInput, Select, Image, Text, PasswordInput, rem, Radio, RangeSlider } from '@mantine/core';
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
        {(p.type === 'text'  || p.type === 'email') && <TextInput
            mt="md"
            label={p.label}
            placeholder={p.placeholder}
            onChange={handleChange}
            rightSection={p.type === 'email' && icon}
            error={p.error}
            value={p.value}
            required={p.required}
        />}
        {p.type === 'password' && <PasswordInput
            mt="md"
            label={p.label}
            placeholder={p.placeholder}
            onChange={handleTextChange}
            error={p.error}
            value={p.value}
            required={p.required}
        />}
        {p.type === 'select' &&  <Select
            label={p.label}
            placeholder={p.placeholder}
            onChange={handleDirectChange}
            error={p.error}
            disabled={p.disabled}
            value={p.value}
            data={p.availableValues}
            max={p.max || null}
            required={p.required}
        />}
        {p.type === 'language_picker' && 
        <>
            <h4>{p.label} *</h4>
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
        </Radio.Group>
        }
        {p.type === 'rangeslider' && 
        <div style={{padding: '10px 0px 30px 0px'}}>
            <Text size="sm" fw={500} style={{padding: '10px 0'}}>{p.label}: <Text c="dimmed" size="xs">({p.value[0]} to {p.value[1]} years old)</Text></Text>
            <RangeSlider 
                defaultValue={p.value} 
                onChange={handleDirectChange}
                marks={p.options}  
                min={p.min} />
        </div>

        }
        {p.type === 'date' &&  
         <DateInput allowDeselect 
            value={p.value}
            label={p.label} 
            placeholder={p.placeholder} 
            onChange={handleDirectChange} 
            rightSection={iconCal}
            maxDate={p.maxDate}
            required={p.required}
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