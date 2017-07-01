var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
mongooseUniqueValidator = require('mongoose-unique-validator');
const ratecommentSchema = new mongoose.Schema({
  recruiterid: { type: Schema.Types.ObjectId, ref: 'recruiter' },
  candidateid: { type: Schema.Types.ObjectId, ref: 'candidate' },
  rate: Number,
  title:String,
  content:String,
  createddate: { type: Date, default: Date.now },
});

const model = mongoose.model('ratecomment', ratecommentSchema);
module.exports = model;


