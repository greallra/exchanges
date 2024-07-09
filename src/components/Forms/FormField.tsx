import { TextInput, Select, Image } from '@mantine/core';
import { LanguagePicker } from '../LanguagePicker';
import { DateTimePicker } from '@mantine/dates';

// Object.prototype.getName = function() { 
//   var funcNameRegex = /function (.{1,})\(/;
//   var results = (funcNameRegex).exec((this).constructor.toString());
//   return (results && results.length > 1) ? results[1] : "";
// };

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
            <h4>{p.value}</h4>
            {/* <div className='flex'>
                <Image
                    radius="md"
                    h={'20px'}
                    src={p.value}
                />
                <div>{p.value}</div>
            </div> */}
          
        </>
        }
        {p.type === 'datetime_picker' && 
         <DateTimePicker 
          value={p.value}
          onChange={handleDirectChange}
          label={p.label}
          placeholder={p.placeholder}
          valueFormat={p.format} />
        }
    </div>
    )
}

export default FormField;