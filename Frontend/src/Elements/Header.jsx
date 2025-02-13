import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import '../Styles/header.css';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [shelterId, setShelterId] = useState(localStorage.getItem('belepisadat'));
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const handleLogout = () => {
      localStorage.removeItem('belepisadat');
      setShelterId(null);
    };

    return (
       <header className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid">
                <img className="logo navbar-brand" src={logo} alt="" />
                <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(prev => !prev)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item"><Link className="nav-link" to="/">Kezdőlap</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/menhelyek">Menhelyek</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/naptar">Esemény naptár</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/rolunk">Rólunk</Link></li>
                    </ul>
                    <ul className="navbar-nav">
                        {shelterId ? (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/admin">Profilom</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="" onClick={handleLogout}>Kijelentkezés</Link></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/regisztracio/menhely">Regisztráció</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/bejelentkezes">Bejelentkezés</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
       </header>
   );
};

export default Navbar;
