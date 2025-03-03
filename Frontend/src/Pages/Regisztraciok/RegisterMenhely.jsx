import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/loginregister.css";
import RegisterMenhelyForm from "../../Elements/RegisterMenhelyForm";
import Header from "../../Elements/Header";

const RegisterMenhely = () => {
  return (
    <>
      <Header />
      <div className="container-fluid p-3">
        <h1 className="text-center">Regisztrálj hozzánk, mint menhely</h1>
        <br />
        <div className="text-center mb-3">
          <Link to="/regisztracio/felhasznalo">
            Inkább örökbefogadóként regisztrálok
          </Link>
        </div>
        <section>
          <div className="row justify-content-center">
            <div className="col-md-8 col-12">
              <RegisterMenhelyForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RegisterMenhely;
