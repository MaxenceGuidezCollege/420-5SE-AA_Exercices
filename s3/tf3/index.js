
const axios = require('axios');
const getUsersDocument = require('./users.js');
const createPdf = require('./create_pdf.js');

const o = process.argv[2];
const path = process.argv[3];

module.exports = async () => {
    // let apiUrl = process.env.host;
    let apiUrl = 'https://calma-420-5se-aa.herokuapp.com';
    let pathToUsers = '/tp1/users';

    try {
        const response = await axios.get(apiUrl + pathToUsers);
        return response.data;
    } catch (error) {
        console.error('Une erreur s\'est produite:', error);
        throw error;
    }
};

;(async ()=>{
    const getUsers = require('./index');

    createPdf(getUsersDocument(await getUsers()), o, path);
})();
