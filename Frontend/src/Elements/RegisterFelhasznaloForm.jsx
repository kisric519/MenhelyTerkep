import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormComponent() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [tel, setTel] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const regisztracioBekuldese = async (e) => {
    e.preventDefault();
    setMessage('');
    if (email === "" || password === "" || fullname === "" || tel === "") {
      setMessage("Minden mezőt tölts ki!");
      return;
    }

    try {
      const response = await fetch(apiUrl + '/users/regisztracio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          jelszo: password,
          telefonszam: tel,
          nev: fullname,
        }),
      });

      if (response.status === 200) {
        const res = await response.json();
        console.log(res);
        navigate('/');
      } else if (response.status === 400) {
        setMessage("Ez az email cím már használatban van!");
      } else if (!response.ok) {
        setMessage("Belső rendszer hiba!");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={regisztracioBekuldese} className="container-fluid p-2 w-100">
      <span className='msgbox'>{message}</span>
      <div className="form-group">
        <label>Név</label>
        <input type="text" className="form-control" value={fullname} onChange={(e) => setFullname(e.target.value)} />
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
        <label>Jelszó</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-3">Regisztráció örökbefogadóként</button>
    </form>
  );
}

export default FormComponent;