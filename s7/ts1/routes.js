const express = require("express");
const {router: router} = require("./pokemons.js");

const app = express();

app
    .use('/', router);

app.listen(3000, () => {
    console.log(`Server listening at http://localhost:${3000}`)
});
