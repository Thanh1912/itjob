var mongoose = require('mongoose'),
  Schema                  = mongoose.Schema;
 mongooseUniqueValidator = require('mongoose-unique-validator');
const districtSchema = new mongoose.Schema({
  name: String
});
const model = mongoose.model('experience', districtSchema);
module.exports = model;
