const express = require('express')
const router = express.Router()
const Menhely = require('../models/menhelyek-model');
const Adminok = require('../models/adminok-model');
const bcrypt = require('bcrypt');

//Egy menhely jóváhagyása
router.put('/menhelyek/jovahagy/:menhelyid', async (req, res) => {
    try{
        await Menhely.findOneAndUpdate(    
            { _id: req.params.menhelyid},
            { $set:
                {jovahagyva: true}
            }
        );  
        res.json({ message: "Sikeres jóváhagyása" });
     }catch(err){
        res.json({ message: err });
     }
});

//Egy menhely törlése
router.delete('/menhelyek/torles/:menhelyid', async (req, res) => {
    try {
        const toroltMenhely = await Menhely.findByIdAndDelete(req.params.menhelyid);

        if (!toroltMenhely) {
            return res.status(404).json({ message: "Nem található ilyen menhely!" });
        }

        res.json({ message: "Sikeres törlés!", toroltMenhely });
    } catch (err) {
        res.status(500).json({ message: "Hiba történt a törlés során!", error: err.message });
    }
});

//Összes jóváhagyatlan menhely lekérdezése
router.get('/jovahagyatlanok', async (req, res) => {
    try {
        const jovahagyatlanokMenhelyek = await Menhely.find({ jovahagyva: false });

        const rendezettMenhelyek = jovahagyatlanokMenhelyek.map(shelter => {
            return {
                id: shelter._id.toString(),
                ...shelter.toObject(),
                _id: undefined, 
            };
        });

        res.json(rendezettMenhelyek);
    } catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!", error: err.message });
    }
});

//Összes jóváhagyott menhely lekérdezése
router.get('/jovahagyott', async (req, res) => {
    try {
        const jovahagyatlanokMenhelyek = await Menhely.find({ jovahagyva: true });

        const rendezettMenhelyek = jovahagyatlanokMenhelyek.map(shelter => {
            return {
                id: shelter._id.toString(),
                ...shelter.toObject(),
                _id: undefined, 
            };
        });

        res.json(rendezettMenhelyek);
    } catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!", error: err.message });
    }
});

//ADMIN fiók bejelntkezes
router.post('/bejelentkezes', async (req, res) => {
    const adatok = req.body;
    const username = adatok.felhasznalo
    const userpass = adatok.jelszo
    const user = await Adminok.findOne({ username });

    if (user && (await bcrypt.compare(userpass, user.jelszo))) {
        res.send({user:user, sikeres:true});
    } else{
        res.status(500).json({msg:"Hibás email cím vagy jelszó!", sikeres: false});
    }
    try {
        
    } catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!", error: err.message, sikeres:false });
    }
});

//ADMIN regisztráció
router.post('/regisztracio', async (req, res) => {
    try {
        const felhasznalo = req.body;

        const salt = await bcrypt.genSalt(10);
        const titkositottJelszo = await bcrypt.hash(felhasznalo.jelszo, salt);

        const felhasznalomodel = await Adminok.create({
            felhasznalonev: felhasznalo.felhasznalonev,
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