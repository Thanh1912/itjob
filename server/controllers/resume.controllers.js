/**
 * Created by PC01 on 6/11/2017.
 */
var mongoose = require('mongoose');
var model = require('../models/resume.model.js');
module.exports.checkResume = function (req, res) {

  model.findOne({ "candidateid": req.body.candidate, jobid: req.body.jobid }).exec(function (err, docs) {
    if (err) throw err;
    res.json({
      Messeage: 'Ton Tai'
    });
  })
};

module.exports.jobapplyByidUser = function (req, res) {

  var ObjectId = require('mongoose').Types.ObjectId;
  model.aggregate([
    { $match: { "candidateid": new ObjectId(req.params.id) } },
    {
      "$lookup": {
        "from": "candidates",
        "localField": "candidateid",
        "foreignField": "_id",
        "as": "infocandidateid"
      }
    },
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "inforecruiters"
      },


    },
    {
      "$lookup": {
        "from": "jobs",
        "localField": "jobid",
        "foreignField": "_id",
        "as": "infojobs"
      },


    },
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};
// Update by id
module.exports.update = function (req, res) {
  model.findOneAndUpdate({ _id: req.params.id }, req.body, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
};

module.exports.jobapplyByidJOB = function (req, res) {

  var ObjectId = require('mongoose').Types.ObjectId;
  model.aggregate([
    { $match: { "jobid": new ObjectId(req.params.id) } },
    {
      "$lookup": {
        "from": "candidates",
        "localField": "candidateid",
        "foreignField": "_id",
        "as": "infocandidateid"
      }
    },
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "inforecruiters"
      },


    },
    {
      "$lookup": {
        "from": "jobs",
        "localField": "jobid",
        "foreignField": "_id",
        "as": "infojobs"
      },


    },
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};




// CHECK Insert  ===>
module.exports.insertCV = function (req, res) {
  const obj = new model(req.body);
  model.find({ "candidateid": req.body.candidateid, jobid: req.body.jobid }).exec(function (err, docs) {
    if (err) throw err;
    console.log(docs)
    if (docs.length > 0)
      res.status(403).json({
        Messeage: 'Bạn Đã Ung Tuyển Job Rồi!'
      });
    else {
      res.status(200).json({
        Messeage: 'OK'
      });
    }
  })
};

// Insert
module.exports.insert = function (req, res) {
  const obj = new model(req.body);
  obj.save(function (err, item) {
    if (err) { return console.error(err); }
    res.status(200).json(item);
  });
};
//get all cv theo id_user  ==> LIst pdf
module.exports.getallByIdUser = function (req, res) {
  const candidate = req.params.id;
  console.log(candidate)
  model.find({ "candidateid": candidate }).sort({ createddate: -1 }).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  })
};



//get all cv theo id_user  ==> LIst pdf
module.exports.checkHire = function (req, res) {
 var ObjectId = require('mongoose').Types.ObjectId;

  const candidateid = new ObjectId(req.body.candidateid);
  const recruiterid =  new ObjectId(req.body.recruiterid);

  model.find({ "candidateid": candidateid, "recruiterid": recruiterid,status:5 }).exec(function (err, docs) {
    if (err) throw err;
  
    if (typeof docs[0] ==='undefined') {//chua thue
        
      res.json(0);
    }else{

    res.json(1);
    }
    
  })
};

// read pdf user theo iduser
//get all cv theo id_user
module.exports.getallByIdPDFUser = function (req, res) {
  const candidateid = req.params.id;
  model.find({ candidateid: candidateid }).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  })
};



