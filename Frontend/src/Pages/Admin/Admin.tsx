import React from 'react'
import Header from '../../Elements/Header'
import UjEsemeny from '../../Elements/UjEsemenyForm'
import EsemenyListazas from '../../Elements/MenhelyEsemenyLista'
import { useState, useEffect } from "react";
import axios from "axios";
import '../../Styles/admin.css'
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("kezdolap");
    const [menhelyAdatok, setMenhelyAdatok] = useState(null);
    const [ujEsemenyAblak, setUjEsemenyAblak] = useState(false);

    useEffect(() => {
    const fetchShelterData = async () => {
      const mentettMenhelyId = localStorage.getItem("menhelyid");
      if (!mentettMenhelyId) {
          console.log("Nem vagy bejelentkezve")
          navigate('/');
      } else {
        const response = await axios.get(`http://127.0.0.1:3333/menhelyek/${mentettMenhelyId}`);
        console.log(response.data)
        setMenhelyAdatok(response.data);
      }
    };
    fetchShelterData();
    }, []);
    
   return (
    <div className="p-6 max-w-4xl mx-auto">
        <Header />

        <div className="flex w-full p-2 rounded-lg space-x-2">
        {[
          { key: "kezdolap", label: "Alap adatok" },
          { key: "esemenyek", label: "Eseményeim" },
          { key: "galeria", label: "Galéria" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 py-2 px-4 text-lg rounded-lg text-white transition-all egyedigomb ${
              activeTab === tab.key ? "bg-gray-700" : "bg-black hover:bg-gray-800"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 p-4 rounded-lg bg-white">
        {activeTab === "kezdolap" && <Kezdolap shelterData={menhelyAdatok} />}
        {activeTab === "esemenyek" && <Esemenyek setUjEsemenyAblak={setUjEsemenyAblak} ujEsemenyAblak={ujEsemenyAblak} />}
        {activeTab === "galeria" && <Galeria />}
      </div>
    </div>
   )
 }

const Kezdolap = ({ shelterData }: { shelterData: any }) => (
    <div>
        <h2>Menhely adatai</h2>
        <section>
            {shelterData ? (
                <div>
                    <p>Menhely Neve: {shelterData.menhelyneve}</p>
                    <p>Menhely Címe: {shelterData.menhelycime}</p>
                    <p>Menhely Weboldala: {shelterData.oldallink}</p>
                    <p>Menhely Leírása: {shelterData.leiras}</p>
                    <p>Menhely E-mail: {shelterData.email}</p>
                    <p>Menhely Telefonszám: {shelterData.telefonszam}</p>
                </div>
            ) : <p>Adatok betöltése...</p>}
            <button className='szerkesztesgomb'>Adatok módosítása</button>
        </section>
    </div>
);
const Esemenyek = () => {
  const [ujEsemenyAblak, setUjEsemenyAblak] = useState(false);
  const [frissitesTrigger, setFrissitesTrigger] = useState(0);

  const kezeldSikeresBekuldest = () => {
    setUjEsemenyAblak(false);
    setFrissitesTrigger((prev) => prev + 1);
  };

  return(
    <div>
      <div className='d-flex gap-2'>
        <h2>Eseményeim</h2>
        <button className='ujgomb' onClick={() => setUjEsemenyAblak(true)}>+ Új esemény</button>
      </div>
      <br />
      <section>
        <div>
          <EsemenyListazas frissitesTrigger={frissitesTrigger} onSuccess={() => kezeldSikeresBekuldest()} />
        </div>
      </section>
      {ujEsemenyAblak == true ? (
        <section className='ujAblak'>
          <div className='tartalom'>
            <button onClick={() => setUjEsemenyAblak(false)} className='ujgomb'>Bezár</button>
            <div>
              <UjEsemeny onSuccess={() => kezeldSikeresBekuldest()} />
            </div>
          </div>
        </section>
      ):(null)}
    </div>
  )
};
const Galeria = () => (
    <div>
        <h2>Galéria</h2>
        <section>
            Üres a galéria
        </section>
    </div>
);

export default Admin