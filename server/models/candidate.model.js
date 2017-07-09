var mongoose =require('mongoose'),
 mongooseUniqueValidator = require('mongoose-unique-validator'),
  Schema                  = mongoose.Schema;
const candidateSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  fullname: String,
  profileimage: String,
  salary: String,
  jobcategory: { type: Schema.Types.ObjectId, ref: 'jobcategory' },
  jobcategorydetail: [
    { type: Schema.Types.ObjectId, ref: 'jobcategorydetail' },
  ],
  experience: { type: String, default: '0' },
  diplomalanguage: [
    { type: Schema.Types.ObjectId, ref: 'diplomalanguage' },
  ],
  workplaceid:  { type: Schema.Types.ObjectId, ref: 'workplace' },//
  districtid: { type: Schema.Types.ObjectId, ref: 'district' },//
});
const model = mongoose.model('candidate', candidateSchema);
module.exports = model;
