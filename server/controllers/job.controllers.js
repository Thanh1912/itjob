var mongoose = require('mongoose');
var model = require('../models/job.model.js');
var keyword = require('../models/jobcategorydetail.model.js');
var workplace = require('../models/workplace.model.js');
var _ = require("underscore");

//get lien ket bang


// Get all job -- incluce  : job and company
module.exports.getAllJob_company = function (req, res) {
  model.aggregate([
    {
      "$lookup": {
        "from": "recruiter",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "listuser"
      }
    }
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};

// Get by id
module.exports.gettop12Company = function (req, res) {
  model.aggregate([
    { "$group": { _id: "$recruiterid", count: { $sum: 1 }, recruiterid: { $first: "$recruiterid" } } },
    { $project: { _id: 1, name: 1, count: 1, recruiterid: 1 } },
    { $lookup: { from: "recruiters", localField: "recruiterid", foreignField: "_id", as: "info" } },
    { $limit: 12 }
  ], function (err, obj) {
    if (err) { return console.error(err); }
    res.json(obj);
  })
};


// Get by id
module.exports.count_job_in_Company = function (req, res) {
  var ObjectId = require('mongoose').Types.ObjectId;
  model.aggregate([
    { $match: { recruiterid: new ObjectId(req.params.id) } },
    { "$group": { _id: "$recruiterid", count: { $sum: 1 }, recruiterid: { $first: "$recruiterid" } } },
    { $project: { _id: 1, count: 1, recruiterid: 1 } },
  ], function (err, obj) {
    if (err) { return console.error(err); }
    res.json(obj);
  })
};




module.exports.getByIdDetailJob = function (req, res) {
  var ObjectId = require('mongoose').Types.ObjectId;
  model.aggregate([
    { $match: { _id: new ObjectId(req.params.id)} },
    {
      "$lookup": {
        "from": "districts",
        "localField": "districtid",
        "foreignField": "_id",
        "as": "Infodistrict"
      },
    },
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "company"
      }
    },
    {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "Infokeyword"
      },

    },
    {
      "$lookup": {
        "from": "jobcategories",
        "localField": "jobcategory",
        "foreignField": "_id",
        "as": "Infojobcategory"
      }
    },
    {
      "$lookup": {
        "from": "workplaces",
        "localField": "workplaceid",
        "foreignField": "_id",
        "as": "Infoworkplace"
      }
    }
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};


/*
// Get all
module.exports.getAllJob_company = function (req, res) {
   model.aggregate([
    { "$lookup": {
      "from": "users",
      "localField": "recruiterid",
      "foreignField": "_id",
      "as": "listuser"
    }}
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });

};

*/
//==================Get top 10 job By ID RECRUTER=========


// Get by id

module.exports.jobincompany = function (req, res) {
  var ObjectId = require('mongoose').Types.ObjectId;
  model.aggregate([
    { $match: { recruiterid: new ObjectId(req.params.id)} },
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiters",
        "foreignField": "_id",
        "as": "recruiters"
      }
    },
        {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "CategoryDetail"
      }
    },
          {
      "$lookup": {
        "from": "jobcategories",
        "localField": "jobcategory",
        "foreignField": "_id",
        "as": "Category"
      }
    },
    
      { $limit: 10 }
  ]).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};



function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
//GET SKILL COMPANY
module.exports.get_All_Skill_Company = function (req, res) {
  var ObjectId = require('mongoose').Types.ObjectId;
  
  model.aggregate([
    { $match: { recruiterid: new ObjectId(req.params.id) } },
    {
      "$lookup": {
        "from": "jobcategorydetails",
        "localField": "jobcategorydetail",
        "foreignField": "_id",
        "as": "Skills"
      }
    }

  ]).exec(function (err, docs) {
    if (err) throw err;
    var array = []
    docs.forEach(function (value) {
      console.log(value._id);
      //====================
      var tmp = [];
      tmp = value.Skills;
      tmp.forEach(function (valuetmp) {
        array.push(valuetmp)
      })

      //============

    });
    console.log('===============')
    console.log(array)
    var unique_array = array.filter(onlyUnique);
    res.json(unique_array);
  });

};



// Get 
module.exports.searchJobTitles = function (req, res) {
  model.find({title: /.*ED.*/ },
    function (err, model) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        res.status(200).json(model);
      }
    });
};

// Get all
module.exports.getAll = function (req, res) {
  model.find(
    function (err, model) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        res.status(200).json(model);
      }
    });
};
module.exports.get_job_key = function (req, res) {

  console.log(req.body);

  var array = [];
  array = req.body;
  model.find({ keywords: { $in: array } }).sort({ "createddate": 1 }
  ).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });

};





module.exports.top10post = function (req, res) {
  model.aggregate([
    {
      "$lookup": {
        "from": "recruiters",
        "localField": "recruiterid",
        "foreignField": "_id",
        "as": "inforCompany"
      }
    },
     { $limit : 10 }
  ]).sort({ "createddate": 1 }

  ).exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};
module.exports.getalljobs = function (req, res) {
  model.find().exec(function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
};

module.exports.getiduser = function (req, res) {

  model.find(
    {
      'recruiterid': req.params.id
    },
    function (err, model) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        res.status(200).json(model);
      }
    });
};
// Count all
module.exports.count = function (req, res) {
  model.count(function (err, count) {
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
    //save user



  });
};

// Get by id
module.exports.get = function (req, res) {
  model.findOne({ _id: req.params.id }, function (err, obj) {
    if (err) { return console.error(err); }
    res.json(obj);
  });
};
module.exports.get_job_company = function (req, res) {
  model.find({ recruiterid: req.params.id }, function (err, obj) {
    if (err) { return console.error(err); }
    res.json(obj);
  });
};

// Update by id
module.exports.update = function (req, res) {
  model.findOneAndUpdate({ _id: req.params.id }, req.body, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
};

// Delete by id
module.exports.delete = function (req, res) {
  model.findOneAndRemove({ _id: req.params.id }, function (err) {
    if (err) { return console.error(err); }
    res.sendStatus(200);
  });
}

