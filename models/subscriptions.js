var mongoose = require('mongoose');

var subscriptionSchema = new mongoose.Schema({
  url: String
});

module.exports = mongoose.model('Subscriptions', subscriptionSchema);