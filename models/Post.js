var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  name: String,
  phone: String,
  address: String,
  status: String,
});

module.exports = mongoose.model('Post', PostSchema);