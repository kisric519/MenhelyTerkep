import React from 'react'
import EsemenyLista from '../Elements/EgyMenhelyEsemenyLista'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../Styles/menhely.css'
import GaleriaLista from '../Elements/GaleriaLista'

const Menhely = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [menhelyAdatok, setMenhelyAdatok] = useState("");

  useEffect(() => {
    const fetchShelterData = async () => {
      if (!id) {
          navigate('/');
      } else {
        const response = await axios.get(`http://127.0.0.1:3333/menhelyek/${id}`);
        setMenhelyAdatok(response.data);
      }
    };
    fetchShelterData();
  }, []);
  
  if (menhelyAdatok == "") {
    return (
      <main>
        <h2>Betöltés...</h2>
      </main>
    )
  }

   return (
     <div>
       <section className='main'>
         <div className="row">
           <div className="col-5">
             <h3>{menhelyAdatok.menhelyneve}</h3>
             <img
              src={menhelyAdatok.logo}
              className="logo"
            />
           </div>
           <div className="col-7">
              <h3>Ismerd meg a menhelyet</h3>
              <br />
              <p><strong>Menhely címe: </strong>{menhelyAdatok.menhelycime}</p>
              <p><strong>Menhely oldala: </strong>{menhelyAdatok.oldallink}</p>
              <p><strong>Menhely száma: </strong>{menhelyAdatok.telefonszam}</p>
              <p><strong>Menhely e-mail címe: </strong>{menhelyAdatok.email}</p>
           </div>
         </div>
       </section>
       <section>
         <div className="row">
           <div className="col-5">
             <h3>Események</h3>
             <EsemenyLista menhelyid={menhelyAdatok._id} />
           </div>
           <div className="col-7">
             <h3>Galéria</h3>
             <GaleriaLista menhelyid={menhelyAdatok._id} onSuccess={0} />
           </div>
         </div>
       </section>
     </div>
   )
 }

 export default Menhely
 