var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
mongooseUniqueValidator = require('mongoose-unique-validator');
const likeSchema = new mongoose.Schema({
  candidateid: { type: Schema.Types.ObjectId, ref: 'candidate' },
  jobid: { type: Schema.Types.ObjectId, ref: 'job' },
  createddate: { type: Date, default: Date.now },
});
const model = mongoose.model('like', likeSchema);
module.exports = model;


