import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../Styles/listazas.css';
import EsemenyModositas from './EsemenyModositasForm';

const MenhelyEsemenyLista = ({ frissitesTrigger, onSuccess }) => {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [esemenyModositasAblak, setEsemenyModositasAblak] = useState<boolean>(false);
  const [modositandoID, setModositandoID] = useState('');
  
    useEffect(() => {
      const fetchShelters = async () => {
      const mentettMenhelyId = localStorage.getItem("menhelyid");
      try {
        const response = await fetch("http://127.0.0.1:3333/naptar/esemenyek/"+mentettMenhelyId);
        const data = await response.json();
        setShelters(data)
      } catch (error) {
        console.error("Error fetching shelters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
    }, [frissitesTrigger]);
    
    if (loading) {
        return <p className="text-center text-gray-500">Betöltés...</p>;
    }

    if (shelters.length === 0) {
        return <p className="text-center text-gray-500">Nincs még eseményed :c</p>;
    }
  
    const esemenyTorles = async (id) => {
      if (confirm("Biztosan törölni szeretnéd?")) {
        const response = await fetch('http://127.0.0.1:3333/naptar/torles/'+id, {
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
  

  const esemenyekLekerese = ()  => {
    const fetchShelters = async () => {
      const mentettMenhelyId = localStorage.getItem("menhelyid");
      try {
        const response = await fetch("http://127.0.0.1:3333/naptar/esemenyek/"+mentettMenhelyId);
        const data = await response.json();
        setShelters(data)
      } catch (error) {
        console.error("Error fetching shelters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }

  const sikeresModositas = () => {
    setEsemenyModositasAblak(false)
    esemenyekLekerese()
  }
  
    return (
      <div className="lista listaesemeny">
        {shelters.map((shelter: any) => (
          <div key={shelter.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-72 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{shelter.esemenyneve}</h2>
            <p className="text-gray-600">{new Date(shelter.datum).toLocaleDateString('hu-HU', {year: 'numeric',month: 'long',day: 'numeric',})}</p>
            <p className="text-gray-600">{shelter.leiras}</p>
            <div className="d-flex">
              <button className="gombok" onClick={() => esemenyModosit(shelter._id)}>Módosítás</button>
              <button className="gombok" onClick={() => esemenyTorles(shelter._id)}>Törlés</button>
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

