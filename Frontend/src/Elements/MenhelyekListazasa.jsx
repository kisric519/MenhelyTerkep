import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../Styles/listazas.css'
import { Heart } from "lucide-react";


const MenhelyLista = () => {
  const [menhelyek, setMenhelyek] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [kedvencek, setKedvencek] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('belepisadat'));

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

      const fetchKedvencek = async () => {
            try {
                const response = await fetch(`${apiUrl}/users/kedvencek/${userId}`);
                const data = await response.json();
                setKedvencek(data.kedvencek || []);
            } catch (error) {
                console.error("Hiba a kedvencek lekérésekor:", error);
            }
        };

        fetchKedvencek();
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
          <span><p>Keresési találatok: <strong>{menhelyek.length}</strong></p></span>   
        </div>
        <div className="lista">
          {menhelyek.map((menhely) => (
            <MenhelyCard 
          key={menhely.id} 
          menhely={menhely} 
          kedvencek={kedvencek} 
          setKedvencek={setKedvencek} 
        />
          ))}
        </div>
      </main>
    );
}

const MenhelyCard = ({ menhely, kedvencek, setKedvencek }) => {
  const isSaved = kedvencek.includes(menhely._id);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userId, setUserId] = useState(localStorage.getItem('belepisadat'));

  const updateKedvencek = async (ujKedvencek) => {
        try {
            const response = await fetch(apiUrl+"/users/kedvencek", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, ujKedvencek }),
            });

            const data = await response.json();
            setKedvencek(data.kedvencek);
        } catch (error) {
            console.error("Hiba a kedvencek frissítésekor:", error);
        }
    };

  const toggleKedvenc = (menhelyId) => {
        let ujKedvencek;
        if (kedvencek.includes(menhelyId)) {
            ujKedvencek = kedvencek.filter((_id) => _id !== menhelyId);
        } else {
            ujKedvencek = [...kedvencek, menhelyId];
        }
        updateKedvencek(ujKedvencek);
    };

  const vagottSzoveg = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="relative bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-72 text-center p-3">
      <div className="savewrapper">
        <button
        onClick={() => toggleKedvenc(menhely._id)}
        className="iconbutton"
        >
          <Heart className={isSaved ? "text-red-500" : "text-gray-400"} fill={isSaved ? "red" : "none"} />
        </button>
      </div>
      {menhely.logo && (
        <img
          src={menhely.logo}
          alt={`Logo of ${menhely.menhelyneve}`}
          className="logo logomenhelyek"
        />
      )}
      <h2 className="text-xl font-bold text-gray-800 mb-2">{menhely.menhelyneve}</h2>
      <p className="text-gray-600">{vagottSzoveg(menhely.leiras, 130)}</p>
      <Link to={`/menhely/${menhely._id}`} className="gombok">Részletek</Link>
    </div>
  );
};


export default MenhelyLista

