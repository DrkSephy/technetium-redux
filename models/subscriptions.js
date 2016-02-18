var mongoose = require('mongoose');

var subscriptionSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Subscriptions', subscriptionSchema);