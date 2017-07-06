var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const nhattuyendungSchema = new mongoose.Schema({
  title: { type: String, required: true },
  salarycompete: String,
  salarybegin: String,
  salaryend: String,
  Unit:String,
  descriptionwork: String,
  requirementwork: { type: String,  required: true },
  postimage: { type: String,  required: true },
  workplaceid:  { type: Schema.Types.ObjectId, ref: 'workplace' },//
  districtid: { type: Schema.Types.ObjectId, ref: 'district' },//
  Apllication: String,//
  JobTime: String,//
  endPost:{ type: Date, default: Date.now },
  createddate:{ type: Date, default: Date.now },
  modified:{ type: Date, default: Date.now },
  recruiterid: { type: Schema.Types.ObjectId, ref: 'recruiter' },
  jobcategory: { type: Schema.Types.ObjectId, ref: 'jobcategory' },
  jobcategorydetail: [
    { type: Schema.Types.ObjectId, ref: 'jobcategorydetail' },
  ]
});

const model = mongoose
  .model('job', nhattuyendungSchema);

module.exports = model;
