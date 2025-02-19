import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/menhely.css';
import EsemenyLista from '../Elements/EgyMenhelyEsemenyLista';
import GaleriaLista from '../Elements/GaleriaLista';

const Menhely = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [menhelyAdatok, setMenhelyAdatok] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchShelterData = async () => {
      if (!id) {
        navigate('/');
      } else {
        const response = await axios.get(`${apiUrl}/menhelyek/${id}`);
        setMenhelyAdatok(response.data);
      }
    };
    fetchShelterData();
  }, [id, navigate, apiUrl]);
  
  if (menhelyAdatok === "") {
    return (
      <main className="container text-center mt-5">
        <h2>Betöltés...</h2>
      </main>
    );
  }

  return (
    <div className="container mt-4">
      <section className='main'>
        <div className="row align-items-center">
          <div className="col-md-5 col-12 text-center text-md-start">
            <h3>{menhelyAdatok.menhelyneve}</h3>
            <img src={menhelyAdatok.logo} className="img-fluid logo" alt="Menhely logó" />
          </div>
          <div className="col-md-7 col-12">
            <h3>Ismerd meg a menhelyet</h3>
            <p><strong>Menhely címe: </strong>{menhelyAdatok.menhelycime}</p>
            <p><strong>Menhely oldala: </strong>{menhelyAdatok.oldallink}</p>
            <p><strong>Menhely száma: </strong>{menhelyAdatok.telefonszam}</p>
            <p><strong>Menhely e-mail címe: </strong>{menhelyAdatok.email}</p>
          </div>
        </div>
      </section>
      <section className="mt-5">
        <div className="row">
          <div className="col-md-5 col-12 text-center text-md-start">
            <h3>Események</h3>
            <EsemenyLista menhelyid={menhelyAdatok._id} />
          </div>
          <div className="col-md-7 col-12 text-center text-md-start">
            <h3>Galéria</h3>
            <GaleriaLista menhelyid={menhelyAdatok._id} onSuccess={0} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menhely;
 