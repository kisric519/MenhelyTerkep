import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormComponent() {
  const [file, setFiles] = useState(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [menhelyneve, setMenhelyneve] = useState('');
  const [menhelycime, setMenhelycime] = useState('');
  const [tel, setTel] = useState('');
  const [oldallink, setOldallink] = useState('');
  const [leiras, setLeiras] = useState('');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const fajlokEllenorzese = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFiles(selectedFile);
    }
  };


  const regisztracioBekuldese = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('menhelyneve', menhelyneve);
    formData.append('menhelycime', menhelycime);
    formData.append('oldal_link', oldallink);
    formData.append('leiras', leiras);
    formData.append('email', email);
    formData.append('jelszo', password);
    formData.append('telefonszam', tel);
    if (file) {
      formData.append('image', file); // Kép hozzáadása
    }

    try {
      const response = await fetch(apiUrl+'/menhelyek/regisztracio', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        const res = await response.json();
        console.log(res);
        navigate('/');
      } else if (response.status === 400) {
        setMessage("Ez az email cím már használatban van!");
      } else if (!response.ok) {
        setMessage("Belső rendszer hiba!");
        console.log(response)
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("Hiba történt a regisztráció során.");
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
      <div className="input-group mb-3">
        <label className="input-group-text">Tölts fel a logód</label>
        <input 
          type="file" 
          className="form-control" 
          id="inputGroupFile01" 
          accept="image/*" 
          onChange={fajlokEllenorzese}
          required
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