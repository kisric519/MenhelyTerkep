const express = require('express')
const router = express.Router()
const Menhely = require('../models/menhelyek-model');
const bcrypt = require('bcrypt');

//Menhely regisztráció
router.post('/regisztracio', async (req, res) => {
    try{
        const menhely = req.body
        const letezoMenhely = await Menhely.findOne({ email: menhely.email });
        if (letezoMenhely) {
          return res.status(400).json({ hiba: 'Ez az email cím már regisztrálva van.' });
        }
        const salt = await bcrypt.genSalt(10);
        const titkositottJelszo = await bcrypt.hash(menhely.jelszo, salt);
          const menhelymodel = await Menhely.create({  
                menhelyneve:menhely.menhelyneve,
                email:menhely.email,
                telefonszam:menhely.telefonszam,
                jelszo:titkositottJelszo,
                menhelycime:menhely.menhelycime,
                oldallink:menhely.oldal_link,
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

//Bejelentkezés
router.post('/bejelentkezes', async (req, res) => {
    try {
        const adatok = req.body;
        const useremail = adatok.email
        const userpass = adatok.jelszo

        const user = await Menhely.findOne({ email:useremail });
        console.log(user)
        if (user && (await bcrypt.compare(userpass, user.jelszo))) {
            res.send({user:user});
        } else{
            res.send({msg:"Hibás email cím vagy jelszó!"});
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ hiba: 'Hiba történt a bejelentkezés során.' });
    }
});

module.exports = router