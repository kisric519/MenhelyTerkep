import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../Styles/listazas.css'


const MenhelyEsemenyLista = () => {
    const [shelters, setShelters] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchShelters = async () => {
      const mentettMenhelyId = localStorage.getItem("menhelyid");
      try {
        const response = await fetch("http://127.0.0.1:3333/naptar/esemenyek/"+mentettMenhelyId);
        const data = await response.json();
        setShelters(data.slice(0, 3))
      } catch (error) {
        console.error("Error fetching shelters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
    }, []);
    
    if (loading) {
        return <p className="text-center text-gray-500">Betöltés...</p>;
    }

    if (shelters.length === 0) {
        return <p className="text-center text-gray-500">Nincs még eseményed :c</p>;
    }

    return (
       <div className="lista listaesemeny">
      {shelters.map((shelter: any) => (
        <div key={shelter.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-72 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{shelter.esemenyneve}</h2>
          <p className="text-gray-600">{shelter.datum}</p>
          <p className="text-gray-600">{shelter.leiras}</p>
          <div className="d-flex">
            <button className="gombok">Módosítás</button>
            <button className="gombok">Törlés</button>
          </div>
        </div>
      ))}
    </div>
    );
 }

export default MenhelyEsemenyLista

