import { useState, useEffect } from "react";
import axios from "axios";

function FormComponent({ onSuccess, modositandoId }) {
  const [message, setMessage] = useState("");
  const [esemenyNeve, setEsemenyNeve] = useState("");
  const [menhelyid, setMenhelyid] = useState("");
  const [esemenyLeirasa, setEsemenyLeirasa] = useState("");
  const [datum, setDatum] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today.toISOString().split("T")[0];
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const esemenyLekerese = async () => {
      const response = await axios.get(
        `${apiUrl}/naptar/esemeny/${modositandoId}`,
      );
      const data = response.data;

      setDatum(data.datum);
      setEsemenyNeve(data.esemenyneve);
      setEsemenyLeirasa(data.leiras);
      setMenhelyid(data.menhelyid);
    };
    esemenyLekerese();
  }, [modositandoId]);

  const ujEsemenyBekuldes = async (e) => {
    e.preventDefault();

    setMessage("");
    if (esemenyNeve == "" || esemenyLeirasa == "") {
      setMessage("Minden mezőt tölts ki!");
    }

    try {
      const response = await fetch(
        apiUrl + "/naptar/frissites/" + modositandoId,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            menhelyid: menhelyid,
            esemenyneve: esemenyNeve,
            datum: datum,
            leiras: esemenyLeirasa,
          }),
        },
      );

      if (response.status == 200) {
        onSuccess();
      } else if (!response.ok) {
        setMessage("Belső rendszer hiba! ");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={ujEsemenyBekuldes}>
      <span className="msgbox">{message}</span>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Esemény neve</label>
        <input
          type="text"
          className="form-control bevitel"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder=""
          value={esemenyNeve}
          onChange={(e) => setEsemenyNeve(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Esemény leírása</label>
        <textarea
          className="form-control bevitel"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder=""
          value={esemenyLeirasa}
          onChange={(e) => setEsemenyLeirasa(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Esemény dátuma</label>
        <input
          id="startDate"
          className="form-control bevitel"
          type="date"
          value={datum}
          onChange={(e) => setDatum(e.target.value)}
        />
      </div>
      <br />
      <button type="submit" className="btn btn-primary bg">
        Módosítom az eseményt
      </button>
    </form>
  );
}

export default FormComponent;
