import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../Styles/listazas.css';
import EsemenyModositas from './EsemenyModositasForm';
import Betoltes from '../Elements/Betoltes'

const MenhelyEsemenyLista = ({ frissitesTrigger, onSuccess }) => {
  const [esemenyek, setEsemenyek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [esemenyModositasAblak, setEsemenyModositasAblak] = useState(false);
  const [modositandoID, setModositandoID] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
      const esemenyekLekerese = async () => {
      const mentettMenhelyId = localStorage.getItem('belepisadat');
      try {
        const response = await fetch(apiUrl+"/naptar/esemenyek/"+mentettMenhelyId);
        const data = await response.json();
        setEsemenyek(data)
      } catch (error) {
        console.error("hiba:", error);
      } finally {
        setLoading(false);
      }
    };

    esemenyekLekerese();
    }, [frissitesTrigger]);
    
    if (loading) {
        return <Betoltes/>;
    }

    if (esemenyek.length === 0) {
        return <p className="text-center text-gray-500">Nincs még eseményed :c</p>;
    }
  
    const esemenyTorles = async (id) => {
      if (confirm("Biztosan törölni szeretnéd?")) {
        const response = await fetch(apiUrl+'/naptar/torles/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        });
        
        if(response.status == 200){
          onSuccess();
        }else if(!response.ok){
          alert("Belső rendszer hiba! ");
        }
      }
    };

  const esemenyModosit = (id) => {
    setEsemenyModositasAblak(true)
    setModositandoID(id)
  }
  

  const esemenyekLekerese = async () => {
      const mentettMenhelyId = localStorage.getItem('belepisadat');
      try {
        const response = await fetch(apiUrl+"/naptar/esemenyek/"+mentettMenhelyId);
        const data = await response.json();
        setEsemenyek(data)
      } catch (error) {
        console.error("Error fetching shelters:", error);
      } finally {
        setLoading(false);
      }
  }

  const sikeresModositas = () => {
    setEsemenyModositasAblak(false)
    esemenyekLekerese()
  }
  
    return (
      <div className="lista listaesemeny">
        {esemenyek.map((esemeny) => (
          <div key={esemeny.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-72 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{esemeny.esemenyneve}</h2>
            <p className="text-gray-600">{new Date(esemeny.datum).toLocaleDateString('hu-HU', {year: 'numeric',month: 'long',day: 'numeric',})}</p>
            <p className="text-gray-600">{esemeny.leiras}</p>
            <div className="d-flex">
              <button className="gombok" onClick={() => esemenyModosit(esemeny._id)}>Módosítás</button>
              <button className="gombok" onClick={() => esemenyTorles(esemeny._id)}>Törlés</button>
            </div>
          </div>
        ))}
        {esemenyModositasAblak == true ? (
          <section className="ujAblak">
            <div className="tartalom">
              <button onClick={() => setEsemenyModositasAblak(false)} className='ujgomb'>Bezár</button>
              <div>
                <EsemenyModositas modositandoId={modositandoID} onSuccess={() => sikeresModositas()}  />
              </div>
            </div>
          </section>
        ):(null)}
      </div>
    );
 }

export default MenhelyEsemenyLista

