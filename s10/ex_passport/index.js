
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cookieSession = require('cookie-session');

const app = express();
const port = process.env.PORT ?? 3000;

const strategyCallback = (username, password, done) => {

    // Hasher le password
    // crypto.pbkdf2(password, 'salt the cat in tne hat', 310000, 32, 'sha256',
    //     (err, hashedPassword) => {
    //         if (err) {
    //             return done(err);
    //         }
    //
    //         const passwordBuffer = Buffer.from(user.password, 'base64');
    //
    //         if(username !== 'q'){
    //             return done(null, false);
    //         }
    //         else if (password !== 'q'){
    //             return done(null, false);
    //         }
    //         else {
    //             // Node-pg
    //             // const response = await client.query('SELECT * FROM users WHERE username = $1');
    //             // const user = response.rows[0];
    //
    //             const user = {
    //                 id: 1,
    //                 username: 'John',
    //                 avatar: '',
    //                 role: 'editor'
    //             };
    //
    //             return done(null, user);
    //         }
    //
    //         if (!crypto.timingSafeEqual(passwordBuffer, hashedPassword)) {
    //             return done(null, false, {message: 'Incorrect username or password.'});
    //         }
    //
    //         // Aller chercher l'user dans la db
    //         // Si existe, comparer user.hashPassword === hashPassword
    //         // Si OK done(null, user)
    //         return done(null, user);
    //     });

    if(username !== 'q'){
        return done(null, false);
    }
    else if (password !== 'q'){
        return done(null, false);
    }
    else {
        // Node-pg
        // const response = await client.query('SELECT * FROM users WHERE username = $1');
        // const user = response.rows[0];

        const user = {
            id: 1,
            username: 'John',
            avatar: '',
            role: 'editor'
        };

        return done(null, user);
    }
};
const localStrategy = new LocalStrategy(strategyCallback);
passport.use(localStrategy);

passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
    done(null, user)
});

const authorized = role => {
    return (req, res, next) => {
        if (req.user.role === role){
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
}

const authenticate = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }
    else {
        res.sendStatus(401);
    }
}

const router = express.Router()
    .get('maroute', (req, res) => {

    });

const bodyParser = require('body-parser');

// Bloquer les ../../../ dans les requetes
// app.use(express.static())

app
    // .use(bodyParser.urlencoded({extended:true}))
    .use(bodyParser.urlencoded())
    .use(cookieSession({
        name: 'session',
        keys: [
            // Générer clée :
            // require('crypto').randomBytes(32).toString('hex')
            '03c5c0e66cae0648870cdb4b261dcd7bcc446dcde10f7594900aca49df3b073e',
            'c1adb5768c7224b7055c02faec8fdf2e2cbc69b82f1a6e2a9a6dd96fa7bef164'
        ],

        // Cookie Options
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }))
    .use(passport.authenticate('session'))

    .get('/', authenticate, (req, res) => {
        res.sendFile('./index.html', {
            root: __dirname
        });
    })
    // .use((req, res, next)=> {
    //     next();
    // })
    // .use('/v2/maroute2', router)
    // .get((req, res, next) => {
    //     if(req.isAuthenticated()){
    //         next();
    //     }
    //     else {
    //         res.sendStatus(401);
    //     }
    // }, (req, res) => {
    //     // Retourner la ressource
    // })

    .post(
        '/logged',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login.html'
        })
    )

    .get('/login.html', (req, res) => {
        res.sendFile('./login.html', {
            root: __dirname
        });
    })

    .post('/collection', authenticate, authorized('editor'), (req, res) => {
       res.sendStatus(201);
    });

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});