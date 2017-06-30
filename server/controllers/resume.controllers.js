/**
 * Created by PC01 on 6/11/2017.
 */
var mongoose = require('mongoose');
var model = require('../models/resume.model.js');


// Insert
module.exports.insert = function(req, res) {
  const obj = new model(req.body);
  obj.save(function(err, item)  {
    if (err) { return console.error(err); }
    res.status(200).json(item);
  });
};
//get all cv theo id_user  ==> LIst pdf
module.exports.getallByIdUser = function(req, res) {
  const candidate = req.params.id;
  console.log(candidate)
  model.find({"candidateid": candidate}).sort({createddate: -1}).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  })
};

// read pdf user theo iduser
//get all cv theo id_user
module.exports.getallByIdPDFUser = function(req, res) {
  const candidateid = req.params.id;
  model.find({candidateid:candidateid}).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  })
};



