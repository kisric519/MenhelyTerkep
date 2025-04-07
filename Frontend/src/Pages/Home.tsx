import React from "react";
import { Link } from "react-router-dom";
import heroIMG from "../assets/kezdolapKutya.jpg";
import "../Styles/home.css";
import "../Styles/hero.css";
import Menhelylista from "../Elements/MenhelyekListazasaFooldalon";
import Header from "../Elements/Header";
import Footer from "../Elements/Footer";

import ikontappancs from "../assets/tappancsikon.png";
import ikonbeszed from "../assets/beszedikon.png";
import ikonhaz from "../assets/hazikon.png";
import ikonnagyito from "../assets/nagyitoikon.png";


const Home = () => {
  return (
    <>
      <Header />
      <div className="herofooldal">
        <h1>MenhelyTérkép</h1>
        <p className="text-center">Ahol minden menhely helyet kap</p>
      </div>
      <main className="container mt-4">
        <section className="hero text-center text-md-start">
          <div className="row align-items-center">
            <div className="col-md-6 col-12">
              <h1>Fogadj örökbe</h1>
              <p>
                Menhelyeink célja, hogy szerető otthonra találjanak a rászoruló
                állatok. Hiszünk abban, hogy minden kisállat megérdemli a boldog
                életet.
              </p>
              <div className="d-flex gap-3">
                <Link className="btn btn-dark" to="/menhelyek">
                  Menhelyek
                </Link>
                <Link className="btn btn-dark" to="/regisztracio/menhely">
                  Regisztráció
                </Link>
              </div>
              <br />
            </div>

            <div className="col-md-6 col-12 text-center">
              <img src={heroIMG} className="img-fluid rounded-3" />
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-center">Állatok megmentése</h2>
          <div className="row">
            <div className="col-md-6 col-12">
              <p className="text-center">
                Első lépésként látogass el a menhelyek listához, ahol
                böngészheted a különböző menhelyeket. Minden menhelyről
                részletes információ áll rendelkezésre. Az örökbefogadás nemcsak
                a gazdátlan állatok számára egy új kezdetet jelent, hanem a
                gazdiknak is. Az állatok végtelen szeretetet, ragaszkodást és
                boldogságot tudnak adni, amit semmi nem pótolhat. Minden egyes
                megmentett élet egy kis csoda, és mindannyiunknak felelősségünk
                van abban, hogy segítünk ezeknek az állatoknak egy boldogabb
                jövőt biztosítani.{" "}
              </p>
            </div>
            <div className="col-md-6 col-12">
              <p className="text-center">
                A menhelyek az állatok számára nem csupán átmeneti otthont
                jelentenek, hanem az életük legfontosabb fordulópontját. Az
                elhagyott, bántalmazott vagy súlyos körülmények között élő
                állatok gyakran egyetlen lehetőséggel találkoznak: az
                örökbefogadás. Ezen keresztül nyílik meg számukra az esély egy
                új, boldog életre. A menhelyek dolgozói napról napra
                fáradhatatlanul dolgoznak azon, hogy biztosítsák az állatok
                biztonságát, ellátást adjanak nekik, és felkészítsék őket arra,
                hogy új gazdájuk szeretetteljes otthont adjon számukra.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-center">Most csatlakozott menhelyek</h2>
          <Menhelylista />
        </section>

        <section className="mt-5">
          <h2 className="text-center">Mivel foglalkozik a MenhelyTérkép?</h2>
          <div className="row">
            <div className="col-md-6 col-12 d-flex flex-column align-items-center text-center">
              <img
                src={ikontappancs}
                alt="ikon"
                className="img-fluid mb-2"
                style={{ width: "70px" }}
              />
              <div className="col-lg-7">
                <h2>Orvosi ellátás</h2>
                <p>
                  Az összes állat, aki a menhelyre kerül, alapos állatorvosi
                  vizsgálaton megy keresztül, amely során biztosítjuk, hogy
                  egészségesek és felkészültek az örökbefogadásra.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-12 d-flex flex-column align-items-center text-center">
              <img
                src={ikonbeszed}
                alt="ikon"
                className="img-fluid mb-2"
                style={{ width: "70px" }}
              />
              <div className="col-lg-7">
                <h2>Állandó elérhetőség</h2>
                <p>
                  A MenhelyTérkép oldal bármikor elérhető, hogy megtalálhassd a
                  legmegfelelőbb menhelyet. Ha kérdésed akad ügyfélszolgálatunk
                  e-mail: info@menhelyterkepek.hu
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6 col-12 d-flex flex-column align-items-center text-center">
              <img
                src={ikonhaz}
                alt="ikon"
                className="img-fluid mb-2"
                style={{ width: "70px" }}
              />
              <div className="col-lg-7">
                <h2>Ideiglenes örökbe fogadás</h2>
                <p>
                  Az ideiglenes befogadás remek lehetőség mindazoknak, akik
                  szeretnének segíteni a menhelyen élő állatoknak, de nem tudnak
                  hosszú távra elköteleződni. Ez a program különösen hasznos
                  azoknak az állatoknak, akik speciális gondozást igényelnem
                  vagy átmenetileg nem tudnak a menhleyen maradni, például
                  helyhiány miatt várnak egy végleges otthonra.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-12 d-flex flex-column align-items-center text-center">
              <img
                src={ikonnagyito}
                alt="ikon"
                className="img-fluid mb-2"
                style={{ width: "70px" }}
              />
              <div className="col-lg-7">
                <h2>Költöztetés</h2>
                <p>
                  Az állatok átköltöztetése az új otthonba nagy változás
                  számukra. Az összes menhelyünk szívesen segít, hogy az átmenet
                  minnél gördülékenyebb legyen, és a kisállat gyorsabban
                  megszokja új környezetét.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
