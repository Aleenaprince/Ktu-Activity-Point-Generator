import React, { useState } from 'react';
import './studentdashboard.css';

const StudentDashboard = () => {
  // State for student details
  const [studentDetails, setStudentDetails] = useState({
    name: 'John Doe',
    className: 'CS5B',
    dob: '01-01-2000',
  });

  // State for activity points
  const [activityPoints, setActivityPoints] = useState({
    totalPoints: 75,
    remainingPoints: 25,
  });

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
