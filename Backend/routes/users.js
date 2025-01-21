const express = require('express')
const router = express.Router()
const Felhasznalok = require('../models/felhasznalok-model');
const bcrypt = require('bcrypt');

//Felhasználó regisztráció
router.post('/regisztracio', async (req, res) => {
    try {
        const felhasznalo = req.body;

        const letezoFelhasznalo = await Felhasznalok.findOne({ email: felhasznalo.email });
        if (letezoFelhasznalo) {
          return res.status(400).json({ hiba: 'Ez az email cím már regisztrálva van.' });
        }

        const salt = await bcrypt.genSalt(10);
        const titkositottJelszo = await bcrypt.hash(felhasznalo.jelszo, salt);

        const felhasznalomodel = await Felhasznalok.create({
            nev: felhasznalo.nev,
            email: felhasznalo.email,
            telefonszam: felhasznalo.telefonszam,
            jelszo: titkositottJelszo
        });

        let ujfelhasznalo = await felhasznalomodel.save();
        res.json(ujfelhasznalo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ hiba: 'Hiba történt a regisztráció során.' });
    }
});

//Bejelentkezés
router.post('/bejelentkezés', async (req, res) => {
    try {
        const adatok = req.body;
        const useremail = adatok.email
        const userpass = adatok.jelszo
        const user = await Felhasznalok.findOne({ useremail });

        if (user && (await bcrypt.compare(userpass, user.jelszo))) {
            res.send({user:user});
        } else{
            res.send({msg:"Hibás email cím vagy jelszó!"});
        }

        res.json(bejelentkezes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ hiba: 'Hiba történt a bejelentkezés során.' });
    }
});

module.exports = router