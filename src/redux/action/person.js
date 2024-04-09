import { PUSHPERSON, POPPERSON } from '../constent'
export function pushAction(data) {
    return {
        type: PUSHPERSON,
        data
    }
}
export function popAction() {
    return {
        type: POPPERSON,
        data
    }
}