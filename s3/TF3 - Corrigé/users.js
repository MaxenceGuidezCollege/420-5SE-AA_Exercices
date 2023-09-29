

module.exports = function() {
    const dd = {
        pageOrientation: 'landscape',
        content: [
            {text: 'Utilisateurs (${numUsers})', style: 'header'},
            {
                style: 'tableUsers',
                table: {
                    headerRows: 1,
                    body: [
                        [
                            {text: '#', style: 'tableHeader'},
                            {text: 'Nom', style: 'tableHeader'},
                            {text: 'Prénom', style: 'tableHeader'},
                            {text: 'Courriel', style: 'tableHeader'},
                            {text: 'IP', style: 'tableHeader'}
                        ]
                    ]
                }
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableUsers: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black',
                alignment: 'center'
            }
        },
        defaultStyle: {
            // alignment: 'justify'
        }
    };
    return dd;
};
