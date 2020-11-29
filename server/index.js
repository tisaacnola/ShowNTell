const path = require('path');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
// const $ = require('jquery');
const session = require('express-session');
require('dotenv').config();
require('./db/index');
const { GoogleStrategy } = require('./oauth/passport');
const { Users } = require('./db/schema.js');
// const { session } = require('passport');

const app = express();

const client = path.resolve(__dirname, '..', 'client', 'dist');

let userInfo = null;

app.use(express.static(client));
app.use(express.json());
app.use(cors());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  saveUninitialized: false,
  resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }, (req, res) => {
  // res.redirect('/');
}));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/logout' }), (req, res) => {
  const newUser = new Users({
    id: Number(req.user.id),
    name: req.user.displayName,
  });

  Users.findOne({ id: Number(req.user.id) }).then((data) => {
    if (data) {
      res.redirect('/');
      userInfo = data;
    } else {
      newUser.save().then(() => {
        userInfo = newUser;
        res.redirect('/');
      });
    }
  });
});

app.get('/user', (req, res) => {
  res.json(userInfo);
});

app.get('/database', (req, res) => {
  Users.find().then(data => res.json(data));
});

app.get('/delete', (req, res) => {
  Users.deleteMany().then(() => res.json('done'));
});

app.get('/logout', (req, res) => {
  userInfo = null;
  res.json(userInfo);
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
