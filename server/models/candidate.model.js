var mongoose =require('mongoose'),
 mongooseUniqueValidator = require('mongoose-unique-validator'),
  Schema                  = mongoose.Schema;
const candidateSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  fullname: String,
  nameprofile:String,
  profileimage: { type: String, default: 'anonymous.png' }, 
  salary:  { type: Number, default: 0 },
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
  createddate:{ type: Date, default: Date.now },
  status:{ type: Boolean, default: false }, 
});
const model = mongoose.model('candidate', candidateSchema);
module.exports = model;
