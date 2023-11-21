import React, { useEffect, useState } from 'react';
import './studentdashboard.css';
import { supabase } from "../client";

const StudentDashboard = ({token}) => {


/*const [userDetails, setUserDetails] = useState({
  name:'',
  className:'',
  dob:'',
});  */
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    className: '',
    dob: '01-01-2000',
  });

  const [activityPoints, setActivityPoints] = useState({
    totalPoints: 0,
    remainingPoints: 0,
  });


  //const [ID, setID] = useState(null);
  const fetchUserID = async () => {
    try{
    const { data: { user } } = await supabase.auth.getUser();
    if(user){
    console.log('user:',user);
    console.log('user.id:',user.id);
    //setID(user.id);  
    //console.log('id:',ID);

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
  }));
   setActivityPoints(prevData => ({ 
    ...prevData,
    totalPoints: data[0].Tot_Pts,
    remainingPoints: data[0].Rem_Pts,
  }));
  console.log('studentdetails set from data:',studentDetails);
  console.log('activitypointdetails set from data:',activityPoints);
}
    }
  } 
  catch (error){
    console.error(error.message);
  }
  
  }
fetchUserID();

    


  
  /*async function fetchData(ID){

    let { data, error } = await supabase
      .from('Student')
      .select("*")
      .eq('U_ID', ID);

    if (error) {
      console.error('Error fetching user details:', error.message);
      return;
    }
    if(data){
    setUserDetails(data);
    console.log('userdetails:',userDetails);
    }
 
  } 
  useEffect(() =>{
    
    fetchUserID();
    fetchData(ID);
  }, []);  */








 /* setStudentDetails({
    name: userDetails.Name,
    className: userDetails.Class,
    dob: userDetails.DOB
  });
/*
 

*/
  // State for uploaded certificates
  const [certificate, setCertificate] = useState(null);

  // Function to handle certificate upload
  const handleCertificateUpload = (event) => {
    const uploadedCertificate = event.target.files[0];
    setCertificate(uploadedCertificate);
  };

  return (
    <div className="dashboard-container">
      {/* Left Div - Student Details */}
      <div className="left-div">
        <h2>Student Details</h2>
        <br />
        <p>Name: {studentDetails.name}</p>
        <p>Class: {studentDetails.className}</p>
        <p>DOB: {studentDetails.dob}</p>
      </div>

      {/* Right Div - Activity Points and Certificate Upload */}
      <div className="right-div">
        <br />
        <h2>KTU Activity Points</h2>
        <br />
        <div className="total-points-circle">
          <p></p>
          <p>{activityPoints.totalPoints}</p>
        </div>
        <p>Remaining Points: {activityPoints.remainingPoints}</p>

        {/* Certificate Upload */}
        <div className="certificate-upload">
          <h3>Upload Certificate</h3>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleCertificateUpload}
          />
        </div>

        {/* Display Uploaded Certificate */}
        {certificate && (
          <div className="uploaded-certificate">
            <h3>Uploaded Certificate</h3>
            <a
              href={URL.createObjectURL(certificate)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {certificate.name}
            </a>
            <br />
            <embed
              src={URL.createObjectURL(certificate)}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
