var mongoose = require('mongoose'),
  Schema                  = mongoose.Schema;
 mongooseUniqueValidator = require('mongoose-unique-validator');
const districtSchema = new mongoose.Schema({
  name: String,
  workplace:  { type: Schema.Types.ObjectId, ref: 'workplace' },
});

const model = mongoose.model('district', districtSchema);

module.exports = model;
