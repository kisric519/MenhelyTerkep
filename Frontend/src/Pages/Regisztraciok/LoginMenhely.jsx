import React from 'react'
import { Link } from "react-router-dom";
import LoginForm from '../../Elements/LoginFormMenhely';
import '../../Styles/loginregister.css'

const Login = () => {    
  return (
    <div className="container-fluid p-3">
       <h1 className="text-center">Jelentkezz be mint menhely</h1>
       <div className="text-center mb-3">
           <Link to="/bejelentkezes/felhasznalo">Belépek, mint felhasználó</Link>
       </div>
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