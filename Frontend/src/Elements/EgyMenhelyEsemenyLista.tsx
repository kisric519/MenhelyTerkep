import { useState, useEffect } from "react";
import "../Styles/listazas.css";

const MenhelyEsemenyLista = ({ menhelyid }) => {
  const [esemenyek, setEsemenyek] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const esemenyekLekerese = async () => {
      try {
        const response = await fetch(apiUrl + "/naptar/esemenyek/" + menhelyid);
        const data = await response.json();
        setEsemenyek(data);
      } catch (error) {
        console.error("hiba:", error);
      } finally {
        setLoading(false);
      }
    };

    esemenyekLekerese();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Betöltés...</p>;
  }

  if (esemenyek.length === 0) {
    return <p className="text-center text-gray-500">Nincs még esemény...</p>;
  }

  return (
    <div className="d-flex flex-column gap-1">
      {esemenyek.map((esemeny) => (
        <div
          key={esemeny.id}
          className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-72 text-center boxw"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {esemeny.esemenyneve}
          </h2>
          <p className="text-gray-600">
            {new Date(esemeny.datum).toLocaleDateString("hu-HU", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-600">{esemeny.leiras}</p>
        </div>
      ))}
    </div>
  );
};

export default MenhelyEsemenyLista;
