import { INCREMENT, UNCREMENT } from '@/redux/constent'
export function IncrementAction(data) {
    return {
        type: INCREMENT,
        data
    }
}
export function UncrementAction(data) {
    return {
        type: UNCREMENT,
        data
    }
}