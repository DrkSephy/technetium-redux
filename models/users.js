var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  authToken: String,
  subscriptions: [String]
});

module.exports = mongoose.model('User', userSchema);