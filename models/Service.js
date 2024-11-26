const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  type: String,
  code: String,
  description: String,
  imgUrl: String,
  detail: Array,
});

module.exports = mongoose.model('Service', serviceSchema);
