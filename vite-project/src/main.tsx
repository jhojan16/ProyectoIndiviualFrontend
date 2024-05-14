import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AppTheme } from './Theme/Apptheme'
import {store} from './redux/store'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AppTheme>
        <Provider store={store}>
        <App />
        </Provider>
      </AppTheme>
  </React.StrictMode>,
)
