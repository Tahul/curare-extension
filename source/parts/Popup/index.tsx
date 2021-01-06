require('dotenv').config()
import { createBrowserHistory } from 'history'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import Popup from './Popup'

// Routing
export const history = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Popup />
    </Router>
  </React.StrictMode>,
  document.getElementById('popup-root'),
)
