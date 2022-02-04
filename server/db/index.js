const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://ShowNTell:${process.env.DATABASE_PASSWORD}@cluster0.pl2o8.mongodb.net/ShowNTell?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://NetflixNCoders:${process.env.DATABASE_PASSWORD}@cluster0.otxhu.mongodb.net/ShowNTell?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  // eslint-disable-next-line no-console
  .then(() => console.log('connected to db'))
  .catch();
