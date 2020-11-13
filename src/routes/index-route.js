const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Aponta info Api",
        version: "1.0.0",
        developer: "Allan Oliveira"
    });
}); 

module.exports = router;