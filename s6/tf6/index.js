
let express = require('express');
let app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const createPdf = require('../../s3/TF3 - Corrigé/create-pdf');
const {Database} = require("./database");
const database = new Database();

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

app
    .use(logger)
    .use(cors)

    .get('/users.pdf', async (req, res) => {
        let users = await database.queryForAll();
        createPdf(users, res);
    })

    .get('/users', async (req, res) => {
        const base_url = `${req.protocol}://${req.get('host')}${req.path}`;

        const {
            // per_page,
            page,
            total_users,
            page_count
        } = req.pageInfo;

        let users = await database.queryForAll()

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

    .get('/users/:id', async (req, res) => {
        // Chercher le user demandé
        const user = await database.queryById(req.params.id);

        // Vérifier si le user existe
        if (!user) {
            res.status(404).end();
        }

        res.json(user);
    })
    .post('/users/:id',
         (req, res) => {
            const count = 0; // todo: update user
            if (count === 0) {
                res.status(404);
            } else {
                res.status(204).end();
            }
        })

    .listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`)
    });


(async () => {
    try {
        await database.testConnection();
    } catch (e) {
        console.error(e);
    }
})();






