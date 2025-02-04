import { Link } from "react-router-dom";
import '../Styles/footer.css'
import logo from '../assets/logo.png';


const Footer = () => {
    return (
       <section className="footer">
            <div className="row gap-1">
                <div className="col-3">
                    <h3>MenhelyTérkép</h3>
                    <img className="footerlogo" src={logo} />
                </div>
                <div className="col-4 d-flex flex-column gap-1">
                    <h3>Linkek</h3>
                    <Link to="/">Kezdőlap</Link>
                    <Link to="/menhelyek">Menhelyek</Link>
                    <Link to="/naptar">Események</Link>
                    <Link to="/rolunk">Rólunk</Link>
                </div>
                <div className="col-4 d-flex flex-column">
                    <h3>Elérhetőség</h3>
                    <span>Tel: 06204449999</span>
                    <span>E-mail: info@menhelyterkep.hu</span>
                </div>
            </div>
       </section>
   );
 }

export default Footer

