import { Link } from "react-router-dom";
import '../Styles/header.css'
import logo from '../assets/logo.png';
import { useState, useEffect } from "react";

const Navbar = () => {
    const [shelterId, setShelterId] = useState(null);

    useEffect(() => {
      setShelterId(localStorage.getItem('belepisadat'));
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('belepisadat');
      setShelterId(null);
    };

    return (
       <header>
            <img className="logo" src={logo} alt="" />
            <nav className="mainnav">
                <Link to="/">Kezdőlap</Link>
                <Link to="/menhelyek">Menhelyek</Link>
                <Link to="/naptar">Esemény naptár</Link>
                <Link to="/rolunk">Rólunk</Link>
            </nav>
            <nav>{shelterId ? (
                <div>
                    <Link className="regbutton" to="/admin">Profilom</Link>
                    <Link className="regbutton" to="" onClick={handleLogout}>Kijelentkezés</Link>
                </div>
            ) : (
                <div>
                    <Link className="regbutton" to="/regisztracio/menhely">Regisztráció</Link>
                    <Link className="regbutton" to="/bejelentkezes">Bejelentkezés</Link>
                </div>
                )}
            </nav>
       </header>
   );
 }

export default Navbar

