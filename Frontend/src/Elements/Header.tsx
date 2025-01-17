import { Link } from "react-router-dom";
import '../Styles/header.css'
import logo from '../assets/logo.png';

const Navbar = () => {
    return (
       <header>
            <img className="logo" src={logo} alt="" />
            <nav>
                <Link to="/">Kezdőlap</Link>
                <Link to="/rolunk">Rólunk</Link>
            </nav>
       </header>
   );
 }

export default Navbar

