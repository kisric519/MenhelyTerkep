const express = require('express')
const router = express.Router()
const Menhely = require('../models/menhelyek-model');
const bcrypt = require('bcrypt');
const upload = require('../middlewares/upload');
const Kepek = require('../models/kepek-model');

//Menhely regisztráció
router.post('/regisztracio',upload.single("image"), async (req, res) => {
    try{
        const menhely = req.body
        const letezoMenhely = await Menhely.findOne({ email: menhely.email });
        if (letezoMenhely) {
          return res.status(400).json({ hiba: 'Ez az email cím már regisztrálva van.' });
        }
        const salt = await bcrypt.genSalt(10);
        const titkositottJelszo = await bcrypt.hash(menhely.jelszo, salt);
        const cloudFrontUrl = `${process.env.CLOUDFRONT_URL}/${req.file.key}`;

        const menhelymodel = await Menhely.create({  
                menhelyneve:menhely.menhelyneve,
                email:menhely.email,
                telefonszam:menhely.telefonszam,
                jelszo:titkositottJelszo,
                menhelycime:menhely.menhelycime,
                oldallink:menhely.oldal_link,
                leiras: menhely.leiras,
                logo:cloudFrontUrl
        });
        let ujmenhely = await menhelymodel.save();

        res.json(ujmenhely);
     }catch(err){
          console.log(err)
     }
});

//Jóváhagyott menhelyek lekérése
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
        if (user && (await bcrypt.compare(userpass, user.jelszo))) {
            res.send(user);
        } else{
            res.send({msg:"Hibás email cím vagy jelszó!"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ hiba: 'Hiba történt a bejelentkezés során.' });
    }
});

//Menhely adatok frissítése
router.put('/szerkesztes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const updatedMenhely = await Menhely.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        
        if (!updatedMenhely) {
            return res.status(404).json({ message: 'Nem található a bejegyzés.' });
        }
        
        res.json(updatedMenhely);
    } catch (error) {
        res.status(500).json({ message: 'Szerverhiba', error });
    }
});

module.exports = router