import React from "react";
import MenhelyekLista from "../Elements/MenhelyekListazasa";
import { Link } from "react-router-dom";
import "../Styles/menhelyek.css";
import menhelyoldalKep from "../assets/menhelyoldalKutya.jpg";
import Header from "../Elements/Header";
import Footer from "../Elements/Footer";
import "../Styles/hero.css";

const Menhelyek = () => {
  return (
    <>
      <Header />
      <div className="heromenhelyek">
        <h1>Menhelyek</h1>
        <p className="text-center">Ismerd meg Magyarország állatmenhelyeit</p>
      </div>
      <main className="container mt-4">
        <section className="menhelylista mt-5">
          <div>
            <MenhelyekLista />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Menhelyek;
