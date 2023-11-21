import React from 'react';
import './facultydashboard.css';
const facultydashboard = () => {
  return (
    <section className="tables">
      
      <div className="table__wrapper">
        <br></br>
        <br></br>
        <table className="table">
          <thead className="table__header">
            <tr>
              
              <td>Register Number</td>
              <td>Name</td>
              <td>Class</td>
              <td>Date of Birth</td>
              <td>Certificate</td>
              <td>Verified</td>
            </tr>
          </thead>
          <tbody className="table__body">
            {/* Repeat the following block for each table row */}
            <tr>
              
              <td>MDL21CS013</td>
              <td>Aleena Prince</td>
              <td>CS5B</td>
              <td>27-11-2002</td>
              <td>
                <button className="badge status-primary">Available</button>
              </td>
              <td>
                <span className="icon-options-vertical"></span>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              
              <td>MDL21CS019</td>
              <td>Angela Jose</td>
              <td>CS5B</td>
              <td>17-12-2003</td>
              <td>
                <button className="badge status-primary">Available</button>
              </td>
              <td>
                <span className="icon-options-vertical"></span>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              
              <td>MDL21CS020</td>
              <td>Angel Mary Binu</td>
              <td>CS5B</td>
              <td>8-1-2003</td>
              <td>
                <button className="badge status-primary">Available</button>
              </td>
              <td>
                <span className="icon-options-vertical"></span>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              
              <td>MDL21CS049</td>
              <td>Geo Jose</td>
              <td>CS5B</td>
              <td>19-3-2003</td>
              <td>
                <button className="badge status-primary">Available</button>
              </td>
              <td>
                <span className="icon-options-vertical"></span>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              
              <td>MDL21CS062</td>
              <td>Jensine Soji</td>
              <td>CS5B</td>
              <td>8-2-2003</td>
              <td>
                <button className="badge status-primary">Available</button>
              </td>
              <td>
                <span className="icon-options-vertical"></span>
                <input type="checkbox" />
              </td>
            </tr>
            {/* Repeat the above block for other table rows */}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default facultydashboard;
