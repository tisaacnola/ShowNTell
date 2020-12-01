const path = require('path');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
// const $ = require('jquery');
const session = require('express-session');
require('dotenv').config();
require('./db/index');
const { GoogleStrategy } = require('./oauth/passport');
const { Users, Posts, Shows } = require('./db/schema.js');
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
  res.status(200).json(userInfo);
});

app.get('/users', (req, res) => {
  Users.find().then((data) => res.status(200).json(data));
});

app.get('/posts', (req, res) => {
  Posts.find().then((data) => res.status(200).json(data));
});

app.get('/shows', (req, res) => {
  Shows.find().then((data) => res.status(200).json(data));
});

app.get('/delete', (req, res) => {
  Users.deleteMany()
    .then(() => Posts.deleteMany())
    .then(() => Shows.deleteMany())
    .then(() => res.status(200).json('done'));
});

app.get('/logout', (req, res) => {
  userInfo = null;
  res.status(200).json(userInfo);
});

app.post('/posts', (req, res) => {
  const { title, content, poster, show } = req.body;
  return Posts.create({
    title, content, user: poster, show, comments: {},
  }).then((post) => {
    Users.findById(poster)
      .then((user) => {
        Users.updateOne({ _id: poster }, { posts: [...user.posts, post._id] })
          .catch();
      })
      .catch();
  })
    .then(() => res.status(201).send())
    .catch(() => res.status(500).send());
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
