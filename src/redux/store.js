import { createStore, combineReducers,applyMiddleware } from 'redux'
//引入redux持久化插件
import { persistStore, persistReducer } from "redux-persist";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
//存入localStorage 中
import storage from "redux-persist/lib/storage";
import count from './reducer/count'
import person from './reducer/person'
import isLogin from './reducer/login'

const persistConfig = {
    // 注意这里 persistConfig
    key: "root",
    storage,
    blacklist: [], //设置谁不用持久化
};
const enhancer = composeWithDevTools(
    applyMiddleware(thunk),
);
const reducer = combineReducers({
    count,
    person,
    isLogin
})
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer,enhancer);
const persisstore = persistStore(store);
// 导出
export { store, persisstore };