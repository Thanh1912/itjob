var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongooseUniqueValidator = require('mongoose-unique-validator');
const SliderSchema = new mongoose.Schema({
    Tilte: String,
    createddate: { type: Date, default: Date.now },
    postid: { type: Schema.Types.ObjectId, ref: 'job' },
    company:String,
    image:String,
    salary:String,
    icon:String,
    link:{ type: String, default: '' },
    status:{ type: Boolean, default: true },
});

const model = mongoose.model('Slider', SliderSchema);
module.exports = model;


