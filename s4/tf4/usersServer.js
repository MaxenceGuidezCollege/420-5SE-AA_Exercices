
const express = require('express');
const app= express();
const users = require('./users.json');
const port = process.env.port || 3000;

const axios = require('axios');
const getUsersDocument = require('../../s3/tf3/users');
const getUsers = require('../../s3/tf3/index');
const createPdf = require('../../s3/tf3/create_pdf');

app.use(express.json())
    .get('/users', (req, res) =>{
        res.send(users).status(200);

})
    .get('/user/:id', (req, res) =>{
        let id = req.params.id;

        if(isNaN(parseInt(id))){
            res.status(415).end();
        }

        // noinspection EqualityComparisonWithCoercionJS
        const user = users.find(user=> user.id == id);

        if (user === undefined){
            res.status(404).end();
        }
        else{
            res.send(user).status(200);
        }

})
    .post('/user', (req, res) =>{
        let id = req.body.id

        if(isNaN(parseInt(id))){
            res.status(415).end();
        }

        // noinspection EqualityComparisonWithCoercionJS
        const user = users.find(user=> user.id == id);

        if(!req.is('json')){
            res.status(415).end();
        }
        else if (user !== undefined){
            res.status(409).end();
        }
        else{
            users.push(req.body);

            res.status(200).end();
        }
})
.put('/user', (req, res) =>{
    let id = req.body.id

    if(isNaN(parseInt(id))){
        res.status(415).end();
    }

    // noinspection EqualityComparisonWithCoercionJS
    const user = users.find(user=> user.id == id);

    if(!req.is('json')){
        res.status(415).end();
    }
    else if (user === undefined){
        res.status(404).end();
    }
    else{
        users[id - 1].first_name = req.body.first_name;
        users[id - 1].last_name = req.body.last_name;
        users[id - 1].email = req.body.email;
        users[id - 1].gender = req.body.gender;
        users[id - 1].ip_address = req.body.ip_address;

        res.status(200).end();
    }
})
    .delete('/users/:id', (req, res) =>{
        let id = req.params.id;

        if(isNaN(parseInt(id))){
            res.status(415).end();
        }

        // noinspection EqualityComparisonWithCoercionJS
        const user = users.find(user=> user.id == id);

        if (user === undefined){
            res.status(404).end();
        }
        else{
            users.splice(id - 1, 1);

            res.status(200).end();
        }
})
    .get('/users.pdf', (req, res) =>{

        // TODO
        // ;(async ()=>{
        //     createPdf(getUsersDocument(await getUsers()), '-o', undefined);
        // })();
});


app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});