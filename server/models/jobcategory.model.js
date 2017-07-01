var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
const jobcategorySchema = new mongoose.Schema({
    name: String,
});
const model = mongoose.model('jobcategory', jobcategorySchema);
module.exports = model;
