var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
const jobcategorydetaiSchema = new mongoose.Schema({
  name: String,
  _idCategory: { type: Schema.Types.ObjectId, ref: 'jobcategory' },
});
const model = mongoose.model('jobcategorydetail', jobcategorydetaiSchema);
module.exports = model;
