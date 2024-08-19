import { format, formatDistance, formatRelative, subDays, formatISO } from 'date-fns'
import _ from 'lodash'

// Get image based on env
export function getImage(path) {
    // console.log('import.meta.env.BASE_URL', import.meta.env.BASE_URL);
    // console.log('import.meta.env.MODE', import.meta.env.MODE);
    // console.log('import.meta.env.PROD', import.meta.env.PROD);
    
    // src="/src/assets/logo.png" - this also works
    return path;
}
