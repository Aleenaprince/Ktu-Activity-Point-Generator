import React, {useState} from 'react';
import './studentcertificate.css';
import { supabase } from "../client";
import profile from '../images/profiles.png'

export default function Studentcertificate()
{
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    className: '',
    dob: '',
    branch: '',
    reg: '',
    semester:'',
  });

  const handleDelete = async(certid) => {

    const { error } = await supabase
        .from('Certificate')
        .delete()
        .eq('CertID', certid);

    //console.log('Delete icon clicked!');
    
  };  

  const [studentData, setStudentData] = useState([]);
  
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
    .from('Student')
    .select("*")
    .eq('U_ID', user.id);

  if (error) {
    console.error('Error fetching user details:', error.message);
    return;
  }
  if(data){
    console.log('data retreived',data);
  setStudentDetails(prevData => ({ 
    ...prevData,
    name:data[0].Name,
    className:data[0].Class,
    dob:data[0].DOB,
    semester:data[0].Semester,
    branch: data[0].Branch,
    reg: data[0].RegNo,
  }));

  console.log('studentdetails set from data:',studentDetails);

  
let { data: Certificate, error: Certificateerror } = await supabase
.from('Certificate')
.select("*")
// Filters
.eq('StudentID', studentDetails.reg);

console.log('Certificate details fetched:',Certificate);

if(Certificate){
  setStudentData(Certificate);
  console.log('Student data after setting',studentData);
}



}
    }
  } 
  catch (error){
    console.error(error.message);
  }
}
fetchUserID();
  














return (
    <section className="tables" >
       <div className="faculty-info" >
        <div className="faculty-text">
          <img src={profile} alt=""></img>
          <br></br>
          <p>{studentDetails.name}</p>
          
          <p> {studentDetails.reg}</p>
          <p> Class: {studentDetails.className}</p>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div> 
      <div className="table__wrapper">
      
        <table className="table">
          <thead className="table__header">
            <tr>
              <td>Certificate Name</td>
              <td>CategoryID</td>
              {/* <td>Subcategory</td> */}
              <td>  Status</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody className="table__body">
            {studentData.map((student) => (
              <tr key={student.CertID}>
                <td>{student.Name}</td>
                <td>{student.CategID}</td>
                <td>{student.Status}</td>
              
                <td><button onClick={() => handleDelete(student.CertID)}>
      Delete
    </button></td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
            }