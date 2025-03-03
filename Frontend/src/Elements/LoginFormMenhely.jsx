import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormComponent() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const bejelentkezesBekuldese = async (e) => {
    if (email == "" || password == "")
    {
      setMessage("Minden mezőt tölts ki!")
    }

    e.preventDefault();
    try {
      const response = await fetch(apiUrl+`/menhelyek/bejelentkezes`, {
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
      console.log(data)
      if(data.msg = "Hibás email vagy jelszo"){
        setMessage("Belső rendszer hiba!")
      }
      
      if(data._id){
        const id = await data._id
        await localStorage.setItem('belepisadat', id);
        await localStorage.setItem('fioktipus', "menhely");
        navigate('/admin');
      }  
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
      <br />
      <button type="submit" className="btn btn-primary bg">
        Bejeletkezés
      </button>
    </form>
  );
}

export default FormComponent;