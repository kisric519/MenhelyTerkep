import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormComponent() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const bejelentkezesBekuldese = async (e) => {
    if (email == "" || password == "")
    {
      setMessage("Minden mezőt tölts ki!")
    }

    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:3333/menhelyek/bejelentkezes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            jelszo: password,
        }),
      });

      if (!response.ok) {
        setMessage("Belső rendszer hiba!")
      }

      const data = await response.json();
      const id = await data._id
      await localStorage.setItem('belepisadat', id);
      navigate('/admin');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <form onSubmit={bejelentkezesBekuldese}>
        <span className='msgbox'>{message}</span>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">E-mail cím</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="pelda@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Jelszó</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Jelszavad"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
            Bejelentkezve maradok
        </label>
      </div>
      <br />
      <button type="submit" className="btn btn-primary bg">
        Bejeletkezés
      </button>
    </form>
  );
}

export default FormComponent;