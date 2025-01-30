import { useState, useEffect } from "react";
import axios from "axios";

function FormComponent({ onSuccess, modositandoId }) {
  const [message, setMessage] = useState('');
  const [menhelyid, setMenhelyid] = useState('');
  const [esemenyNeve, setEsemenyNeve] = useState('');
  const [esemenyLeirasa, setEsemenyLeirasa] = useState('');
  const [datum, setDatum] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today.toISOString().split('T')[0];
  });
  
  const apiurl = process.env.VITE_API_URL || "http://localhost:3333";

    useEffect(() => {
      const fetchShelterData = async () => {
      const response = await axios.get(`http://127.0.0.1:3333/naptar/esemeny/${modositandoId}`);
        const data = response.data
        console.log(data)
      setDatum(data.datum)
      setEsemenyNeve(data.esemenyneve)
      setEsemenyLeirasa(data.leiras)
    };
    fetchShelterData();
    }, [modositandoId]);

  const ujEsemenyBekuldes = async (e) => {
    e.preventDefault();

    setMessage('');
    if (esemenyNeve == "" || esemenyLeirasa == "")
    {
      setMessage("Minden mezőt tölts ki!");
    }

    try{
      const response = await fetch(apiurl+'/naptar/frissites/'+modositandoId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            menhelyid: menhelyid,
            esemenyneve: esemenyNeve,
            datum: datum,
            leiras: esemenyLeirasa,
        }),
      });

      if(response.status == 200){
        onSuccess();
      }else if(!response.ok){
        setMessage("Belső rendszer hiba! ");
      }
    }catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={ujEsemenyBekuldes}>
      <span className='msgbox'>{message}</span>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Esemény neve</label>
        <input
          type="text"
          className="form-control"
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
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder=""
          value={esemenyLeirasa}
          onChange={(e) => setEsemenyLeirasa(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Esemény dátuma</label>
        <input id="startDate" className="form-control" type="date" value={datum} onChange={(e) => setDatum(e.target.value)} />
      </div>
      <br />
      <button type="submit" className="btn btn-primary bg">
        Módosítom az eseményt
      </button>
    </form>
  );
}

export default FormComponent;