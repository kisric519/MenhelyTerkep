const express = require('express')
const router = express.Router()
const Naptar = require('../models/naptar-model');


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
        const osszesesemeny = await Naptar.find();
        res.json(osszesesemeny);
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

//Dátum szerint szűrés
router.get('/esemenyek/szures/:datum', async (req, res) => {
    try {
        const datum = req.params.datum
        const startOfDay = new Date(datum);

        const endOfDay = new Date(datum);
        endOfDay.setDate(endOfDay.getDate() + 1);


        const szurtesemenyek = await Naptar.find({
            datum: {
                $gte: startOfDay, 
                $lt: endOfDay, 
            },
        });
        res.json(szurtesemenyek);
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