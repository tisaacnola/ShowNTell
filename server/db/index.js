const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://NetflixNCoders:${process.env.DATABASE_PASSWORD}@cluster0.otxhu.mongodb.net/ShowNTell?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to db'))
  .catch((err) => console.log(err));
