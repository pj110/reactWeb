import { INCREMENT, UNCREMENT } from '../constent'
const initData = 0;
function countReducer(preState = initData, action) {
    switch (action.type) {
        case INCREMENT:
            return preState + action.data;
        case UNCREMENT:
            return preState - action.data;
        default:
            return preState;
    }
}
export default countReducer;