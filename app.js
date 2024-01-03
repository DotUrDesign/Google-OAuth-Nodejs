const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session')
require('./auth');

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req ,res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
})

app.get('/auth/google', 
    passport.authenticate('google', { scope: ['email', 'profile']})
);

app.get('/auth/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
    })
);

app.get('/protected', (req, res) => {
    res.send(`Hello !`)
});

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate...')
});

app.listen(3000, () => {
    console.log("Server is running at port 3000");
})
