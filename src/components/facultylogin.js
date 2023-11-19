import React, {useState} from 'react';
import './facultylogin.css';
import mec from '../images/mec 2.png'
import { supabase } from "../client";

export default function Facultylogin()
{

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
async function handleSubmit(e){
try{
  e.preventDefault()
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
})
} catch(error) {
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
          <h2>Login for faculty</h2>
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
}
