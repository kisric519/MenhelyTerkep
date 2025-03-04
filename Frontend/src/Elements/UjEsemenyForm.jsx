import { useState, useEffect } from "react";

function FormComponent({ onSuccess }) {
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const [menhelyid, setMenhelyid] = useState("");
  const [esemenyNeve, setEsemenyNeve] = useState("");
  const [esemenyLeirasa, setEsemenyLeirasa] = useState("");
  const [datum, setDatum] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today.toISOString().split("T")[0];
  });

  useEffect(() => {
    const fetchShelterData = async () => {
      const kertmenhelyid = localStorage.getItem("belepisadat") || "";
      setMenhelyid(kertmenhelyid);
    };
    fetchShelterData();
  }, []);

  const ujEsemenyBekuldes = async (e) => {
    console.log("Fut az esemeny");
    e.preventDefault();

    setMessage("");
    if (esemenyNeve == "" || esemenyLeirasa == "") {
      setMessage("Minden mezőt tölts ki!");
    }

    try {
      const response = await fetch(apiUrl + "/naptar/letrehozas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menhelyid: menhelyid,
          esemenyneve: esemenyNeve,
          datum: datum,
          leiras: esemenyLeirasa,
        }),
      });

      if (response.status == 200) {
        const res = await response.json();
        console.log(res);
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
        <input
          type="text"
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
        Mentem az eseményt
      </button>
    </form>
  );
}

export default FormComponent;
