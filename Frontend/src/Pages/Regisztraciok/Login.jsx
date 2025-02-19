import React from 'react'
import { Link } from "react-router-dom";
import LoginForm from '../../Elements/LoginForm';
import '../../Styles/loginregister.css'

const Login = () => {    
  return (
    <div className="container-fluid p-3">
       <h1 className="text-center">Jelentkezz be mint menhely</h1>
       <section>
           <div className="row justify-content-center">
               <div className="col-md-6 col-12">
                   <LoginForm />
               </div> 
           </div>
       </section>
    </div>
  )
}

 export default Login