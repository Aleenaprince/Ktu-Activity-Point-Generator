import React from 'react';
import './facultylogin.css';
import mec from '../images/mec.jpg'

export default function facultylogin()
{
  return (
    <section>
      <div className="imgBx">
        <img src={mec} alt="Background" /><img/>
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Login for faculty</h2>
          <form>
            <div className="inputBx">
              <span>Username</span>
              <input type="text" name="" />
            </div>
            <div className="inputBx">
              <span>Password</span>
              <input type="password" name="" />
            </div>
            <div className="remember">
              <label><input type="checkbox" name="" />Remember me</label>
            </div>
            <div className="inputBx">
              <input type="submit" value="Sign in" name="" />
            </div>
            <div className="inputBx">
              <p>Don't have an account? <a href="#">Sign up</a></p>
            </div>
          </form>
          <h3>Login with social media</h3>
          <ul className="sci">
            <li><img src="https://cdn-icons-png.flaticon.com/512/59/59439.png" alt="Icon 1" width="40" height="40" /></li>
            <li><img src="https://cdn-icons-png.flaticon.com/512/733/733635.png" alt="Icon 2" width="40" height="40" /></li>
            <li><img src="https://cdn-icons-png.flaticon.com/512/87/87390.png" alt="Icon 3" width="40" height="40" /></li>
          </ul>
        </div>
      </div>
    </section>
  );
};
