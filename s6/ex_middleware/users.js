
const express = require("express");
const url = require("url");

const router = express.Router();

router

    // .use('/sous-route/', router2)

    .get('/users', async (req, res) => {

        const {
            baseUrl,
            path,
            originalUrl,
            hostname,
            protocol,
            query,
            params
        } = req;

        const port = req.socket.localPort;
        const host = req.header('host');

        // With query
        // const urlReconstructed = url.format({
        //     protocol,
        //     hostname,
        //     port,
        //     pathname: baseUrl + path,
        //     query
        // })

        const urlReconstructed = url.format({
            protocol,
            hostname,
            port,
            pathname: baseUrl + path
        })

        res.send([
            {
                id: 1,
                name: 'toto',
                url: urlReconstructed
            }
        ])
    })

    .get('/users/:id', async (req, res) => {
        res.send(
            {
                id: 1,
                name: 'toto',
                url: urlReconstructed
            }
        )
    })

module.exports.router = router;