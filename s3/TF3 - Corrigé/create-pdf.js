const getUserDocument = require("./users");
const Pdfmake = require("pdfmake");
const path = require("path");
const https = require('https');

const fontDescriptors = {
    Roboto: {
        normal: path.join(__dirname, 'fonts', 'Roboto-Regular.ttf'),
        bold: path.join(__dirname, 'fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, 'fonts/Roboto-MediumItalic.ttf')
    }
};

module.exports = (users, stream) => {
    const printer = new Pdfmake(fontDescriptors);

    const dd = getUserDocument();

    dd.content[0].text = dd.content[0].text
        .replace('${numUsers}', users.length);

    let content = users.map(user => [
        user.id,
        user.last_name,
        user.first_name,
        user.email || '',
        user.ip_address || '',
    ]);

    dd.content[1].table.body.push(...content);
    const pdfDoc = printer.createPdfKitDocument(dd);
    pdfDoc.pipe(stream);
    pdfDoc.end();

    // function process(content, users, index) {
    //
    //     if (users.length === index) {
    //         dd.content[1].table.body.push(...content);
    //         const pdfDoc = printer.createPdfKitDocument(dd);
    //         pdfDoc.pipe(stream);
    //         pdfDoc.end();
    //     }
    //
    //     let user = users[index];
    //
    //     if(user.avatar !== null && user.avatar !== "null") {
    //         https.get(user.avatar, res => {
    //             let image = '';
    //             res.on('data', data => {
    //                 image += data;
    //             });
    //
    //             res.on('end', data => {
    //                 image += data;
    //                 content.push([
    //                     user.id,
    //                     user.last_name,
    //                     user.first_name,
    //                     user.email || '',
    //                     user.ip_address || '',
    //                 ]);
    //                 process(content, users, index + 1);
    //             });
    //         }).on('error', err => {
    //             content.push([
    //                 user.id,
    //                 user.last_name,
    //                 user.first_name,
    //                 user.email || '',
    //                 user.ip_address || '',
    //             ]);
    //             process(content, users, index + 1);
    //         });
    //     } else {
    //         process(content, users, index + 1);
    //     }
    //
    // }
    //
    // process([], users, 0);

};