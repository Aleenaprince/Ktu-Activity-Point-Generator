import React from 'react';
import './facultydashboard.css';
import { supabase } from "../client";
import profile from '../images/profile.png'

const Facultydashboard = ({token}) => {
  return (
    
    <section className="tables">
       <div className="faculty-info">
        <div className="faculty-text">
        <img src={profile} alt=""></img><br></br>
        <p>Murali Mohanan</p><br></br>
        <p> Computer Science</p>
        </div>
        {/* Add more faculty information as needed */}
      </div>
      <div className="table__wrapper">
        <br></br>
        <br></br>
        <table className="table">
          <thead className="table__header">
            <tr>
              
              <td>Register Number</td>
              <td>Name</td>
              <td>Class</td>
              
              <td>Certificate</td>
            
            </tr>
          </thead>
          <tbody className="table__body">
            {/* Repeat the following block for each table row */}
            <tr>
              
              <td>MDL21CS013</td>
              <td>Aleena Prince</td>
              <td>CS5B</td>
             
              <td>
                <button className="badge status-primary">View</button>
              </td>
             
            </tr>
            <tr>
              
              <td>MDL21CS019</td>
              <td>Angela Jose</td>
              <td>CS5B</td>
              
              <td>
                <button className="badge status-primary">View</button>
              </td>
              
            </tr>
            <tr>
              
              <td>MDL21CS020</td>
              <td>Angel Mary Binu</td>
              <td>CS5B</td>
           
              <td>
                <button className="badge status-primary">View</button>
              </td>
              
            </tr>
            <tr>
              
              <td>MDL21CS049</td>
              <td>Geo Jose</td>
              <td>CS5B</td>
             
              <td>
                <button className="badge status-primary">View</button>
              </td>
              
            </tr>
            <tr>
              
              <td>MDL21CS062</td>
              <td>Jensine Soji</td>
              <td>CS5B</td>
              
              <td>
                <button className="badge status-primary">View</button>
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
