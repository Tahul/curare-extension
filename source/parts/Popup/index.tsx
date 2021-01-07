import { createMemoryHistory } from 'history'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { AuthProvider } from '../../contexts/auth'
import Popup from './Popup'
import redraw from './redraw'

// Temporary redraw workaround for second monitor freeze on MacOS
redraw()

// Routing
export const history = createMemoryHistory()

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router history={history}>
        <Popup />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('popup-root'),
)
