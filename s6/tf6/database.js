
const { Pool, Client } = require('pg');

module.exports.Database = class {
    constructor() {
        let options = {
            ssl: {
                rejectUnauthorized: false
            }
        };

        this._pool = new Pool(options);
    }

    async testConnection()  {
        const client = await this._pool.connect();
        try{
            await client.query('SELECT NOW()', (err, res) => {
                if(err){
                    console.log("Error");
                }
                else{
                    console.log(res.rows);
                }
            });
        }finally {
            client.release();
        }
    }

    async queryForAll() {
        const client = await this._pool.connect();
        try{
            await client.query('SELECT * FROM maxence_guidez.users', (err, res) => {
                if(err){
                    console.log("Error");
                }
                else{
                    console.log(res.rows);
                }
            });

        }finally {
            client.release();
        }
    }

    async queryByLastName(lastName)  {
        const client = await this._pool.connect();
        try{
            const res = await client.query('SELECT * FROM TEST WHERE last_name ILIKE $1', [lastName]);
            return res.rows;

        }finally {
            client.release();
        }
    }
}
