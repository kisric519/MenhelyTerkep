import { useState, useEffect } from "react";
import axios from "axios";

function FormComponent({ onSuccess }) {
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const [menhelyid, setMenhelyid] = useState("");
  const [menhelycime, setMenhelycime] = useState("");
  const [menhelyleirasa, setMenhelyleirasa] = useState("");
  const [menhelyemail, setMenhelyemail] = useState("");
  const [menhelytel, setMenhelytel] = useState("");

  useEffect(() => {
    const MenhelyLekerese = async () => {
      const id = localStorage.getItem("belepisadat");
      setMenhelyid(id);

      const response = await axios.get(`${apiUrl}/menhelyek/${id}`);
      setMenhelycime(response.data.menhelycime)
      setMenhelyleirasa(response.data.leiras)
      setMenhelyemail(response.data.email)
      setMenhelytel(response.data.telefonszam);
    };
    MenhelyLekerese();
  }, []);

  const szerkesztesMentes = async (e) => {
    e.preventDefault();

    setMessage("");
    if (
      menhelycime == "" ||
      menhelyleirasa == "" ||
      menhelyemail == "" ||
      menhelytel == ""
    ) {
      setMessage("Minden mezőt tölts ki!");
    }

    try {
      const response = await fetch(apiUrl + "/menhely/szerkesztes/"+menhelyid, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menhelycime: menhelycime,
          menhelyleirasa: menhelyleirasa,
          menhelyemail: menhelyemail,
          menhelytel: menhelytel,
        }),
      });

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
    <form onSubmit={szerkesztesMentes}>
      <span className="msgbox">{message}</span>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Menhely címe</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder=""
          value={menhelycime}
          onChange={(e) => setMenhelycime(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Menhely leírása</label>
        <textarea
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder=""
          value={menhelyleirasa}
          onChange={(e) => setMenhelyleirasa(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Menhely e-mail címe</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder=""
          value={menhelyemail}
          onChange={(e) => setMenhelyemail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Menhely telefonszáma</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder=""
          value={menhelytel}
          onChange={(e) => setMenhelytel(e.target.value)}
        />
      </div>
      <br />
      <button
        type="submit"
        className="btn btn-primary bg"
      >
        Mentem a változásokat
      </button>
    </form>
  );
}

export default FormComponent;
