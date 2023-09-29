const users = require("./users.json");

exports.displayUsers = (req, res, perPage, page) => {

    const usersToSend = [];

    if(page > Math.ceil(users.length / perPage)){
        res.status(422).end();
    }

    for (let i = (page - 1) * perPage; i < perPage * page; i++) {
        const user = {
            first_name: users[i].first_name,
            last_name: users[i].last_name,
            email: users[i].email,
        }
        usersToSend.push(user);
    }

    if (usersToSend === []){
        res.status(404).end();
    }
    else{
        let totalPages = Math.ceil(users.length / perPage);
        let urlPreviousPage;
        let urlNextPage;

        if(page - 1 <= 0){
            urlPreviousPage = null;
        }
        else{
            urlPreviousPage = req.protocol + "://" + req.rawHeaders[7] + "/users?page=" + (page - 1) + "&per_page=" + perPage;
        }

        if(page + 1 > totalPages){
            urlNextPage = null;
        }
        else{
            urlNextPage = req.protocol + "://" + req.rawHeaders[7] + "/users?page=" + (page + 1) + "&per_page=" + perPage;
        }

        let urlFirstPage = req.protocol + "://" + req.rawHeaders[7] + "/users?page=1&per_page=" + perPage;
        let urlCurrentPage = req.protocol + "://" + req.rawHeaders[7] + "/users?page=" + page + "&per_page=" + perPage;
        let urlLastPage = req.protocol + "://" + req.rawHeaders[7] + "/users?page=" + totalPages + "&per_page=" + perPage;

        const rep = {
            urlFirstPage: urlFirstPage,
            urlPreviousPage: urlPreviousPage,
            urlCurrentPage: urlCurrentPage,
            urlNextPage: urlNextPage,
            urlLastPage: urlLastPage,
            urlCurrentPagePdf: null,
            currentPage: page,
            usersPerPage: perPage,
            totalUsers: users.length,
            totalPages: totalPages,
            users: usersToSend,
        }

        res.send(rep).status(200);
    }
}

exports.displayUser = (req, res, id) => {

    let userToSend = {};
    let lastId = Number.MIN_VALUE;
    let firstId = Number.MAX_VALUE;

    const user = users.find(user=> user.id === id);

    if (user === undefined){
        res.status(404).end();
    }

    for (let i = 0; i < users.length; i++) {
        if(lastId < users[i].id){
            lastId = users[i].id;
        }
        if(firstId > users[i].id){
            firstId = users[i].id;
        }
    }

    if(id > lastId){
        res.status(422).end();
    }

    for (let i = 0; i < users.length; i++) {

        if(users[i].id === id){
            userToSend = {
                first_name: users[i].first_name,
                last_name: users[i].last_name,
                email: users[i].email,
            }
        }
    }


    if (userToSend === {}){
        res.status(404).end();
    }
    else{
        let urlPreviousUser;
        let urlNextUser;

        if(id - 1 < firstId){
            urlPreviousUser = null;
        }
        else{
            urlPreviousUser = req.protocol + "://" + req.rawHeaders[7] + "/user/" + (id - 1);
        }

        if(id + 1 > lastId){
            urlNextUser = null;
        }
        else{
            urlNextUser = req.protocol + "://" + req.rawHeaders[7] + "/user/" + (id + 1);
        }

        let urlFirstUser = req.protocol + "://" + req.rawHeaders[7] + "/user/" + firstId;
        let urlCurrentUser = req.protocol + "://" + req.rawHeaders[7] + "/user/" + id;
        let urlLastUser = req.protocol + "://" + req.rawHeaders[7] + "/user/" + lastId;

        const rep = {
            urlFirstUser: urlFirstUser,
            urlPreviousUser: urlPreviousUser,
            urlCurrentUser: urlCurrentUser,
            urlNextUser: urlNextUser,
            urlLastUser: urlLastUser,
            totalUsers: users.length,
            users: userToSend,
        }

        res.send(rep).status(200);
    }
}