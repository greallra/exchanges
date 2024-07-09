import { useEffect, useState } from 'react';
import useFetch from './useFetch';
import { formatLanguages } from '../utils'

const useLanguages = () => {
    const [languages, setLanguages] = useState([]);
    const { data: fetchedLanguages } = useFetch('languages');

    useEffect(() => {
        const formattedLanguages = formatLanguages(fetchedLanguages)
        setLanguages(formattedLanguages)
    },[fetchedLanguages])
    // useEffect(() => {
    //    if (languages.length > 0) {
    //     setSelectedLanguage(languages[Math.floor(Math.random() * languages.length)]);
    //    }
    // },[languages])

    return {
        languages
    }
}

export default useLanguages;