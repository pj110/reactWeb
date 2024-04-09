import { CHANGEISLOGIN } from '../constent'
const initData = false;
function loginReducer(preState = initData, action) {
    switch (action.type) {
        case CHANGEISLOGIN:
            return action.data;
        default:
            return preState;
    }
}
export default loginReducer