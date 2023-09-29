
const express = require('express');
const app= express();

const port = process.env.port || 3000;

app.use(express.json());

// Qu1
app.get('/hello/:name', (req, res) =>{
    let name = req.params.name;

    if(name.trim() !== ''){
        res.send('Hello ' + name + ' !').status(200);
    }
    else{
        res.status(400).end();
    }
});

//Qu2
app.get('/echo/headers', (req, res) =>{
    const headers = {
    };

    for (let i = 0; i < req.rawHeaders.length; i += 2) {
        headers[req.rawHeaders[i]] = req.rawHeaders[i + 1];
    }

    res.send(headers).status(200);
});

//Qu3
app.get('/echo/body', (req, res) =>{
    let body = req.body;

    if(!req.is('json')){
        res.status(415).end();
    }
    else{
        res.send(body).status(200);
    }
});

//Qu4
//TODO
// app.use((req, res, next) => {
//     console.log('Time: %d', Date.now())
//     next()
// })

//Qu5
app.get('/echo/:param1/:param2', (req, res) =>{
    let param1 = req.params.param1;
    let param2 = req.params.param2;

    const params = {'param1': param1, 'param2': param2};

    res.send(params).status(200);
});

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});