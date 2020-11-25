const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/showntell', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to db'))
  .catch((err) => console.log(err));