import React from 'react'
import Header from '../Elements/Header'
import { Link } from "react-router-dom";
import heroIMG from '../assets/kezdolapKutya.jpg'
import '../Styles/home.css'
import Menhelylista from '../Elements/MenhelyekListazasa';


import ikontappancs from '../assets/tappancsikon.png'
import ikonbeszed from '../assets/beszedikon.png'
import ikonhaz from '../assets/hazikon.png'
import ikonnagyito from '../assets/nagyitoikon.png'

const Home = () => {
   return (
     <main>
        <Header />
        <section className='hero'>
            <div className="row">
                <div className="col-6 heroSzoveg">
                    <h1>Fogadj örökbe</h1>
                    <p>Menhelyeink célja, hogy szerető otthonra találjanak a rászoruló állatok. Hiszünk abban, hogy minden kisállat megérdemli a boldog életet.</p>
                    <div className='linkek'>
                        <Link to="/menhelyek">Menhelyek</Link>
                        <Link to="/regisztracio/menhely">Regisztráció</Link>
                    </div>
                </div>
                <div className="col-6 heroKep">
                    <img src={heroIMG} alt="" />
                </div>
            </div>       
        </section>
        <section className='allatokmentese'>
            <h2>Állatok megmentése</h2>
            <div className="row">
                <div className="col-6">
                    <p>Első lépésként látogass el a menhelyek listához, ahol böngészheted a különböző menhelyeket. Minden menhelyről részletes információ áll rendelkezésre. Az örökbefogadás nemcsak a gazdátlan állatok számára egy új kezdetet jelent, hanem a gazdiknak is. Az állatok végtelen szeretetet, ragaszkodást és boldogságot tudnak adni, amit semmi nem pótolhat. Minden egyes megmentett élet egy kis csoda, és mindannyiunknak felelősségünk van abban, hogy segítünk ezeknek az állatoknak egy boldogabb jövőt biztosítani. </p>
                </div>
                <div className="col-6">
                    <p>A menhelyek az állatok számára nem csupán átmeneti otthont jelentenek, hanem az életük legfontosabb fordulópontját. Az elhagyott, bántalmazott vagy súlyos körülmények között élő állatok gyakran egyetlen lehetőséggel találkoznak: az örökbefogadás. Ezen keresztül nyílik meg számukra az esély egy új, boldog életre. A menhelyek dolgozói napról napra fáradhatatlanul dolgoznak azon, hogy biztosítsák az állatok biztonságát, ellátást adjanak nekik, és felkészítsék őket arra, hogy új gazdájuk szeretetteljes otthont adjon számukra.</p>
                </div>
            </div>
        </section>
        <section>
            <h2>Most csatlakozott menhelyek</h2>
            <Menhelylista />   
        </section>  
        <section>
            <h2>Mivel foglalkozik a MenhelyTérkép?</h2>
            <div className="row">
            <div className="col-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}  >
                <img src={ikontappancs} alt="ikon" className="img-fluid" style={{ width: '70px', height: 'auto'  }} />
                <div className="col-7" >
                    <h2>Orvosi ellátás</h2>
                <p>Az összes állat, aki a menhelyre kerül, alapos állatorvosi vizsgálaton megy keresztül, amely során biztosítjuk, hogy egészségesek és felkészültek az örökbefogadásra</p>
                </div>
                </div>
                
                <div className="col-6"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <img src={ikonbeszed} alt="ikon" className="img-fluid" style={{ width: '70px', height: 'auto'  }} />
                <div className="col-7" >
                    <h2>Állandó elérhetőség</h2>
                    <p>A MenhelyTérkép oldal bármikor elérhető, hogy megtalálhatsd a legmegfelelőbb menhelyet. Ha kérdésed akad ügyfélszolgálatunk e-mail: info@menhelyterkepek.hu </p>
                </div>
                </div>
               </div>

            <div className="row">
            <div className="col-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
            <img src={ikonhaz} alt="ikon" className="img-fluid" style={{ width: '70px', height: 'auto'  }} />
            <div className="col-7" >
                <h2> Ideiglenes örökbe fogadás</h2>
            <p>Az ideiglenes befogadás remek lehetőség mindazoknak, akik szeretnének segíteni a menhelyen élő állatoknak, de nem tudnak hosszú távra elköteleződni. Ez a program különösen hasznos azoknak az állatoknak, akik speciális gondozást igényelnem vagy átmenetileg nem tudnak a menhleyen maradni, például helyhiány miatt várnak egy végleges otthonra.</p>
            </div>
            </div>

            <div className="col-6"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <img src={ikonnagyito} alt="ikon" className="img-fluid" style={{ width: '70px', height: 'auto'  }} />
            <div className="col-7" >
                <h2>Költöztetés</h2>
            <p>Az állatok átköltöztetése az új otthonba nagy változás számukra. Az összes menhelyünk szívesen segít, hogy az átmenet minnél gördülékenyebb legyen, és a kisállat gyorsabban megszokja új környezetét.</p>
            </div>
            </div>
            </div>
        </section>   
     </main>
   )
}

export default Home