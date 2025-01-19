import React from 'react';

function FormComponent() {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">E-mail cím</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="pelda@gmail.com"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Jelszó</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Jelszavad"
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