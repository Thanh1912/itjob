var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const nhattuyendungSchema = new mongoose.Schema({
  title: { type: String, required: true },
  salarycompete: String,
  salarybegin: String,
  salaryend: String,
  descriptionwork: String,
  requirementwork: { type: String,  required: true },
  postimage: { type: String,  required: true },
  workplaceid: String,//
  districtid: String,//
  CountApllication: String,//
  JobTime: String,//
  endPost:{ type: Date, default: Date.now },
  createddate:{ type: Date, default: Date.now },
  recruiterid: { type: Schema.Types.ObjectId, ref: 'recruiter' },
  keywords: [
    { type: Schema.Types.ObjectId, ref: 'keyword' },
  ]
});

const model = mongoose
  .model('post', nhattuyendungSchema);

module.exports = model;
