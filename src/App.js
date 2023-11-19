import Loginform from "./components/loginform.js"
import Studentlogin from "./components/studentlogin.js"
import Facultylogin from "./components/facultylogin.js"
import Studentdashboard from "./components/studentdashboard.js"
import {BrowserRouter,Routes,Route}from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Loginform/>}/>
      <Route path='/loginstudent' element={<Studentlogin/>}/>
      <Route path='/loginfaculty' element={<Facultylogin/>}/>
      <Route path='/studentdashboard' element={<Studentdashboard/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
