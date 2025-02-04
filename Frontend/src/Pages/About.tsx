import React from 'react'
 import Header from '../Elements/Header'
 import { Link } from "react-router-dom";
 import '../Styles/about.css'
 import oldalKepFent from '../assets/rolunkoldalCica.jpg'
 import oldalKepLent from '../assets/allyouneedCica.jpg'

const About = () => {
   return (
    <main>
 <Header />
        <section className='hero'>
            <div className="row">
                <div className="col-6 heroSzoveg">
                    <h1>Üdvözlünk</h1>
                    <p>Célunk, hogy összegyűjtsük és bemutassuk azokat az állatmenhelyeket, amelyek szeretettel és gondoskodással segítenek a rászoruló állatoknak. Meggyőződésünk, hogy minden állat megérdemli a második esélyt, ezért hoztuk létre ezt a weboldalt, ahol könnyedén megtalálhatók a helyi menhelyek. Arra törekszünk, hogy támogassuk az állatvédelmet és segítünk összekapcsolni az embereket azokkal az állatokkal, akik új otthonra vágynak.</p>
                    <div className='linkek'>
                        <Link to="/menhelyek">Fogadj örökbe</Link>
                        
                    </div>
                </div>
                <div className="col-6 heroKep">
                    <img src={oldalKepFent} alt="" />
                </div>
            </div>       
        </section>
        <section className='hero'>
          <div className='row'>
          <div className='col-6 heroSzoveg'>
            <h2> Örökbefogadás lépései</h2>


          </div>
          <div className="container mt-4">
      <div className="row">
        {/* Két kocka egymás mellett */}
        <div className="col-md-6 mb-4">
          <div className="border p-3 box">
            <h4>1. Válassz menhelyet</h4>
            <p>Az örökbefogadás menete egyszerű, de gondos odafigyelést igyényel. Az oldalunkon megtalálhatsz számos menhelyet, ahonnan kiválaszthatod a számodra tökéleteset.  </p>
            <Link to="/menhelyek">Menhelyek</Link>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="border p-3 box">
            <h4>2. Kapcsolatba lépés</h4>
            <p> Oldalunkon részletes információkat találsz a különböző állatmenhelyekről, beleértve azok elérhetőségeit, helyszíneit és szolgáltatásait. Segítünk abban, hogy könnyedén rátalálj a számodra legmegfelelőbb menhelyekre, és megtudd, hogyan támogathatod őket vagy fogadhatsz örökbe egy állatot.</p>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Két kocka alatta */}
        <div className="col-md-6 mb-4">
          <div className="border p-3 box">
            <h4>3. Ismerkedés</h4>
            <p>Az örökbefogadás előtt, minden menhely kínál lehetőséget, hogy jobban megismerkedhessenek a leendő gazdik a kiválasztott kisállattal. Ez a lépés segít abban, hogy biztosan a legjobb döntést hozd meg. </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="border p-3 box">
            <h4>4. Adminisztrálás</h4>
            <p>Ha úgy érzed, megtaláltad a megfelelő kisállatot, a formális örökbefogadási papírok kitöltése után az új kiskedvenced hamarosan veled tarthat haza. Ezzel lezárul a folyamat, és egy boldog, szerető otthont adhatsz egy rászoruló állatnak.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>

  <section className='hero'>
            <div className="row">
            <div className="col-6 heroKep">
                    <img src={oldalKepLent} alt="" />
                </div>
                <div className="col-6 heroSzoveg">
                    <h1>Fogadj örökbe</h1>
                    
                      <ul>
                      <li>Menhelyeink célja, hogy szerető otthonra találjanak a rászoruló állatok. Azonban fontos, hogy ezt a döntést megfontoltan hozd meg, hiszen egy állat örökbefogadása hosszú távú felelősségvállalást jelent.</li>
                    <li>
                    Az örökbefogadás előtt gondold át, van-e elegendő időd, energiád és anyagi háttér a kisállat gondozására. Az állatoknak nemcsak táplálékra és menedékre, hanem szeretetre és figyelemre is szükségük van. Menhelyeket vagy állatvédő szervezeteket felkeresve találkozhatsz olyan állatokkal, akik már várják szerető otthonukat. 
                    </li>
                    <li>
                    Az örökbefogadással nemcsak egy új esélyt adsz egy állatnak, hanem hozzájárulsz ahhoz is, hogy csökkenjen az utcán élő vagy menhelyeken tartott állatok száma.
                    
                    </li>
                    </ul>
                     
                    <div className='linkek'>
                        <Link to="/menhelyek">Menhelyek</Link>
                       
                    </div>
                </div>
                
            </div>       
        </section>


    </main>
   )
 }
 
 export default About