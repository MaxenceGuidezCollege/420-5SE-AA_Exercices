const express = require('express');
const app = express();
const functions = require('./functions');
const port = process.env.port || 3005;

app
    .use(express.json())
    .get('/users', (req, res) => {

        let { page = 1, per_page = 50 } = req.query;

        const isNumeric = /^\d+$/;

        if (!isNumeric.test(page) || !isNumeric.test(per_page)) {
            res.status(415).end();
        }

        page = parseInt(page);
        per_page = parseInt(per_page);

        functions.displayUsers(req, res, per_page, page);
    }).get('/user/:id', (req, res) => {

        let id = req.params.id;

        const isNumeric = /^\d+$/;

        if (!isNumeric.test(id)) {
            res.status(415).end();
        }

        id = parseInt(id);

        functions.displayUser(req, res, id);
    });


app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});