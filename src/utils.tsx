import { format, formatDistance, formatRelative, subDays, formatISO } from 'date-fns'

export function isFirebaseId (str: string) {
    return typeof str === 'string' && str.length === 20;
}
export function formatExchange (exchange: object, languages: Array) {
    if (typeof exchange.time === 'object') {
        exchange.time = format(formatISO(exchange.time.seconds * 1000), 'Pp')
    }
    if (isFirebaseId(exchange.languageOne)) {
        exchange.languageOne = languages.find( lang => lang.id = exchange.languageOne) ? languages.find( lang => lang.id === exchange.languageOne): {}
    }
    if(isFirebaseId(exchange.languageTwo)){
        exchange.languageTwo = languages.find( lang => lang.id === exchange.languageTwo) ? languages.find( lang => lang.id === exchange.languageTwo): {}
    } 
    return {
        ...exchange
    }
}