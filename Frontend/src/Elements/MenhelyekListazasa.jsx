import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../Styles/listazas.css'


const MenhelyLista = () => {
    const [menhelyek, setMenhelyek] = useState([]);
    const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  
    useEffect(() => {
    const menhelyekLekerese = async () => {
      try {
        const response = await fetch(apiUrl+"/menhelyek/jovahagyott");
        const data = await response.json();
        setMenhelyek(data)
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
      <main>
        <div>
          <span><p>Keresási találatok: <strong>{menhelyek.length}</strong></p></span>   
        </div>
        <div className="lista">
          {menhelyek.map((menhely) => (
            <div key={menhely.id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-72 text-center">
              {menhely.logo && (
                <img
                  src={menhely.logo}
                  alt={`Logo of ${menhely.menhelyneve}`}
                  className="logo"
                />
              )}
              <h2 className="text-xl font-bold text-gray-800 mb-2">{menhely.menhelyneve}</h2>
              <p className="text-gray-600">{menhely.leiras}</p>
              <Link to={`/menhely/${menhely._id}`} className="gombok">Részletek</Link>
            </div>
          ))}
        </div>
      </main>
    );
}

export default MenhelyLista

