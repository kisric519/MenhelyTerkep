import React from 'react'
import Header from '../Elements/Header'
import { Link } from "react-router-dom";
import heroIMG from '../assets/kezdolapKutya.jpg'
import '../Styles/home.css'

const Home = () => {
   return (
     <main>
        <Header />
        <section className='hero'>
            <div className="row">
                <div className="col-6 heroSzoveg">
                    <h1>ffocim</h1>
                    <p>dewfjwefnewjfew</p>
                    <div className='linkek'>
                        <Link to="">Menhelyek</Link>
                        <Link to="">Regisztráció</Link>
                    </div>
                </div>
                <div className="col-6 heroKep">
                    <img src={heroIMG} alt="" />
                </div>
            </div>       
        </section>
        <section className='allatokmentese'>
            <h2>alcim</h2>
            <div className="row">
                <div className="col-6">
                    <p>ewlf,welfmewfkewmfwekfwe</p>
                </div>
                <div className="col-6">
                    <p>fewkfmweklfmweklfnwef</p>
                </div>
            </div>
        </section>
        <section>
            <h2>alcim</h2>
            <div className="row">
                <div className="col-4">
                       
                </div>       
                <div className="col-4">
                
                </div>       
                <div className="col-4">
                   
                </div>       
            </div>   
        </section>   
     </main>
   )
}

export default Home