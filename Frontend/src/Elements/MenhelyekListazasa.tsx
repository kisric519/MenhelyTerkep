import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../Styles/listazas.css'


const MenhelyLista = () => {
    const [menhelyek, setMenhelyek] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
    const menhelyekLekerese = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3333/menhelyek/jovahagyott");
        const data = await response.json();
        setMenhelyek(data.slice(0, 3))
      } catch (error) {
        console.error("hiba:", error);
      } finally {
        setLoading(false);
      }
    };

    menhelyekLekerese();
    }, []);
    
    if (loading) {
        return <p className="text-center text-gray-500">Betöltés...</p>;
    }

    if (menhelyek.length === 0) {
        return <p className="text-center text-gray-500">Nincs elérhető menhely.</p>;
    }

    return (
       <div className="lista">
      {menhelyek.map((menhely: any) => (
        <div key={menhely.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-72 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{menhely.menhelyneve}</h2>
          <p className="text-gray-600">{menhely.leiras}</p>
          <button className="gombok">Részletek</button>
        </div>
      ))}
    </div>
    );
 }

export default MenhelyLista

