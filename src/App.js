import { supabase } from "./client.js";
import Loginform from "./components/loginform.js"
import Studentlogin from "./components/studentlogin.js"
import Facultylogin from "./components/facultylogin.js"
import Studentdashboard from "./components/studentdashboard.js"

import { useEffect, useState } from 'react';
import {BrowserRouter,Routes,Route}from 'react-router-dom';
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
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Loginform/>}/>
      <Route path='/loginstudent' element={<Studentlogin setToken={setToken}/>}/>
      <Route path='/loginfaculty' element={<Facultylogin setToken={setToken}/>}/>
      {token?<Route path='/studentdashboard' element={<Studentdashboard token={token}/>}/>:""} 
    </Routes>
    </BrowserRouter>
  );
}

export default App;
