import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/header.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [fioktipus, setFioktipus] = useState(localStorage.getItem("fioktipus"));
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("belepisadat");
    localStorage.removeItem("fioktipus");
    setFioktipus(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <img className="logo navbar-brand" src={logo} alt="" />
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Kezdőlap
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/menhelyek">
                Menhelyek
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/naptar">
                Esemény naptár
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rolunk">
                Rólunk
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {fioktipus === "menhely" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link regbutton" to="/admin">
                    Vezérlőpult
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link regbutton"
                    to=""
                    onClick={handleLogout}
                  >
                    Kijelentkezés
                  </Link>
                </li>
              </>
            ) : fioktipus === "felhasznalo" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link regbutton" to="/profilom">
                    Kedvenceim
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link regbutton"
                    to=""
                    onClick={handleLogout}
                  >
                    Kijelentkezés
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link regbutton"
                    to="/regisztracio/menhely"
                  >
                    Regisztráció
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link regbutton"
                    to="/bejelentkezes/menhely"
                  >
                    Bejelentkezés
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
