import { format, formatDistance, formatRelative, subDays, formatISO } from 'date-fns'
import _ from 'lodash'
export function isFirebaseId (str: string) {
    return typeof str === 'string' && str.length === 20;
}
// one user object
export function formatUserData(user, languages) {
    return {
        ...user,
        teachingLanguageUnfoled: getLanguageObjectById(user.teachingLanguageId, languages),
        learningLanguageUnfoled: getLanguageObjectById(user.learningLanguageId, languages)
    }
}
// array of users
export function formatUsersData(users, languages) {
   return users.map((user) => formatUserData(user, languages));
}

export function getLanguageObjectById(id: string, languages: Array){
    if (!id || !isFirebaseId(id) || !languages || languages.length === 0) {
        return ''
    }
    return languages.find( lang => lang.id === id) || '';
}

export function getUserObjectById(id: string, users: Array){
    if (!id || !isFirebaseId(id) || !users || users.length === 0) {
        return ''
    }
    return users.find( user => user.id === id) || '';
}

export function formatExchange (exchange: object, languages: Array, users: Array) {
    if (typeof exchange.time === 'object') {
        exchange.timeUnix = format(formatISO(exchange.time.seconds * 1000), 'Pp')
        exchange.timeHour = format(formatISO(exchange.time.seconds * 1000), 'p')
    }
    exchange.teachingLanguageUnfolded = getLanguageObjectById(exchange.teachingLanguageId, languages)
    exchange.learningLanguageUnfolded = getLanguageObjectById(exchange.learningLanguageId, languages)
    exchange.organizerUnfolded = getUserObjectById(exchange.organizerId, users)
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
export function getUserInitials (user: object) {
    return user.firstname.charAt(0).toUpperCase() + user.lastname.charAt(0).toUpperCase() 
}