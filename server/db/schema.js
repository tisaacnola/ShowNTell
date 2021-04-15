const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: Number,
  name: String,
  posts: Array,
  messages: Array,
  phone: String,
  notifs: Array,
  follows: Array,
  subscriptions: Array,
});

const Users = mongoose.model('Users', userSchema);

const showSchema = mongoose.Schema({
  name: String,
  id: Number,
  posts: Array,
  subscriberCount: Number,
});

const Shows = mongoose.model('Shows', showSchema);

const showMovie = mongoose.Schema({
  title: String,
  id: Number,
  posts: Array,
  subscriberCount: Number,
});

const Movies = mongoose.model('Movies', showMovie);

const postSchema = mongoose.Schema({
  user: String,
  show: String,
  title: String,
  content: String,
  comment: Array,
  createdAt: Date,
  likes: Array,
});

const Posts = mongoose.model('Posts', postSchema);

const replySchema = mongoose.Schema({
  user: String,
  content: String,
  comment: Array,
  createdAt: Date,
  likes: Array,
});

const Replys = mongoose.model('Replys', replySchema);

module.exports = {
  Users,
  Shows,
  Posts,
  Replys,
  Movies,
};
