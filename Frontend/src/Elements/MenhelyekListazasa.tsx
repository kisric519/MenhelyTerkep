import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../Styles/listazas.css'


const MenhelyLista = () => {
    const [shelters, setShelters] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3333/menhelyek/jovahagyott");
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
        return <p className="text-center text-gray-500">Nincs elérhető menhely.</p>;
    }

    return (
       <div className="lista">
      {shelters.map((shelter: any) => (
        <div key={shelter.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-72 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{shelter.menhelyneve}</h2>
          <p className="text-gray-600">{shelter.leiras}</p>
          <button className="">Részletek</button>
        </div>
      ))}
    </div>
    );
 }

export default MenhelyLista

