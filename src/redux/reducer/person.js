import { PUSHPERSON, POPPERSON } from '../constent'
const initData = [];
function personReducer(preState = initData, action) {
    switch (action.type) {
        case PUSHPERSON:
            return [...preState, action.data];
        case POPPERSON:
            let newArr = [...preState];
            newArr.pop()
            return newArr;
        default:
            return preState;
    }
}
export default personReducer