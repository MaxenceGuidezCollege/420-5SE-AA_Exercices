const {Pool} = require('pg');
let options = {ssl: {rejectUnauthorized: false}};
const pool = new Pool(options);

async function testConnection() {
    return await pool.query('SELECT NOW()');
}

async function queryForAll({page, per_page}, fields = '*', orderBy = 'id') {
    const client = await pool.connect();
    try {
        const first = (page - 1) * per_page;

        // Ici, je me permet de construire la requête avec des "fields" dynamiques,
        // sans vérifier l'injection SQL parce que ces données ne proviennent pas
        // d'internet (pour l'instant) ou seront validés avec un outils de validation.
        const sql = `SELECT ${fields} FROM users order by ${orderBy} offset $1 limit $2`;
        const {rows} = await client.query(sql, [first, per_page]);
        return rows;
    } finally {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release();
    }
}

async function queryById(id) {
    const client = await pool.connect();
    try {
        const sql = `SELECT * FROM users WHERE id = $1`;
        const {rows} = await client.query(sql, [id]);
        return rows[0];
    } finally {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release();
    }
}

async function updateUser(user, id) {
    const client = await pool.connect();
    try {
        const sql = `
UPDATE users 
SET first_name=$1,
    last_name=$2,  
    email=$3,  
    avatar=$4,  
    active=$5,  
    ip_address=$6
WHERE id = $7
`;
        const {rowCount} = await client.query(sql, [
            user.first_name,
            user.last_name,
            user.email,
            user.avatar,
            user.active,
            user.ip_address,
            id
        ]);
        return rowCount;
    } finally {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release();
    }
}


async function createUser(user) {
    const client = await pool.connect();
    try {
        const sql = `
INSERT into users (first_name, last_name, email, avatar, active, ip_address)
VALUES ($1,$2,$3,$4,$5,$6)
`;
        const {rowCount} = await client.query(sql, [
            user.first_name,
            user.last_name,
            user.email,
            user.avatar,
            user.active,
            user.ip_address
        ]);
        return rowCount;
    } finally {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release();
    }
}

async function countAll() {
    const client = await pool.connect();
    try {
        const sql = `SELECT count(*) FROM users`;
        const {rows} = await client.query(sql);
        return rows[0].count;
    } finally {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release();
    }
}

module.exports = {
    queryForAll,
    queryById,
    countAll,
    updateUser,
    createUser,
    testConnection
}