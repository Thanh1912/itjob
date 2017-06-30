var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
mongooseUniqueValidator = require('mongoose-unique-validator');
const resumeSchema = new mongoose.Schema({
  jobid: { type: Schema.Types.ObjectId, ref: 'post' },
  status: Boolean,
  createddate: { type: Date, default: Date.now },
  candidateid: { type: Schema.Types.ObjectId, ref: 'candidate' },

});

const model = mongoose.model('resume', resumeSchema);
module.exports = model;


