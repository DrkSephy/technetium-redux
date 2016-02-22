var mongoose = require('mongoose');

var subscriptionSchema = new mongoose.Schema({
  username: String,
  reponame: String
});

module.exports = mongoose.model('Subscriptions', subscriptionSchema);