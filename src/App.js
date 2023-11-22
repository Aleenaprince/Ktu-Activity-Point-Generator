import { supabase } from "./client.js";
import Loginform from "./components/loginform.js"
import Studentlogin from "./components/studentlogin.js"
import Facultylogin from "./components/facultylogin.js"
import Studentdashboard from "./components/studentdashboard.js"
import Facultydashboard from "./components/facultydashboard.js"

import { useEffect, useState } from 'react';
import {BrowserRouter,Routes,Route}from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  const[token,setToken] = useState(false)
  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }
  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  },[])

  return ( 
   
    <ChakraProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Loginform/>}/>
      <Route path='/loginstudent' element={<Studentlogin setToken={setToken}/>}/>
      <Route path='/loginfaculty' element={<Facultylogin setToken={setToken}/>}/>
      {token?<Route path='/studentdashboard' element={<Studentdashboard token={token}/>}/>:""} 
      {token?<Route path='/facultydashboard' element={<Facultydashboard token={token}/>}/>:""}
    </Routes>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
