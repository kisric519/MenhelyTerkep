import UjEsemeny from "../../Elements/UjEsemenyForm";
import AdminSzerkesztes from "../../Elements/adminSzerkesztes"
import GaleriaLista from "../../Elements/GaleriaListaAdmin";
import EsemenyListazas from "../../Elements/MenhelyEsemenyLista";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../Styles/admin.css";
import { useNavigate } from "react-router-dom";
import img from "../../assets/kezdolapKutya.jpg";
import Betoltes from "../../Elements/Betoltes";
import Header from "../../Elements/Header";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("kezdolap");

  return (
    <>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex w-full p-2 rounded-lg space-x-2">
          {[
            { key: "kezdolap", label: "Alap adatok" },
            { key: "esemenyek", label: "Eseményeim" },
            { key: "galeria", label: "Galéria" },
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
          {activeTab === "kezdolap" && (
            <Kezdolap />
          )}
          {activeTab === "esemenyek" && <Esemenyek />}
          {activeTab === "galeria" && <Galeria />}
        </div>
      </div>
    </>
  );
};

const Kezdolap = () => {
  const [szerkesztesAblak, setSzerkesztoAblak] = useState(false);
  const [frissitesTrigger, setFrissitesTrigger] = useState(0);
const [menhelyAdatok, setMenhelyAdatok] = useState(null);
const apiUrl = import.meta.env.VITE_API_URL;
useEffect(() => {
  const fetchShelterData = async () => {
    const mentettMenhelyId = await localStorage.getItem("belepisadat");
    if (!mentettMenhelyId) {
      navigate("/");
    } else {
      const response = await axios.get(
        `${apiUrl}/menhelyek/${mentettMenhelyId}`,
      );
      setMenhelyAdatok(response.data);
    }
  };
  fetchShelterData();
}, [frissitesTrigger]);

  const kezeldSikeresMentest = () => {
    setSzerkesztoAblak(false);
    setFrissitesTrigger((prev) => prev + 1);
  };
  return (
    <div>
      <h2>Menhely adatai</h2>
      <section>
        {menhelyAdatok ? (
          <div>
            <div>
              {menhelyAdatok.logo && (
                <img src={menhelyAdatok.logo} className="logo" />
              )}
            </div>
            <br />
            <p>
              <strong>Menhely Neve:</strong> {menhelyAdatok.menhelyneve}
            </p>
            <p>
              <strong>Menhely Címe:</strong> {menhelyAdatok.menhelycime}
            </p>
            <p>
              <strong>Menhely Weboldala:</strong> {menhelyAdatok.oldallink}
            </p>
            <p className="leiras">
              <strong>Menhely Leírása:</strong> {menhelyAdatok.leiras}
            </p>
            <p>
              <strong>Menhely E-mail:</strong> {menhelyAdatok.email}
            </p>
            <p>
              <strong>Menhely Telefonszám:</strong> {menhelyAdatok.telefonszam}
            </p>
          </div>
        ) : (
          <Betoltes />
        )}
        <button
          className="szerkesztesgomb"
          onClick={() => setSzerkesztoAblak(true)}
        >
          Adatok módosítása
        </button>
      </section>
      {szerkesztesAblak == true ? (
        <section className="ujAblak">
          <div className="tartalom">
            <button
              onClick={() => setSzerkesztoAblak(false)}
              className="ujgomb"
            >
              Bezár
            </button>
            <div>
              <AdminSzerkesztes onSuccess={() => kezeldSikeresMentest()} />
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

const Esemenyek = () => {
  const [ujEsemenyAblak, setUjEsemenyAblak] = useState(false);
  const [frissitesTrigger, setFrissitesTrigger] = useState(0);

  const kezeldSikeresBekuldest = () => {
    setUjEsemenyAblak(false);
    setFrissitesTrigger((prev) => prev + 1);
  };

  return (
    <div>
      <div className="d-flex gap-2">
        <h2>Eseményeim</h2>
        <button className="ujgomb" onClick={() => setUjEsemenyAblak(true)}>
          + Új esemény
        </button>
      </div>
      <br />
      <section>
        <div>
          <EsemenyListazas
            frissitesTrigger={frissitesTrigger}
            onSuccess={() => kezeldSikeresBekuldest()}
          />
        </div>
      </section>
      {ujEsemenyAblak == true ? (
        <section className="ujAblak">
          <div className="tartalom">
            <button onClick={() => setUjEsemenyAblak(false)} className="ujgomb">
              Bezár
            </button>
            <div>
              <UjEsemeny onSuccess={() => kezeldSikeresBekuldest()} />
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

const Galeria = () => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [menhelyid, setMenhelyid] = useState("");
  const [frissitesTrigger, setFrissitesTrigger] = useState(0);
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchShelterData = async () => {
      const mentettMenhelyId = await localStorage.getItem("belepisadat");
      setMenhelyid(mentettMenhelyId);
    };
    fetchShelterData();
  }, []);

  const kepfeltoltes = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("menhelyid", menhelyid);
    formData.append("tipus", "galeria");
    setUploading(true);
    setMessage("");

    try {
      await axios.post(apiUrl + "/media/feltoltes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Sikeres feltöltés!");
      setFrissitesTrigger((prev) => prev + 1);
    } catch (err) {
      setMessage("Hiba történt a feltöltés során!");
    }

    setUploading(false);
  };

  return (
    <div>
      <div className="d-flex gap-2">
        <h2>Galéria</h2>
        <button className="ujgomb" onClick={kepfeltoltes}>
          + Kép
        </button>
        {uploading ? <Betoltes /> : null}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
      <br />
      <section className="galeria">
        <GaleriaLista menhelyid={menhelyid} onSuccess={frissitesTrigger} />
      </section>
    </div>
  );
};

export default Admin;
