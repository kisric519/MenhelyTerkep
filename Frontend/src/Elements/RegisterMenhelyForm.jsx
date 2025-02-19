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
      formData.append('image', file);
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
        console.log(response);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("Hiba történt a regisztráció során.");
    }
  };

  return (
    <form onSubmit={regisztracioBekuldese} className="container mt-4">
      <span className='msgbox'>{message}</span>
      <div className="row">
        <div className="col-md-6 col-12">
          <div className="form-group">
            <label>Menhely neve</label>
            <input type="text" className="form-control" value={menhelyneve} onChange={(e) => setMenhelyneve(e.target.value)} />
          </div>
          <div className="form-group">
            <label>E-mail cím</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Telefonszám</label>
            <input type="tel" className="form-control" value={tel} onChange={(e) => setTel(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Menhely címe</label>
            <input type="text" className="form-control" value={menhelycime} onChange={(e) => setMenhelycime(e.target.value)} />
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="form-group">
            <label>Menhely weboldala</label>
            <input type="text" className="form-control" value={oldallink} onChange={(e) => setOldallink(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Mesélj magatokról</label>
            <textarea className="form-control" rows="3" value={leiras} onChange={(e) => setLeiras(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <label>Jelszó</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="input-group mb-3 mt-3">
        <label className="input-group-text">Tölts fel a logód</label>
        <input type="file" className="form-control" accept="image/*" onChange={fajlokEllenorzese} required />
      </div>
      <button type="submit" className="btn btn-primary w-100">Regisztráció menhelyként</button>
    </form>
  );
}

export default FormComponent;
