import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from './store/index'
import App from './App';
// import './views/Dashboard/material-bootstrap.css';
import './assets/scss/styles.scss'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))