import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormComponent() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [menhelyneve, setMenhelyneve] = useState('');
  const [menhelycime, setMenhelycime] = useState('');
  const [tel, setTel] = useState('');
  const [oldallink, setOldallink] = useState('');
  const [leiras, setLeiras] = useState('');
  const apiurl = process.env.VITE_API_URL || "http://localhost:3333";
  const navigate = useNavigate();

  const regisztracioBekuldese = async (e) => {
    e.preventDefault();

    setMessage('');
    if (email == "" || password == "" || menhelyneve == "" || menhelycime == "" || tel == ""
      || oldallink == "" || leiras == "")
    {
      setMessage("Minden mezőt tölts ki!");
    }

    try{
      const response = await fetch(apiurl+'/menhelyek/regisztracio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          menhelyneve: menhelyneve,
          menhelycime: menhelycime,
          oldal_link: oldallink,
          leiras: leiras,
          email: email,
          jelszo: password,
          telefonszam: tel,
        }),
      });

      if(response.status == 200){
        const res = await response.json();
        console.log(res)
        navigate('/');
      }else if(response.status == 400){
        setMessage("Ez az email cím már használatban van!");
      }else if(!response.ok){
        setMessage("Belső rendszer hiba! ");
      }
    }catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={regisztracioBekuldese}>
      <span className='msgbox'>{message}</span>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Menhely neve</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder=""
          value={menhelyneve}
          onChange={(e) => setMenhelyneve(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">E-mail cím</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Telefonszám</label>
        <input
          type="tel"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder=""
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
      </div>
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
        <label htmlFor="exampleInputEmail1">Menhely weboldala</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder=""
          value={oldallink}
          onChange={(e) => setOldallink(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Mesélj magatokról</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={leiras}
          onChange={(e) => setLeiras(e.target.value)}></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Jelszó</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <button type="submit" className="btn btn-primary bg">
        Regisztráció menhelyként
      </button>
    </form>
  );
}

export default FormComponent;