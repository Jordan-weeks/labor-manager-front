import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
    <BrowserRouter>
    <Routes>
      <Route path = '/*' element={<App/>} />
    </Routes>
   </BrowserRouter> 
    </ChakraProvider>    
  </React.StrictMode>,
)