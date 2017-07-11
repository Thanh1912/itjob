
var mongoose = require('mongoose');
var model = require('../models/like.model.js');


  // Get all
  module.exports.getAll = function(req, res) {
      model.find(
     function(err, model) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log('getall', model);
      res.status(200).json(model);
    }
  });
  };

  // Count all
  module.exports.count = function(req, res) {
   model.count(function(err, count) {
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



  // Delete by id
  module.exports.delete = function(req, res) {
    model.findOneAndRemove({ _id: req.params.id },function (err) {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }


