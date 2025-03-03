import React from 'react';
import MenhelyekLista from '../Elements/MenhelyekListazasa';
import { Link } from "react-router-dom";
import '../Styles/menhelyek.css';
import menhelyoldalKep from '../assets/menhelyoldalKutya.jpg';
import Header from '../Elements/Header'
import Footer from '../Elements/Footer'

const Menhelyek = () => {
    return (
        <>
           <Header /> 
        <main className="container mt-4">
            <section className='hero text-center text-md-start'>
                <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                        <h1>Menhelyek</h1>
                        <p>Ismerd meg Magyarország állatmenhelyeit</p>
                    </div>
                    <div className="col-md-6 col-12 text-center">
                        <img src={menhelyoldalKep} alt="" className="img-fluid" />
                    </div>
                </div>       
            </section>
            <section className='menhelylista mt-5'>
                <div>
                    <MenhelyekLista/>
                </div>
            </section>
            </main>
             <Footer />
            </>
    );
};

export default Menhelyek;
