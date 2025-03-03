import { useState, useEffect, useRef } from "react"
import axios from "axios";
import '../../Styles/admin.css'
import { useNavigate } from 'react-router-dom';
import img from '../../assets/kezdolapKutya.jpg'
import Betoltes from '../../Elements/Betoltes'

const Profilom = () => {
    const navigate = useNavigate();
    
   return (
    <div className="p-6 max-w-4xl mx-auto">
        <div className="flex w-full p-2 rounded-lg space-x-2">
        {[
          { key: "kezdolap", label: "Profilom" },
          { key: "mentett", label: "Mentett menhelyeim" },
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
        {activeTab === "kezdolap" && <Kezdolap />}
        {activeTab === "mentett" && <MentettMenhelyek />}
      </div>
    </div>
   )
 }

const Kezdolap = ({  }) => (
    <div>
        <h2>Profilom</h2>
        <section>
            
        </section>
    </div>
);

const MentettMenhelyek = () => {

  return(
    <div>
        <div className='d-flex gap-2'>
            <h2>Kedvenceim</h2>
        </div>
        <br />
        <section>
    
        </section>
    </div>
  )
};

export default Profilom