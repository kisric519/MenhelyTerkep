import { useState, useEffect } from "react";
import '../Styles/listazas.css';
import Betoltes from '../Elements/Betoltes'

const GaleriaLista = ({ onSuccess, menhelyid }) => {
  const [kepek, setKepek] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
      const KepekLekerese = async () => {
        try {
        const response = await fetch("http://127.0.0.1:3333/media/galeria/"+menhelyid);
        const data = await response.json();
        setKepek(data)
      } catch (error) {
        console.error("hiba:", error);
      } finally {
        setLoading(false);
      }
    };

    KepekLekerese();
  }, [onSuccess, menhelyid]);
    
    if (loading) {
        return <Betoltes/>;
    }

    if (kepek.length === 0) {
        return <p className="text-center text-gray-500">Nincs még képed feltöltve :c</p>;
    }
  
    return (
      <div className="listagaleria">
        {kepek.map((kep: any) => (
          <div key={kep.id} className="kepwp">
            <img className="galeriakep" src={kep.kepurl} alt="" />
          </div>
        ))}
      </div>
    );
 }

export default GaleriaLista

