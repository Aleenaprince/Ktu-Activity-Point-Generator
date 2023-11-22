import React, { useEffect, useState, useRef } from 'react';
import './studentdashboard.css';
import { supabase } from "../client";
import {v4 as uuidv4} from 'uuid';
import { Card, CardHeader, CardBody, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, CardFooter,Select , Box,Alert, SimpleGrid, Heading, Text, Button,CircularProgress,Input, CircularProgressLabe } from '@chakra-ui/react'
import profile from '../images/profiles.png'
import {useNavigate} from 'react-router-dom';
import { DeleteIcon, AddIcon, WarningIcon  } from '@chakra-ui/icons'
import { Text as CText, Heading as CHeading } from '@chakra-ui/react';


const StudentDashboard = ({token}) => {
  let navigate =useNavigate()
  const handleBlah = () => {
    
    // Navigate to another page with parameters in the URL
    navigate(`/studentcertificate`);
  };

/*const [userDetails, setUserDetails] = useState({
  name:'',
  className:'',
  dob:'',
});  */
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    className: '',
    dob: '',
    branch: '',
    reg: '',
    semester:'',
  });

  const [activityPoints, setActivityPoints] = useState({
    totalPoints: 0,
    remainingPoints: 0,
  });

  const [fileCount, setFileCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  
  // set message {update sucessfull}

  // const [fileStatus, setFileStatus] = useState(null);

  // const fileflag =() =>{
  //   if (setFileStatus === true) {
  //     console.log('File stored in the database successfully!');
  //   }
  // };
  // const ButtonClick = () => {
    //   // Execute both functions when the button is clicked
    //   fileflag();
    //   handleUpload(selectedOptions.dropdown1,selectedOptions.dropdown2);
    // };


  const handleUpload = async(CAT,SUBCAT) => {
    if (activityPoints.totalPoints < 100) {
      // Check if activity points are less than 100
      setFileCount(fileCount + 1);
      // Increase activity points
      setSelectedFile(null); // Clear selected file
      setErrorMessage(''); // Clear any previous error message
      const { data:insertdata, error:inserterror } = await supabase
      .from('Certificate')
      .insert([
        { 
        StudentID: studentDetails.reg,
        CategID: 'M1',
        Status: 'Pending', },
      ])
      
      .select();
      // setFileStatus(true);
      if (inserterror) {
        console.error('Error inserting data into Certificate table:', inserterror.message);
      }


    } else {
      setErrorMessage('Cannot add more files. Activity points exceed 100.');
    }
    
    
  };
 
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
    regno:data[0].RegisterNo,
    name:data[0].Name,
    className:data[0].Class,
    dob:data[0].DOB,
    semester:data[0].Semester,
    branch: data[0].Branch,
    reg: data[0].RegNo,
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
  const handleCertificateUpload = async(event) => {
    try{
    const uploadedCertificate = event.target.files[0];
    setCertificate(uploadedCertificate);
    console.log('Certificate uploaded',uploadedCertificate);
    const { data:storagedata, error:storageerror } = await supabase
      .storage
      .from('certificates')
      .upload(userID+"/"+uuidv4(), uploadedCertificate);

    
    // const { data:insertdata, error:inserterror } = await supabase
    //   .from('Certificate')
    //   .insert([
    //     { 
    //     StudentID: studentDetails.reg,
    //     CategID: 'M1',
    //     Status: 'Pending', },
    //   ])
    //   .select();

      if (storageerror) {
        console.error('Error uploading certificate to storage:', storageerror.message);
      }
  
      // if (inserterror) {
      //   console.error('Error inserting data into Certificate table:', inserterror.message);
      // }
      console.log('Upload to storage result:', storagedata);
      // console.log('Insert into Certificate table result:', insertdata);
    
    } catch (error) {
      console.error('Error handling certificate upload:', error.message);
    }

  };

  
    
    
    const handleDropdownChange = (dropdown, value) => {
      setSelectedOptions((prevOptions) => ({ ...prevOptions, [dropdown]: value }));
    };
    const dropdownOptions1 = ['-select-','NSS','Sports','Student Professional Society (IEEE, IET, ASME, SAE,NASA etc.) ','MOOC Course','Industrial Visit','Industrial Training/ Internship'];
    const dropdownOptions2 = ['-select-','None','College Event','Zonal Event','State/University Event','National Event','International Event','Sub Coordinator','Core Coordinator','Volunteer'];
    
    const [selectedOptions, setSelectedOptions] = useState({ dropdown1: '', dropdown2: '' });
    
    const handleLogout = async () => {
      try {
        await supabase.auth.signOut();
        // Redirect to the login page or any other desired page after logout
        navigate('/');
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    };

const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
   

    <div className="dashboard-container">
     
      <div className="sidebar left" width="50%" >
      
       {/* <Heading size='md'>Student Details</Heading>/*}
        {/* Add content or links for the left sidebar as needed */}
        <div classname="image">
        <img src={profile} alt=""></img>
        </div>

       
       
  <CText fontSize="lg" fontFamily="Arial">
    Name: {studentDetails.name}
  </CText>
  <CText fontSize="lg" fontFamily="Arial">
    Register Number: {studentDetails.reg}
  </CText>
  <CText fontSize="lg" fontFamily="Arial">
    Class: {studentDetails.className}
  </CText>
  <CText fontSize="lg" fontFamily="Arial">
    Semester: {studentDetails.semester}
  </CText>
  <Button colorScheme="orange" onClick={handleLogout} mt="18vh" // margin-top
        size="lg">
        Logout
      </Button>
      </div>
      <div className="main-content">
       

      
        <SimpleGrid  spacing={10} templateColumns='repeat(auto-fill, minmax(500px, 2fr))'>
  <Card width="700px" >
  
  
    <CardHeader>
    <Heading  color= 'black' fontSize="4vh" marginLeft="28vh" fontFamily="Arial">Upload Certificate</Heading>
    </CardHeader>
    <CardBody>
    <br></br>
    <CText  fontSize="lg" fontFamily="Arial">
          <p>Category: </p></CText>
          <Select  marginTop="15px" onChange={(e) => handleDropdownChange('dropdown1', e.target.value)} value={selectedOptions.dropdown1}>
          {dropdownOptions1.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          
         </Select>

         <br></br><CText  fontSize="lg" fontFamily="Arial">
          <p>Sub Category: </p></CText>
         <Select onChange={(e) => handleDropdownChange('dropdown2', e.target.value)} value={selectedOptions.dropdown2} mt={4}>
        {dropdownOptions2.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select><br></br>
      {/* Add functionality for uploading certificates */}
      <div className="certificate-upload">
        <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleCertificateUpload(e)}
          />

          

          {errorMessage && (
            <Alert status="error" mb="4">
              <WarningIcon />
              {errorMessage}
            </Alert>
          )}
          
        
         <br></br>
        <Button colorScheme="orange" marginTop="50px"  onClick={() =>handleUpload(selectedOptions.dropdown1,selectedOptions.dropdown2)}   isDisabled={activityPoints >= 100} >
          Upload Certificate
        </Button>
        <Button colorScheme="orange" marginTop="53px" marginLeft="30vh" onClick={handleBlah} >
          View Certificates
        </Button>
  
        </div>
        
      
    </CardBody>
   
  </Card>
  <Card maxW="300px" height="600px" marginLeft="180px">
    <CardHeader>
      <Heading  color= 'black' fontSize="3vh" marginLeft="3vh" fontFamily="Arial"> KTU Activity Points</Heading>
    </CardHeader>
    <CardBody>
        
        <CircularProgress marginLeft="30px"  value={activityPoints.totalPoints} color='orange.400' size='200px' />
        <div className="total-points-circle">
          <br></br><br></br>
          <CText  fontSize="lg" fontFamily="Arial">
          <p>Total Points Acquired : </p></CText>
          <CText  textShadow='2px 2px 4px #ee5050' color= 'orange' fontSize="50px" marginLeft="12vh" fontFamily="Arial">{activityPoints.totalPoints}</CText><br></br>
        </div>
        <CText fontSize="lg" fontFamily="Arial"><p>Remaining Points : </p></CText>
        <CText  textShadow='2px 2px 4px #ee5050' color= 'orange' fontSize="40px" marginLeft="13vh" fontFamily="Arial">{activityPoints.remainingPoints}</CText>
    </CardBody>
    <CardFooter>
      
    </CardFooter>
  </Card>
  



</SimpleGrid>
      </div>
      
    </div>
    
  );

};

  

export default StudentDashboard;
