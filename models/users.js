var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  authToken: String,
  refreshToken: String,
  tokenExpiration: Number,
  subscriptions: [{
    username: String,
    reponame: String
  }]
});

module.exports = mongoose.model('User', userSchema);