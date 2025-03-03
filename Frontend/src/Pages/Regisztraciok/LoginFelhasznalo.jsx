import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../Elements/LoginFormFelhasznalo";
import "../../Styles/loginregister.css";
import Header from "../../Elements/Header";

const Login = () => {
  return (
    <>
      <Header />
      <div className="container-fluid p-3">
        <h1 className="text-center">Jelentkezz be mint felhasználó</h1>
        <div className="text-center mb-3">
          <Link to="/bejelentkezes/menhely">Belépek, mint menhely</Link>
        </div>
        <section>
          <div className="row justify-content-center">
            <div className="col-md-6 col-12">
              <LoginForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
