var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
 var mongooseUniqueValidator = require('mongoose-unique-validator');
const keywordSchema = new mongoose.Schema({
  name: String,
  _idCategory:[{type: Schema.Types.ObjectId, ref: 'jobCategory'}],
});
const model = mongoose.model('keyword', keywordSchema);
module.exports = model;
