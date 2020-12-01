/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
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

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }, () => {
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
  if (userInfo !== null) {
    Users.findOne({ id: userInfo.id })
      .then((data) => {
        userInfo = data;
        res.json(userInfo);
      });
  } else {
    res.json(userInfo);
  }
});

app.get('/findUser', (req, res) => {
  Users.find()
    .then((data) => res.json(data))
    .catch();
});

app.put('/startMessage/:user/:name', (req, res) => {
  Users.updateOne({ id: userInfo.id }, { messages: [...userInfo.messages, { id: req.params.user, name: req.params.name, text: [] }] })
    .then((data) => res.json(data))
    .catch();
});

app.put('/sendMessage/:id/:text', (req, res) => {
  const content = userInfo.messages;
  for (let i = 0; i < content.length; i += 1) {
    if (content[i].id === req.params.id) {
      content[i].text.push({ name: userInfo.name, message: req.params.text });
      break;
    }
  }
  Users.updateOne({ id: userInfo.id }, { messages: content })
    .then(() => Users.findOne({ id: req.params.id }))
    .then((data) => {
      const replace = data.messages || [];
      let test = false;
      for (let i = 0; i < replace.length; i += 1) {
        if (replace[i].id === String(userInfo.id)) {
          replace[i].text.push({ name: userInfo.name, message: req.params.text });
          test = true;
          break;
        }
      }
      if (test) {
        Users.updateOne({ id: Number(req.params.id) }, { messages: replace })
          .then((result) => res.json(result));
      } else {
        // console.log(content, 'here');
        Users.updateOne({ id: Number(req.params.id) }, { messages: [...replace, { id: String(userInfo.id), name: userInfo.name, text: [{ name: userInfo.name, message: req.params.text }] }] })
          .then((result) => res.json(result));
      }
    });
});

app.get('/database', (req, res) => {
  Users.find().then((data) => res.json(data));
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
