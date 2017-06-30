var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongooseUniqueValidator = require('mongoose-unique-validator');
const SliderSchema = new mongoose.Schema({
    Tilte: String,
    createddate: { type: Date, default: Date.now },
    postid: { type: Schema.Types.ObjectId, ref: 'post' },
    company:String,
    image:String,
    text:String,
    link:String,
    status:Boolean
});

const model = mongoose.model('Slider', resumeSchema);
module.exports = model;


