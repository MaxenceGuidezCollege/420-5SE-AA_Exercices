
const fs = require('fs');
const promises = fs.promises;

// Fichier JSON du formatif 4
const users = require('../../s4/tf4/users.json');

// Ouvrir le fichier à l'aide d'une fonction de rappel
// Éviter l'effet "callback hell"
// const onFile = (err, data) => {
//     if(err !== null){
//         console.log(data);
//         let users = JSON.parse(data.toString());
//
//         for (let user of users){
//             // Ici, on imbrique de façon abusive les fontions de rappel.
//             fs.readFile(__dirname + 'user0.json', (err, user0)=>{
//                 if(!err){
//                     console.log(user0);
//                 }
//                 else{
//                     console.error(err.message);
//                 }
//             });
//
//                 break
//         }
//     }
//     else{
//         console.error(err.message);
//     }
// };
//
// fs.readFile(__dirname + '/users.json', onFile);

// Promesses pour "applatir" et chaîner l'appel des fonctions.
// promises.readFile(__dirname + '/users.json')
//     .then(data => {
//         console.log(data);
//
//         return promises.readFile(__dirname + '/user0.json');
//     })
//     .then(user0 => {
//         console.log(user0);
//     })
//     .then(x => {
//         console.log(x);
//     })
//     .catch(err => {
//         console.error(err.message);
//     })
//     .finally(() => {
//         console.log('End');
//     });

// Function anonyme asynchrone
// ;(async function main(){
//     try{
//         const dataPromise = promises.readFile(__dirname + '/users.json');
//         // Promesse décapsulée et .then() est placé dans user0.
//         const user0 = await promises.readFile(__dirname + '/user0.json');
//
//         const data = await dataPromise;
//     }
//     catch (err) {
//         console.error(err.message);
//     }
//     finally {
//         console.log('End');
//     }
// })();

function doSomethingAsync(){
    const executor = (resolve, reject) => {
        setTimeout(() =>{
            resolve('Hola amigas');
        }, 10000);

    };
    return new Promise((resolve, reject) => {

    });
}

;(async () =>{
    try{
        const res = await doSomethingAsync();
        let test = '';
    }
    catch (err){
        console.error(err.message);
    }
})();

function readFileAsync(path){
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    });
}


let test = '';