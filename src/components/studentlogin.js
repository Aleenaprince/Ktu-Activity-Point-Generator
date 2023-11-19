
import React, {useState} from 'react';
import './studentlogin.css';
import mec from '../images/mec2.png'
import { supabase } from "../client";
import {useNavigate} from 'react-router-dom';


export default function Studentlogin ()
{
  let navigate =useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    try {
      e.preventDefault()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      console.log(data)
      navigate('/studentdashboard')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <section>
      <div className="imgBx">
        <img src={mec} alt="Background" /><img/>
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Login for student</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputBx">
              <span>Email</span>
              <input type="email" name="" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="inputBx">
              <span>Password</span>
              <input type="password" name="" value={password} onChange={(e) => setPassword(e.target.value)} />
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
