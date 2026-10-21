import { BrowserRouter } from 'react-router-dom'

import ReactDom from "react-dom/client"
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'

ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider><App /></AuthProvider>
  </BrowserRouter>,
)
