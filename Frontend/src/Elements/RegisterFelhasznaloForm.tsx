import React from 'react';

function FormComponent() {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Név</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder=""
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
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Jelszó</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder=""
        />
      </div>
      <br />
      <button type="submit" className="btn btn-primary bg">
        Regisztráció örökbefogadóként
      </button>
    </form>
  );
}

export default FormComponent;