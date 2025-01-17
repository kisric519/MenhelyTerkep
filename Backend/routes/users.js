const express = require('express')
const router = express.Router()
const Felhasznalok = require('../models/felhasznalok-model');

//Felhasználó regisztráció
router.post('/regisztracio', async (req, res) => {
    try{
          const felhasznalo = req.body
          const felhasznalomodel = await Felhasznalok.create({  
                nev:felhasznalo.nev,
                email:felhasznalo.email,
                telefonszam:felhasznalo.telefonszam,
                jelszo:felhasznalo.jelszo
          });
          let ujfelhasznalo = await felhasznalomodel.save();
          res.json(ujfelhasznalo);
     }catch(err){
          console.log(err)
     }
});

module.exports = router