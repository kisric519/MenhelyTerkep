import { useState, useEffect } from "react";
import "../Styles/listazas.css";
import Betoltes from "../Elements/Betoltes";

const GaleriaLista = ({ onSuccess, menhelyid }) => {
  const [kepek, setKepek] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [hovered, setHovered] = useState(null);
  const [frissitesTrigger, setFrissitesTrigger] = useState(0);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/media/torles/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setFrissitesTrigger((prev) => prev + 1);
      } else {
        console.error("Hiba a törlés során");
      }
    } catch (error) {
      console.error("Hálózati hiba:", error);
    }
  };
  useEffect(() => {
    const KepekLekerese = async () => {
      try {
        const response = await fetch(apiUrl + "/media/galeria/" + menhelyid);
        const data = await response.json();
        setKepek(data);
      } catch (error) {
        console.error("hiba:", error);
      } finally {
        setLoading(false);
      }
    };

    KepekLekerese();
  }, [onSuccess, menhelyid, frissitesTrigger]);

  if (loading) {
    return <Betoltes />;
  }

  if (kepek.length === 0) {
    return <p className="text-center text-gray-500">A galéria üres...</p>;
  }

  return (
    <div className="listagaleria">
      {kepek.map((kep) => (
        <div
          key={kep._id}
          className="kepwp"
          onMouseEnter={() => setHovered(kep._id)}
          onMouseLeave={() => setHovered(null)}
        >
          <img className="galeriakep" src={kep.kepurl} alt="Galéria kép" />
          <button
            className={`delete-button ${hovered === kep._id ? "visible" : ""}`}
            onClick={() => handleDelete(kep._id)}
          >
            Törlés
          </button>
        </div>
      ))}
    </div>
  );
};

export default GaleriaLista;
