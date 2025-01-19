import React from 'react'
import Header from '../../Elements/Header'
import { Link } from "react-router-dom";
import '../../Styles/loginregister.css'
import RegisterMenhelyForm from '../../Elements/RegisterMenhelyForm';

const RegisterMenhely = () => {
   return (
     <div>
        <Header />
        <h1>Regisztrálj hozzánk, mint menhely</h1>
        <div className="link-wrapper">
            <Link to="/regisztracio/felhasznalo">Inkább örökbefogadóként regisztrálok</Link>
       </div>
       <br />
        <section>
            <div className="row">
                <div className="col-4"></div>   
                <div className="col-4">
                  <RegisterMenhelyForm />
                </div>   
                <div className="col-4"></div>   
            </div>
        </section>
     </div>
   )
 }

 export default RegisterMenhely