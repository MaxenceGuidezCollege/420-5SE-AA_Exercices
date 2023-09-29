
let app = require('express')()

app.get('/', (request, response) => {
    response.send('Hola ici esta la racinas')
})

app.get('/demo', (request, response) => {
    response.send('Hola ici esta la demodas')
})

app.listen(8080)