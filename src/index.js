/**
Created By Muhammad Saad
*/

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from 'App'
import './index.css'
import swDev from 'swDev'

// Soft UI Context Provider
import { MaterialUIControllerProvider } from 'context'

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)

swDev()
