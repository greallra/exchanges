import { format, formatDistance, formatRelative, subDays, formatISO } from 'date-fns'
import _ from 'lodash'
export function isFirebaseId (str: string) {
    return typeof str === 'string' && str.length === 20;
}
export function formatExchange (exchange: object, languages: Array) {
    if (typeof exchange.time === 'object') {
        exchange.time = format(formatISO(exchange.time.seconds * 1000), 'Pp')
    }

    if (isFirebaseId(exchange.teachingLanguage)) {
        const findLanguageObject = languages.find( lang => lang.id === exchange.teachingLanguage);
        findLanguageObject ? exchange.teachingLanguage = findLanguageObject : null
    }
    if (isFirebaseId(exchange.learningLanguage)) {
        const findLanguageObject = languages.find( lang => lang.id === exchange.learningLanguage);
        findLanguageObject ? exchange.learningLanguage = findLanguageObject : null
    }
    return {
        ...exchange
    }
}
export function formatLanguages (languages: Array) {
    return languages.map((lang) => {
        return {
            ...lang,
            label: lang.name
        }
    })
}