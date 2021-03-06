var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
mongooseUniqueValidator = require('mongoose-unique-validator');
const resumeSchema = new mongoose.Schema({
  pathresume: String,
  createddate: { type: Date, default: Date.now },
  modifieddate: { type: Date, default: Date.now },
  candidateid: { type: Schema.Types.ObjectId, ref: 'candidate' },
  recruiterid: { type: Schema.Types.ObjectId, ref: 'recruiter' },
  jobid: { type: Schema.Types.ObjectId, ref: 'job' },
  status: { type: Number, default: 0 },
});

const model = mongoose.model('resume', resumeSchema);
module.exports = model;


