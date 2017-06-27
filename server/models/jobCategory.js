var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
 var mongooseUniqueValidator = require('mongoose-unique-validator');
const categorySchema = new mongoose.Schema({
  title: String,
  IdKeyword:  [{
      _id:[{type: Schema.Types.ObjectId, ref: 'keyword'}],
    }],
});
const model = mongoose.model('jobCategory', categorySchema);
module.exports = model;
