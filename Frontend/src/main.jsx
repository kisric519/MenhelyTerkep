import React from 'react'
import  ReactDOM  from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import Footer from './Elements/Footer';
import Header from './Elements/Header'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <Header />
     <App />
     <Footer />
    </BrowserRouter>
   </React.StrictMode>
)




