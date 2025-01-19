import React from 'react'
import Header from '../../Elements/Header'
import { Link } from "react-router-dom";
import '../../Styles/loginregister.css'
import RegisterFelhasznaloForm from '../../Elements/RegisterFelhasznaloForm';

const RegisterFelhasznalo = () => {
   return (
     <div>
        <Header />
        <h1>Regisztrálj hozzánk, mint örökbefogadó</h1>
        <div className="link-wrapper">
            <Link to="/regisztracio/menhely">Inkább menhelyként regisztrálok</Link>
        </div>
        <br />
        <section>
            <div className="row">
                <div className="col-4"></div>   
                <div className="col-4">
                   <RegisterFelhasznaloForm />
                </div>   
                <div className="col-4"></div>   
            </div>
        </section>
     </div>
   )
 }

 export default RegisterFelhasznalo