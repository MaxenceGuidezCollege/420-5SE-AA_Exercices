
const express = require("express");
const url = require("url");

const router = express.Router();

const data = require("./data/pokemon.json")

router
    .get('/pokemons', async (req, res) => {
        res.send(data)
    });

module.exports.router = router;