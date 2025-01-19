import React from 'react'
import Header from '../../Elements/Header'
import { Link } from "react-router-dom";
import LoginForm from '../../Elements/LoginForm';
import '../../Styles/loginregister.css'

const Login = () => {    
   return (
     <div>
        <Header />
        <h1>Jelentkezz be a fiókodba</h1>
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