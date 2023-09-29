const MIME_JSON = 'application/json';
const MIME_PDF = 'application/pdf';

// Middleware pour traiter le header Content-Type seulement en JSON
// Seulement pour les requêtes POST
const isJson = (req, res, next) => {
    if (!req.is(MIME_JSON)) {
        // console.log('Client sent other than json');
        res.sendStatus(415);
    } else {
        next();
    }
};

// Middleware pour traiter le header Accept seulement en JSON
const acceptsJson = (req, res, next) => {
    if (!req.accepts(MIME_JSON)) {
        // console.log('Client does not accept json');
        res.status(406).end();
    } else {
        next();
    }
};

const acceptsPdf = (req, res, next) => {
    if (!req.accepts(MIME_PDF)) {
        // console.log('Client does not accept json');
        res.status(406).end();
    } else {
        next();
    }
};

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

module.exports = {
    logger,
    isJson,
    acceptsJson,
    acceptsPdf,
    cors
}