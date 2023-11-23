import React, {useState} from 'react';
import './studentcertificate.css';
import { supabase } from "../client";
import { useParams } from 'react-router-dom';
import profiles from '../images/profiles.png'


export default function Facultycertificate()
{
  // const [studentDetails, setStudentDetails] = useState({
  //   name: '',
  //   className: '',
  //   dob: '',
  //   branch: '',
  //   reg: '',
  //   semester:'',
  // });

  const { rgno} = useParams();

  const [facultyDetails, setFacultyDetails] = useState({
    name: '',
    className: '',
    dep: '',
  });

  const handleDelete = async(ctid,cgid) => {
    console.log('inside verify function');
    
    
   
    let { data: Categorypoint, error:CAtError } = await supabase
      .from('Category')
      .select("Point")
      // Filters
      .eq('CategoryID', cgid);
      if(Categorypoint){
    console.log('pointdetail',Categorypoint);

    
let { data: Studenttot, error:Studenttoterr } = await supabase
.from('Student')
.select("*")
// Filters
.eq('RegNo', rgno);

        // const { data:updated, error:updatederr } = await supabase
        //   .rpc('Totalpts', { regnum: rgno, totpts: Categorypoint.Point });

        //   if(updated){
        //     console.log('Updated points');
        //   }
        
if(Studenttot){
  console.log('got current tot pts');
  const newtot=Studenttot[0].Tot_Pts + Categorypoint[0].Point;
  const newrem=Studenttot[0].Rem_Pts - Categorypoint[0].Point;
  if(newtot>100){
    newtot=100;
    newrem=0;
  }
  if(newrem<100){
    newrem=0;
  }
  console.log('newtot',newtot);
  console.log('currenttot',Studenttot);
  console.log('currenttot',Studenttot[0].Tot_Pts);
  console.log('catpt',Categorypoint[0].Point);
  //updTot(rgno,newtot);

 // const { data:trydata, error:tryerror } = await supabase
//.rpc('updTot', { regnum: rgno,totpts : newtot });
 const { data:pointupdatedata, error:pointupdateerror } = await supabase
      .from('Student')
      .update({ 'Tot_Pts': newtot})
      .eq('RegNo', rgno)
      .select();

      const { data:rpointupdatedata, error:rpointupdateerror } = await supabase
      .from('Student')
      .update({ 'Rem_Pts': newrem})
      .eq('RegNo', rgno)
      ;

if(pointupdatedata){
console.log('Updated pts successfully');
const { data, error } = await supabase
      .from('Certificate')
      .update({ 'Status': 'Verified' })
      .eq('CertID', ctid)
      .select();
       console.log('verification success');
    }
  }
else{
  console.log('got no current pts');
}
    //console.log('Delete icon clicked!');
  }
  else{console.log('no point detail');}
  };  

  const [studentData, setStudentData] = useState([]);
  
  const [userID, setUserID] = useState('');
  const fetchUserID = async () => {
    try{
      const { data: { user } } = await supabase.auth.getUser();
    if(user){
    console.log('user:',user);
    console.log('user.id:',user.id);
    console.log('reg no fetched',rgno);
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


  
let { data: Certificate, error: Certificateerror } = await supabase
.from('Certificate')
.select("*")
// Filters
.eq('StudentID', rgno)
.eq('Status', 'Pending');

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
    <section className="tables">
      <div className="faculty-info">
        <div className="faculty-text">
          <img src={profiles} alt=""></img>
          <br></br>
          <p>{facultyDetails.name}</p>
          
          <p> {facultyDetails.dep}</p>
          <p> Class: {facultyDetails.className}</p>
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
              <td>Status</td> 
              {/* <td>Certificate</td> */}
              <td>Verify</td>
            </tr>
          </thead>
          <tbody className="table__body">
            {studentData.map((student) => (
              <tr key={student.CertID}>
                <td>{student.Name}</td>
                <td>{student.CategID}</td>
                <td>{student.Status}</td>
                {/* <td>{student.certificate}</td> */}
              
                <td><button onClick={() => handleDelete(student.CertID,student.CategID)}>
      Verify
    </button></td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
            }