
module.exports = function(data){
    return {
        pageOrientation: 'landscape',
        content: [
            {text: 'Utilisateurs (' + data.length + ')', style: 'header'},
            {
                style: 'tableExample',
                table: {
                    body: getBody(data)
                }
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        }
    };
}

function getBody(data){
    let body = [];

    body[0] = [
        {text: '#', style: 'tableHeader', alignment: 'center'},
        {text: 'Nom', style: 'tableHeader', alignment: 'center'},
        {text: 'Prénom', style: 'tableHeader', alignment: 'center'},
        {text: 'Courriel', style: 'tableHeader', alignment: 'center'},
        {text: 'IP', style: 'tableHeader', alignment: 'center'},
        {text: 'Avatar', style: 'tableHeader', alignment: 'center'}
    ];

    data.map(user=>{
        body[user.id] = [user.id, user.first_name, user.last_name, user.email, user.ip_address, ''];
    })

    return body;
}