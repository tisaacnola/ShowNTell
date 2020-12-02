/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const path = require('path');
const express = require('express');
const passport = require('passport');
const axios = require('axios');
const cors = require('cors');
// const $ = require('jquery');
const session = require('express-session');
require('dotenv').config();
require('./db/index');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const Notifs = require('twilio')(accountSid, authToken);
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

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    saveUninitialized: false,
    resave: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/google',
  passport.authenticate(
    'google',
    { scope: ['https://www.googleapis.com/auth/plus.login'] },
    (req, res) => {
      // res.redirect('/');
    },
  ),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/logout' }),
  (req, res) => {
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
  },
);

app.get('/user', (req, res) => {
  // res.status(200).json(userInfo);
  if (userInfo !== null) {
    Users.findOne({ id: userInfo.id }).then((data) => {
      userInfo = data;
      res.json(userInfo);
    });
  } else {
    res.json(userInfo);
  }
});

app.get('/users', (req, res) => {
  Users.find().then((data) => res.status(200).json(data)).catch();
});

app.get('/posts', (req, res) => {
  Posts.find().then((posts) => res.send(posts)).catch();
});

app.get('/shows', (req, res) => {
  Shows.find().then((data) => res.status(200).json(data)).catch();
});

app.get('/findUser', (req, res) => {
  Users.find()
    .then((data) => res.json(data))
    .catch();
});

app.put('/startMessage/:user/:name', (req, res) => {
  Users.updateOne(
    { id: userInfo.id },
    {
      messages: [
        ...userInfo.messages,
        { id: req.params.user, name: req.params.name, text: [] },
      ],
    },
  )
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
          replace[i].text.push({
            name: userInfo.name,
            message: req.params.text,
          });
          test = true;
          break;
        }
      }
      if (test) {
        Users.updateOne(
          { id: Number(req.params.id) },
          { messages: replace,
            notifs: [...data.notifs, `${userInfo.name} messaged you`],
          },
        ).then((result) => res.json(result));
      } else {
        // console.log(content, 'here');
        Users.updateOne(
          { id: Number(req.params.id) },
          {
            messages: [
              ...replace,
              {
                id: String(userInfo.id),
                name: userInfo.name,
                text: [{ name: userInfo.name, message: req.params.text }],
              },
            ],
            notifs: [...data.notifs, `${userInfo.name} messaged you`],
          },
        ).then((result) => res.json(result));
      }
    });
});

app.post('/addComment', (req, res) => {
  const comment = req.body.comment;
  const postId = req.body.postId;
  Posts.find().then((posts) => {
    posts.forEach((post) => {
      if (post._id === postId) {
        post.comments[comment] = comment;
      }
    });
    res.send(posts);
  });
});

app.get('/search/:query', (req, res) => {
  const url = `http://api.tvmaze.com/search/shows?q=${req.params.query}`;
  return axios(url)
    .then(({ data }) => data)
    .then((data) => res.status(200).send(data))
    .catch(() => console.log('error'));
});

app.get('/delete', (req, res) => {
  Users.deleteMany()
    .then(() => Posts.deleteMany())
    .then(() => Shows.deleteMany())
    .then(() => res.status(200).json('done'))
    .catch();
});

app.get('/logout', (req, res) => {
  userInfo = null;
  res.status(200).json(userInfo);
});

app.post('/posts', (req, res) => {
  const { title, content, poster, show } = req.body;
  return Posts.create({
    title,
    content,
    user: poster,
    show,
    comments: {},
    createdAt: new Date(),
  })
    .then((post) => {
      Users.findById(poster)
        .then((user) => {
          Users.updateOne(
            { _id: poster },
            { posts: [...user.posts, post._id] },
          ).catch();
        })
        .catch();
    })
    .then(() => res.status(201).send())
    .catch(() => res.status(500).send());
});

app.post('/number', (req, res) => {
  const { number } = req.body;
  if (!number) {
    Users.updateOne({ id: userInfo.id }, { phone: number })
      .then((data) => res.json(data));
  } else {
    Users.updateOne({ id: userInfo.id }, { phone: number, notifs: [`you will now receive notifications @${number}`] })
      .then((data) => res.json(data));
  }
});

app.get('/notifs/:text/:id', (req, res) => {
  if (req.params.id === 'null') {
    Notifs.messages
      .create({
        body: req.params.text,
        from: '+12678677568',
        to: userInfo.phone,
      })
      .then((message) => res.json(message.sid))
      .catch((err) => console.log(err));
  } else {
    Users.findOne({ id: req.params.id })
      .then((data) => {
        Notifs.messages
          .create({
            body: req.params.text,
            from: '+12678677568',
            to: data.phone,
          })
          .then((message) => res.json(message.sid))
          .catch((err) => console.log(err));
      });
  }
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
