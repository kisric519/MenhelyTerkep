import { Link } from "react-router-dom";
import '../Styles/header.css'
import logo from '../assets/logo.png';

const Navbar = () => {
    return (
       <header>
            <img className="logo" src={logo} alt="" />
            <nav className="mainnav">
                <Link to="/">Kezdőlap</Link>
                <Link to="/menhelyek">Menhelyek</Link>
                <Link to="/rolunk">Rólunk</Link>
            </nav>
            <nav>
                <Link className="regbutton" to="/regisztracio/menhely">Regisztráció</Link>
                <Link className="regbutton" to="/bejelentkezes">Bejelentkezés</Link>
            </nav>
       </header>
   );
 }

export default Navbar

