import React, { useState } from 'react';
import { Container, Row, Col, Nav, Dropdown, Button } from 'react-bootstrap';
import { Calendar }from 'react-calendar';
import { Link } from "react-router-dom";
import OsszesEsemenyLista from '../Elements/OsszesEsemenyLista';

const Naptar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <div className="row mt-5 mb-5">
        <div className="col-2">
          <label htmlFor="">Esemény dátuma</label>
          <input type='date' />
          <br />
        </div>
        <div className="col-10">
          <h2>Találatok</h2>
          <OsszesEsemenyLista />
        </div>
      </div>
    </div>
  )
}

 export default Naptar