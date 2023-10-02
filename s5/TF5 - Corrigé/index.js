let express = require('express');
let app = express();
const port = process.env.PORT ?? 3000;
const fetch = (...args) => import('node-fetch')
    .then(({default: fetch}) => fetch(...args));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())

const MIME_PDF = 'application/pdf';

const users = require(process.env.USERS_LIST || './users.json');

const createPdf = require('../../s3/TF3 - Corrigé/create-pdf');

const {
    logger,
    cors,
    isJson,
    acceptsJson,
    acceptsPdf
} = require('./middlewares');

function isInt(n) {
    // Utiliser le double == pour forcer la coercicion
    // Ne pas utiliser le comparateur strict ===
    return Number.parseInt(n) == n;
}

app.use(logger);

app.use(cors);

app.get('/users.pdf', acceptsPdf, async (req, res) => {

    // L'addresse de base pour obtenir les users
    // On reconstruit l'url automagiquement.
    // Pour connaître l'adresse du service d'échange de données,
    // On regarde l'entête 'host' envoyé par le client.
    const base_url = `${req.protocol}://${req.get('host')}/users`;

    // On reconstruit les query params du style ---> ? page=3 & per_page=50
    const query = Object.keys(req.query)
        .map(key => `${key}=${req.query[key]}`)
        .join('&');

    // On reconstruit l'url pour obtenir les users, à soit même :)
    const url = `${base_url}?${query}`;

    // On fetch les users
    const response = await fetch(url);
    if (response.ok) {
        // On transmet le pdf au client
        const data = await response.json();
        res.header('content-type', MIME_PDF);
        createPdf(data.users, res);
    } else {
        // La requête a échouée, retransmettre le status recu au client
        res.status(response.status).end();
    }

});

app.get('/users', acceptsJson, (req, res) => {
    // L'addresse de base pour obtenir les users
    // On reconstruit l'url automagiquement.
    // Pour connaître l'adresse du service d'échange de données,
    // On regarde l'entête 'host' envoyé par le client.
    const base_url = `${req.protocol}://${req.get('host')}${req.path}`;

    // Déterminer le nombre de users par page. Par défaut 50.
    const per_page = Number.parseInt(req.query.per_page ?? 50);

    // Déterminer la page. Par défaut 1.
    const page = Number.parseInt(req.query.page ?? 1);
    const page_count = Math.ceil(users.length / per_page);

    // Vérifier que les query params soient des entiers strictement positifs.
    if (!isInt(per_page) || !isInt(page) || page <= 0 || per_page <= 0) {
        res.status(400).end();
        return;
    }

    // Déterminer la plage des users a obtenir.
    const first = (page - 1) * per_page; // start: position à partir de 0 inclusif
    let last = page * per_page;      // end:   position de fin

    // Si la plage est erronée, la requête ne peut continuer.
    // Ici on ne renvoie pas un code 400 puisque la requête est
    // valide au sens du protocole HTTP, mais dans la BD
    // , la page en cours est en dehors des limites.
    if (first >= users.length) {
        res.status(422).end();
        return;
    }

    // Si la taille est trop grande, on prends jusqu'à la fin des données.
    if (last > users.length) {
        last = users.length;
    }

    // Ne conserver que le sous-tableau entre [first, last]
    let userPage = users.slice(first, last);

    // La liste des champs a conserver
    const fields = 'first_name,last_name,id,email'.split(',');

    // On ne conserve que les champs précédents, et on ajoute la propriété 'details'
    // a chacun des user qui pointe vers l'url des détails du user.
    userPage = userPage.map(user => fields.reduce((prev, key) => {
        prev[key] = user[key];
        return prev;
    }, {details: `${base_url}/${user.id}`}));


    // L'url de base avec le nombre de user par page
    const url = `${base_url}?per_page=${per_page}`;

    // L'url pour la prochaine page
    // Notez que si la prochaine page est en dehors du nombre de pages total,
    // la variable next_page est undefined et donc la variable result ci-bas
    // ne se verra pas effecté la propriété.
    const next_page = page >= page_count ? undefined : `${url}&page=${page + 1}`;

    // L'url pour la page précédente
    const prev_page = page <= 1 ? undefined : `${url}&page=${page - 1}`;

    // L'url de la page courante
    const cur_page = `${url}&page=${page}`;

    // L'url pour le fichier pdf de la page courante
    const pdf_page = `${base_url}.pdf?per_page=${per_page}&page=${page}`;

    // L'url de la dernière page
    const last_page = `${url}&page=${page_count}`;

    // L'url de la première page
    const first_page = `${url}&page=1`;

    const result = {
        page,
        per_page,
        users: userPage,
        total_users: users.length,
        next_page,
        prev_page,
        last_page,
        first_page,
        cur_page,
        pdf_page,
        page_count,
    }

    res.json(result).end();
})

app.get('/users/:id', acceptsJson, (req, res) => {

    // Chercher le user demandé
    const user = users.find(x => x.id == req.params.id);

    // Vérifier si le user existe
    if (!user) {
        res.status(404).end();
        return;
    }

    res.json(user).end();
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});

