import React from 'react'
import MenhelyekLista from '../Elements/MenhelyekListazasa'
import { Link } from "react-router-dom";
import '../Styles/menhelyek.css'
import menhelyoldalKep from '../assets/menhelyoldalKutya.jpg'

const Menhelyek = () => {
   return (
        <main>
            <section className='hero'>
                <div className="row">
                <div className="col-6 heroSzoveg">
                    <h1>Menhelyek</h1>
                    <p>Ismerd meg Magyarország állatmenhelyeit</p>
                </div>
                <div className="col-6 heroKep">
                    <img src={menhelyoldalKep} alt="" />
                </div>
                </div>       
            </section>
            <section className='menhelylista'>

               <div>
                   <MenhelyekLista/>
               </div>
           </section>
        </main>
    )}

export default Menhelyek