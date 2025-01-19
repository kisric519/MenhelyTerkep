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

module.exports = router