import { useState, useEffect } from "react";
import "../Styles/listazas.css";
import Betoltes from "../Elements/Betoltes";

const GaleriaLista = ({ onSuccess, menhelyid }) => {
  const [kepek, setKepek] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

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
  }, [onSuccess, menhelyid]);

  if (loading) {
    return <Betoltes />;
  }

  if (kepek.length === 0) {
    return <p className="text-center text-gray-500">A galéria üres...</p>;
  }

  return (
    <div className="listagaleria">
      {kepek.map((kep) => (
        <div key={kep.id} className="kepwp">
          <img className="galeriakep" src={kep.kepurl} />
        </div>
      ))}
    </div>
  );
};

export default GaleriaLista;
