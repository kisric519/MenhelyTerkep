const express = require('express')
const router = express.Router()
const Felhasznalok = require('../models/felhasznalok-model');
const bcrypt = require('bcrypt');
const Menhely = require('../models/menhelyek-model');

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
router.post('/belepes', async (req, res) => {
    try {
        const adatok = req.body;
        const useremail = adatok.email
        const userpass = adatok.jelszo
        const user = await Felhasznalok.findOne({ email:useremail });

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

router.get("/kedvencek/:userId", async (req, res) => {
    try {
        const felhasznalo = await Felhasznalok.findById(req.params.userId);
        if (!felhasznalo) {
            return res.status(404).json({ message: "Felhasználó nem található" });
        }
        res.json({ kedvencek: felhasznalo.kedvencek });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a lekérésnél", error });
    }
});

router.get("/kedvencekadattal/:userId", async (req, res) => {
    try {
        // A felhasználó lekérése
        const felhasznalo = await Felhasznalok.findById(req.params.userId);
        if (!felhasznalo) {
            return res.status(404).json({ message: "Felhasználó nem található" });
        }

        // A kedvencek menhelyek azonosítóinak lekérése
        const menhelyek = await Menhely.find({ _id: { $in: felhasznalo.kedvencek } });

        // Ha nincsenek kedvencek
        if (!menhelyek.length) {
            return res.status(404).json({ message: "Nincsenek kedvenc menhelyek" });
        }

        // Válasz küldése a menhelyek adataival
        res.json({ kedvencek: menhelyek });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a lekérésnél", error });
    }
});


router.post("/kedvencek", async (req, res) => {
    const { userId, ujKedvencek } = req.body;

    try {
        const felhasznalo = await Felhasznalok.findById(userId);
        if (!felhasznalo) {
            return res.status(404).json({ message: "Felhasználó nem található" });
        }

        felhasznalo.kedvencek = ujKedvencek;
        await felhasznalo.save();

        res.json({ kedvencek: felhasznalo.kedvencek });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt a frissítésnél", error });
    }
});

router.get('/:userid', async (req, res) => {
    try {
        const user = await Felhasznalok.findOne({ _id: req.params.userid });
        if (!user) {
            return res.status(404).json({ message: "Nem található ilyen felhasználó!" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!", error: err.message });
    }
});


module.exports = router