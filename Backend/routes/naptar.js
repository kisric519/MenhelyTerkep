const express = require('express')
const router = express.Router()
const Naptar = require('../models/naptar-model');
const Menhely = require('../models/menhelyek-model');


//Esemény mentése
router.post('/letrehozas', async (req, res) => {
    try {
        const esemenyadatok = req.body;

        const tmpesemeny = await Naptar.create({
            menhelyId: esemenyadatok.menhelyid,
            esemenyneve: esemenyadatok.esemenyneve,
            datum: esemenyadatok.datum,
            leiras: esemenyadatok.leiras
        });
    
        let ujesemeny = await tmpesemeny.save();
        res.json(ujesemeny);
    }catch(err){
        res.status(500).json(err);
    }
});

//Összes esemény lekérdezése
router.get('/esemenyek', async (req, res) => {
    try {
        // Az összes esemény lekérése
        const osszesesemeny = await Naptar.find();

        // Menhelyek ID-jainak kinyerése
        const menhelyIds = osszesesemeny.map(esemeny => esemeny.menhelyId);  // Feltételezve, hogy a menhelyId van az eseményekben

        // Külön lekérjük a menhelyek adatait
        const menhelyek = await Menhely.find({
            _id: { $in: menhelyIds }
        });

        // Az események és menhelyek összekapcsolása
        const eredmeny = osszesesemeny.map(esemeny => {
            const menhely = menhelyek.find(m => m._id.toString() === esemeny.menhelyId.toString());
            return {
                ...esemeny.toObject(),
                menhelyNev: menhely.menhelyneve,  // Menhely neve
                menhelyLogo: menhely.logo,  // Menhely logó
            };
        });

        res.json(eredmeny);
    } catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!", error: err.message });
    }
});


//Egy menhely eseményei lekérdezése
router.get('/esemenyek/:id', async (req, res) => {
    try {
        const menhelyid = req.params.id
        const osszesesemeny = await Naptar.find({ menhelyId: menhelyid });
        res.json(osszesesemeny);
    } catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!", error: err.message });
    }
});

router.get('/esemenyek/szures/:datum', async (req, res) => {
    try {
        const datum = req.params.datum;
        const startOfDay = new Date(datum);

        const endOfDay = new Date(datum);
        endOfDay.setDate(endOfDay.getDate() + 1);

        // Események lekérdezése a dátum alapján
        const szurtesemenyek = await Naptar.find({
            datum: {
                $gte: startOfDay, 
                $lt: endOfDay,
            },
        });

        // Menhelyek adatainak lekérése a menhelyId alapján
        const menhelyIds = szurtesemenyek.map(esemeny => esemeny.menhelyId);  // Feltételezve, hogy a menhelyId van az eseményekben

        // Külön lekérjük a menhelyek adatait
        const menhelyek = await Menhely.find({
            _id: { $in: menhelyIds }
        });

        // Az események és menhelyek összekapcsolása
        const eredmeny = szurtesemenyek.map(esemeny => {
            const menhely = menhelyek.find(m => m._id.toString() === esemeny.menhelyId.toString());
            return {
                ...esemeny.toObject(),
                menhelyNev: menhely.menhelyneve,  // Menhely neve
                menhelyLogo: menhely.logo,  // Menhely logó
            };
        });

        res.json(eredmeny);
    } catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!", error: err.message });
    }
});


//Egy esemény lekérdezése
router.get('/esemeny/:id', async (req, res) => {
    try {
        const esemenyid = req.params.id
        const esemeny = await Naptar.findById(esemenyid);
        res.json(esemeny);
    } catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!", error: err.message });
    }
});

//Esemény törlése
router.delete('/torles/:id', async (req, res) => {
    try {
        const toroltEsemeny = await Naptar.findByIdAndDelete(req.params.id);

        if (!toroltEsemeny) {
            return res.status(404).json({ message: "Nem található ilyen menhely!" });
        }

        res.json({ message: "Sikeres törlés!", toroltEsemeny });
    } catch (err) {
        res.status(500).json({ message: "Hiba történt a törlés során!", error: err.message });
    }
});

//Esemény frissítése
router.put('/frissites/:esemenyid', async (req, res) => {
    try {
        const adatok = req.body

        await Naptar.findOneAndUpdate(    
            { _id: req.params.esemenyid},
            { $set:
                {
                    esemenyneve: adatok.esemenyneve,
                    datum: adatok.datum,
                    leiras: adatok.leiras
                }
            }
        );  
        res.json({ message: "Sikeres esemény frissítés" });
     }catch(err){
        res.json({ message: err });
     }
});

module.exports = router