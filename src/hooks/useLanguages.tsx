import { useEffect, useState } from 'react';
import images from '../assets/images';
const languages: { id: number, label: string, image: string }[] = [
    { id: 1, label: 'English', image: images.english },
    { id: 2, label: 'German', image: images.german },
    { id: 3, label: 'Italian', image: images.italian },
    { id: 4, label: 'French', image: images.french },
    { id: 5, label: 'Polish', image: images.polish },
  ];

const useLanguages = () => {
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    useEffect(() => {
        setLanguages([
            { id: 1, label: 'English', image: images.english },
            { id: 2, label: 'German', image: images.german },
            { id: 3, label: 'Italian', image: images.italian },
            { id: 4, label: 'French', image: images.french },
            { id: 5, label: 'Polish', image: images.polish },
          ])
    },[])
    useEffect(() => {
       if (languages.length > 0) {
        setSelectedLanguage(languages[Math.floor(Math.random() * languages.length)]);
       }
    },[languages])

    return {
        languages, selectedLanguage, setSelectedLanguage
    }
}

export default useLanguages;