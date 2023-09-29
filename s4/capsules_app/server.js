
const express = require('express');
const app= express();

const port = process.env.port || 3000;

// app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/test', (request, response) => {
    response
        .header('X-Content-Machin-Truc', 'Yoo!')
        .status(400)
        .send('ok');
});

const clients = [
    {
        nom: 'Jean',
        prenom: 'Tremblay'
    },
    {
        nom: 'John',
        prenom: 'Doe'
    }
];

app.get('/clients/:id', (req, res) =>{
    let id = req.params.id;
    let client = clients[id];

    if(client !== undefined){
        res.json(clients[id]);
    }
    else if (!isNaN(parseInt(id))){
        res.status(404).end();
    }
    else{
        res.status(400).end();
    }
});

app.get('/v2/customers/1', (req, res) =>{
    res.json(clients[1]);
});

app.put('/clients/:id', (req, res) =>{
    let id = req.params.id;
    let client = clients[id];

    if(client !== undefined){
        // let client = req.body;
        // console.log(client);
        // res.status(200).end();

        let newClient = req.body;
        clients[id] = client;
        res.status(200).json(newClient);
    }
    else if (!isNaN(parseInt(id))){
        res.status(404).end();
    }
    else{
        res.status(400).end();
    }
});

app.post('/clients');

app.delete('/clients/:id');

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
