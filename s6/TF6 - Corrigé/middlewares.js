const {isInt} = require("./lib.utils");
const {countAll} = require("./database");
const MIME_JSON = 'application/json';
const MIME_PDF = 'application/pdf';
const MIME_URL_ENCODED = 'application/x-www-form-urlencoded';

const acceptsJson = acceptsMime(MIME_JSON);
const acceptsPdf = acceptsMime(MIME_PDF);
const isJson = isMime(MIME_JSON);
const isUrlEncoded = isMime(MIME_URL_ENCODED);

function isMime() {
    const args = Array.from(arguments);
    return (req, res, next) => {
        if (!req.is(...args)) {
            res.status(415).end();
        } else {
            next();
        }
    }
}

function acceptsMime() {
    const args = Array.from(arguments);
    return (req, res, next) => {
        if (!req.accepts(...args)) {
            res.status(406).end();
        } else {
            next();
        }
    }
}

// Middleware pour journaliser toutes les requêtes à la console.
const logger = (req, res, next) => {
    console.log(req.method + ' ' + req.path);
    next();
};

// Middleware pour permettre les requêtes CORS
const cors = (req, res, next) => {
    res.header('access-control-allow-origin', '*');
    next();
};

// middleware pour vérifier les query params "page" et "per_page"
const parsePage = async (req, res, next) => {

    // Déterminer le nombre de users par page. Par défaut 50.
    const per_page = Number.parseInt(req.query.per_page ?? 50);

    // Déterminer la page. Par défaut 1.
    const page = Number.parseInt(req.query.page ?? 1);

    // Vérifier que les query params soient des entiers strictement positifs.
    if (!isInt(per_page) || !isInt(page) || page <= 0 || per_page <= 0) {
        res.status(400).end();
        return;
    }

    // Déterminer la plage des users a obtenir.
    const first = (page - 1) * per_page; // start: position à partir de 0 inclusif

    const total_users = await countAll();

    // Si la plage est erronée, la requête ne peut continuer.
    // Ici on ne renvoie pas un code 400 puisque la requête est
    // valide au sens du protocole HTTP, mais dans la BD
    // mais la page en cours est en dehors des limites.
    if (first >= total_users) {
        res.status(422).end();
        return;
    }

    const page_count = Math.ceil(total_users / per_page);

    // on affecte les infos passés en query params à l'objet requête
    req.pageInfo = {
        per_page,
        page,
        page_count,
        total_users
    };

    next();
}

module.exports = {
    logger,
    isJson,
    acceptsJson,
    acceptsPdf,
    cors,
    acceptsMime,
    isMime,
    parsePage,
    MIME_PDF,
    MIME_JSON,
    MIME_URL_ENCODED,
}