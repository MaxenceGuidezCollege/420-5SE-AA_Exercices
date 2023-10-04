
const express = require("express");
const {router} = require("./users.js");

const app = express();

// Voir avec Glenn pour ça :
// app.use('/api/:version', router);
app.use('/api/v1', router);

app.listen(3000, () => {
    console.log(`Server listening at http://localhost:${3000}`)
});
