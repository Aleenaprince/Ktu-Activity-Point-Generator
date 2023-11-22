import React, { useEffect, useState, useRef } from 'react';
import './studentdashboard.css';
import { supabase } from "../client";
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Text, Button,CircularProgress,Input, CircularProgressLabe } from '@chakra-ui/react'
import profile from '../images/profile.png'


const StudentDashboard = ({token}) => {


/*const [userDetails, setUserDetails] = useState({
  name:'',
  className:'',
  dob:'',
});  */
  const [studentDetails, setStudentDetails] = useState({
    regno:'',
    name: '',
    className: '',
    semester:'',
  });

  const [activityPoints, setActivityPoints] = useState({
    totalPoints: 0,
    remainingPoints: 0,
  });

  /*useEffect(() => {
    // Sample data for the pie chart
    const data = {
      labels: ['Math', 'Science', 'English'],
      datasets: [{
        data: [70, 20, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }]
    };

    // Options for the pie chart animation
    const options = {
      animation: {
        animateRotate: true,
        animateScale: true
      }
    };

    // Log chart data to console
    console.log(data);

  }, []);*/



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
    regno:data[0].RegisterNo,
    name:data[0].Name,
    className:data[0].Class,
    senester:data[0].Semester,
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
      <div className="sidebar left">
        <Heading size='md'>Student Details</Heading>
        {/* Add content or links for the left sidebar as needed */}
        <div classname="image">
        <img src={profile} alt=""></img>
        </div>
        <p>Name: {studentDetails.name}</p>
        <p>
          Register Number: {studentDetails.regno}
        </p>
        
        <p>Class: {studentDetails.className}</p>
        <p>Semester: {studentDetails.semester}</p>
      </div>
      <div className="main-content">
        <h1>Student Dashboard</h1>

      
        <SimpleGrid spacing={8} templateColumns='repeat(auto-fill, minmax(500px, 2fr))'>
  <Card bgGradient='linear(yellow.100 10%, orange.100 25%, yellow.100 70%)' >
  
  
    <CardHeader>
      <Heading size='md'>Upload Certificate</Heading>
    </CardHeader>
    <CardBody>
    
        {/* Add functionality for uploading certificates */}
        <div className="certificate-upload">
      
          <input
            type="file"
            accept="application/pdf"
            onChange={handleCertificateUpload}
          />
        </div>
      
    </CardBody>
    <CardFooter>
     
    </CardFooter>
  </Card>
  <Card maxW="300px" >
    <CardHeader>
      <Heading size='md'> KTU Activity Points</Heading>
    </CardHeader>
    <CardBody>
        <br />
        <CircularProgress value={activityPoints.totalPoints} color='orange.400' size='180px' />
        <div className="total-points-circle">
          <br></br>
          <p>Total Points: {activityPoints.totalPoints}</p>
        </div>
        <p>Remaining Points: {activityPoints.remainingPoints}</p>
    </CardBody>
    <CardFooter>
      
    </CardFooter>
  </Card>
  <Card>
    <CardHeader>
      <Heading size='md'>Uploaded Certificate</Heading>
    </CardHeader>
    <CardBody>
    {/* Display Uploaded Certificate */}
    {certificate && (
          <div className="uploaded-certificate">
            <a
              href={URL.createObjectURL(certificate)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {certificate.name}
            </a>
            <br />
           
          </div>
        )}
    </CardBody>
    <CardFooter>
     <Text>Delete file</Text> 
    <Input placeholder='Enter certificate id:' />
    </CardFooter>
  </Card>
</SimpleGrid>
      </div>
    </div>
    
  );

};

  

export default StudentDashboard;
