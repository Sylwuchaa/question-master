import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import GlobalStyle from './theme/globalStyles'
import { ThemeProvider } from 'styled-components'
import Theme from './theme/theme'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <GlobalStyle/>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
