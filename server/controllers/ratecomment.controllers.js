
var mongoose = require('mongoose');
var model = require('../models/ratecomment.model.js');

// Count all
module.exports.countByidJOB = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
  model.count({ recruiterid: new ObjectId(req.params.id) } ,function (err, count) {
    if (err) { return console.error(err); }
    res.json(count);
  });
};

// Insert
module.exports.insert = function (req, res) {
  const obj = new model(req.body);
  obj.save(function (err, item) {
    if (err) { return console.error(err); }
    res.status(200).json(item);
  });
};
//cap nhat lai rate cho recruiter


// Get by id recruter
module.exports.getByidrecruiter = function (req, res) {
  model.find({ recruiterid: req.params.id }, function (err, obj) {
    if (err) { return console.error(err); }
    res.json(obj);
  });
};
var modelrecruiter = require('../models/recruiter.model.js')
module.exports.UpdateRate = function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;

 model.aggregate([
   { $match: { recruiterid: new ObjectId(req.params.id) } },
   { $group: { _id: '$recruiterid',avg: { $avg: '$rate' } } }
], function(err, result) {
    console.log(result);
    //cap nhat start cho recruiter
     modelrecruiter.findOneAndUpdate({ _id: req.params.id }, { "info_recruiter.ratestar" : result[0].avg}, function(err) {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
});
};




module.exports.demoreduce = function (req, res) {
 // String functions
var map = function() {
        emit(this.rate,this);
    };

var reduce = function(k, v) {
        return {k: v}
}
model.mapReduce(map.toString(), reduce.toString(), {out: 'coll'}, function(e, c) {
                console.log(c);
                process.exit(1);
});

};









