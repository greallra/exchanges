import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { Provider } from 'react-redux'
import store from './store/store.js'

console.log(store.getState());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
