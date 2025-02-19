import React from 'react'
import { Link } from "react-router-dom";
import '../../Styles/loginregister.css'
import RegisterFelhasznaloForm from '../../Elements/RegisterFelhasznaloForm';

const RegisterFelhasznalo = () => {
  return (
    <div className="container-fluid p-3">
       <h1 className="text-center">Regisztrálj hozzánk, mint örökbefogadó</h1>
       <br />
       <div className="text-center mb-3">
           <Link to="/regisztracio/menhely">Inkább menhelyként regisztrálok</Link>
       </div>
       <section>
           <div className="row justify-content-center">
               <div className="col-md-8 col-12">
                  <RegisterFelhasznaloForm />
               </div>   
           </div>
       </section>
    </div>
  )
}

 export default RegisterFelhasznalo