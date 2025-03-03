import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../Styles/admin.css";
import { useNavigate } from "react-router-dom";
import img from "../../assets/kezdolapKutya.jpg";
import Betoltes from "../../Elements/Betoltes";
import Header from "../../Elements/Header";
import "../../Styles/listazas.css";

const Profilom = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("kezdolap");
  const [userId, setUserid] = useState(localStorage.getItem("belepisadat"));

  const [felhasznaloAdatok, setFelhasznaloAdatok] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchUser = async () => {
      const userId = await localStorage.getItem("belepisadat");
      if (!userId) {
        navigate("/");
      } else {
        const response = await axios.get(`${apiUrl}/users/${userId}`);
        console.log(response);
        setFelhasznaloAdatok(response.data);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex w-full p-2 rounded-lg space-x-2">
          {[
            { key: "kezdolap", label: "Profilom" },
            { key: "mentett", label: "Mentett menhelyeim" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`flex-1 py-2 px-4 text-lg rounded-lg text-white transition-all egyedigomb ${
                activeTab === tab.key
                  ? "bg-gray-700"
                  : "bg-black hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-lg bg-white">
          {activeTab === "kezdolap" && <Kezdolap adatok={felhasznaloAdatok} />}
          {activeTab === "mentett" && <MentettMenhelyek />}
        </div>
      </div>
    </>
  );
};

const Kezdolap = ({ adatok }) => (
  <div>
    <h2>Profilom</h2>
    {adatok ? (
      <section>
        <p>Név: {adatok.nev}</p>
        <p>E-mail cím: {adatok.email}</p>
        <p>Telefonszám: {adatok.telefonszam}</p>
      </section>
    ) : null}
  </div>
);

const MentettMenhelyek = () => {
  const [kedvencek, setKedvencek] = useState([]);
  const [userId, setUserid] = useState(localStorage.getItem("belepisadat"));
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchKedvencek = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/users/kedvencekadattal/${userId}`,
        );
        const data = await response.json();
        console.log(data);
        setKedvencek(data.kedvencek || []);
      } catch (error) {
        console.error("Hiba a kedvencek lekérésekor:", error);
      }
    };

    fetchKedvencek();
  }, []);

  return (
    <div>
      <div className="d-flex gap-2">
        <h2>Kedvenceim</h2>
      </div>
      <br />
      <section>
        <div className="lista">
          {kedvencek.map((kedvenc) => (
            <div
              key={kedvenc._id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 w-72 text-center p-3"
            >
              <img src={kedvenc.logo} className="logo fooldallogo" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {kedvenc.menhelyneve}
              </h2>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profilom;
