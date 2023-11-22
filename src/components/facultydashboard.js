import React, { useEffect, useState } from 'react';
import './facultydashboard.css';
import { supabase } from "../client";
import profile from '../images/profile.png'
import { useNavigate } from 'react-router-dom';


const Facultydashboard = ({token}) => {

  const navigate = useNavigate();
  const handleButtonClick = (rgno) => {
    
    // Navigate to another page with parameters in the URL
    navigate(`/details/${rgno}`);
  };


  const [facultyDetails, setFacultyDetails] = useState({
    name: '',
    className: '',
    dep: '',
  });
  const [regno,setRegno]= useState('' );

  const [userID, setUserID] = useState('');
  const fetchUserID = async () => {
    try{
    const { data: { user } } = await supabase.auth.getUser();
    if(user){
    console.log('user:',user);
    console.log('user.id:',user.id);
    setUserID(user.id);  
    //console.log('Userid:',userID);

    let { data, error } = await supabase
    .from('Faculty')
    .select("*")
    .eq('U_ID', user.id);

  if (error) {
    console.error('Error fetching user details:', error.message);
    return;
  }
  if(data){
    console.log('data retreived',data);
  setFacultyDetails(prevData => ({ 
    ...prevData,
    name:data[0].FName,
    className:data[0].Class,
    dep:data[0].Department,
  }));
  
  console.log('facultydetails set from data:',facultyDetails);
}
//type remaining here

    }
  } 
  catch (error){
    console.error(error.message);
  }
  
  }
fetchUserID();




  return (
    
    <section className="tables">
       <div className="faculty-info">
        <div className="faculty-text">
        <img src={profile} alt=""></img>
        <br></br>
        <br></br>
        <p>{facultyDetails.name}</p><br></br>
        <p> {facultyDetails.dep}</p>
        <p> Class: {facultyDetails.className}</p>
        
        </div>
        {/* Add more faculty information as needed */}
      </div>
      <div className="table__wrapper">
        
        
        <table className="table">
          <thead className="table__header">
            <tr>
              
              <td>Register Number</td>
              <td>Name</td>
              <td>Class</td>
              
              <td>Details</td>
            
            </tr>
          </thead>
          <tbody className="table__body">
            {/* Repeat the following block for each table row */}
            <tr>
              
              <td>MDL21CS013</td>
              <td>Aleena Prince</td>
              <td>CS5B</td>
             
              <td>
                <button className="badge status-primary" onClick={() => handleButtonClick('MDL21CS013')} >View</button>
              </td>
             
            </tr>
            <tr>
              
              <td>MDL21CS019</td>
              <td>Angela Jose</td>
              <td>CS5B</td>
              
              <td>
                <button className="badge status-primary" onClick={() => handleButtonClick('MDL21CS019')}>View</button>
              </td>
              
            </tr>
            <tr>
              
              <td>MDL21CS020</td>
              <td>Angel Mary Binu</td>
              <td>CS5B</td>
           
              <td>
                <button className="badge status-primary" onClick={() => handleButtonClick('MDL21CS020')}>View</button>
              </td>
              
            </tr>
            <tr>
              
              <td>MDL21CS049</td>
              <td>Geo Jose</td>
              <td>CS5B</td>
             
              <td>
                <button className="badge status-primary" onClick={() => handleButtonClick('MDL21CS049')}>View</button>
              </td>
              
            </tr>
            <tr>
              
              <td>MDL21CS062</td>
              <td>Jensine Soji</td>
              <td>CS5B</td>
              
              <td>
                <button className="badge status-primary" onClick={() => handleButtonClick('MDL21CS062')}>View</button>
              </td>
              
            </tr>
            <tr>
              
              <td>MDL21CS011</td>
              <td>Adarsh P Sukumaran</td>
              <td>CS5B</td>
           
              <td>
                <button className="badge status-primary" onClick={() => handleButtonClick('MDL21CS020')}>View</button>
              </td>
              
            </tr>
            <tr>
              
              <td>MDL21CS012</td>
              <td>Aiswarya S</td>
              <td>CS5B</td>
           
              <td>
                <button className="badge status-primary" onClick={() => handleButtonClick('MDL21CS020')}>View</button>
              </td>
              
            </tr>
            <tr>
              
              <td>MDL21CS015</td>
              <td>Alan Jacob</td>
              <td>CS5B</td>
           
              <td>
                <button className="badge status-primary" onClick={() => handleButtonClick('MDL21CS020')}>View</button>
              </td>
              
            </tr>
            <tr>
              
              <td>MDL21CS021</td>
              <td>Adithya V</td>
              <td>CS5B</td>
           
              <td>
                <button className="badge status-primary" onClick={() => handleButtonClick('MDL21CS020')}>View</button>
              </td>
              
            </tr>
            {/* Repeat the above block for other table rows */}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Facultydashboard;
