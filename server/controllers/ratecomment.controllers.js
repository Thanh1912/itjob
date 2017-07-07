
var mongoose = require('mongoose');
var model = require('../models/ratecomment.model.js');



    // Count all
  module.exports.countByidJOB = function(req, res) {
   model.count(   function(err, count) {
      if (err) { return console.error(err); }
      res.json(count);
    });
  };

  // Insert
  module.exports.insert = function(req, res) {
    const obj = new model(req.body);
    obj.save(function(err, item)  {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  };
  //cap nhat lai rate cho recruiter


    // Get by id recruter
  module.exports.getByidrecruiter = function(req, res) {
    model.findOne({ recruiterid: req.params.id }, function(err, obj) {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  };





