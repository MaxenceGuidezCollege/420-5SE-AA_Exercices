let express = require('express');
let app = express();
const port = process.env.PORT || 3000;
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {
    queryForAll,
    queryById,
    updateUser,
    testConnection,
} = require('./database');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


const createPdf = require('../../s3/TF3 - Corrigé/create-pdf');

const {
    logger,
    cors,
    isJson,
    acceptsJson,
    acceptsPdf,
    parsePage,
    isMime,
    MIME_JSON,
    MIME_URL_ENCODED
} = require('./middlewares');

app.use(logger);
app.use(cors);

app.get('/users.pdf', acceptsPdf, parsePage, async (req, res) => {
    let users = await queryForAll(req.pageInfo, '*');
    createPdf(users, res);
});

app.get('/users', acceptsJson, parsePage, async (req, res) => {
    const base_url = `${req.protocol}://${req.get('host')}${req.path}`;

    const {
        per_page,
        page,
        total_users,
        page_count
    } = req.pageInfo;

    let users = await queryForAll(req.pageInfo, 'first_name,last_name,id,email');
    for (let user of users) {
        user.details = `${base_url}/${user.id}`
    }

    const url = `${base_url}?per_page=${per_page}`;
    const next_page = page >= page_count ? undefined : `${url}&page=${page + 1}`;
    const prev_page = page <= 1 ? undefined : `${url}&page=${page - 1}`;
    const cur_page = `${url}&page=${page}`;
    const pdf_page = `${base_url}.pdf?per_page=${per_page}&page=${page}`;
    const last_page = `${url}&page=${page_count}`;
    const first_page = `${url}&page=1`;

    const result = {
        page,
        per_page,
        users,
        total_users,
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

app.get('/users/:id', acceptsJson, async (req, res) => {
    // Chercher le user demandé
    const user = await queryById(req.params.id);

    // Vérifier si le user existe
    if (!user) {
        res.status(404).end();
    }

    res.json(user);
});

app.post('/users/:id', isMime(MIME_JSON, MIME_URL_ENCODED),
    async (req, res) => {
        const count = await updateUser(req.body, req.params.id);
        if (count === 0) {
            res.status(404);
        } else {
            res.status(204).end();
        }
    });


(async () => {
    try {
        await testConnection();
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`)
        });
    } catch (e) {
        console.error(e);
    }
})();






