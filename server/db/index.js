const mongoose = require('mongoose');

const uri =
  'mongodb+srv://NetflixNCoders:mjldYKFtm84VJVpW@cluster0.otxhu.mongodb.net/ShowNTell?retryWrites=true&w=majority';
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to db'))
  .catch((err) => console.log(err));
