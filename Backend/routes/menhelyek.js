const express = require('express')
const router = express.Router()
const Menhely = require('../models/menhelyek-model');

//Menhely regisztráció
router.post('/regisztracio', async (req, res) => {
    try{
          const menhely = req.body
          const menhelymodel = await Menhely.create({  
                nev:menhely.nev,
                email:menhely.email,
                telefonszam:menhely.telefonszam,
                jelszo:menhely.jelszo,
                cim:menhely.cim,
                oldal_link:menhely.oldal_link,
                leiras:menhely.leiras
          });
          let ujmenhely = await menhelymodel.save();
          res.json(ujmenhely);
     }catch(err){
          console.log(err)
     }
});

//Összes jóváhagyott menhely lekérdezése
router.get('/jovahagyott', async (req, res) => {
    try {
        const jovahagyottMenhelyek = await Menhely.find({ jovahagyva: true });
        res.json(jovahagyottMenhelyek);
    } catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!", error: err.message });
    }
});

//Egy menhely adatainak lekérdezése
router.get('/:menhelyid', async (req, res) => {
    try {
        const menhely = await Menhely.findOne({ _id: req.params.menhelyid });
        if (!menhely) {
            return res.status(404).json({ message: "Nem található ilyen menhely!" });
        }
        res.json(menhely);
    } catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!", error: err.message });
    }
});

module.exports = router