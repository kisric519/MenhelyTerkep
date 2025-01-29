const express = require('express')
const router = express.Router()
const Menhely = require('../models/menhelyek-model');
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

module.exports = router