const path = require('path');
const express = require('express');
const db = require('./db/index');
const passport = require('passport');
const cors = require('cors');
const $ = require('jquery');

const { GoogleStrategy } = require('./oauth/passport');

const app = express();

const client = path.resolve(__dirname, '..', 'client', 'dist')

app.use(express.json());
app.use(express.static(client));
app.use(cors({'Access-Control-Allow-Origin': 'http://localhost:3000'}));

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});


app.listen(3000, () => {
    console.log('http://localhost:3000')
})