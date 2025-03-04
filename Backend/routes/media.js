const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const Kepek = require('../models/kepek-model');

// POST 
router.post('/feltoltes', upload.single("image"), async (req, res) => {
   if (!req.file) {
    return res.status(400).json({ error: "Nincs feltöltött fájl!" });
  }

  try {
    const s3Url = req.file.location;

    const cloudFrontUrl = `${process.env.CLOUDFRONT_URL}/${req.file.key}`;

    const newImage = new Kepek({
      menhelyId: req.body.menhelyid,
      kepurl: cloudFrontUrl,
      tipus: req.body.tipus
    });

    await newImage.save();
    res.json({ message: "Kép feltöltve", image: newImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Menhely galéria lekérdezése
router.get('/galeria/:id', async (req, res) => {
    try {
        const menhelyid = req.params.id
        const galeria = await Kepek.find({menhelyId : menhelyid});
        res.json(galeria);
    } catch (err) {
        res.status(500).json({ message: "Hiba történt a lekérdezés során!", error: err.message });
    }
});

// DELETE
router.delete('/torles/:imageId', async (req, res) => {
  const { imageId } = req.params;

  try {
    const image = await Kepek.findById(imageId);
    if (!image) {
      return res.status(404).json({ error: "A kép nem található!" });
    }

    await Kepek.findByIdAndDelete(imageId);

    res.json({ message: "Kép törölve!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router