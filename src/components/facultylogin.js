import React from 'react';
import './facultylogin.css';
import mec from '../images/mec 2.png'

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
              <span>Email</span>
              <input type="email" name="" />
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
          
        </div>
      </div>
    </section>
  );
};
