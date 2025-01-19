import React from 'react';

function FormComponent() {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Menhely neve</label>
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
        <label htmlFor="exampleInputEmail1">Menhely címe</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder=""
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
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Mesélj magatokról</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
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
        Regisztráció menhelyként
      </button>
    </form>
  );
}

export default FormComponent;