import React, { useState } from "react";
import { Link } from "react-router-dom";
import OsszesEsemenyLista from "../Elements/OsszesEsemenyLista";
import Header from "../Elements/Header";
import Footer from "../Elements/Footer";
import "../Styles/hero.css"

const Naptar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <Header />
      <div className="heronaptar">
        <h1>Események</h1>
      </div>
      <div className="container-fluid">
        <div className="row mt-5 mb-5">
          <div className="col-lg-3 col-md-4 col-12 mb-3">
            <h2>Szűrés</h2>
            <label htmlFor="dateFilter">Esemény dátuma</label>
            <input
              type="date"
              id="dateFilter"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="col-lg-9 col-md-8 col-12">
            <h2>Találatok</h2>
            <OsszesEsemenyLista kereses={selectedDate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Naptar;
