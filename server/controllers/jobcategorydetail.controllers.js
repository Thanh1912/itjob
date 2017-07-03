
var mongoose = require('mongoose');
var model = require('../models/jobcategorydetail.model.js');


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

  // Get by id
  module.exports.get = function(req, res) {
    model.findOne({ _id: req.params.id }, function(err, obj) {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  };
   // Get by id
  module.exports.Categorybyid = function(req, res) {
    model.find({ _idCategory: req.params.id }, function(err, obj) {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  };
  
  // Get by id
  module.exports.getdemo = function(req, res) {
 /*   model.find({ _id: req.params.id }, function(err, obj) {
      if (err) { return console.error(err); }
      res.json(obj);
    });
*/
 model.aggregate([
 // {"$group" : {_id:"$_idCategory", count:{$sum:1}, name: { $first: "$name" }, _idCategory: { $first: "$_idCategory" }}},
    { $project: { _id: 1, name: 1, count: 1,_idCategory:1 }},
      {$lookup: {from: "jobcategories", localField: "_idCategory", foreignField: "_id", as: "details"}}, 
 
], function(err, obj) {
      if (err) { return console.error(err); }
      res.json(obj);
    })
  };

  // Get by id
  module.exports.getAllByIdCategory = function(req, res) {
    model.find({ _idCategory: req.params.id }, function(err, obj) {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  };



  // Update by id
  module.exports.update = function(req, res) {
    model.findOneAndUpdate({ _id: req.params.id }, req.body, function(err) {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  };

  // Delete by id
  module.exports.delete = function(req, res) {
    model.findOneAndRemove({ _id: req.params.id },function (err) {
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });
  }



