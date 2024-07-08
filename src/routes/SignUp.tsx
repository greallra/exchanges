import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LanguagePicker } from '../components/LanguagePicker';
import { Button, Input, Text, Space } from '@mantine/core';
import images from '../assets/images';

const languages: { id: number, label: string, image: string }[] = [
    { id: 1, label: 'English', image: images.english },
    { id: 2, label: 'German', image: images.german },
    { id: 3, label: 'Italian', image: images.italian },
    { id: 4, label: 'French', image: images.french },
    { id: 5, label: 'Polish', image: images.polish },
  ];

const containerMain = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

const SignUp = ():React.JSX.Element => {
    const navigate = useNavigate();
    const [formValid, setFormValid] = useState(false);
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedLanguageOne, setSelectedLanguageOne] = useState(null);
    const [selectedLanguageTwo, setSelectedLanguageTwo] = useState(null);
    const [languagesOne, setLanguagesOne] = useState([]);
    const [languagesTwo, setLanguagesTwo] = useState([]);

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserName(e.target.value);
    }
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLastName(e.target.value);
    }

    function setSelected(languageOne, language) {
        if (languageOne) {
            return setSelectedLanguageOne(language);
        }
        return setSelectedLanguageTwo(language);
    }

    useEffect(() => {
        console.log('effect []');
        setSelectedLanguageOne(languages[Math.round(Math.random() * 4)]);
        setLanguagesOne(languages);
    },[])
    useEffect(() => {
        console.log('effect [selectedLanguageOne]', languages, selectedLanguageOne);
        if (selectedLanguageOne) {
            // get filtered langages
            const languagesWithoutSelectedLanguageOne = languages.filter(language => language.id !== selectedLanguageOne.id);
            // pick one of em
            setSelectedLanguageTwo(languagesWithoutSelectedLanguageOne[Math.floor(Math.random() * languagesWithoutSelectedLanguageOne.length)]);
            // add disabled prop to language 2
            const formatLanguagesTwo = languages.map((lanaguage) => ({
                ...lanaguage,
                disabled: lanaguage.id === selectedLanguageOne.id
            }))
            setLanguagesTwo(formatLanguagesTwo);
        }
        
    },[selectedLanguageOne])
    useEffect(() => {
        if (selectedLanguageTwo) {
            // get filtered langages
            const languagesWithoutSelectedLanguageTwo = languages.filter(language => language.id !== selectedLanguageTwo.id);
            // pick one of em
            setSelectedLanguageOne(languagesWithoutSelectedLanguageTwo[Math.floor(Math.random() * languagesWithoutSelectedLanguageTwo.length)]);
            // add disabled prop to languages 1
            const formatLanguagesOne = languages.map((lanaguage) => ({
                ...lanaguage,
                disabled: lanaguage.id === selectedLanguageTwo.id
            }))
            setLanguagesOne(formatLanguagesOne);
        }
        console.log('effect [selectedLanguageTwo]');
    },[selectedLanguageTwo])
    useEffect(() => {
        console.log('effect [languagesOne]');
    },[languagesOne])
    useEffect(() => {
        console.log('effect [languagesTwo]');
    },[languagesTwo])
    useEffect(() => {
        console.log('effect [all]');
        if (firstName.length > 3 && lastName.length > 3 && userName.length > 3) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    },[firstName, lastName, selectedLanguageOne, selectedLanguageTwo])

    return <div style={containerMain}>
        <h2>Username</h2>
        <Input placeholder="" value={userName} onChange={handleUserNameChange}/>
        <h2>First name</h2>
        <Input placeholder="" value={firstName} onChange={handleFirstNameChange}/>
        <h2>Last name</h2>
        <Input placeholder="" value={lastName} onChange={handleLastNameChange}/>
        <h2>What is your native languge?</h2>
        <LanguagePicker languages={languagesOne} selected={selectedLanguageOne} setSelected={setSelected} languageOne={true}/>
        <h2>What languge are you learning?</h2>
        <LanguagePicker languages={languagesTwo} selected={selectedLanguageTwo} setSelected={setSelected} languageOne={false}/>
        <Button  disabled={!formValid} variant="filled" size="xl" style={{marginTop: '40px'}} onClick={() => navigate('/exchanges')}>Next</Button>
        <Space h="xl" />
        <Space h="xl" />
        <Text fz="md" lh="md"><Link to="/login">Already have an account? Log in</Link></Text>
    </div>
}
export default SignUp;