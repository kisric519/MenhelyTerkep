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
    });

    await newImage.save();
    res.json({ message: "Kép feltöltve", image: newImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router