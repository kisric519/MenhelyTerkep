import { Link } from "react-router-dom";
import '../Styles/footer.css'
import logo from '../assets/logo.png';


const Footer = () => {
    return (
        <footer className="footer mt-5 p-4 bg-light">
        <div className="container">
          <div className="row gap-3">
            <div className="col-md-4 col-12 text-center text-md-start">
              <h3>MenhelyTérkép</h3>
              <img className="footerlogo img-fluid" src={logo} alt="logo" />
            </div>
            <div className="col-md-4 col-12 d-flex flex-column text-center text-md-start gap-2">
              <h3>Linkek</h3>
              <Link to="/">Kezdőlap</Link>
              <Link to="/menhelyek">Menhelyek</Link>
              <Link to="/naptar">Események</Link>
              <Link to="/rolunk">Rólunk</Link>
            </div>
            <div className="col-md-4 col-12 d-flex flex-column text-center text-md-start">
              <h3>Elérhetőség</h3>
              <span>Tel: 06204449999</span>
              <span>E-mail: info@menhelyterkep.hu</span>
            </div>
          </div>
        </div>
      </footer>
   );
 }

export default Footer

