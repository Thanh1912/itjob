var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongooseUniqueValidator = require('mongoose-unique-validator');
const rateComapanySchema = new mongoose.Schema({
    Tilte: String,
    createddate: { type: Date, default: Date.now },
    comanyid: { type: Schema.Types.ObjectId, ref: 'user' },
    rate:String,
    image:String,
});

const model = mongoose.model('rateComapany', resumeSchema);
module.exports = model;


