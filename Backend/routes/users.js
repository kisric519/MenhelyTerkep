const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    client.connect((err) => {
        if(err){
            res.status(500).send(err);
            return;
        }

    });
});

module.exports = router