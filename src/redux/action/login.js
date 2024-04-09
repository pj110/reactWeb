import { CHANGEISLOGIN } from '../constent'
export function isLoginAction(data) {
    return {
        type: CHANGEISLOGIN,
        data
    }
}