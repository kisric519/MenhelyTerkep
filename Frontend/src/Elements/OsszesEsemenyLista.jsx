import { useState, useEffect } from "react";
import "../Styles/listazas.css";
import { Link } from "react-router-dom";

const OsszesEsemenyLista = ({ kereses }) => {
  const [esemenyek, setEsemenyek] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const esemenyekLekerese = async () => {
      if (kereses == null) {
        console.log("Nincs keresése");
        try {
          const response = await fetch(apiUrl + "/naptar/esemenyek");
          const data = await response.json();
          setEsemenyek(data);
        } catch (error) {
          console.error("hiba:", error);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const response = await fetch(
            apiUrl + "/naptar/esemenyek/szures/" + kereses.split("T")[0],
          );
          const data = await response.json();
          setEsemenyek(data);
        } catch (error) {
          console.error("hiba:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    esemenyekLekerese();
  }, [kereses]);

  if (loading) {
    return <p className="text-center text-gray-500">Betöltés...</p>;
  }

  if (esemenyek.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Nincsenek események ezen a napon...
      </p>
    );
  }

  const vagottSzoveg = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="lista listaesemeny">
      {esemenyek.map((esemeny) => (
        <div
          key={esemeny.id}
          className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-72 text-center"
        >
          <img className="esemenylogo" src={esemeny.logo} />
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
          <p>
            <strong>Menhely: {esemeny.menhelyneve}</strong>
          </p>
          <p className="text-gray-600">{vagottSzoveg(esemeny.leiras, 70)}</p>
          <Link className="btn btn-dark" to={`/menhely/${esemeny.menhelyId}`}>
            Olvass tovább a menhely oldalán
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OsszesEsemenyLista;
