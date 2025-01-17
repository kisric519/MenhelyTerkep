const express = require('express')
const router = express.Router()
const Menhely = require('../models/menhelyek-model');

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
        res.json(jovahagyatlanokMenhelyek);
    } catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!", error: err.message });
    }
});

module.exports = router