import { useEffect, useState } from 'react';
import useFetch from './useFetch';
import { formatLanguages } from '@/common/utils'

const useLanguages = () => {
    const [languages, setLanguages] = useState([]);
    const { data: fetchedLanguages } = useFetch('languages');

    useEffect(() => {
        const formattedLanguages = formatLanguages(fetchedLanguages)
        setLanguages(formattedLanguages)
    },[fetchedLanguages])

    return {
        languages
    }
}

export default useLanguages;