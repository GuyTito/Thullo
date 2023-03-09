import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import  { Provider } from "react-redux";
import { store } from './store/store';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (import.meta.env.NODE_ENV === 'production') disableReactDevTools()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
