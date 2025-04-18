import React from 'react'
import { Link } from "react-router-dom";
import LoginForm from '../../Elements/LoginForm';
import '../../Styles/loginregister.css'

const Login = () => {    
   return (
     <div>
        <h1>Jelentkezz be mint menhely</h1>
        <section>
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <LoginForm />
                </div> 
                <div className="col-4"></div>
            </div>
        </section>
     </div>
   )
 }

 export default Login