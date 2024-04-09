import React,{} from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css'
import { BrowserRouter,HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { PersistGate } from 'redux-persist/integration/react'  // 注意这里  
import { store, persisstore } from './redux/store'
import App from './App';
import '@/assets/css/index.scss'

console.log(process.env)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persisstore}>
      <HashRouter>
        <ConfigProvider theme={{ token: { colorPrimary: '#ff4d23' } }}>
          <App />
        </ConfigProvider>
      </HashRouter>
    </PersistGate>
  </Provider>
);

