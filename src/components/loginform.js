/*import React from "react";
import "./loginform.css"

const LoginForm = () => {
    return (
        <div className="main">
        <div className="cover">
        <h1>KTU ACTIVIY POINT GENERATOR</h1>
        <h2> Calculate your activity Points here in no time..</h2>
        <div className="Container">
        <div className="Student">
        <h1>STUDENT</h1>        
        </div>
        <div className="Faculty">
        <h1> FACULTY</h1>
        </div>
        </div>
        </div>
        </div>
      
    )
}
export default LoginForm
*/
import React from "react";
import mec from '../images/mec.jpg'
import "./loginform.css"
export default function LoginForm()
{
    return(
        <div className="Main">
            <div className="hero-cont">
                <div className="hero-left">
                    <h1>KTU Activity Point Generator</h1><br/>
                    <h3>Calculate your Activity Points here in no time..</h3><br/><br/><br></br>
                    <a href="/loginstudent">Login for Students</a>
                    <a href="/loginfaculty">Login for Faculty</a>
                </div>
                <div className="hero-right">
                    <img src={mec} alt=""></img>
                </div>
            </div>
        </div>
    );
}